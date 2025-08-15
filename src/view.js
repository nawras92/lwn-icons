/**
 * Font Load Detection for Material Symbols
 *
 * This immediately-invoked function checks whether the "Material Symbols Outlined"
 * font has loaded. It adds a `fonts-ready` class to the <html> element once the font
 * is ready, allowing CSS to reveal icons only after the font is loaded.
 *
 * Purpose:
 * - Prevents flash of unstyled text (FOUT) for icon fonts.
 * - Works in modern browsers using the Font Loading API.
 * - Provides a fallback for older browsers using window.onload.
 *
 * Usage:
 * In CSS, hide icons by default and reveal them when `fonts-ready` is present:
 *
 * .lwn-icon.material-symbols-outlined { visibility: hidden; }
 * .fonts-ready .lwn-icon.material-symbols-outlined { visibility: visible; }
 */
(function () {
  if (document.fonts) {
    document.fonts.load('24px "Material Symbols Outlined"').then(function () {
      document.documentElement.classList.add('fonts-ready');
    });
  } else {
    window.addEventListener('load', function () {
      document.documentElement.classList.add('fonts-ready');
    });
  }
})();
