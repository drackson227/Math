/* Audit qualité GR2 Study — boucle les 9 matières × sections, agrège le rapport
   du Diagnostic intégré (window.gr2BuildReport) + axe-core (a11y/WCAG) + erreurs JS.
   Vue MOBILE (390px) par défaut = le cas le plus exigeant.

   Lancer depuis la racine du projet :  node .claude/skills/gr2-quality/audit.mjs
   Variables d'environnement (optionnelles) :
     PW_INDEX   URL ou chemin de index.html      (def: ./index.html en file://)
     PW_CHROME  executablePath d'un Chromium       (def: Chromium fourni par Playwright)
     PW_MODULE  chemin/URL d'un module playwright   (def: 'playwright' résolu normalement)
     PW_WIDTH   largeur du viewport                 (def: 390 ; mets 1000 pour le bureau)

   Sortie : tableau par matière/section + résumé axe-core + verdict. Code de sortie ≠ 0
   si régression (erreur JS réelle, contraste faible, débordement, ou violation axe critique).
   axe-core est vendorisé à côté de ce fichier (axe.min.js) → aucune install requise. */
import path from 'node:path';
import url from 'node:url';
import fs from 'node:fs';

function toUrl(p) { return /^[A-Za-z]:[\\/]/.test(p) ? url.pathToFileURL(p).href : p; }

let chromium;
try {
  const mod = await import(toUrl(process.env.PW_MODULE || 'playwright'));
  chromium = mod.chromium || (mod.default && mod.default.chromium);
} catch (e) { console.error('❌ Playwright introuvable. Fais `npm i -D playwright` ou définis PW_MODULE.'); process.exit(2); }
if (!chromium) { console.error('❌ Module Playwright sans export chromium.'); process.exit(2); }

const HERE = path.dirname(url.fileURLToPath(import.meta.url));
const AXE_PATH = path.join(HERE, 'axe.min.js');
const HAS_AXE = fs.existsSync(AXE_PATH);

const INDEX = process.env.PW_INDEX ? toUrl(process.env.PW_INDEX) : url.pathToFileURL(path.resolve('index.html')).href;
const WIDTH = parseInt(process.env.PW_WIDTH || '390', 10);
const opts = { headless: true };
if (process.env.PW_CHROME) opts.executablePath = process.env.PW_CHROME;

const SUBJECTS = ['maths', 'francais', 'anglais', 'histoire', 'geo', 'chimie', 'bio', 'eco', 'neerlandais'];
const SECTIONS = ['synthese', 'formules', 'methodes', 'exercices', 'erreurs'];

// Bruit de console à IGNORER (CDN bloqués hors-ligne / cross-origin) → pas de vraies erreurs JS.
const CDN_NOISE = /Failed to load resource|net::|ERR_CERT|ERR_NAME|ERR_BLOCKED|jsdelivr|cloudflare|supabase|gstatic|googleapis|Script error/i;

const browser = await chromium.launch(opts);
const ctx = await browser.newContext({ viewport: { width: WIDTH, height: 900 }, isMobile: WIDTH < 768, hasTouch: WIDTH < 768, deviceScaleFactor: 1 });
await ctx.addInitScript(() => { try { localStorage.setItem('mathsgr2_welcome_seen', '1'); } catch (e) {} });
const page = await ctx.newPage();
const jsErrors = [];
page.on('pageerror', e => { if (!CDN_NOISE.test(e.message)) jsErrors.push('PAGEERROR: ' + e.message); });
page.on('console', m => { if (m.type() === 'error' && !CDN_NOISE.test(m.text())) jsErrors.push('CONSOLE: ' + m.text()); });

await page.goto(INDEX, { waitUntil: 'load' });
await page.waitForFunction(() => typeof window.setSubject === 'function' && typeof window.gr2BuildReport === 'function', null, { timeout: 20000 });
if (HAS_AXE) { try { await page.addScriptTag({ path: AXE_PATH }); } catch (e) { console.error('⚠️ axe non injecté:', e.message); } }

const num = (rep, label) => { const l = rep.split('\n').find(x => x.includes(label)); const m = l && l.match(/:\s*(\d+)/); return m ? +m[1] : 0; };
const ovPx = (rep) => { const m = rep.match(/dépasse de (\d+)px/); return m ? +m[1] : 0; };

async function runAxe() {
  if (!HAS_AXE) return [];
  try {
    return await page.evaluate(async () => {
      if (typeof window.axe === 'undefined') return [];
      const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'best-practice'] }, resultTypes: ['violations'] });
      return r.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, sample: (v.nodes[0] && v.nodes[0].target.join(' ').slice(0, 70)) || '' }));
    });
  } catch (e) { return []; }
}

const rows = [];
const axeAgg = {}; // id -> {impact, help, max, states:Set, sample}
let sumContrast = 0, sumTiny = 0, sumTap = 0, worstOv = 0;
for (const s of SUBJECTS) {
  await page.evaluate(k => window.setSubject(k), s);
  for (const sec of SECTIONS) {
    const before = jsErrors.length;
    await page.evaluate(id => { try { window.showSection(id); } catch (e) {} }, sec);
    await page.waitForTimeout(220);
    const rep = await page.evaluate(() => window.gr2BuildReport());
    const r = { s, sec, contrast: num(rep, 'Contraste trop faible'), tiny: num(rep, 'Textes < 12px'),
      inp: num(rep, 'Champs < 16px'), tap: num(rep, 'Boutons/liens petits'), ov: ovPx(rep), errs: jsErrors.length - before };
    sumContrast += r.contrast; sumTiny += r.tiny; sumTap = Math.max(sumTap, r.tap); worstOv = Math.max(worstOv, r.ov);
    rows.push(r);
    for (const v of await runAxe()) {
      const a = axeAgg[v.id] || (axeAgg[v.id] = { impact: v.impact, help: v.help, max: 0, states: new Set(), sample: v.sample });
      a.max = Math.max(a.max, v.nodes); a.states.add(s + '/' + sec);
    }
  }
}

const pad = (v, n) => String(v).padEnd(n);
console.log('\n  AUDIT GR2 — viewport ' + WIDTH + 'px   (contraste / <12px / <16px / tap<40 / déb. / err)');
console.log('  ' + '─'.repeat(72));
let curr = '';
for (const r of rows) {
  if (r.s !== curr) { curr = r.s; console.log('  ' + r.s.toUpperCase()); }
  const flags = [r.contrast && '⚠️contraste', r.ov > 2 && '⚠️débord', r.errs && '❌err'].filter(Boolean).join(' ');
  console.log('   ' + pad(r.sec, 11) + pad(r.contrast, 4) + pad(r.tiny, 5) + pad(r.inp, 5) + pad(r.tap, 6) + pad(r.ov, 5) + pad(r.errs, 4) + flags);
}
console.log('  ' + '─'.repeat(72));
console.log('  TOTAUX : contraste=' + sumContrast + ' · pire tap<40=' + sumTap + ' · pire débord=' + worstOv + 'px · erreurs JS=' + jsErrors.length);
if (jsErrors.length) jsErrors.slice(0, 12).forEach(e => console.log('    ' + e));

// ---- Résumé axe-core ----
const RANK = { critical: 0, serious: 1, moderate: 2, minor: 3 };
const axeIds = Object.keys(axeAgg).sort((a, b) => (RANK[axeAgg[a].impact] ?? 9) - (RANK[axeAgg[b].impact] ?? 9));
console.log('\n  AXE-CORE (accessibilité/WCAG) : ' + (HAS_AXE ? (axeIds.length + ' type(s) de violation') : 'non disponible (axe.min.js absent)'));
for (const id of axeIds) {
  const a = axeAgg[id];
  console.log('   [' + (a.impact || '?').toUpperCase() + '] ' + id + ' — ' + a.help + ' (≤' + a.max + ' él., ' + a.states.size + ' états) · ex: ' + a.sample);
}
const axeCritical = axeIds.filter(id => axeAgg[id].impact === 'critical');

console.log('\n  Note : ~5 textes <12px et ~30 cibles <40px sont une BASE connue (éléments compacts volontaires :');
console.log('         barre de nav, palette de dessin, cases natives). Ne corriger que ce qui DÉPASSE cette base.');

const fail = jsErrors.length > 0 || sumContrast > 0 || worstOv > 2 || axeCritical.length > 0;
console.log('\n  ' + (fail
  ? '❌ RÉGRESSION — à corriger (contraste / débordement / erreur JS / axe critique : ' + (axeCritical.join(', ') || 'aucune') + ')'
  : '✅ OK — 0 contraste faible, 0 débordement, 0 erreur JS, 0 violation axe critique') + '\n');
await browser.close();
process.exit(fail ? 1 : 0);
