// ===== Sticky / Auto-hide navbar (enhanced) =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const titleSpacer = document.querySelector('.title_space');

function isTitleVisible() {
  const rect = titleSpacer.getBoundingClientRect();
  return rect.bottom > 0;
}

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (isTitleVisible()) {
    navbar.classList.remove('hide');
  } else {
    if (currentScroll > lastScroll + 4) {
      navbar.classList.add('hide');
    } else if (currentScroll < lastScroll - 4) {
      navbar.classList.remove('hide');
    }
  }
  lastScroll = currentScroll;
}, { passive: true });

// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav_toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });
}

// ===== Reveal on view =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
revealEls.forEach((el) => io.observe(el));

// ===== Portfolio data =====
// You can extend this array with real projects.
const projects = [
  {
    id: 'neon-gui',
    title: 'Neon GUI',
    desc: 'Fully animated neon backgrounds, buttons and frames.',
    thumb: 'assets/gui1.gif',
    images: ['assets/gui1.gif', 'assets/gui1.gif'],
    tags: ['UI', 'Animation', 'Neon'],
    live: 'https://mielon.eu/projects/neon-gui',
    repo: 'https://github.com/youruser/neon-gui'
  },
  {
    id: 'neon-gui-2',
    title: 'Neon GUI v2',
    desc: 'Rebuilt with accessibility and performance in mind.',
    thumb: 'assets/gui1.gif',
    images: ['assets/gui1.gif'],
    tags: ['UI', 'Performance'],
    live: 'https://mielon.eu/projects/neon-gui-2',
    repo: 'https://github.com/youruser/neon-gui-2'
  },
  {
    id: 'neon-gui-3',
    title: 'Neon Widgets',
    desc: 'Reusable neon-styled widget kit.',
    thumb: 'assets/gui1.gif',
    images: ['assets/gui1.gif'],
    tags: ['Components', 'Design System'],
    live: 'https://mielon.eu/projects/neon-widgets',
    repo: 'https://github.com/youruser/neon-widgets'
  }
];

// ===== Build tag set =====
const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort();

// ===== Render tags (filters) =====
const tagsContainer = document.querySelector('.tags');
let activeTags = new Set();

function renderTags() {
  if (!tagsContainer) return;
  tagsContainer.innerHTML = '';
  allTags.forEach(tag => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.textContent = tag;
    chip.setAttribute('data-tag', tag);
    chip.setAttribute('data-active', activeTags.has(tag) ? 'true' : 'false');
    chip.addEventListener('click', () => {
      if (activeTags.has(tag)) activeTags.delete(tag);
      else activeTags.add(tag);
      renderTags();
      renderGrid();
    });
    tagsContainer.appendChild(chip);
  });
}
renderTags();

// ===== Render grid =====
const grid = document.getElementById('projects-grid');
const searchInput = document.getElementById('project-search');

function matchesFilters(p, q) {
  const query = q.trim().toLowerCase();
  const tagOk = activeTags.size === 0 || p.tags.some(t => activeTags.has(t));
  const textOk = !query ||
    p.title.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query) ||
    p.tags.join(' ').toLowerCase().includes(query);
  return tagOk && textOk;
}

function projectCard(p) {
  const card = document.createElement('article');
  card.className = 'project_card reveal';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Open ${p.title} preview`);
  card.dataset.projectId = p.id;

  card.innerHTML = `
    <div class="project_media">
      <img src="${p.thumb}" alt="${p.title} preview" loading="lazy" decoding="async">
    </div>
    <div class="project_body">
      <h3 class="project_title">${p.title}</h3>
      <p class="project_desc">${p.desc}</p>
      <div class="project_meta">
        ${p.tags.slice(0, 3).map(t => `<span class="badge">${t}</span>`).join('')}
      </div>
      <div class="card_actions">
        <a class="btn card_link" href="${p.live}" target="_blank" rel="noopener" title="Open live demo">Live</a>
        <a class="btn btn--ghost card_link" href="${p.repo}" target="_blank" rel="noopener" title="Open source">Source</a>
      </div>
    </div>
  `;

  // Open modal on click/Enter
  const open = () => openProjectModal(p.id);
  card.addEventListener('click', (e) => {
    // If clicking direct link buttons, let them pass
    const isLink = e.target.closest('.card_link');
    if (!isLink) open();
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });

  return card;
}

function renderGrid() {
  if (!grid) return;
  const q = searchInput?.value || '';
  grid.innerHTML = '';
  const filtered = projects.filter(p => matchesFilters(p, q));
  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color:var(--muted)">No projects found.</p>`;
    return;
  }
  filtered.forEach(p => grid.appendChild(projectCard(p)));
  // re-observe reveals
  document.querySelectorAll('.project_card.reveal').forEach(el => io.observe(el));
}
renderGrid();

searchInput?.addEventListener('input', () => renderGrid());

// ===== Modal logic =====
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTags = document.getElementById('modal-tags');
const modalLive = document.getElementById('modal-live');
const modalRepo = document.getElementById('modal-repo');

let currentProject = null;
let currentImageIndex = 0;

function openProjectModal(projectId) {
  currentProject = projects.find(p => p.id === projectId);
  if (!currentProject) return;

  modalTitle.textContent = currentProject.title;
  modalDesc.textContent = currentProject.desc;
  modalLive.href = currentProject.live || '#';
  modalRepo.href = currentProject.repo || '#';

  modalTags.innerHTML = '';
  currentProject.tags.forEach(t => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = t;
    modalTags.appendChild(chip);
  });

  currentImageIndex = 0;
  updateModalImage();

  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    // Fallback
    modal.setAttribute('open', 'true');
  }

  document.addEventListener('keydown', onModalKeydown);
}

function closeProjectModal() {
  if (modal.open) modal.close();
  else modal.removeAttribute('open');
  document.removeEventListener('keydown', onModalKeydown);
}

function updateModalImage() {
  const imgs = currentProject.images && currentProject.images.length ? currentProject.images : [currentProject.thumb];
  const clampedIndex = ((currentImageIndex % imgs.length) + imgs.length) % imgs.length;
  currentImageIndex = clampedIndex;
  const src = imgs[clampedIndex];
  modalImg.src = src;
  modalImg.alt = `${currentProject.title} — image ${clampedIndex + 1} of ${imgs.length}`;
}

function nextImage() { currentImageIndex += 1; updateModalImage(); }
function prevImage() { currentImageIndex -= 1; updateModalImage(); }

function onModalKeydown(e) {
  if (e.key === 'Escape') closeProjectModal();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
}

// Bind modal controls
modal?.querySelector('.modal_closebar .icon_button')?.addEventListener('click', closeProjectModal);
modal?.querySelector('.carousel_btn--next')?.addEventListener('click', nextImage);
modal?.querySelector('.carousel_btn--prev')?.addEventListener('click', prevImage);

// Close modal when clicking backdrop (for <dialog>)
modal?.addEventListener('click', (e) => {
  const rect = modal.querySelector('.modal_content')?.getBoundingClientRect();
  if (!rect) return;
  const within = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
  if (!within) closeProjectModal();
});

// ===== Accessibility: trap focus inside modal (minimal) =====
modal?.addEventListener('close', () => {
  // return focus to last focused card
  const card = document.querySelector(`[data-project-id="${currentProject?.id}"]`);
  card?.focus();
});

// ===== Little perf niceties =====
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Preload thumbs used in modal
    projects.forEach(p => p.images?.slice(0,1).forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    }));
  });
}
