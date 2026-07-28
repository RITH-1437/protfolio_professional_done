/* =============================================================
   RIN NAIRITH — Portfolio Script
   Clean ES6, modular, no dead code
   ============================================================= */

'use strict';

/* ── Config ── */
const CONFIG = {
  emailjs: {
    publicKey:  'rRBwkMN6Au2l2cVRQ',
    serviceId:  'service_3lw8wsw',
    templateId: 'template_zpxtsi9',
  },
  contactEmail: 'nairithrin143@gmail.com',
  typingRoles: [
    'Full Stack Developer',
    'PHP Framework Author',
    'Backend Engineer',
    'Frontend Developer',
    'Cloud & DevOps Learner',
    'API Developer',
    'Open Source Builder',
    'Problem Solver',
    'Java Spring Boot Dev',
    'System Design Enthusiast',
  ],
};

/* ── EmailJS ── */
if (typeof emailjs !== 'undefined') {
  emailjs.init({ publicKey: CONFIG.emailjs.publicKey });
}

/* ── Utility helpers ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function throttle(fn, ms) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) { last = now; fn(...args); }
  };
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* =============================================================
   NAVBAR
   ============================================================= */
function initNavbar() {
  const navbar   = $('.navbar');
  const menu     = $('.nav-menu');
  const burger   = $('#hamburger');
  const navLinks = $$('.nav-link');

  /* Scroll: add .scrolled class + active section highlight */
  const onScroll = throttle(() => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateScrollProgress();
    highlightNavLink();
  }, 80);
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile hamburger */
  burger?.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    menu.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  /* Close mobile menu on link click */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      burger?.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close on outside click */
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      menu.classList.remove('open');
      burger?.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
    }
  });

  /* Smooth scroll for anchor links */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 65, behavior: 'smooth' });
    });
  });
}

function highlightNavLink() {
  const sections  = $$('section[id]');
  const navLinks  = $$('.nav-link');
  const scrollMid = window.scrollY + window.innerHeight / 2;

  let current = '';
  sections.forEach(sec => {
    if (sec.offsetTop <= scrollMid) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* =============================================================
   SCROLL PROGRESS BAR
   ============================================================= */
function updateScrollProgress() {
  const bar = $('#scroll-progress');
  if (!bar) return;
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  bar.style.width = `${Math.min(pct, 100)}%`;
}

/* =============================================================
   THEME TOGGLE
   ============================================================= */
function initTheme() {
  const btn  = $('#theme-toggle');
  const body = document.body;
  const saved = localStorage.getItem('theme') || 'dark';

  const apply = theme => {
    body.dataset.theme = theme === 'light' ? 'light' : '';
    if (!body.dataset.theme) body.removeAttribute('data-theme');
    if (btn) btn.innerHTML = theme === 'light'
      ? '<i class="fas fa-sun" aria-hidden="true"></i>'
      : '<i class="fas fa-moon" aria-hidden="true"></i>';
  };

  apply(saved);

  btn?.addEventListener('click', () => {
    const next = body.dataset.theme === 'light' ? 'dark' : 'light';
    apply(next);
    localStorage.setItem('theme', next);
  });
}


/* =============================================================
   TYPING ANIMATION
   ============================================================= */
function initTyping() {
  const el = $('.typing-text');
  if (!el || prefersReducedMotion) {
    if (el) el.textContent = CONFIG.typingRoles[0];
    return;
  }

  const roles = CONFIG.typingRoles;
  let ri = 0, ci = 0, deleting = false;

  const tick = () => {
    const role = roles[ri];
    if (deleting) {
      ci--;
      el.textContent = role.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(tick, 420);
        return;
      }
      setTimeout(tick, 40);
    } else {
      ci++;
      el.textContent = role.slice(0, ci);
      if (ci === role.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 90);
    }
  };
  setTimeout(tick, 500);
}

/* =============================================================
   SCROLL-REVEAL ANIMATIONS (staggered)
   ============================================================= */
function initScrollAnimations() {
  if (prefersReducedMotion) {
    $$('[data-animate]').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      /* stagger siblings inside same parent */
      const delay = entry.target.dataset.stagger || 0;
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  /* Add stagger delays to card groups */
  const staggerGroups = [
    '.skills-grid .skill-group',
    '.projects-grid .project-card',
    '.about-highlights .highlight-item',
    '.timeline-item',
  ];
  staggerGroups.forEach(sel => {
    $$(sel).forEach((el, i) => {
      el.dataset.animate = el.dataset.animate || 'fade-up';
      el.dataset.stagger = i * 80;
    });
  });

  $$('[data-animate]').forEach(el => observer.observe(el));
}

/* =============================================================
   BACK TO TOP
   ============================================================= */
function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', throttle(() => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, 100), { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* =============================================================
   FOOTER ENTRANCE + CURSOR
   ============================================================= */
function initFooter() {
  const footer = $('#site-footer');
  if (!footer) return;

  if (prefersReducedMotion) {
    footer.classList.add('footer--visible');
    return;
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      footer.classList.add('footer--visible');
      obs.disconnect();
    }
  }, { threshold: 0.1 });
  obs.observe(footer);

  /* Blinking cursor on copyright line */
  const copy = footer.querySelector('.footer-copy');
  if (copy) {
    const cur = document.createElement('span');
    cur.setAttribute('aria-hidden', 'true');
    cur.style.cssText = 'display:inline-block;width:2px;height:0.8em;background:currentColor;margin-left:4px;vertical-align:middle;animation:_fc 1.1s step-start infinite';
    copy.appendChild(cur);
    if (!document.getElementById('_fcs')) {
      const s = document.createElement('style');
      s.id = '_fcs';
      s.textContent = '@keyframes _fc{0%,100%{opacity:1}50%{opacity:0}}';
      document.head.appendChild(s);
    }
  }
}

/* =============================================================
   PARTICLES
   ============================================================= */
function initParticles() {
  if (typeof particlesJS === 'undefined' || prefersReducedMotion) return;
  particlesJS('particles-js', {
    particles: {
      number: { value: 35, density: { enable: true, value_area: 900 } },
      color: { value: '#6366f1' },
      shape: { type: 'circle' },
      opacity: { value: 0.15, random: false },
      size: { value: 2.5, random: true },
      line_linked: { enable: true, distance: 140, color: '#6366f1', opacity: 0.1, width: 1 },
      move: { enable: true, speed: 1.2, direction: 'none', out_mode: 'out' },
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: false }, resize: true },
      modes: { repulse: { distance: 120, duration: 0.4 } },
    },
    retina_detect: true,
  });
}


/* =============================================================
   NOTIFICATIONS
   ============================================================= */
function showNotification(message, type = 'info') {
  $$('.notification').forEach(n => n.remove());

  const n = document.createElement('div');
  n.className = 'notification';
  n.setAttribute('role', 'alert');
  n.setAttribute('aria-live', 'polite');

  const iconMap = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  n.innerHTML = `
    <i class="fas ${iconMap[type] || iconMap.info} notification-icon ${type}" aria-hidden="true"></i>
    <span class="notification-text">${message}</span>
    <button class="notification-close" aria-label="Close notification">
      <i class="fas fa-times" aria-hidden="true"></i>
    </button>`;

  document.body.appendChild(n);
  requestAnimationFrame(() => n.classList.add('show'));

  const dismiss = () => {
    n.classList.remove('show');
    n.addEventListener('transitionend', () => n.remove(), { once: true });
  };

  n.querySelector('.notification-close').addEventListener('click', dismiss);
  const timer = setTimeout(dismiss, 5000);
  n.querySelector('.notification-close').addEventListener('click', () => clearTimeout(timer), { once: true });
}

/* =============================================================
   CONTACT FORM
   ============================================================= */
function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> <span>Sending…</span>';
    btn.disabled = true;

    const params = {
      title:   $('#subject', form).value,
      name:    $('#name', form).value,
      email:   $('#email', form).value,
      message: $('#message', form).value,
      time:    new Date().toLocaleString(),
      initial: $('#name', form).value.charAt(0).toUpperCase(),
    };

    try {
      if (!CONFIG.emailjs.publicKey || CONFIG.emailjs.publicKey === 'YOUR_PUBLIC_KEY') {
        throw new Error('not_configured');
      }
      await emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, params);
      showNotification('Message sent! I\'ll get back to you soon.', 'success');
      form.reset();
    } catch (err) {
      const txt = String(err?.text || err?.message || '').toLowerCase();
      const msg = txt.includes('not_configured') || txt.includes('invalid grant')
        ? `Email not configured yet. Contact me at ${CONFIG.contactEmail}`
        : `Couldn't send right now. Email me at ${CONFIG.contactEmail}`;
      showNotification(msg, 'error');
    } finally {
      btn.innerHTML = orig;
      btn.disabled = false;
    }
  });
}

/* =============================================================
   LOCATION MODAL
   ============================================================= */
function openLocationModal() {
  const modal = $('#locationModal');
  if (!modal) return;
  modal.style.display = 'flex';
  requestAnimationFrame(() => modal.classList.add('show'));
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close')?.focus();
}

function closeLocationModal() {
  const modal = $('#locationModal');
  if (!modal) return;
  modal.classList.remove('show');
  modal.addEventListener('transitionend', () => { modal.style.display = 'none'; }, { once: true });
  document.body.style.overflow = '';
}

/* close on backdrop click */
document.addEventListener('DOMContentLoaded', () => {
  $('#locationModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLocationModal();
  });
});

/* close on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const modal = $('#locationModal');
    if (modal?.classList.contains('show')) closeLocationModal();
  }
});

/* Expose to inline onclick */
window.openLocationModal  = openLocationModal;
window.closeLocationModal = closeLocationModal;

/* =============================================================
   PAGE VISIBILITY — pause particles when hidden
   ============================================================= */
document.addEventListener('visibilitychange', () => {
  const canvas = $('#particles-js canvas');
  if (canvas) canvas.style.visibility = document.hidden ? 'hidden' : 'visible';
});

/* =============================================================
   WINDOW RESIZE — debounced particle refresh
   ============================================================= */
window.addEventListener('resize', debounce(() => {
  if (typeof pJSDom !== 'undefined' && pJSDom.length) {
    pJSDom[0].pJS.fn.particlesRefresh();
  }
}, 300));

/* =============================================================
   BOOT — initialise everything after DOM ready
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initTyping();
  initScrollAnimations();
  initBackToTop();
  initFooter();
  initParticles();
  initContactForm();
});
