/* GR2 Study — Brouillon intelligent (feuille + calculatrice fusionnées)
   Tu écris ton calcul ligne par ligne :
   • une ligne SANS « = » mais calculable affiche son résultat en direct ( = 5 ) ;
   • une ligne AVEC « = » est vérifiée : ✓ juste, ✗ faux (vraie valeur au survol) ;
   • un clavier de calcul insère √ π ^ ( ) ÷ × … dans la ligne active ;
   • la touche « = » calcule l'expression et l'écrit ( 2+3 → 2+3 = 5 ).
   Évaluateur sûr : nombres, fractions, + − × ÷ . ( ) √ ^ π. */
(function () {
  'use strict';

  function round(v) { return Math.round(v * 1e6) / 1e6; }

  function evalExpr(raw) {
    if (raw == null) return null;
    var e = String(raw).trim();
    if (!e) return null;
    e = e.replace(/√/g, 'Math.sqrt').replace(/π/g, 'Math.PI')
         .replace(/\^/g, '**').replace(/×/g, '*').replace(/÷/g, '/')
         .replace(/−/g, '-').replace(/,/g, '.');
    var cleaned = e.replace(/Math\.sqrt/g, '').replace(/Math\.PI/g, '');
    if (/[^0-9\s+\-*/.()]/.test(cleaned)) return null;
    try {
      var v = Function('"use strict"; return (' + e + ')')();
      if (typeof v === 'number' && isFinite(v)) return v;
    } catch (_) {}
    return null;
  }

  // tolérance ligne (0,1 %) : accepte les arrondis intermédiaires (ex. 1,79 pour 1,79007)
  function approxEq(a, b) { return Math.abs(a - b) <= 1e-3 * Math.max(1, Math.abs(a), Math.abs(b)); }
  // tolérance « réponse finale » plus souple (1 %) : arrondis de chimie (57,4 g, 1,85 g…)
  function approxEqLoose(a, b) { return Math.abs(a - b) <= 1e-2 * Math.max(1, Math.abs(a), Math.abs(b)); }

  function checkLine(line) {
    var t = (line || '').trim();
    if (!t || t.indexOf('=') < 0) return { status: 'neutral' };
    var segs = t.split('=').map(function (s) { return s.trim(); }).filter(function (s) { return s.length; });
    if (segs.length < 2) return { status: 'neutral' };
    var vals = segs.map(evalExpr);
    if (vals.some(function (v) { return v === null; })) return { status: 'neutral' };
    var first = vals[0];
    var ok = vals.every(function (v) { return approxEq(v, first); });
    return ok ? { status: 'ok', value: first } : { status: 'wrong', value: first };
  }

  function numbersOf(str) {
    if (str == null) return [];
    var s = String(str).replace(/\\[a-zA-Z]+/g, ' ').replace(/[{}\\]/g, ' ');
    var m = s.match(/-?\d+(?:[.,]\d+)?/g) || [];
    return m.map(function (x) { return parseFloat(x.replace(',', '.')); });
  }
  function finalMatches(student, expected) {
    var b = numbersOf(expected);
    if (!b.length) return null;
    var a = numbersOf(student);
    if (a.length < b.length) return false;
    var used = new Array(a.length).fill(false);
    return b.every(function (bn) {
      for (var i = 0; i < a.length; i++) { if (!used[i] && approxEqLoose(a[i], bn)) { used[i] = true; return true; } }
      return false;
    });
  }

  var KEYS = ['C', '←', '(', ')', '7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', '.', '√(', '^', 'π', '+', '='];

  function mount(container, opts) {
    opts = opts || {};
    var liveResult = opts.liveResult !== false;
    container.classList.add('ansheet');
    container.innerHTML = '';
    var rows = document.createElement('div'); rows.className = 'ansheet-rows';
    container.appendChild(rows);

    var activeInput = null, caret = 0;
    function clampCaret() { if (!activeInput) return; if (caret == null || caret < 0 || caret > activeInput.value.length) caret = activeInput.value.length; }
    function syncCaret() { try { if (activeInput && activeInput.selectionStart != null) caret = activeInput.selectionStart; } catch (_) {} }
    function setActive(inp) { activeInput = inp; syncCaret(); }

    function save() {
      if (!opts.storageKey) return;
      var vals = Array.prototype.map.call(rows.querySelectorAll('.ansheet-line'), function (i) { return i.value; });
      try { localStorage.setItem(opts.storageKey, JSON.stringify(vals)); } catch (_) {}
    }

    function update(inp) {
      var row = inp.closest('.ansheet-row'); if (!row) return;
      var st = row.querySelector('.ansheet-status');
      var t = inp.value.trim();
      if (t.indexOf('=') >= 0) {
        var r = checkLine(inp.value);
        row.dataset.st = r.status;
        st.textContent = r.status === 'ok' ? '✓' : (r.status === 'wrong' ? '✗' : '');
        st.title = (r.status === 'wrong' && r.value != null) ? ('≈ ' + round(r.value)) : '';
      } else if (liveResult && t) {
        var v = evalExpr(t);
        if (v !== null) { row.dataset.st = 'calc'; st.textContent = '= ' + round(v); st.title = ''; }
        else { row.dataset.st = 'neutral'; st.textContent = ''; st.title = ''; }
      } else { row.dataset.st = 'neutral'; st.textContent = ''; st.title = ''; }
      save();
    }

    function goNext(inp) {
      var row = inp.closest('.ansheet-row');
      if (row.nextElementSibling) { row.nextElementSibling.querySelector('.ansheet-line').focus(); }
      else { var nr = newRow(''); rows.appendChild(nr); nr.querySelector('.ansheet-line').focus(); }
    }

    function newRow(value) {
      var row = document.createElement('div'); row.className = 'ansheet-row';
      var inp = document.createElement('input');
      inp.type = 'text'; inp.className = 'ansheet-line'; inp.dir = 'ltr'; inp.spellcheck = false;
      inp.setAttribute('inputmode', 'text'); inp.placeholder = 'écris une ligne de calcul…';
      if (value) inp.value = value;
      var st = document.createElement('span'); st.className = 'ansheet-status';
      row.appendChild(inp); row.appendChild(st);
      inp.addEventListener('focus', function () { setActive(inp); });
      inp.addEventListener('input', function () { syncCaret(); update(inp); });
      inp.addEventListener('keyup', syncCaret);
      inp.addEventListener('mouseup', syncCaret);
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); update(inp); goNext(inp); }
        else if (e.key === 'Backspace' && inp.value === '' && rows.children.length > 1) {
          e.preventDefault();
          var prev = row.previousElementSibling; row.remove(); save();
          if (prev) { var p = prev.querySelector('.ansheet-line'); setActive(p); p.focus(); try { p.setSelectionRange(p.value.length, p.value.length); } catch (_) {} }
        }
      });
      return row;
    }

    // ---- clavier de calcul (optionnel) ----
    if (opts.keypad) {
      function insertActive(v) {
        if (!activeInput) { activeInput = rows.querySelector('.ansheet-line'); caret = activeInput ? activeInput.value.length : 0; }
        if (!activeInput) return;
        clampCaret();
        activeInput.value = activeInput.value.slice(0, caret) + v + activeInput.value.slice(caret);
        caret += v.length;
        activeInput.focus();
        try { activeInput.setSelectionRange(caret, caret); } catch (_) {}
        update(activeInput);
      }
      function backspaceActive() {
        if (!activeInput) return; clampCaret();
        if (caret > 0) { activeInput.value = activeInput.value.slice(0, caret - 1) + activeInput.value.slice(caret); caret -= 1; activeInput.focus(); try { activeInput.setSelectionRange(caret, caret); } catch (_) {} }
        update(activeInput);
      }
      function pressEquals() {
        if (!activeInput) return;
        var t = activeInput.value;
        if (t.indexOf('=') < 0) {
          var v = evalExpr(t.trim());
          if (v !== null) { activeInput.value = t.replace(/\s+$/, '') + ' = ' + round(v); caret = activeInput.value.length; update(activeInput); goNext(activeInput); return; }
        }
        insertActive('=');
      }
      var keys = document.createElement('div'); keys.className = 'ansheet-keys';
      KEYS.forEach(function (k) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'ansheet-key'; b.textContent = k;
        if (k === 'C' || k === '←') b.classList.add('k-del');
        if (k === '=') b.classList.add('k-eq');
        b.addEventListener('mousedown', function (e) { e.preventDefault(); }); // garder le focus dans la ligne
        b.addEventListener('click', function () {
          if (k === 'C') { if (activeInput) { activeInput.value = ''; caret = 0; activeInput.focus(); update(activeInput); } return; }
          if (k === '←') { backspaceActive(); return; }
          if (k === '=') { pressEquals(); return; }
          insertActive(k);
        });
        keys.appendChild(b);
      });
      container.appendChild(keys);
    }

    // ---- restauration ----
    var initial = [];
    if (opts.storageKey) { try { initial = JSON.parse(localStorage.getItem(opts.storageKey) || '[]'); } catch (_) {} }
    if (!initial.length) initial = [''];
    initial.forEach(function (v) { var row = newRow(v); rows.appendChild(row); update(row.querySelector('.ansheet-line')); });

    container._clear = function () {
      rows.innerHTML = ''; var row = newRow(''); rows.appendChild(row); save();
      var l = row.querySelector('.ansheet-line'); setActive(l); l.focus();
    };

    // ---- réponse finale (exercices) ----
    if (opts.answer) {
      var fin = document.createElement('div'); fin.className = 'ansheet-final';
      var lab = document.createElement('label'); lab.textContent = 'Réponse finale :';
      var finp = document.createElement('input'); finp.type = 'text'; finp.className = 'ansheet-final-input'; finp.placeholder = 'ta réponse…'; finp.dir = 'ltr';
      var fst = document.createElement('span'); fst.className = 'ansheet-final-status';
      fin.appendChild(lab); fin.appendChild(finp); fin.appendChild(fst);
      finp.addEventListener('input', function () {
        if (finp.value.trim() === '') { fst.textContent = ''; fin.dataset.st = ''; return; }
        var m = finalMatches(finp.value, opts.answer);
        if (m === true) { fst.textContent = '✓ Correct !'; fin.dataset.st = 'ok'; }
        else { fst.textContent = '✗ pas encore'; fin.dataset.st = 'wrong'; }
      });
      container.appendChild(fin);
    }
  }

  // ---- Outil flottant : Brouillon intelligent ----
  function buildTool() {
    if (document.getElementById('feuille-btn')) return;

    // migration : ancien brouillon (texte simple) → feuille multi-lignes
    try {
      if (!localStorage.getItem('gr2_feuille')) {
        var old = localStorage.getItem('mathsgr2_scratch');
        if (old && old.trim()) localStorage.setItem('gr2_feuille', JSON.stringify(old.split(/\r?\n/)));
      }
    } catch (_) {}

    var btn = document.createElement('button');
    btn.id = 'feuille-btn'; btn.type = 'button'; btn.textContent = '🧮 Brouillon';
    btn.setAttribute('aria-label', 'Ouvrir le brouillon intelligent');

    var panel = document.createElement('div');
    panel.id = 'feuille-panel';
    panel.innerHTML =
      '<div class="feuille-head"><strong>🧮 Brouillon intelligent</strong>' +
        '<button type="button" id="feuille-close" aria-label="Fermer">✕</button></div>' +
      '<p class="feuille-hint">Calcule ligne par ligne. Une ligne calculable affiche son résultat ; avec « = » elle est vérifiée (✓/✗). La touche « = » calcule pour toi.</p>' +
      '<div id="feuille-sheet"></div>' +
      '<button type="button" id="feuille-clear" class="feuille-clear">🗑️ Effacer le brouillon</button>';

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    var sheet = panel.querySelector('#feuille-sheet');
    mount(sheet, { storageKey: 'gr2_feuille', keypad: true, liveResult: true });

    btn.addEventListener('click', function () {
      panel.classList.toggle('show');
      if (panel.classList.contains('show')) { var l = sheet.querySelector('.ansheet-line'); if (l) l.focus(); }
    });
    panel.querySelector('#feuille-close').addEventListener('click', function () { panel.classList.remove('show'); });
    panel.querySelector('#feuille-clear').addEventListener('click', function () { if (sheet._clear) sheet._clear(); });
  }

  // Monte une feuille de réponse sur chaque élément [data-answer] non encore monté.
  // Utilisé par les exercices interactifs de Chimie/Bio (appelé après injection des sections).
  function mountAll(root) {
    var scope = root || document;
    var els = scope.querySelectorAll('[data-answer]:not([data-mounted])');
    Array.prototype.forEach.call(els, function (el) {
      el.setAttribute('data-mounted', '1');
      mount(el, { answer: el.getAttribute('data-answer'), keypad: el.hasAttribute('data-keypad'), liveResult: true });
    });
  }
  window.mountAnswerSheets = mountAll;

  window.AnswerSheet = { mount: mount, checkLine: checkLine, evalExpr: evalExpr, finalMatches: finalMatches, mountAll: mountAll };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildTool);
  else buildTool();
})();
