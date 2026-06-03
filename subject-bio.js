/* GR2 Study — Contenu BIOLOGIE
   L'organisation du vivant · la cellule (procaryote / eucaryote) · les organites ·
   cellule animale / végétale · ADN & chromosomes. Avec illustrations (SVG du thème).
   S'enregistre via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  // ---- petites illustrations SVG (lisibles sur fond sombre) ----
  var SVG_ANIMAL =
    '<svg viewBox="0 0 280 200" width="280" height="200" style="max-width:100%;background:var(--bg-main);border-radius:12px;border:2px solid var(--border-subtle);">' +
      '<ellipse cx="140" cy="100" rx="130" ry="88" fill="rgba(167,139,250,0.08)" stroke="#a78bfa" stroke-width="3"/>' +
      '<circle cx="112" cy="96" r="38" fill="rgba(96,165,250,0.22)" stroke="#60a5fa" stroke-width="2"/>' +
      '<circle cx="112" cy="96" r="11" fill="#60a5fa"/>' +
      '<ellipse cx="205" cy="66" rx="24" ry="12" fill="rgba(248,113,113,0.25)" stroke="#f87171" stroke-width="2"/>' +
      '<path d="M186 66 q6 -7 12 0 t12 0" fill="none" stroke="#f87171" stroke-width="1.5"/>' +
      '<ellipse cx="200" cy="135" rx="22" ry="11" fill="rgba(248,113,113,0.25)" stroke="#f87171" stroke-width="2"/>' +
      '<circle cx="160" cy="150" r="9" fill="rgba(251,191,36,0.3)" stroke="#fbbf24" stroke-width="1.5"/>' +
      '<g fill="#e5e7eb">' +
      '<circle cx="170" cy="100" r="2"/><circle cx="178" cy="112" r="2"/><circle cx="150" cy="120" r="2"/><circle cx="190" cy="98" r="2"/><circle cx="162" cy="78" r="2"/></g>' +
    '</svg>';

  var SVG_PLANT =
    '<svg viewBox="0 0 280 200" width="280" height="200" style="max-width:100%;background:var(--bg-main);border-radius:12px;border:2px solid var(--border-subtle);">' +
      '<rect x="14" y="20" width="252" height="160" rx="10" fill="rgba(74,222,128,0.06)" stroke="#16a34a" stroke-width="6"/>' +
      '<rect x="24" y="30" width="232" height="140" rx="6" fill="none" stroke="#86efac" stroke-width="2"/>' +
      '<rect x="86" y="64" width="120" height="78" rx="12" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" stroke-width="2"/>' +
      '<circle cx="54" cy="60" r="14" fill="rgba(96,165,250,0.22)" stroke="#60a5fa" stroke-width="2"/>' +
      '<ellipse cx="60" cy="120" rx="16" ry="9" fill="rgba(52,211,153,0.3)" stroke="#34d399" stroke-width="2"/>' +
      '<ellipse cx="225" cy="70" rx="16" ry="9" fill="rgba(52,211,153,0.3)" stroke="#34d399" stroke-width="2"/>' +
      '<ellipse cx="228" cy="135" rx="16" ry="9" fill="rgba(52,211,153,0.3)" stroke="#34d399" stroke-width="2"/>' +
    '</svg>';

  var SVG_BACT =
    '<svg viewBox="0 0 280 160" width="280" height="160" style="max-width:100%;background:var(--bg-main);border-radius:12px;border:2px solid var(--border-subtle);">' +
      '<rect x="60" y="50" width="160" height="60" rx="30" fill="rgba(251,191,36,0.08)" stroke="#fbbf24" stroke-width="3"/>' +
      '<path d="M95 80 q12 -12 24 0 t24 0 t24 0" fill="none" stroke="#a78bfa" stroke-width="2.5"/>' +
      '<g fill="#e5e7eb"><circle cx="100" cy="95" r="2"/><circle cx="150" cy="62" r="2"/><circle cx="185" cy="95" r="2"/><circle cx="120" cy="68" r="2"/></g>' +
      '<path d="M60 80 q-25 -18 -45 -6" fill="none" stroke="#94a3b8" stroke-width="2"/>' +
      '<path d="M220 80 q25 18 45 6" fill="none" stroke="#94a3b8" stroke-width="2"/>' +
    '</svg>';

  var SVG_DNA =
    '<svg viewBox="0 0 240 160" width="240" height="160" style="max-width:100%;background:var(--bg-main);border-radius:12px;border:2px solid var(--border-subtle);">' +
      '<path d="M70 10 C 130 50, 130 110, 70 150" fill="none" stroke="#60a5fa" stroke-width="3"/>' +
      '<path d="M170 10 C 110 50, 110 110, 170 150" fill="none" stroke="#f87171" stroke-width="3"/>' +
      '<g stroke="#a78bfa" stroke-width="3">' +
      '<line x1="92" y1="28" x2="148" y2="28"/><line x1="108" y1="52" x2="132" y2="52"/><line x1="108" y1="80" x2="132" y2="80"/><line x1="108" y1="108" x2="132" y2="108"/><line x1="92" y1="132" x2="148" y2="132"/></g>' +
    '</svg>';

  function legend(items) {
    return '<div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-top:8px; font-size:12px; color:var(--text-secondary);">' +
      items.map(function (it) { return '<span>' + it + '</span>'; }).join('') + '</div>';
  }

  var sections = {};

  sections.synthese = `<div id="synthese" class="section active">
    <div style="text-align:center; margin-bottom:1.5rem;">
      <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin:0;">🧬 Biologie</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">L'organisation du vivant & la cellule</p>
    </div>

    <div class="synth-section">
      <h2>1. Les niveaux d'organisation du vivant</h2>
      <p>Le vivant s'organise en une <strong>hiérarchie</strong> de niveaux, du plus petit au plus grand. Chaque niveau est construit à partir du précédent : « la vie repose sur l'intégrité de ces niveaux ».</p>
      <div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin:1rem 0; font-size:13px;">
        ${['Atome','Molécule','Organite','Cellule','Tissu','Organe','Système','Organisme','Population','Communauté','Écosystème'].map(function (n, i, a) {
          return '<span style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; padding:6px 10px; font-weight:600; color:var(--text-primary);">' + n + '</span>' + (i < a.length - 1 ? '<span style="color:var(--color-nav); font-weight:800;">→</span>' : '');
        }).join('')}
      </div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Imagine des « poupées russes » : des <strong>atomes</strong> s'assemblent en <strong>molécules</strong>, qui forment des <strong>organites</strong>, qui composent une <strong>cellule</strong>. Plein de cellules identiques = un <strong>tissu</strong>, plusieurs tissus = un <strong>organe</strong> (ex. le cœur), des organes qui travaillent ensemble = un <strong>système</strong>, et tous les systèmes = un <strong>organisme</strong> (toi !). Au-delà : les organismes forment des populations, des communautés, et l'écosystème.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>2. La cellule : l'unité du vivant</h2>
      <p>La <strong>cellule</strong> est la plus petite unité capable de vivre. On distingue deux grands types selon la présence (ou non) d'un noyau :</p>
      <div class="grid2" style="margin-top:1rem;">
        <div class="card">
          <h3>🦠 Cellule procaryote</h3>
          <div style="text-align:center;">${SVG_BACT}</div>
          <ul style="font-size:14px; color:var(--text-secondary); line-height:1.9;">
            <li><strong>Pas de noyau</strong> : l'ADN est <em>libre</em> dans le cytoplasme (région nucléoïde).</li>
            <li>Pas d'organites entourés d'une membrane.</li>
            <li>Petite et simple. Ex. : <strong>bactérie</strong> (≈ 2 µm).</li>
          </ul>
        </div>
        <div class="card">
          <h3>🔬 Cellule eucaryote</h3>
          <div style="text-align:center;">${SVG_ANIMAL}</div>
          <ul style="font-size:14px; color:var(--text-secondary); line-height:1.9;">
            <li><strong>Un vrai noyau</strong> qui enferme l'ADN.</li>
            <li>De nombreux <strong>organites</strong> entourés d'une membrane.</li>
            <li>Plus grande et complexe. Ex. : cellule animale, végétale, levure.</li>
          </ul>
        </div>
      </div>
      ${legend(['🟣 membrane', '🔵 noyau (ADN)', '🔴 mitochondrie', '🟡 nucléoïde'])}
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">La différence n°1 = <strong>le noyau</strong>. « Pro-caryote » veut dire « avant le noyau » (pas de noyau, ADN qui flotte), « eu-caryote » = « vrai noyau » (ADN bien rangé dans un coffre, le noyau). Les bactéries sont procaryotes ; les animaux, plantes et champignons sont eucaryotes.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>3. Les organites et leurs rôles</h2>
      <p>Chaque organite a une fonction précise (comme les organes d'un corps, mais à l'échelle de la cellule) :</p>
      <ul style="line-height:2.1;">
        <li><strong>Noyau</strong> : contient l'<strong>ADN</strong> (l'information génétique) ; chef d'orchestre de la cellule.</li>
        <li><strong>Membrane plasmique</strong> : enveloppe la cellule, contrôle les entrées/sorties.</li>
        <li><strong>Cytoplasme</strong> : le « gel » qui remplit la cellule, où baignent les organites.</li>
        <li><strong>Mitochondrie</strong> : produit l'<strong>énergie</strong> (respiration cellulaire) ⚡.</li>
        <li><strong>Ribosomes</strong> : fabriquent les <strong>protéines</strong>.</li>
        <li><strong>Réticulum endoplasmique</strong> : transporte/fabrique (rugueux = avec ribosomes ; lisse = sans).</li>
        <li><strong>Appareil de Golgi</strong> : emballe et expédie les molécules.</li>
        <li><strong>Lysosome</strong> : « poubelle/recyclage », digère les déchets.</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Pense à la cellule comme une <strong>usine</strong> : le <strong>noyau</strong> = le bureau du patron (les plans/ADN), les <strong>ribosomes</strong> = les ouvriers qui fabriquent (protéines), les <strong>mitochondries</strong> = la centrale électrique (énergie), le <strong>Golgi</strong> = le service d'emballage/expédition, les <strong>lysosomes</strong> = le recyclage, et la <strong>membrane</strong> = la clôture avec ses portes.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>4. Cellule animale vs cellule végétale</h2>
      <div class="grid2" style="margin-top:0.5rem;">
        <div class="card"><h3>🐾 Cellule animale</h3><div style="text-align:center;">${SVG_ANIMAL}</div></div>
        <div class="card"><h3>🌿 Cellule végétale</h3><div style="text-align:center;">${SVG_PLANT}</div>${legend(['🟩 paroi', '🟢 chloroplaste', '🔵 grande vacuole'])}</div>
      </div>
      <p style="margin-top:1rem;">La cellule <strong>végétale</strong> possède 3 choses en plus :</p>
      <ul style="line-height:2;">
        <li><strong>Paroi</strong> (rigide, autour de la membrane) → soutient la plante.</li>
        <li><strong>Chloroplastes</strong> (verts) → font la <strong>photosynthèse</strong> (fabriquent du sucre avec la lumière).</li>
        <li><strong>Grande vacuole</strong> centrale → réserve d'eau, maintient la cellule « gonflée ».</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Pour différencier : si la cellule a une <strong>paroi rigide</strong>, des parties <strong>vertes</strong> (chloroplastes) et une <strong>grosse bulle d'eau</strong> (vacuole) → c'est une cellule <strong>végétale</strong>. Sinon, c'est une cellule <strong>animale</strong> (forme plus souple et arrondie).</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>5. L'ADN & les chromosomes</h2>
      <div style="text-align:center; margin:0.5rem 0;">${SVG_DNA}${legend(['🔵🔴 les 2 brins', '🟣 bases (barreaux)'])}</div>
      <ul style="line-height:2.1;">
        <li>L'<strong>ADN</strong> est une molécule en forme de <strong>double hélice</strong> (2 brins enroulés).</li>
        <li>Il est fait de <strong>nucléotides</strong> = sucre (désoxyribose) + phosphate + une <strong>base azotée</strong>.</li>
        <li>4 bases : <strong>A</strong>, <strong>T</strong>, <strong>C</strong>, <strong>G</strong>. Elles s'apparient toujours : <strong>A–T</strong> et <strong>C–G</strong>.</li>
        <li>L'ADN est le <strong>support de l'hérédité</strong> : il porte l'information transmise des parents aux enfants.</li>
        <li>Chez l'humain : <strong>23 paires</strong> de chromosomes (dont 1 paire sexuelle : XX = femme, XY = homme).</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">L'ADN, c'est le <strong>mode d'emploi</strong> qui fabrique et fait fonctionner ton corps. Il ressemble à une <strong>échelle torsadée</strong> : les deux montants sont les brins, et les barreaux sont les paires de bases (A avec T, C avec G — toujours ces couples). Quand l'ADN est très condensé, il forme les <strong>chromosomes</strong> : on en a 46 (23 paires).</div>
      </div>
    </div>
  </div>`;

  sections.formules = `<div id="formules" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1.2rem;">📌 À retenir — l'essentiel</h2>
    <div class="grid2">
      <div>
        <div class="formula-box"><h3>Niveaux du vivant</h3><p class="note">Atome → Molécule → Organite → Cellule → Tissu → Organe → Système → Organisme → Population → Communauté → Écosystème.</p></div>
        <div class="formula-box"><h3>Procaryote vs Eucaryote</h3><p class="note"><strong>Procaryote</strong> : pas de noyau, ADN libre (bactérie). <strong>Eucaryote</strong> : vrai noyau + organites (animal, végétal, champignon).</p></div>
        <div class="formula-box"><h3>Animale vs Végétale</h3><p class="note">La <strong>végétale</strong> a en plus : paroi, chloroplastes, grande vacuole.</p></div>
      </div>
      <div>
        <div class="formula-box"><h3>Rôle des organites</h3><p class="note">Noyau = ADN · Mitochondrie = énergie · Ribosome = protéines · Golgi = emballage · Lysosome = recyclage · Membrane = échanges.</p></div>
        <div class="formula-box"><h3>ADN</h3><p class="note">Double hélice · nucléotides (sucre + phosphate + base) · bases A–T et C–G · support de l'hérédité.</p></div>
        <div class="formula-box"><h3>Chromosomes (humain)</h3><p class="note">23 paires (46 au total) · paire sexuelle : XX (femme), XY (homme).</p></div>
      </div>
    </div>
  </div>`;

  sections.methodes = `<div id="methodes" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📝 Méthodes</h2>
    <div class="methods-tabs">
      <button class="mtab on" onclick="showMethod('bm1', this)">Reconnaître une cellule</button>
      <button class="mtab" onclick="showMethod('bm2', this)">Associer organite & rôle</button>
    </div>
    <div id="bm1" class="method-content on">
      <div class="formula-box"><h3>Méthode — Identifier le type de cellule</h3></div>
      <div class="step-list">
        <div class="step-item"><div class="step-num">1</div><div class="step-text">Y a-t-il un <strong>noyau</strong> ? Non → <strong>procaryote</strong> (bactérie). Oui → eucaryote, passe à l'étape 2.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Le noyau est le critère n°1 : il sépare les deux grands mondes du vivant. Sans noyau = procaryote ; avec noyau = eucaryote.</div>
        </div></div>
        <div class="step-item"><div class="step-num">2</div><div class="step-text">Y a-t-il une <strong>paroi</strong>, des <strong>chloroplastes</strong> (verts) et une <strong>grande vacuole</strong> ? Oui → <strong>végétale</strong>.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Ces 3 éléments n'existent que chez les végétaux : ce sont les indices décisifs pour une cellule végétale.</div>
        </div></div>
        <div class="step-item"><div class="step-num">3</div><div class="step-text">Sinon (pas de paroi ni chloroplaste, forme souple) → <strong>animale</strong>.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Par élimination : une cellule eucaryote sans paroi ni chloroplaste est une cellule animale.</div>
        </div></div>
      </div>
    </div>
    <div id="bm2" class="method-content">
      <div class="formula-box"><h3>Méthode — Retenir le rôle des organites</h3></div>
      <div class="step-list">
        <div class="step-item"><div class="step-num">1</div><div class="step-text">Associe chaque organite à une image d'<strong>usine</strong> : noyau = bureau (plans), ribosome = ouvrier, mitochondrie = centrale électrique.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Une analogie concrète aide à mémoriser durablement : chaque organite « fait un métier » dans l'usine-cellule.</div>
        </div></div>
        <div class="step-item"><div class="step-num">2</div><div class="step-text">Golgi = emballage/expédition · Lysosome = recyclage · Membrane = clôture avec portes.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Regrouper les organites « logistiques » ensemble facilite la révision : ils gèrent le tri, l'envoi et le nettoyage.</div>
        </div></div>
      </div>
    </div>
  </div>`;

  sections.exercices = `<div id="exercices" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:0.5rem;">✏️ Exercices guidés</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.5rem;">Révèle les étapes une par une.</p>
    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🔬 Quel type de cellule ?</h3>
      <div style="background:rgba(167,139,250,0.06); border-radius:8px; padding:1rem; margin-bottom:1rem;"><p><strong>Énoncé :</strong> une cellule possède un noyau, une paroi rigide, des chloroplastes et une grande vacuole. Quel type ?</p></div>
      <button class="step-btn" onclick="showExerciseStep(this, 301)">▶ Commencer</button>
      <div class="exercise-step" data-step="301"><span class="step-badge">Étape 1 sur 2</span><p>Elle a un <strong>noyau</strong> → c'est une cellule <strong>eucaryote</strong> (pas une bactérie).</p><button class="step-btn" onclick="showExerciseStep(this, 302)">▶ Conclusion</button></div>
      <div class="exercise-step" data-step="302"><span class="step-badge">Conclusion</span><p>Paroi + chloroplastes + grande vacuole → <strong>cellule végétale</strong>. ✅</p></div>
    </div>
    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🧬 Quelle base s'apparie avec A ?</h3>
      <button class="step-btn" onclick="showExerciseStep(this, 311)">▶ Voir la réponse</button>
      <div class="exercise-step" data-step="311"><span class="step-badge">Réponse</span><p>Dans l'ADN, l'adénine (<strong>A</strong>) s'apparie toujours avec la <strong>thymine (T)</strong>. (Et C avec G.) ✅</p></div>
    </div>
  </div>`;

  sections.erreurs = `<div id="erreurs" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1.5rem;">⚠️ Erreurs fréquentes</h2>
    <div class="synth-section">
      <div class="formula-box"><h3>❌ Croire que la bactérie a un noyau</h3><p><strong>Correction :</strong> la bactérie est <strong>procaryote</strong> : son ADN est libre dans le cytoplasme, il n'y a <strong>pas de noyau</strong>.</p></div>
      <div class="formula-box"><h3>❌ Confondre paroi et membrane</h3><p><strong>Correction :</strong> toutes les cellules ont une <strong>membrane plasmique</strong> ; seule la cellule végétale (et la bactérie) a en plus une <strong>paroi</strong> rigide par-dessus.</p></div>
      <div class="formula-box"><h3>❌ Donner le mauvais appariement des bases</h3><p><strong>Correction :</strong> c'est toujours <strong>A–T</strong> et <strong>C–G</strong> (jamais A–C ou A–G).</p></div>
      <div class="formula-box"><h3>❌ Confondre rôle des organites</h3><p><strong>Correction :</strong> l'énergie = <strong>mitochondrie</strong> (pas le noyau) ; les protéines = <strong>ribosomes</strong> ; l'ADN = <strong>noyau</strong>.</p></div>
    </div>
  </div>`;

  var questions = [
    { q: "Range du plus petit au plus grand :", opts: ["Atome → Cellule → Tissu → Organe", "Cellule → Atome → Organe → Tissu", "Organe → Tissu → Cellule → Atome", "Tissu → Cellule → Organe → Atome"], ans: 0, chapter: "organisation", difficulty: "facile", exp: "Du plus petit au plus grand : atome, (molécule, organite,) cellule, tissu, organe…" },
    { q: "Un ensemble de cellules identiques forme :", opts: ["un tissu", "un organe", "un système", "un organisme"], ans: 0, chapter: "organisation", difficulty: "facile", exp: "Des cellules semblables qui travaillent ensemble = un tissu." },
    { q: "Plusieurs organes qui coopèrent forment :", opts: ["un système", "un tissu", "une cellule", "une population"], ans: 0, chapter: "organisation", difficulty: "intermediaire", exp: "Ex. : le système digestif = estomac + intestin + foie…" },
    { q: "La différence principale entre procaryote et eucaryote est :", opts: ["la présence d'un noyau", "la taille uniquement", "la couleur", "le nombre de mitochondries"], ans: 0, chapter: "cellule", difficulty: "facile", exp: "Eucaryote = vrai noyau ; procaryote = pas de noyau (ADN libre)." },
    { q: "Une bactérie est une cellule :", opts: ["procaryote", "eucaryote", "végétale", "animale"], ans: 0, chapter: "cellule", difficulty: "facile", exp: "La bactérie n'a pas de noyau : c'est une procaryote." },
    { q: "Chez une cellule procaryote, l'ADN est :", opts: ["libre dans le cytoplasme", "dans le noyau", "dans une mitochondrie", "dans la paroi"], ans: 0, chapter: "cellule", difficulty: "intermediaire", exp: "Pas de noyau → l'ADN flotte dans le cytoplasme (région nucléoïde)." },
    { q: "Les animaux, plantes et champignons sont faits de cellules :", opts: ["eucaryotes", "procaryotes", "sans ADN", "sans membrane"], ans: 0, chapter: "cellule", difficulty: "facile", exp: "Tous ont un vrai noyau : ce sont des eucaryotes." },
    { q: "Quel organite produit l'énergie de la cellule ?", opts: ["la mitochondrie", "le noyau", "le ribosome", "le lysosome"], ans: 0, chapter: "organites", difficulty: "facile", exp: "La mitochondrie réalise la respiration cellulaire → énergie." },
    { q: "Quel organite contient l'ADN ?", opts: ["le noyau", "la mitochondrie", "le Golgi", "la membrane"], ans: 0, chapter: "organites", difficulty: "facile", exp: "Le noyau enferme l'ADN (information génétique)." },
    { q: "Les ribosomes servent à :", opts: ["fabriquer les protéines", "produire l'énergie", "digérer les déchets", "stocker l'eau"], ans: 0, chapter: "organites", difficulty: "intermediaire", exp: "Les ribosomes assemblent les protéines." },
    { q: "Quel organite digère/recycle les déchets ?", opts: ["le lysosome", "le ribosome", "le noyau", "le chloroplaste"], ans: 0, chapter: "organites", difficulty: "intermediaire", exp: "Le lysosome est la « poubelle/recyclage » de la cellule." },
    { q: "Quelle structure contrôle les entrées et sorties de la cellule ?", opts: ["la membrane plasmique", "le cytoplasme", "le noyau", "le ribosome"], ans: 0, chapter: "organites", difficulty: "facile", exp: "La membrane plasmique enveloppe la cellule et filtre les échanges." },
    { q: "Quelles structures n'existent QUE chez la cellule végétale ?", opts: ["paroi, chloroplastes, grande vacuole", "noyau, mitochondrie, ribosome", "membrane, cytoplasme, ADN", "Golgi, lysosome, noyau"], ans: 0, chapter: "organites", difficulty: "intermediaire", exp: "La cellule végétale a en plus : paroi, chloroplastes et grande vacuole." },
    { q: "Les chloroplastes servent à :", opts: ["la photosynthèse", "la digestion", "la respiration", "la division"], ans: 0, chapter: "organites", difficulty: "intermediaire", exp: "Les chloroplastes (verts) captent la lumière pour fabriquer du sucre : photosynthèse." },
    { q: "La forme de l'ADN est :", opts: ["une double hélice", "une sphère", "un cube", "une ligne droite"], ans: 0, chapter: "adn", difficulty: "facile", exp: "L'ADN est une double hélice (2 brins enroulés)." },
    { q: "Dans l'ADN, l'adénine (A) s'apparie avec :", opts: ["la thymine (T)", "la cytosine (C)", "la guanine (G)", "l'adénine (A)"], ans: 0, chapter: "adn", difficulty: "intermediaire", exp: "Appariement : A–T et C–G." },
    { q: "Combien de paires de chromosomes chez l'humain ?", opts: ["23", "46", "12", "2"], ans: 0, chapter: "adn", difficulty: "intermediaire", exp: "23 paires (46 chromosomes au total)." },
    { q: "Le caryotype d'une femme contient la paire sexuelle :", opts: ["XX", "XY", "YY", "XO"], ans: 0, chapter: "adn", difficulty: "facile", exp: "Femme = XX, homme = XY." }
  ];

  var flashcards = [
    { front: "Les niveaux d'organisation du vivant ?", back: "Atome → Molécule → Organite → Cellule → Tissu → Organe → Système → Organisme → Population → Communauté → Écosystème.", chapter: "organisation" },
    { front: "Qu'est-ce qu'un tissu ?", back: "Un ensemble de cellules semblables assurant une même fonction.", chapter: "organisation" },
    { front: "Procaryote vs eucaryote ?", back: "Procaryote = <strong>pas de noyau</strong> (ADN libre, ex. bactérie). Eucaryote = <strong>noyau</strong> + organites (animal, végétal, champignon).", chapter: "cellule" },
    { front: "Où est l'ADN dans une bactérie ?", back: "Libre dans le cytoplasme (région nucléoïde) — pas de noyau.", chapter: "cellule" },
    { front: "Rôle du noyau ?", back: "Contenir l'ADN (information génétique) ; il dirige la cellule.", chapter: "organites" },
    { front: "Rôle de la mitochondrie ?", back: "Produire l'énergie (respiration cellulaire) ⚡.", chapter: "organites" },
    { front: "Rôle des ribosomes ?", back: "Fabriquer les protéines.", chapter: "organites" },
    { front: "Rôle du lysosome ?", back: "Digérer/recycler les déchets de la cellule.", chapter: "organites" },
    { front: "Ce que la cellule végétale a en plus ?", back: "Paroi rigide, chloroplastes (photosynthèse), grande vacuole.", chapter: "organites" },
    { front: "Forme et composition de l'ADN ?", back: "Double hélice de nucléotides (sucre + phosphate + base azotée).", chapter: "adn" },
    { front: "Appariement des bases de l'ADN ?", back: "A–T et C–G (toujours).", chapter: "adn" },
    { front: "Chromosomes chez l'humain ?", back: "23 paires (46 au total) ; paire sexuelle XX (femme) ou XY (homme).", chapter: "adn" }
  ];

  window.registerSubject('bio', {
    subtitle: 'Biologie — organisation du vivant, cellule, organites, ADN',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      chapOrder: ['organisation', 'cellule', 'organites', 'adn'],
      chapLabels: { organisation: 'Organisation du vivant', cellule: 'Type de cellule', organites: 'Organites & rôles', adn: 'ADN & chromosomes' }
    }
  });
})();
