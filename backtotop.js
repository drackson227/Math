/* ============================================================
   backtotop.js — Bouton flottant "remonter en haut"
   Apparait quand on a scrolle vers le bas. Utile sur les longues
   pages (Synthese, Erreurs) surtout sur telephone.
   ============================================================ */
(function () {
  function build() {
    if (document.getElementById('back-to-top')) return;
    var btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Remonter en haut');
    btn.textContent = '↑';
    btn.style.cssText = [
      'position:fixed', 'right:18px', 'bottom:18px', 'z-index:2300',
      'width:46px', 'height:46px', 'border-radius:50%',
      'border:none', 'cursor:pointer',
      'background:linear-gradient(135deg,var(--color-nav),#7c3aed)',
      'color:#fff', 'font-size:22px', 'font-weight:700',
      'box-shadow:0 6px 20px rgba(0,0,0,0.4)',
      'opacity:0', 'pointer-events:none',
      'transition:opacity 0.25s ease, transform 0.25s ease',
      'transform:translateY(10px)'
    ].join(';');
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btn);

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var show = window.scrollY > 400;
        btn.style.opacity = show ? '1' : '0';
        btn.style.pointerEvents = show ? 'auto' : 'none';
        btn.style.transform = show ? 'translateY(0)' : 'translateY(10px)';
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
