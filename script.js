/* =============================================================
   RIN NAIRITH — Portfolio Script
   Clean ES6, modular, no dead code
   ============================================================= */

'use strict';

/* ── Config ── */
const CONFIG = {
  api: {
    endpoint: '/api/send-email',
  },
  contactEmail: 'nairithrin143@gmail.com',
  github: {
    username: 'RITH-1437',
    apiUrl: 'https://api.github.com/users/RITH-1437/repos',
    perPage: 100,
  },
  typingRoles: [
    'Software Developer',
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

/* ── EmailJS init removed — forms now POST to the /api/send-email serverless function ── */

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

  /* Width of the collapsed glass pill: links + gap + actions + padding + border */
  const actions = $('.nav-actions');
  const sizePill = () => {
    if (!menu || !actions) return;
    const w = menu.scrollWidth + 24 + actions.offsetWidth + 32 + 12 + 2;
    navbar.style.setProperty('--nav-pill-w', `${Math.ceil(w)}px`);
  };
  sizePill();
  window.addEventListener('resize', throttle(sizePill, 150));
  document.fonts?.ready.then(sizePill);

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
    '.certificate-card',
    '.services-grid .service-card',
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
   GITHUB INTEGRATION
   ============================================================= */
/* Repos never shown as GitHub cards (lower-case names):
   - already hand-written as cards in index.html (avoid duplicates)
   - not portfolio pieces (this site, profile README, lab/sample repos) */
const HIDDEN_REPOS = new Set([
  // hand-written cards
  'rin-nairith-services', 'devscore-ai', 'gokh', 'zeroping', 'prompthub',
  'todo_app', 'coffee_aroma_spring', 'cpu-scheduling', 'file_extension',
  // not portfolio pieces
  'protfolio_professional_done', 'rith-1437', 'cc-gic-e20221557',
  'cicd-node-app', 'bot-services', 'trading-discipline',
]);

async function fetchGitHubRepos() {
  try {
    const url = `${CONFIG.github.apiUrl}?per_page=${CONFIG.github.perPage}&sort=updated`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const repos = await response.json();
    return repos.filter(repo =>
      !repo.private && !repo.fork && !HIDDEN_REPOS.has(repo.name.toLowerCase()));
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error);
    return [];
  }
}

/* Local screenshots for repos that have one; matched by lower-case repo name */
const PROJECT_IMAGES = {
  'rin-nairith-services': './images/service.png',
  'devscore-ai': './images/gitradar.png',
  'gokh': './images/gokh.png',
  'zeroping': './images/zeroping.png',
  'prompthub': './images/prompthub.png',
  'todo_app': './images/todo.png',
  'high-school-math': './images/high-school-math.jpg',
  'ecommerce-project-vue': './images/ecommerce-vue.jpg',
  'microsoft-office-learning': './images/office-academy.jpg',
  'typing_master': './images/typing-master.jpg',
};

/* Live-site URLs that override the repo's GitHub "Website" field */
const PROJECT_HOMEPAGES = {
  'high-school-math': 'https://math-high-school.vercel.app/',
  'chess-with-ai': '', // deployment is gone (404) — hide the live link
};

/* Hand-written card content that replaces the short GitHub repo description/topics */
const PROJECT_DETAILS = {
  'high-school-math': {
    title: 'High School Math – Digital Textbook',
    description: 'Free English & Khmer math textbook for Cambodian Grades 7–12, with 264 formulas, step-by-step worked examples, a 2D/3D Shape Lab, and Diploma & BacII exam practice.',
    tech: ['React', 'TypeScript', 'Vite', 'KaTeX', 'Vitest', 'Playwright', 'Khmer / English'],
    caseStudy: 'projects/high-school-math.html',
  },
};

/* GitHub repos pinned to the start of page 1 with a Featured badge (in this order) */
const FEATURED_REPOS = ['high-school-math'];

/* Fallback shown if the GitHub preview image fails to load */
const PROJECT_FALLBACK_IMG = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop';

/* Each repo gets its own image: a local screenshot if we have one,
   otherwise GitHub's generated social preview (name, description,
   language, stars) — or the repo's custom social preview if set. */
function projectImageFor(repo) {
  const local = PROJECT_IMAGES[repo.name.toLowerCase()];
  if (local) return local;
  const version = encodeURIComponent(repo.pushed_at || repo.updated_at || '1');
  return `https://opengraph.githubassets.com/${version}/${repo.full_name}`;
}

function createProjectCard(repo) {
  const article = document.createElement('article');
  article.className = 'project-card github-project';
  article.setAttribute('data-animate', 'fade-up');

  const language = repo.language || 'Unknown';
  const details = PROJECT_DETAILS[repo.name.toLowerCase()] || {};
  const title = details.title || repo.name.replace(/-|_/g, ' ');
  const description = details.description || repo.description || 'No description available.';
  const key = repo.name.toLowerCase();
  const homepage = key in PROJECT_HOMEPAGES ? PROJECT_HOMEPAGES[key] : repo.homepage;
  const hasHomepage = homepage && homepage.trim() !== '';
  const isFeatured = FEATURED_REPOS.includes(repo.name.toLowerCase());
  
  // Extract primary topics/languages for tech tags
  const topics = repo.topics || [];
  const techTags = details.tech
    ? details.tech.map(t => `<span>${t}</span>`).join('')
    : topics.length > 0 
    ? topics.slice(0, 5).map(t => `<span>${t}</span>`).join('')
    : `<span>${language}</span>`;

  // Format dates
  const updated = new Date(repo.updated_at);
  const formattedDate = updated.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' });

  article.innerHTML = `
    <div class="project-img">
      <img src="${projectImageFor(repo)}"
           class="${PROJECT_IMAGES[repo.name.toLowerCase()] ? '' : 'project-img--gh-preview'}"
           alt="${repo.name} preview"
           loading="lazy"
           width="600"
           height="340"
           onerror="this.onerror=null;this.src='${PROJECT_FALLBACK_IMG}';" />
      <a href="${repo.html_url}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="project-gh-btn" 
         aria-label="View ${repo.name} on GitHub">
        <i class="fab fa-github" aria-hidden="true"></i>
      </a>
    </div>
    <div class="project-body">
      <div class="project-top">
        <div>
          <span class="project-date">${formattedDate}</span>
          <h3>${title}</h3>
        </div>
        ${isFeatured
          ? '<span class="project-status project-status--live">Featured</span>'
          : repo.stargazers_count > 0 ? `<span class="project-status project-status--live">★ ${repo.stargazers_count}</span>` : ''}
      </div>
      <p>${description}</p>
      <div class="project-tech">
        ${techTags}
      </div>
    </div>
    ${hasHomepage || details.caseStudy ? `
      <div class="project-footer">
        ${hasHomepage ? `
        <a href="${homepage}"
           target="_blank"
           rel="noopener noreferrer"
           class="project-link">
          <i class="fas fa-external-link-alt" aria-hidden="true"></i> ${details.caseStudy ? 'Live Site' : 'View Live Site'}
        </a>` : ''}
        ${details.caseStudy ? `
        <a href="${details.caseStudy}" class="project-link project-link--case">
          <i class="fas fa-book-open" aria-hidden="true"></i> Case Study
        </a>` : ''}
      </div>
    ` : ''}
  `;

  return article;
}

async function loadGitHubProjects() {
  const grid = $('.projects-grid');
  if (!grid) return;

  // Show loading indicator
  const loader = document.createElement('div');
  loader.className = 'github-loading';
  loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading projects from GitHub...';
  loader.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);';
  grid.appendChild(loader);

  const repos = await fetchGitHubRepos();
  
  // Remove loader
  loader.remove();

  if (repos.length === 0) {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'github-error';
    errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Unable to load GitHub projects.';
    errorMsg.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);';
    grid.appendChild(errorMsg);
    initProjectsPagination();
    return;
  }

  // Add GitHub project cards to the grid; featured repos go first on page 1
  const featured = [];
  repos.forEach(repo => {
    const card = createProjectCard(repo);
    const rank = FEATURED_REPOS.indexOf(repo.name.toLowerCase());
    if (rank === -1) grid.appendChild(card);
    else featured[rank] = card;
  });
  featured.filter(Boolean).reverse().forEach(card => grid.prepend(card));

  // Re-run pagination with all projects (keeps the current page)
  initProjectsPagination();
}

/* =============================================================
   PROJECTS PAGINATION (6 per page)
   ============================================================= */
/* State lives outside the function so it can be called again (after the
   GitHub cards arrive) without resetting the page or re-binding buttons.
   The current page is kept in the URL (?page=N) so it survives a reload. */
const projectsPager = { cards: [], current: 1, wanted: 1, bound: false };

function readPageFromUrl() {
  const n = parseInt(new URLSearchParams(location.search).get('page'), 10);
  return Number.isInteger(n) && n > 0 ? n : 1;
}

function writePageToUrl(page) {
  const url = new URL(location.href);
  if (page > 1) url.searchParams.set('page', String(page));
  else url.searchParams.delete('page');
  history.replaceState(history.state, '', url);
}

function initProjectsPagination() {
  const grid = $('.projects-grid');
  const pagination = $('#projects-pagination');
  if (!grid || !pagination) return;

  const pagesWrap = $('#pagination-pages');
  const prevBtn   = $('#pagination-prev');
  const nextBtn   = $('#pagination-next');
  const perPage   = 6;
  const state     = projectsPager;

  state.cards = $$('.project-card', grid);
  const pages = Math.max(1, Math.ceil(state.cards.length / perPage));

  if (!state.bound) state.wanted = readPageFromUrl();
  // Use the page asked for (URL or last click) once enough cards exist
  state.current = Math.min(state.wanted, pages);

  function goTo(page) {
    state.current = state.wanted = page;
    writePageToUrl(page);
    render();
    animatePageIn();
    scrollGridIntoView();
  }

  function animatePageIn() {
    if (prefersReducedMotion) return;
    state.cards.filter(c => !c.classList.contains('hidden')).forEach((card, i) => {
      card.classList.remove('page-enter');
      void card.offsetWidth; // restart the animation
      card.style.animationDelay = `${i * 70}ms`;
      card.classList.add('page-enter');
      card.addEventListener('animationend', () => card.classList.remove('page-enter'), { once: true });
    });
  }

  function render() {
    const current = state.current;
    let idx = 0;
    state.cards.forEach((card, i) => {
      const show = Math.floor(i / perPage) + 1 === current;
      card.classList.toggle('hidden', !show);
      if (show) {
        card.style.order = String(idx++);
        card.classList.add('is-visible');
      }
    });

    /* rebuild page number buttons (windowed: 1 … 3 4 5 … 7) */
    pagesWrap.innerHTML = '';

    const EDGE_PAGES = 1; // always show this many pages at each end
    const SIBLINGS = 1;   // pages shown either side of the current page

    const items = [];
    for (let p = 1; p <= pages; p++) {
      const isEdge = p <= EDGE_PAGES || p > pages - EDGE_PAGES;
      const isNear = Math.abs(p - current) <= SIBLINGS;
      if (isEdge || isNear) items.push(p);
      else if (items[items.length - 1] !== '…') items.push('…');
    }

    items.forEach(item => {
      if (item === '…') {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.textContent = '…';
        ellipsis.setAttribute('aria-hidden', 'true');
        pagesWrap.appendChild(ellipsis);
        return;
      }
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pagination-page' + (item === current ? ' active' : '');
      btn.textContent = String(item);
      btn.setAttribute('aria-label', `Page ${item}`);
      btn.setAttribute('aria-current', item === current ? 'page' : 'false');
      btn.addEventListener('click', () => goTo(item));
      pagesWrap.appendChild(btn);
    });

    prevBtn.disabled = current === 1;
    nextBtn.disabled = current === pages;
    prevBtn.setAttribute('aria-disabled', String(current === 1));
    nextBtn.setAttribute('aria-disabled', String(current === pages));
  }

  /* After changing page, bring the top of the project grid into view */
  function scrollGridIntoView() {
    const top = grid.getBoundingClientRect().top + window.scrollY - 90;
    if (Math.abs(window.scrollY - top) > 4) window.scrollTo({ top, behavior: 'smooth' });
  }

  // Bind prev/next once; they read the shared state, so re-init is safe
  if (!state.bound) {
    prevBtn?.addEventListener('click', () => {
      if (state.current > 1) goTo(state.current - 1);
    });
    nextBtn?.addEventListener('click', () => {
      const total = Math.ceil(state.cards.length / perPage);
      if (state.current < total) goTo(state.current + 1);
    });
    state.bound = true;
  }

  render();
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

    const payload = {
      name:   $('#name', form).value,
      email:  $('#email', form).value,
      subject: $('#subject', form).value,
      message: $('#message', form).value,
    };

    try {
      const response = await fetch(CONFIG.api.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.error || 'send_failed');
      }

      showNotification('Message sent! I\'ll get back to you soon.', 'success');
      form.reset();
    } catch (err) {
      const txt = String(err?.message || '').toLowerCase();
      const msg = txt.includes('not_configured') || txt.includes('not configured') || txt.includes('api key is not configured')
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
   CUSTOM CURSOR
   ============================================================= */
function initCursor() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!finePointer || prefersReducedMotion) return;

  const dot  = $('.cursor-dot');
  const ring = $('.cursor-ring');
  const glow = $('.cursor-glow');
  const point = $('.cursor-point');
  if (!dot || !ring || !glow || !point) return;

  document.body.classList.add('custom-cursor');

  let mouseX = -100, mouseY = -100;
  let ringX = -100,  ringY = -100;
  let glowX = -100,  glowY = -100;
  let visible = false;
  let rafId = null;
  let hovering = false;

  function setDot(x, y) {
    dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  }
  function setRing(x, y) {
    ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  }
  function setGlow(x, y) {
    glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  }
  function setPoint(x, y) {
    /* tip (top-left corner of the caret) sits exactly on the cursor */
    point.style.transform = `translate(${x - 24}px, ${y}px)`;
  }

  function loop() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    setRing(ringX, ringY);
    setGlow(glowX, glowY);
    rafId = requestAnimationFrame(loop);
  }

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    setDot(mouseX, mouseY);
    setPoint(mouseX, mouseY);

    if (!visible) {
      visible = true;
      document.body.classList.add('visible');
      ringX = mouseX;
      ringY = mouseY;
      glowX = mouseX;
      glowY = mouseY;
      setRing(ringX, ringY);
      setGlow(glowX, glowY);
      loop();
    }

    const target = e.target.closest('a, button, .btn, .project-link, .project-gh-btn, .chip, .highlight-item, .service-card, .skill-group, input, textarea, [role="button"]');
    const nowHovering = !!target;
    if (nowHovering !== hovering) {
      hovering = nowHovering;
      document.body.classList.toggle('cursor-hovering', hovering);
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    visible = false;
    document.body.classList.remove('visible');
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  });
}

/* =============================================================
   MOTION — word reveals, count-up, tilt, spotlight, magnetic buttons
   ============================================================= */
function initMotion() {
  /* Split section titles into words so they can rise in one by one */
  $$('.section-title').forEach(title => {
    if (title.dataset.split) return;
    title.dataset.split = '1';
    let i = 0;
    [...title.childNodes].forEach(node => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        const word = document.createElement('span');
        word.className = 'word';
        const inner = document.createElement('span');
        inner.className = 'word-inner';
        inner.style.setProperty('--i', i++);
        inner.textContent = part;
        word.appendChild(inner);
        frag.appendChild(word);
      });
      node.replaceWith(frag);
    });
  });

  /* Index skill chips for the staggered pop-in */
  $$('.skills-grid .chip').forEach((chip, i) => chip.style.setProperty('--i', i));

  if (prefersReducedMotion) return;

  /* Count up numeric stats (e.g. "15+") when they scroll into view */
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      countObs.unobserve(entry.target);
      const el = entry.target;
      const m = el.textContent.trim().match(/^(\d+)(.*)$/);
      if (!m) return;
      const target = parseInt(m[1], 10);
      const suffix = m[2];
      const start = performance.now();
      const dur = 1200;
      const tick = now => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('.stat-num').forEach(el => { if (/^\d/.test(el.textContent.trim())) countObs.observe(el); });

  /* Pointer effects only on devices with a real hover pointer */
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const CARD_SEL = '.project-card, .service-card, .certificate-card, .timeline-card, .about-card';
  const TILT_SEL = '.project-card, .service-card';
  const MAX_TILT = 6; // degrees

  /* Spotlight + 3D tilt (delegated, so GitHub cards added later work too) */
  document.addEventListener('pointermove', e => {
    const card = e.target.closest?.(CARD_SEL);
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);

    if (card.matches(TILT_SEL)) {
      const rx = ((y / r.height) - 0.5) * -MAX_TILT;
      const ry = ((x / r.width) - 0.5) * MAX_TILT;
      card.classList.add('is-tilting');
      card.style.transform =
        `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
    }
  }, { passive: true });

  document.addEventListener('pointerout', e => {
    const card = e.target.closest?.(TILT_SEL);
    if (!card || card.contains(e.relatedTarget)) return;
    card.classList.remove('is-tilting');
    card.style.transform = '';
  }, { passive: true });

  /* Magnetic buttons: drift slightly toward the cursor */
  $$('.btn, .theme-toggle').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
      btn.classList.add('is-magnet');
      btn.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.classList.remove('is-magnet');
      btn.style.translate = '';
    });
  });
}

/* =============================================================
   BOOT — initialise everything after DOM ready
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initTyping();
  initMotion();
  initScrollAnimations();
  initProjectsPagination(); // paginate the static cards straight away
  loadGitHubProjects();     // then add GitHub cards and re-paginate
  initBackToTop();
  initFooter();
  initCursor();
  initParticles();
  initContactForm();
});
