const { chromium } = require('C:/Users/ryant/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const path = require('path'); const { pathToFileURL } = require('url');
const url = pathToFileURL(path.resolve('C:/Users/ryant/OneDrive/Desktop/math/index.html')).href;
const DIR = 'C:/Users/ryant/OneDrive/Desktop/math/';
const SUBJECTS = ['maths', 'francais', 'anglais', 'histoire', 'geo', 'chimie', 'bio', 'eco'];

(async () => {
  const errors = [], anomalies = [], rows = [];
  let step = 'load';
  const A = (sev, m) => anomalies.push(sev + ' ' + m);
  const b = await chromium.launch();
  const page = await b.newContext({ viewport: { width: 1280, height: 900 } }).then(c => c.newPage());
  page.on('console', m => { if (m.type() === 'error') errors.push('[' + step + '] ' + m.text().slice(0, 130)); });
  page.on('pageerror', e => errors.push('[' + step + '] ' + e.message.slice(0, 130)));
  await page.goto(url, { waitUntil: 'networkidle' }); await page.waitForTimeout(1200);
  await page.evaluate(() => { const w = document.getElementById('welcome-overlay'); if (w) w.remove(); });

  // ---------- PER-SUBJECT CONTENT INTEGRITY ----------
  for (const subj of SUBJECTS) {
    step = 'subj:' + subj;
    await page.click('.subj-btn[data-subj="' + subj + '"]').catch(e => errors.push('[switch ' + subj + '] ' + e.message));
    await page.waitForTimeout(550);
    const data = await page.evaluate(() => {
      const out = { qCount: 0, qBad: 0, fcCount: 0, fcSvg: 0, secIssues: [], mathLeak: 0, htmlLeak: 0 };
      try {
        const qs = (typeof allQuestions !== 'undefined' && allQuestions) ? allQuestions : [];
        out.qCount = qs.length;
        qs.forEach(q => { if (!q.q || !Array.isArray(q.opts) || q.opts.length < 2 || typeof q.ans !== 'number' || q.ans < 0 || q.ans >= q.opts.length || !q.exp) out.qBad++; });
        const fc = (typeof flashcards !== 'undefined' && flashcards) ? flashcards : [];
        out.fcCount = fc.length;
        fc.forEach(c => { if (/<svg/i.test(c.back)) out.fcSvg++; });
      } catch (e) { out.err = e.message; }
      // scan visible sections content
      ['synthese', 'formules', 'methodes', 'exercices', 'erreurs'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const prevActive = document.querySelector('.section.active');
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        el.classList.add('active');
        const t = el.innerText || '';
        if (/\\\(|\\\)|\$\$/.test(t)) { out.mathLeak++; out.secIssues.push(id + ':math'); }
        if (/<(strong|em|br|svg|div|span)\b/i.test(t)) { out.htmlLeak++; out.secIssues.push(id + ':html'); }
        if (/\bundefined\b|\bNaN\b|\[object Object\]/.test(t)) out.secIssues.push(id + ':undef');
        if (prevActive) { document.querySelectorAll('.section').forEach(s => s.classList.remove('active')); prevActive.classList.add('active'); }
      });
      return out;
    });
    // trigger MathJax on synthese to be sure, then re-check leak live
    await page.evaluate(() => showSection('synthese')); await page.waitForTimeout(300);
    const liveMath = await page.evaluate(() => { const t = document.querySelector('#synthese')?.innerText || ''; return (t.match(/\\\(|\\\)|\$\$/g) || []).length; });
    rows.push({ subj, q: data.qCount, qBad: data.qBad, fc: data.fcCount, svg: data.fcSvg, issues: data.secIssues.join(',') || '-', liveMath });
    if (data.qBad > 0) A('⚠️', subj + ': ' + data.qBad + ' question(s) mal formée(s)');
    if (liveMath > 0) A('⚠️', subj + ': MathJax non rendu dans synthèse (' + liveMath + ')');
    if (data.secIssues.some(s => s.includes('undef'))) A('⚠️', subj + ': "undefined/NaN" visible (' + data.secIssues + ')');
  }

  // ---------- FLASHCARD SVG RENDER (per subject that has svg cards) ----------
  step = 'fc-svg';
  for (const subj of SUBJECTS) {
    await page.click('.subj-btn[data-subj="' + subj + '"]').catch(() => {});
    await page.waitForTimeout(450);
    await page.evaluate(() => showSection('flashcards')); await page.waitForTimeout(300);
    const r = await page.evaluate(async () => {
      const fc = (typeof flashcards !== 'undefined' ? flashcards : []);
      const idx = fc.findIndex(c => /<svg/i.test(c.back));
      if (idx < 0) return { hasSvg: false };
      currentFlashcardIndex = idx; loadFlashcard();
      await new Promise(r => setTimeout(r, 150));
      if (!isFlipped) flipCard();
      await new Promise(r => setTimeout(r, 250));
      const svg = document.querySelector('.flashcard-back svg');
      const rect = svg ? svg.getBoundingClientRect() : null;
      return { hasSvg: true, svgRendered: !!svg, w: rect ? Math.round(rect.width) : 0, h: rect ? Math.round(rect.height) : 0, front: fc[idx].front.slice(0, 40) };
    });
    if (r.hasSvg) {
      if (!r.svgRendered || r.w < 5 || r.h < 5) A('❌', subj + ': schéma SVG non rendu ("' + r.front + '")');
    }
  }

  // ---------- INTERACTIVE FEATURES (maths) ----------
  step = 'interactive';
  await page.click('.subj-btn[data-subj="maths"]').catch(() => {}); await page.waitForTimeout(450);
  await page.evaluate(() => showSection('flashcards')); await page.waitForTimeout(300);

  // details example (fc-ex) opens without flipping back
  const exTest = await page.evaluate(async () => {
    const fc = flashcards; const i = fc.findIndex(c => /fc-ex/.test(c.back));
    if (i < 0) return 'no-ex-card';
    currentFlashcardIndex = i; loadFlashcard(); await new Promise(r => setTimeout(r, 120));
    if (!isFlipped) flipCard(); await new Promise(r => setTimeout(r, 200));
    const det = document.querySelector('.flashcard-back details.fc-ex');
    if (!det) return 'no-details-in-dom';
    det.querySelector('summary').click(); await new Promise(r => setTimeout(r, 150));
    return 'open=' + det.open + ',stillFlipped=' + isFlipped;
  });
  if (!/open=true,stillFlipped=true/.test(exTest)) A('⚠️', 'Exemple dépliable flashcard: ' + exTest);

  // write mode
  const writeTest = await page.evaluate(async () => {
    if (typeof toggleWriteMode !== 'function') return 'no-fn';
    showSection('flashcards'); await new Promise(r => setTimeout(r, 150));
    toggleWriteMode(); await new Promise(r => setTimeout(r, 150));
    const w = document.getElementById('fc-write');
    return w ? ('display=' + getComputedStyle(w).display) : 'no-el';
  });
  // shuffle
  const shuf = await page.evaluate(async () => { try { const before = currentFlashcardIndex; shuffleFlashcards(); return 'ok'; } catch (e) { return 'err:' + e.message; } });
  // fiche de révision
  step = 'revision';
  const rev = await page.evaluate(async () => {
    try { if (typeof printRevisionSheet !== 'function') return 'no-fn'; printRevisionSheet(); await new Promise(r => setTimeout(r, 300)); const el = document.getElementById('revision-sheet'); return el ? ('exists, html>' + (el.innerHTML.length > 50)) : 'no-el'; } catch (e) { return 'err:' + e.message; }
  });
  if (/err:/.test(rev)) A('⚠️', 'Fiche de révision: ' + rev);

  // generator (Mes exercices)
  step = 'generator';
  const gen = await page.evaluate(async () => {
    try { const h = [...document.querySelectorAll('.nav-btn')].find(b => /Mes exercices/.test(b.textContent)); if (h) h.click(); await new Promise(r => setTimeout(r, 300));
      // try to generate
      const gb = [...document.querySelectorAll('button')].find(b => /générer|nouvel|générateur|nouveau/i.test(b.textContent));
      if (gb) { gb.click(); await new Promise(r => setTimeout(r, 400)); }
      const sec = document.getElementById('mesexos'); return sec ? ('len=' + (sec.innerText || '').length) : 'no-sec';
    } catch (e) { return 'err:' + e.message; }
  });
  if (/err:/.test(gen)) A('⚠️', 'Générateur: ' + gen);

  // graphiques
  step = 'graphiques';
  const graph = await page.evaluate(async () => {
    try { const h = [...document.querySelectorAll('.nav-btn')].find(b => /Graphiques/.test(b.textContent)); if (!h) return 'no-tab'; h.click(); await new Promise(r => setTimeout(r, 500)); const c = document.querySelector('#graphiques canvas, #graphiques svg'); return c ? 'rendered' : 'no-canvas'; } catch (e) { return 'err:' + e.message; }
  });
  if (graph === 'no-canvas') A('ℹ️', 'Graphiques: pas de canvas détecté');
  if (/err:/.test(graph)) A('⚠️', 'Graphiques: ' + graph);

  // journal persist
  step = 'journal';
  const jour = await page.evaluate(async () => {
    try { const h = [...document.querySelectorAll('.nav-btn')].find(b => /Journal/.test(b.textContent)); if (h) h.click(); await new Promise(r => setTimeout(r, 250));
      const ta = document.getElementById('journal-entry') || document.querySelector('.journal-textarea'); if (!ta) return 'no-textarea';
      return 'textarea-present';
    } catch (e) { return 'err:' + e.message; }
  });

  // settings: toggle themes & animation
  step = 'settings';
  await page.click('.settings-toggle').catch(() => {}); await page.waitForTimeout(300);
  const themeRes = await page.evaluate(async () => {
    const out = [];
    const btns = [...document.querySelectorAll('.theme-btn, [onclick*="setTheme"], [onclick*="Theme"], [onclick*="anim"]')].slice(0, 12);
    for (const btn of btns) { try { btn.click(); await new Promise(r => setTimeout(r, 80)); out.push((btn.textContent || '').trim().slice(0, 12) + '=' + document.body.className.replace(/\s+/g, '.').slice(0, 30)); } catch (e) { } }
    return out.slice(0, 12);
  });
  await page.keyboard.press('Escape').catch(() => {});

  // search click-through
  step = 'search';
  const searchRes = await page.evaluate(async () => {
    try { if (typeof openSearch === 'function') openSearch(); await new Promise(r => setTimeout(r, 250));
      const inp = document.getElementById('search-input') || document.querySelector('.search-input'); if (!inp) return 'no-input';
      inp.value = 'pente'; inp.dispatchEvent(new Event('input', { bubbles: true })); await new Promise(r => setTimeout(r, 400));
      const res = document.querySelectorAll('.search-overlay [onclick]'); const n = res.length;
      if (n) { res[Math.min(2, n - 1)].click(); await new Promise(r => setTimeout(r, 400)); }
      const overlayOpen = document.querySelector('.search-overlay') && getComputedStyle(document.querySelector('.search-overlay')).display !== 'none';
      const active = document.querySelector('.section.active')?.id;
      const fiche = document.getElementById('imgModal')?.classList.contains('open');
      return 'results=' + n + ', aprèsClic: section=' + active + ', ficheOuverte=' + fiche + ', overlayEncoreOuvert=' + overlayOpen;
    } catch (e) { return 'err:' + e.message; }
  });
  if (/err:/.test(searchRes)) A('⚠️', 'Recherche: ' + searchRes);
  if (/overlayEncoreOuvert=true/.test(searchRes)) A('⚠️', 'Recherche: l\'overlay ne se ferme pas après clic sur un résultat');
  // force-close search overlay so it stops intercepting clicks
  await page.evaluate(() => { try { if (typeof closeSearch === 'function') closeSearch(); } catch (_) {} const o = document.querySelector('.search-overlay'); if (o) { o.classList.remove('show'); o.style.display = 'none'; } });
  await page.keyboard.press('Escape').catch(() => {});
  await page.waitForTimeout(250);

  // ---------- VISUAL SCREENSHOTS ----------
  step = 'shots';
  await page.evaluate(() => { try { closeImgModal(); } catch (_) {} });
  const shots = [
    ['eco', 'synthese', 'eco_synthese'],
    ['chimie', null, 'chimie_atom_fc'],
    ['maths', null, 'maths_vec_fc']
  ];
  // eco synthese
  await page.click('.subj-btn[data-subj="eco"]'); await page.waitForTimeout(400);
  await page.evaluate(() => showSection('synthese')); await page.waitForTimeout(400);
  await page.screenshot({ path: DIR + '_deep_eco.png' });
  // chimie atom flashcard
  await page.click('.subj-btn[data-subj="chimie"]'); await page.waitForTimeout(400);
  await page.evaluate(async () => { showSection('flashcards'); await new Promise(r => setTimeout(r, 150)); const i = flashcards.findIndex(c => /atome/i.test(c.front)); if (i >= 0) { currentFlashcardIndex = i; loadFlashcard(); await new Promise(r => setTimeout(r, 120)); if (!isFlipped) flipCard(); } });
  await page.waitForTimeout(500); await page.screenshot({ path: DIR + '_deep_chimie.png' });
  // light theme check
  await page.evaluate(() => { try { document.body.classList.add('theme-light'); } catch (_) {} }); await page.waitForTimeout(300);
  await page.evaluate(() => showSection('synthese'));
  await page.click('.subj-btn[data-subj="maths"]'); await page.waitForTimeout(400);
  await page.screenshot({ path: DIR + '_deep_light.png' });

  // ---------- OUTPUT ----------
  console.log('===== ANALYSE APPROFONDIE =====\n');
  console.log('MATIÈRE   | quiz | qBad | flash | svg | mathRendu? | problèmes sections');
  rows.forEach(r => console.log(
    r.subj.padEnd(9) + ' | ' + String(r.q).padStart(4) + ' | ' + String(r.qBad).padStart(4) + ' | ' + String(r.fc).padStart(5) + ' | ' + String(r.svg).padStart(3) + ' | ' + (r.liveMath === 0 ? 'OK       ' : 'LEAK(' + r.liveMath + ')') + ' | ' + r.issues));
  console.log('\nFONCTIONS INTERACTIVES :');
  console.log('  Exemple dépliable flashcard :', exTest);
  console.log('  Mode écrire                 :', writeTest);
  console.log('  Mélanger                    :', shuf);
  console.log('  Fiche de révision           :', rev);
  console.log('  Générateur (Mes exercices)  :', gen);
  console.log('  Graphiques                  :', graph);
  console.log('  Journal                     :', jour);
  console.log('  Recherche cliquable         :', searchRes);
  console.log('  Thèmes/animations testés    :', themeRes.join(' | '));
  console.log('\nANOMALIES (' + anomalies.length + ') :');
  if (!anomalies.length) console.log('  ✅ aucune'); else [...new Set(anomalies)].forEach(a => console.log('  ' + a));
  console.log('\nERREURS CONSOLE/PAGE (' + errors.length + ') :');
  if (!errors.length) console.log('  ✅ aucune'); else [...new Set(errors)].slice(0, 30).forEach(e => console.log('  ✗ ' + e));
  await b.close();
})();
