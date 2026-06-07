/* Recherche globale — Maths GR2
   Indexe les cartes de formules / méthodes / notions et permet de sauter dessus.
   Ouverture : bouton 🔍 de la barre, ou touche "/" au clavier. */
(function () {
  'use strict';

  var SECTION_LABELS = {
    formules: '🧮 Formules clés',
    synthese: '📚 Synthèse',
    methodes: '📝 Méthodes',
    erreurs: '⚠️ Erreurs fréquentes',
    exercices: '✏️ Exercices'
  };

  var index = [];
  var results = [];
  var sel = -1;

  function norm(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  function cleanText(el) {
    var c = el.cloneNode(true);
    c.querySelectorAll('mjx-container, .MathJax, script, style, button').forEach(function (n) { n.remove(); });
    return c.textContent.replace(/\s+/g, ' ').trim();
  }
  // Texte brut depuis une chaîne HTML (pour fiches / flashcards)
  function plain(html) {
    if (!html) return '';
    var d = document.createElement('div');
    d.innerHTML = html;
    d.querySelectorAll('mjx-container, .MathJax, script, style').forEach(function (n) { n.remove(); });
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function buildIndex() {
    index = [];
    var boxes = document.querySelectorAll(
      '#formules .formula-box, #synthese .formula-box, #methodes .formula-box, #erreurs .formula-box'
    );
    var i = 0;
    boxes.forEach(function (box) {
      var sec = box.closest('.section');
      if (!sec) return;
      var heading = box.querySelector('h3, h4');
      var title = heading ? cleanText(heading) : '';
      var snippet = cleanText(box);
      if (!title) title = snippet.slice(0, 60);
      if (!title && !snippet) return;
      var id = 's' + (i++);
      box.dataset.searchId = id;
      var mc = box.closest('.method-content');
      index.push({
        id: id,
        type: 'box',
        secLabel: SECTION_LABELS[sec.id] || sec.id,
        title: title,
        snippet: snippet.slice(0, 130),
        section: sec.id,
        methodId: mc ? mc.id : null,
        nt: norm(title),
        ns: norm(snippet)
      });
    });

    // ── Fiches (personnages + notions), fusionnées toutes matières ──
    function addFiches(map) {
      if (!map) return;
      Object.keys(map).forEach(function (k) {
        var info = map[k];
        if (!info || !info.title) return;
        if (index.some(function (x) { return x.type === 'fiche' && x.key === k; })) return;
        var snip = [info.sub, plain(info.cours), plain(info.exam), plain(info.anecdote)].filter(Boolean).join(' ');
        index.push({
          type: 'fiche', key: k, secLabel: '📖 Fiche',
          title: info.title, snippet: snip.slice(0, 130), section: 'fiche',
          nt: norm(info.title), ns: norm(info.title + ' ' + snip)
        });
      });
    }
    addFiches(window.IMG_INFO);
    addFiches(window.INFO_TOPICS);

    // ── Flashcards de toutes les matières prêtes ──
    if (window.SUBJECTS) {
      Object.keys(window.SUBJECTS).forEach(function (sk) {
        var s = window.SUBJECTS[sk];
        if (!s || !s.ready || !s.content || !s.content.flashcards) return;
        var lbl = s.label || sk;
        s.content.flashcards.forEach(function (c) {
          var f = plain(c.front), bk = plain(c.back);
          if (!f) return;
          index.push({
            type: 'card', subject: sk, front: c.front, secLabel: '🎴 Carte · ' + lbl,
            title: f.slice(0, 80), snippet: bk.slice(0, 130), section: 'flashcards',
            nt: norm(f), ns: norm(f + ' ' + bk)
          });
        });
      });
    }
    return index;
  }

  function doSearch(q) {
    var words = norm(q).split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return index
      .map(function (it) {
        var score = 0;
        for (var k = 0; k < words.length; k++) {
          var w = words[k];
          if (it.nt.indexOf(w) !== -1) score += 3;
          else if (it.ns.indexOf(w) !== -1) score += 1;
          else return { it: it, score: -1 };
        }
        return { it: it, score: score };
      })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 20)
      .map(function (r) { return r.it; });
  }

  function highlight(text, words) {
    var out = text;
    words.forEach(function (w) {
      if (!w) return;
      try {
        var re = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
        out = out.replace(re, '<mark>$1</mark>');
      } catch (e) {}
    });
    return out;
  }

  function render(q) {
    var box = document.getElementById('search-results');
    if (!box) return;
    results = doSearch(q);
    sel = results.length ? 0 : -1;
    if (!q.trim()) {
      box.innerHTML = '<div class="search-empty">Cherche dans tout le site — <em>fiches, flashcards, formules, notions</em> : Luther, mole, rayon, pente, Réforme…</div>';
      return;
    }
    if (!results.length) {
      box.innerHTML = '<div class="search-empty">Aucun résultat pour « ' + q.replace(/</g, '&lt;') + ' »</div>';
      return;
    }
    var words = norm(q).split(/\s+/).filter(Boolean);
    box.innerHTML = results.map(function (it, idx) {
      return '<button type="button" class="search-result' + (idx === 0 ? ' is-sel' : '') + '" data-idx="' + idx + '">' +
        '<span class="search-sec">' + (it.secLabel || SECTION_LABELS[it.section] || it.section) + '</span>' +
        '<span class="search-title">' + highlight(it.title, words) + '</span>' +
        '<span class="search-snip">' + highlight(it.snippet, words) + '</span>' +
      '</button>';
    }).join('');
    Array.prototype.forEach.call(box.querySelectorAll('.search-result'), function (b) {
      b.addEventListener('click', function () { goTo(results[+b.dataset.idx]); });
    });
  }

  function goTo(it) {
    if (!it) return;
    closeSearch();
    // Fiche → ouvre la fenêtre d'info
    if (it.type === 'fiche') {
      if (typeof openInfoCard === 'function') openInfoCard(it.key);
      return;
    }
    // Flashcard → bonne matière + section flashcards + saut sur la carte
    if (it.type === 'card') {
      if (it.subject && typeof setSubject === 'function' && window.currentSubject !== it.subject) {
        try { setSubject(it.subject); } catch (e) {}
      }
      if (typeof showSection === 'function') showSection('flashcards');
      setTimeout(function () { if (typeof jumpToFlashcard === 'function') jumpToFlashcard(it.front); }, 420);
      return;
    }
    if (typeof showSection === 'function') showSection(it.section);
    setTimeout(function () {
      if (it.methodId && typeof showMethod === 'function') {
        var tab = document.querySelector('.mtab[onclick*="\'' + it.methodId + '\'"]');
        if (tab) showMethod(it.methodId, tab);
      }
      var el = document.querySelector('[data-search-id="' + it.id + '"]');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('search-flash');
        setTimeout(function () { el.classList.remove('search-flash'); }, 1700);
      }
    }, 320);
  }

  function setSel(n) {
    var items = document.querySelectorAll('#search-results .search-result');
    if (!items.length) return;
    sel = (n + items.length) % items.length;
    items.forEach(function (b, i) { b.classList.toggle('is-sel', i === sel); });
    items[sel].scrollIntoView({ block: 'nearest' });
  }

  function ensureUI() {
    if (document.getElementById('search-overlay')) return;
    var ov = document.createElement('div');
    ov.id = 'search-overlay';
    ov.className = 'search-overlay';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-label', 'Recherche');
    ov.innerHTML =
      '<div class="search-modal">' +
        '<div class="search-bar">' +
          '<span aria-hidden="true">🔍</span>' +
          '<input id="search-input" type="text" autocomplete="off" placeholder="Rechercher : fiche, flashcard, formule, notion…" aria-label="Rechercher">' +
          '<button type="button" class="search-close" aria-label="Fermer">✕</button>' +
        '</div>' +
        '<div id="search-results" class="search-results"></div>' +
        '<div class="search-hint">↑↓ naviguer · Entrée ouvrir · Échap fermer</div>' +
      '</div>';
    document.body.appendChild(ov);
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) closeSearch(); });
    ov.querySelector('.search-close').addEventListener('click', closeSearch);
    var input = ov.querySelector('#search-input');
    input.addEventListener('input', function () { render(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSel(sel + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(sel - 1); }
      else if (e.key === 'Enter') { e.preventDefault(); if (results[sel]) goTo(results[sel]); }
      else if (e.key === 'Escape') { e.preventDefault(); closeSearch(); }
    });
  }

  window.openSearch = function () {
    ensureUI();
    buildIndex(); // reconstruit à chaque ouverture (fiches/cartes/sections à jour selon la matière)
    var ov = document.getElementById('search-overlay');
    ov.classList.add('show');
    var input = document.getElementById('search-input');
    input.value = '';
    render('');
    setTimeout(function () { input.focus(); }, 30);
  };
  window.closeSearch = function () {
    var ov = document.getElementById('search-overlay');
    if (ov) ov.classList.remove('show');
  };

  // Raccourcis clavier d'ouverture :
  //  • "/"           → quand on n'écrit pas (rapide une main)
  //  • Ctrl/Cmd + K  → standard universel, marche MÊME si on est dans un champ
  document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + K : ouvre/ferme la recherche, partout
    if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      var ov = document.getElementById('search-overlay');
      if (ov && ov.classList.contains('show')) window.closeSearch();
      else window.openSearch();
      return;
    }
    // "/" : seulement si on n'est pas déjà en train d'écrire
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target;
    var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
    if (typing) return;
    e.preventDefault();
    window.openSearch();
  });
})();
