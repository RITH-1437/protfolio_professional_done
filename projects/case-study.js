/* Case study pages: shared theme toggle (same localStorage key as the
   main site) and scroll reveal. */
'use strict';

(function () {
  const btn = document.getElementById('theme-toggle');
  let saved = 'dark';
  try { saved = localStorage.getItem('theme') || 'dark'; } catch (e) { /* storage blocked */ }

  function apply(theme) {
    if (theme === 'light') document.body.dataset.theme = 'light';
    else document.body.removeAttribute('data-theme');
    if (btn) btn.innerHTML = theme === 'light'
      ? '<i class="fas fa-sun" aria-hidden="true"></i>'
      : '<i class="fas fa-moon" aria-hidden="true"></i>';
  }
  apply(saved);

  btn?.addEventListener('click', () => {
    const next = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    apply(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
  });

  const items = document.querySelectorAll('.cs-reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => obs.observe(el));
})();
