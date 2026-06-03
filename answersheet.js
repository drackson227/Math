/* GR2 Study — Feuille de réponses intelligente
   Tu écris ton calcul ligne par ligne ; chaque ligne contenant un « = » est vérifiée
   en direct (✓/✗ + vraie valeur) si les deux côtés sont calculables (nombres, fractions,
   √, ^, π). Un champ « réponse finale » se compare à la réponse attendue (comparaison
   des nombres). Utilisable sous chaque exercice du générateur + en feuille libre. */
(function () {
  'use strict';

  // ---- Évaluateur sûr : renvoie un nombre ou null ----
  function evalExpr(raw) {
    if (raw == null) return null;
    var e = String(raw).trim();
    if (!e) return null;
    e = e.replace(/√/g, 'Math.sqrt').replace(/π/g, 'Math.PI')
         .replace(/\^/g, '**').replace(/×/g, '*').replace(/÷/g, '/')
         .replace(/−/g, '-').replace(/,/g, '.');
    var cleaned = e.replace(/Math\.sqrt/g, '').replace(/Math\.PI/g, '');
    if (/[^0-9\s+\-*/.()]/.test(cleaned)) return null; // contient autre chose qu'un calcul
    try {
      var v = Function('"use strict"; return (' + e + ')')();
      if (typeof v === 'number' && isFinite(v)) return v;
    } catch (_) {}
    return null;
  }

  function approxEq(a, b) {
    return Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(b));
  }

  // ---- Vérifier une ligne : {status:'ok'|'wrong'|'neutral', value} ----
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

  // ---- Extraire les nombres (pour comparer la réponse finale) ----
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
      for (var i = 0; i < a.length; i++) {
        if (!used[i] && approxEq(a[i], bn)) { used[i] = true; return true; }
      }
      return false;
    });
  }

  // ---- Monter une feuille dans un conteneur ----
  function mount(container, opts) {
    opts = opts || {};
    container.classList.add('ansheet');
    container.innerHTML = '';
    var rows = document.createElement('div');
    rows.className = 'ansheet-rows';
    container.appendChild(rows);

    function save() {
      if (!opts.storageKey) return;
      var vals = Array.prototype.map.call(rows.querySelectorAll('.ansheet-line'), function (i) { return i.value; });
      try { localStorage.setItem(opts.storageKey, JSON.stringify(vals)); } catch (_) {}
    }

    function update(row, inp, st) {
      var r = checkLine(inp.value);
      row.dataset.st = r.status;
      st.textContent = r.status === 'ok' ? '✓' : (r.status === 'wrong' ? '✗' : '');
      st.title = (r.status === 'wrong' && r.value != null) ? ('≈ ' + (Math.round(r.value * 1e6) / 1e6)) : '';
      save();
    }

    function newRow(value) {
      var row = document.createElement('div'); row.className = 'ansheet-row';
      var inp = document.createElement('input');
      inp.type = 'text'; inp.className = 'ansheet-line'; inp.dir = 'ltr'; inp.spellcheck = false;
      inp.setAttribute('inputmode', 'text'); inp.placeholder = 'écris une ligne de calcul…';
      if (value) inp.value = value;
      var st = document.createElement('span'); st.className = 'ansheet-status';
      row.appendChild(inp); row.appendChild(st);
      inp.addEventListener('input', function () { update(row, inp, st); });
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault(); update(row, inp, st);
          if (row.nextElementSibling) { row.nextElementSibling.querySelector('.ansheet-line').focus(); }
          else { var nr = newRow(''); rows.appendChild(nr); nr.querySelector('.ansheet-line').focus(); }
        } else if (e.key === 'Backspace' && inp.value === '' && rows.children.length > 1) {
          e.preventDefault();
          var prev = row.previousElementSibling; row.remove(); save();
          if (prev) { var p = prev.querySelector('.ansheet-line'); p.focus(); try { p.setSelectionRange(p.value.length, p.value.length); } catch (_) {} }
        }
      });
      return row;
    }

    var initial = [];
    if (opts.storageKey) { try { initial = JSON.parse(localStorage.getItem(opts.storageKey) || '[]'); } catch (_) {} }
    if (!initial.length) initial = [''];
    initial.forEach(function (v) {
      var row = newRow(v); rows.appendChild(row);
      update(row, row.querySelector('.ansheet-line'), row.querySelector('.ansheet-status'));
    });

    container._clear = function () {
      rows.innerHTML = '';
      var row = newRow(''); rows.appendChild(row);
      save();
      row.querySelector('.ansheet-line').focus();
    };

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

  // ---- Feuille libre flottante (bouton + panneau) ----
  function buildFree() {
    if (document.getElementById('feuille-btn')) return;
    var btn = document.createElement('button');
    btn.id = 'feuille-btn'; btn.type = 'button'; btn.textContent = '📝 Feuille';
    btn.setAttribute('aria-label', 'Ouvrir la feuille de réponses');

    var panel = document.createElement('div');
    panel.id = 'feuille-panel';
    panel.innerHTML =
      '<div class="feuille-head"><strong>📝 Feuille intelligente</strong>' +
        '<button type="button" id="feuille-close" aria-label="Fermer">✕</button></div>' +
      '<p class="feuille-hint">Écris ton calcul. Chaque ligne avec « = » est vérifiée : ✓ juste, ✗ faux (survole pour voir la vraie valeur).</p>' +
      '<div id="feuille-sheet"></div>' +
      '<button type="button" id="feuille-clear" class="feuille-clear">🗑️ Effacer la feuille</button>';

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    var sheet = panel.querySelector('#feuille-sheet');
    mount(sheet, { storageKey: 'gr2_feuille' });

    btn.addEventListener('click', function () {
      panel.classList.toggle('show');
      if (panel.classList.contains('show')) { var l = sheet.querySelector('.ansheet-line'); if (l) l.focus(); }
    });
    panel.querySelector('#feuille-close').addEventListener('click', function () { panel.classList.remove('show'); });
    panel.querySelector('#feuille-clear').addEventListener('click', function () { if (sheet._clear) sheet._clear(); });
  }

  window.AnswerSheet = { mount: mount, checkLine: checkLine, evalExpr: evalExpr, finalMatches: finalMatches };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildFree);
  else buildFree();
})();
