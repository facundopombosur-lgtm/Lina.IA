/* lina.ia · pantalla de carga con el logo + ícono de pestaña.
   Uso: pegar <script src="lina-intro.js"></script> dentro de <head> de cada página. */
(function () {
  var LOGO = '<svg viewBox="0 0 128 128" aria-hidden="true">' +
    '<path d="M56 118 Q53 88 61 60 L71 62 Q64 90 67 118 Z" fill="#fff"/>' +
    '<path d="M66 56 Q40 26 12 46 Q40 42 66 56 Z" fill="#fff"/>' +
    '<path d="M66 56 Q54 16 26 12 Q46 34 66 56 Z" fill="#fff"/>' +
    '<path d="M66 56 Q80 16 108 14 Q86 34 66 56 Z" fill="#fff"/>' +
    '<path d="M66 56 Q96 30 118 50 Q90 44 66 56 Z" fill="#a98bff"/>' +
    '<circle cx="66" cy="56" r="10" fill="#5cc8f2"/></svg>';

  // Ícono de la pestaña
  var fav = document.createElement('link');
  fav.rel = 'icon';
  fav.href = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#141a3c"/>' +
    LOGO.split('aria-hidden="true">')[1]);
  document.head.appendChild(fav);

  // Mostrar la intro solo una vez por visita (no en cada página)
  try { if (sessionStorage.getItem('linaIntro')) return; sessionStorage.setItem('linaIntro', '1'); } catch (e) {}

  var css = document.createElement('style');
  css.textContent =
    'html.lina-loading body>*:not(#lina-intro){visibility:hidden}' +
    '#lina-intro{position:fixed;inset:0;z-index:2147483647;background:#141a3c;display:grid;place-items:center;transition:opacity .6s ease,visibility .6s;font-family:"Plus Jakarta Sans","Space Grotesk",system-ui,sans-serif}' +
    '#lina-intro.out{opacity:0;visibility:hidden}' +
    '#lina-intro .in{display:grid;justify-items:center;gap:14px;color:#fff;text-align:center;padding:24px}' +
    '#lina-intro svg{width:120px;height:120px;animation:linaGrow 1s ease both}' +
    '#lina-intro .nm{font-weight:800;font-size:44px;letter-spacing:-1px;animation:linaUp .8s .3s ease both}#lina-intro .nm b{color:#5cc8f2}' +
    '#lina-intro .lm{color:#c9cdf0;font-size:16px;animation:linaUp .8s .5s ease both}' +
    '@keyframes linaGrow{from{transform:scale(.6) rotate(-8deg);opacity:0}to{transform:none;opacity:1}}' +
    '@keyframes linaUp{from{transform:translateY(10px);opacity:0}to{transform:none;opacity:1}}' +
    '@media(prefers-reduced-motion:reduce){#lina-intro *{animation:none!important}}';
  document.head.appendChild(css);
  document.documentElement.classList.add('lina-loading');

  function show() {
    var d = document.createElement('div');
    d.id = 'lina-intro';
    d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<div class="in">' + LOGO + '<div class="nm">lina<b>.</b>ia</div><div class="lm">Tecnología para agilizar el trabajo duro</div></div>';
    document.body.insertBefore(d, document.body.firstChild);
    var done = false;
    function hide() {
      if (done) return; done = true;
      document.documentElement.classList.remove('lina-loading');
      d.classList.add('out');
      setTimeout(function () { d.remove(); }, 700);
    }
    window.addEventListener('load', function () { setTimeout(hide, 1200); });
    setTimeout(hide, 4000); // por si algo tarda demasiado
  }
  if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
})();
