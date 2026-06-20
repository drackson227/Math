/* Audit qualité GR2 Study — analyse mesurée et large du site rendu.
   • 9 matières × 5 sections de cours  +  écrans interactifs (quiz, flashcards, profil…)
   • 2 tailles d'écran par défaut : MOBILE (390) et BUREAU (1100)
   • Diagnostic intégré (window.gr2BuildReport) : contraste / <12px / <16px / tap<40 / débordement
   • axe-core (WCAG : ARIA, landmarks, contraste, noms accessibles…) — vendorisé (axe.min.js)
   • Heuristiques bonus : identifiants en double, images sans alt
   • Erreurs JS réelles (bruit CDN hors-ligne ignoré)

   Lancer depuis la racine du projet :  node .claude/skills/gr2-quality/audit.mjs
   Variables d'env (optionnelles) :
     PW_INDEX   URL/chemin index.html      (def: ./index.html en file://)
     PW_CHROME  executablePath Chromium    (def: Chromium de Playwright)
     PW_MODULE  module playwright           (def: 'playwright')
     PW_WIDTH   force UNE largeur            (def: les deux, 390 et 1100)
   Sortie : tableaux + résumé axe + verdict. Code ≠ 0 si régression (erreur JS, contraste faible,
   débordement, id en double, ou violation axe critique). */
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
const opts = { headless: true };
if (process.env.PW_CHROME) opts.executablePath = process.env.PW_CHROME;
const VIEWPORTS = process.env.PW_WIDTH ? [parseInt(process.env.PW_WIDTH, 10)] : [390, 1100];

const SUBJECTS = ['maths', 'francais', 'anglais', 'histoire', 'geo', 'chimie', 'bio', 'eco', 'neerlandais'];
const SECTIONS = ['synthese', 'formules', 'methodes', 'exercices', 'erreurs'];
const APP_SECTIONS = ['quiz', 'flashcards', 'profil', 'progression', 'glossaire', 'mesexos', 'memoformules', 'journal', 'notes', 'graphiques'];

const CDN_NOISE = /Failed to load resource|net::|ERR_CERT|ERR_NAME|ERR_BLOCKED|jsdelivr|cloudflare|supabase|gstatic|googleapis|Script error/i;

// Heuristiques exécutées dans la page (en plus du Diagnostic intégré).
function pageChecks() {
  const ids = {};
  document.querySelectorAll('[id]').forEach(e => { ids[e.id] = (ids[e.id] || 0) + 1; });
  const dup = Object.keys(ids).filter(k => ids[k] > 1);
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const imgs = [...document.querySelectorAll('img')].filter(vis);
  const imgNoAlt = imgs.filter(i => !i.hasAttribute('alt') || i.getAttribute('alt').trim() === '').length;
  return { dup, imgNoAlt };
}

const browser = await chromium.launch(opts);
const axeAgg = {};               // id -> {impact, help, max, states:Set, sample}
const jsErrors = [];
const dupIds = new Set();
let imgNoAlt = 0;
let sumContrast = 0, sumTap = 0, worstOv = 0;
const rows = [];

async function runAxe(page) {
  if (!HAS_AXE) return [];
  try {
    return await page.evaluate(async () => {
      if (typeof window.axe === 'undefined') return [];
      const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'best-practice'] }, resultTypes: ['violations'] });
      return r.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, sample: (v.nodes[0] && v.nodes[0].target.join(' ').slice(0, 60)) || '' }));
    });
  } catch (e) { return []; }
}
const num = (rep, label) => { const l = rep.split('\n').find(x => x.includes(label)); const m = l && l.match(/:\s*(\d+)/); return m ? +m[1] : 0; };
const ovPx = (rep) => { const m = rep.match(/dépasse de (\d+)px/); return m ? +m[1] : 0; };

async function audit(page, vp, label) {
  // Laisser les animations CSS (ex. .method-content slideUp 0.4s) se terminer AVANT de
  // mesurer : sinon on lit des opacités intermédiaires → faux « contraste faible ».
  // (On NE attend PAS document.getAnimations : certaines sont infinies et ne finissent jamais.)
  await page.waitForTimeout(500);
  const rep = await page.evaluate(() => window.gr2BuildReport());
  const r = { vp, label, contrast: num(rep, 'Contraste trop faible'), tiny: num(rep, 'Textes < 12px'),
    inp: num(rep, 'Champs < 16px'), tap: num(rep, 'Boutons/liens petits'), ov: ovPx(rep) };
  sumContrast += r.contrast; sumTap = Math.max(sumTap, r.tap); worstOv = Math.max(worstOv, r.ov);
  rows.push(r);
  for (const v of await runAxe(page)) {
    const a = axeAgg[v.id] || (axeAgg[v.id] = { impact: v.impact, help: v.help, max: 0, states: new Set(), sample: v.sample });
    a.max = Math.max(a.max, v.nodes); a.states.add(vp + ':' + label);
  }
  const c = await page.evaluate(pageChecks);
  c.dup.forEach(d => dupIds.add(d)); imgNoAlt = Math.max(imgNoAlt, c.imgNoAlt);
}

for (const W of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: W, height: 900 }, isMobile: W < 768, hasTouch: W < 768, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => { try { localStorage.setItem('mathsgr2_welcome_seen', '1'); } catch (e) {} });
  const page = await ctx.newPage();
  page.on('pageerror', e => { if (!CDN_NOISE.test(e.message)) jsErrors.push(W + 'px ' + e.message); });
  page.on('console', m => { if (m.type() === 'error' && !CDN_NOISE.test(m.text())) jsErrors.push(W + 'px ' + m.text()); });
  await page.goto(INDEX, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.setSubject === 'function' && typeof window.gr2BuildReport === 'function', null, { timeout: 20000 });
  if (HAS_AXE) { try { await page.addScriptTag({ path: AXE_PATH }); } catch (e) { console.error('⚠️ axe non injecté:', e.message); } }

  for (const s of SUBJECTS) {
    await page.evaluate(k => window.setSubject(k), s);
    for (const sec of SECTIONS) {
      await page.evaluate(id => { try { window.showSection(id); } catch (e) {} }, sec);
      await audit(page, W, s + '/' + sec);
    }
  }
  // écrans interactifs (sur maths)
  await page.evaluate(() => window.setSubject('maths'));
  for (const sec of APP_SECTIONS) {
    await page.evaluate(id => { try { window.showSection(id); } catch (e) {} }, sec);
    await audit(page, W, 'app/' + sec);
  }
  await page.close();
}

// ---------- Extras : thèmes (contraste par palette) + parcours interactifs ----------
const THEMES = ['default', 'forest', 'ocean', 'sunset', 'midnight', 'minimal'];
const flows = [];
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 900 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => { try { localStorage.setItem('mathsgr2_welcome_seen', '1'); } catch (e) {} });
  const page = await ctx.newPage();
  page.on('pageerror', e => { if (!CDN_NOISE.test(e.message)) jsErrors.push('flow ' + e.message); });
  page.on('console', m => { if (m.type() === 'error' && !CDN_NOISE.test(m.text())) jsErrors.push('flow ' + m.text()); });
  await page.goto(INDEX, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.setSubject === 'function' && typeof window.gr2BuildReport === 'function', null, { timeout: 20000 });
  if (HAS_AXE) { try { await page.addScriptTag({ path: AXE_PATH }); } catch (e) {} }
  await page.evaluate(() => window.setSubject('maths'));

  // 1) Chaque thème a sa palette → on vérifie le contraste (synthèse + exercices).
  for (const th of THEMES) {
    await page.evaluate(t => { try { window.setTheme(t); } catch (e) {} }, th);
    for (const sec of ['synthese', 'exercices']) {
      await page.evaluate(id => { try { window.showSection(id); } catch (e) {} }, sec);
      await audit(page, 390, 'theme:' + th + '/' + sec);
    }
  }
  await page.evaluate(() => { try { window.setTheme('default'); } catch (e) {} });

  // 2) Parcours interactifs : on clique pour de vrai (capte les erreurs JS au clic).
  async function flow(name, fn) {
    const before = jsErrors.length;
    try { await fn(); } catch (e) { jsErrors.push('flow ' + name + ': ' + e.message); }
    await page.waitForTimeout(250);
    flows.push({ name, errs: jsErrors.length - before });
  }
  await flow('quiz : démarrer + répondre', async () => {
    await page.evaluate(() => window.showSection('quiz')); await page.waitForTimeout(300);
    await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /Commencer le quiz/.test(x.textContent)); if (b) b.click(); });
    await page.waitForTimeout(400);
    await page.evaluate(() => { const o = document.querySelector('.opt'); if (o) o.click(); });
  });
  await flow('flashcards : retourner + noter', async () => {
    await page.evaluate(() => window.showSection('flashcards')); await page.waitForTimeout(300);
    await page.evaluate(() => { try { if (window.flipCard) window.flipCard(); } catch (e) {} });
    await page.waitForTimeout(200);
    await page.evaluate(() => { try { if (window.rateCard) window.rateCard('easy'); } catch (e) {} });
  });
  await flow('mode cours : ouvrir + avancer + fermer', async () => {
    await page.evaluate(() => window.showSection('synthese')); await page.waitForTimeout(300);
    await page.evaluate(() => { try { window.GR2Course && window.GR2Course.open(); } catch (e) {} });
    await page.waitForTimeout(500);
    await page.evaluate(() => { for (let i = 0; i < 3; i++) { const n = document.getElementById('gr2c-next'); if (n) n.click(); } });
    await page.waitForTimeout(300);
    await page.evaluate(() => { try { window.GR2Course && window.GR2Course.close(); } catch (e) {} });
  });
  await page.close();
}

// ---------- Rapport ----------
const pad = (v, n) => String(v).padEnd(n);
for (const W of VIEWPORTS) {
  console.log('\n  AUDIT GR2 — ' + W + 'px   (contraste / <12px / <16px / tap<40 / déb.)');
  console.log('  ' + '─'.repeat(72));
  for (const r of rows.filter(x => x.vp === W)) {
    const flags = [r.contrast && '⚠️contraste', r.ov > 2 && '⚠️débord'].filter(Boolean).join(' ');
    console.log('   ' + pad(r.label, 22) + pad(r.contrast, 4) + pad(r.tiny, 5) + pad(r.inp, 5) + pad(r.tap, 6) + pad(r.ov, 5) + flags);
  }
}
console.log('\n  ' + '═'.repeat(72));
console.log('  TOTAUX : contraste(Diagnostic)=' + sumContrast + ' · pire tap<40=' + sumTap + ' · pire débord=' + worstOv + 'px');
console.log('  Erreurs JS réelles=' + jsErrors.length + ' · ids en double=' + dupIds.size + ' · images sans alt=' + imgNoAlt);
if (jsErrors.length) jsErrors.slice(0, 10).forEach(e => console.log('    ❌ ' + e));
if (dupIds.size) console.log('    ⚠️ ids dupliqués : ' + [...dupIds].slice(0, 15).join(', '));

console.log('\n  PARCOURS INTERACTIFS :');
for (const f of flows) console.log('   ' + (f.errs ? '❌' : '✅') + ' ' + f.name + (f.errs ? ' (' + f.errs + ' err)' : ''));

const RANK = { critical: 0, serious: 1, moderate: 2, minor: 3 };
const axeIds = Object.keys(axeAgg).sort((a, b) => (RANK[axeAgg[a].impact] ?? 9) - (RANK[axeAgg[b].impact] ?? 9));
console.log('\n  AXE-CORE (accessibilité/WCAG) : ' + (HAS_AXE ? (axeIds.length + ' type(s)') : 'non disponible'));
for (const id of axeIds) {
  const a = axeAgg[id];
  console.log('   [' + (a.impact || '?').toUpperCase() + '] ' + id + ' — ' + a.help + ' (≤' + a.max + ' él., ' + a.states.size + ' états) · ex: ' + a.sample);
}
const axeCritical = axeIds.filter(id => axeAgg[id].impact === 'critical');

console.log('\n  Note : ~5 textes <12px et ~30 cibles <40px = BASE connue (éléments compacts volontaires).');
const fail = jsErrors.length > 0 || sumContrast > 0 || worstOv > 2 || dupIds.size > 0 || axeCritical.length > 0;
console.log('\n  ' + (fail
  ? '❌ RÉGRESSION — à corriger (JS / contraste / débordement / id double / axe critique : ' + (axeCritical.join(', ') || 'aucune') + ')'
  : '✅ OK — 0 erreur JS, 0 contraste faible, 0 débordement, 0 id double, 0 axe critique') + '\n');
await browser.close();
process.exit(fail ? 1 : 0);
