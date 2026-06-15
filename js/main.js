// ============================================================
// MONISHA BAHUGUNA — MAIN SCRIPT v3
// Reads from /cms-data/ JSON files (editable via Netlify CMS)
// ============================================================

async function loadJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('Could not load ' + url);
  return r.json();
}

async function loadAll() {
  const [homepage, projectFiles, testimonialFiles, pubFiles] = await Promise.all([
    loadJSON('/cms-data/homepage.json'),
    fetch('/cms-data/projects/').then(() => null).catch(() => null), // directory listing not possible via fetch
    null, null
  ]);

  // We load each file by known name — CMS creates these files
  const projectNames = [
    'tian-films','ncgg','iari-pusa-krishi','iit-mandi','uttarakhand-tourism','wwf-hdfc'
  ];
  const testimonialNames = ['sanjeev-chopra','sanyukta-samaddar','akshat-samaria'];
  const pubNames = [
    'it-happened-one-night','brush-with-fate','agri-startup-innovations',
    'good-governance-compilation','augmented-reality-research','urban-voices','the-pioneer'
  ];

  const [projects, testimonials, publications] = await Promise.all([
    Promise.all(projectNames.map(n => loadJSON(`/cms-data/projects/${n}.json`).catch(() => null))).then(a => a.filter(Boolean).sort((a,b) => a.order - b.order)),
    Promise.all(testimonialNames.map(n => loadJSON(`/cms-data/testimonials/${n}.json`).catch(() => null))).then(a => a.filter(Boolean).sort((a,b) => a.order - b.order)),
    Promise.all(pubNames.map(n => loadJSON(`/cms-data/publications/${n}.json`).catch(() => null))).then(a => a.filter(Boolean).sort((a,b) => a.order - b.order)),
  ]);

  return { homepage, projects, testimonials, publications };
}

document.addEventListener('DOMContentLoaded', async () => {

  // ── CUSTOM CURSOR ─────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0, folX = 0, folY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });
  function animateFollower() {
    folX += (mouseX - folX) * 0.12;
    folY += (mouseY - folY) * 0.12;
    follower.style.left = folX + 'px';
    follower.style.top  = folY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
  document.querySelectorAll('a, button, .project-tile, .skill-chip').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  // ── LOAD DATA ─────────────────────────────────────────────
  let data;
  try {
    data = await loadAll();
  } catch(e) {
    console.error('Failed to load CMS data:', e);
    return;
  }

  const { homepage: d, projects, testimonials, publications } = data;

  // ── PAGE TITLE ────────────────────────────────────────────
  document.title = d.name + ' — Communications & PR';

  // ── TICKER ────────────────────────────────────────────────
  const track = document.getElementById('ticker-track');
  const stats = [...d.stats, ...d.stats];
  track.innerHTML = stats.map(s => `
    <div class="ticker-item">
      <span class="ticker-num">${s.number}</span>
      <span class="ticker-lbl">${s.label}</span>
    </div>
  `).join('');

  // ── PROJECTS WALL ─────────────────────────────────────────
  const wall = document.getElementById('projects-wall');
  wall.innerHTML = projects.map((p, i) => {
    const initial = p.title[0];
    const mediaHTML = p.image
      ? `<img src="${p.image}" alt="${p.title}" class="project-tile-img" loading="lazy">`
      : `<div class="project-tile-placeholder"><span class="placeholder-letter">${initial}</span></div>`;
    return `
      <article class="project-tile reveal" style="transition-delay:${i*0.05}s">
        ${mediaHTML}
        <div class="project-tile-overlay">
          <div class="project-meta">${p.category} · ${p.year}</div>
          <h3 class="project-tile-title">${p.title}</h3>
          <p class="project-tile-desc">${p.description}</p>
          <div class="project-tags">
            ${(p.tags||[]).map(t=>`<span class="project-tag">${t}</span>`).join('')}
          </div>
        </div>
      </article>
    `;
  }).join('');

  // ── ABOUT ─────────────────────────────────────────────────
  document.getElementById('about-bio').innerHTML =
    (d.bio||[]).map(p => `<p>${p}</p>`).join('');
  document.getElementById('skills-wrap').innerHTML =
    (d.skills||[]).map(s => `<span class="skill-chip">${s}</span>`).join('');

  // ── TESTIMONIALS ──────────────────────────────────────────
  document.getElementById('testimonials-grid').innerHTML =
    testimonials.map((t,i) => `
      <div class="tcard reveal" style="transition-delay:${i*0.1}s">
        <p class="tcard-quote">"${t.quote}"</p>
        <div class="tcard-name">${t.name}</div>
        <div class="tcard-title">${t.title}</div>
        <div class="tcard-rel">${t.relationship}</div>
      </div>
    `).join('');

  // ── PUBLICATIONS ──────────────────────────────────────────
  document.getElementById('pub-list').innerHTML =
    publications.map((p,i) => `
      <div class="pub-item reveal" style="transition-delay:${i*0.06}s">
        <span class="pub-type">${p.type}</span>
        <div>
          <div class="pub-title">${p.title}</div>
          <div class="pub-desc">${p.description}</div>
        </div>
        <span class="pub-year">${p.year}</span>
      </div>
    `).join('');

  // ── EMAIL LINKS ───────────────────────────────────────────
  document.querySelectorAll('[data-email]').forEach(el => {
    el.textContent = d.email;
    el.setAttribute('href', `mailto:${d.email}`);
  });
  document.querySelectorAll('[data-linkedin]').forEach(el => el.setAttribute('href', d.linkedin));

  // ── SCROLL REVEAL ─────────────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  const observeAll = () => {
    document.querySelectorAll('.reveal:not(.observed)').forEach(el => {
      el.classList.add('observed'); observer.observe(el);
    });
  };
  setTimeout(observeAll, 100);
  window.addEventListener('scroll', observeAll, { passive: true });

  // ── LOADER ────────────────────────────────────────────────
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.getElementById('hero').classList.add('hero-animated');
      document.getElementById('hero-img').classList.add('loaded');
    }, 1800);
  });

  // ── NAV ───────────────────────────────────────────────────
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('blended', window.scrollY > 80);
  }, { passive: true });

  // ── MOBILE MENU ───────────────────────────────────────────
  const menu = document.getElementById('mobile-menu');
  document.getElementById('hamburger').addEventListener('click', () => menu.classList.add('open'));
  document.getElementById('mobile-close').addEventListener('click', () => menu.classList.remove('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

  // ── SMOOTH SCROLL ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
