// ============================================================
// MONISHA BAHUGUNA — MAIN SCRIPT v4
// Robust loader with fallback data built in
// ============================================================

// ── FALLBACK DATA (always works even if JSON files fail) ───
const FALLBACK = {
  homepage: {
    name: "Monisha Bahuguna",
    tagline: "Strategic Communications & Public Relations",
    heroSubtitle: "Crafting narratives that move people, policies, and organisations forward.",
    location: "New Delhi, India",
    email: "monishabahuguna63@gmail.com",
    phone: "+91 89795 23284",
    linkedin: "https://www.linkedin.com/in/monisha-bahuguna/",
    bio: [
      "I began my career as a reporter in Dehradun, writing about the mountains, the people, and the stories that rarely make it to national headlines. That instinct — to find the human thread inside complex systems — has shaped everything I've done since.",
      "Over 8 years, I've led communications for government bodies, IITs, international development organisations, and a Bollywood production house. My work sits at the intersection of public health, governance, and storytelling.",
      "I hold an MA in Media and Communication Studies from Doon University, and I've been published in national dailies, two anthologies, and peer-reviewed research."
    ],
    skills: ["Strategic Communication Planning","Public Relations & Media Relations","Crisis Communication","Public Health Communication","Policy Advocacy & Behaviour Change","Brand Visibility & Positioning","Speechwriting & Thought Leadership","Multi-Channel Campaigns","Content Creation & Storytelling","Stakeholder Engagement","Digital Analytics","Event Planning & Coordination"],
    stats: [
      {"number":"8+","label":"Years of Experience"},
      {"number":"30+","label":"Nations Reached"},
      {"number":"1M+","label":"Combined Social Reach"},
      {"number":"20+","label":"National Media Placements"},
      {"number":"2","label":"Published Books"},
      {"number":"40+","label":"Skills Across Disciplines"},
      {"number":"1,200+","label":"Startup Enrollments Driven"}
    ]
  },
  projects: [
    {title:"Tian Films",category:"Entertainment PR",year:"2026",description:"Freelance PR & Communications Consultant managing strategic public relations for Tian Films, including the music event featuring Nikhar Juneja (ANTAR NAAD). Building media presence and audience narrative for the production house.",tags:["Entertainment","Event PR","Media Relations"],order:1},
    {title:"National Centre for Good Governance",category:"Governance & Policy",year:"2023–2025",description:"Managed press relations for capacity-building programmes spanning 30+ nations. Drafted speeches, whitepapers, and policy briefs for senior bureaucrats at LBSNAA. Communication to African and ASEAN civil servants.",tags:["Governance","Policy","International","Media"],order:2},
    {title:"IARI / Pusa Krishi",category:"Agri-Innovation",year:"2022–2023",description:"Led communications for India's largest agri-innovation incubation programme. Drove 1,200+ startup enrollments, grew social following 40%, achieved 1M+ combined reach. Secured 15+ features on women-led startups.",tags:["Agri-tech","Startups","Social Media","Campaigns"],order:3},
    {title:"IIT Mandi iHub",category:"HealthTech & Innovation",year:"2021–2022",description:"Managed PR campaigns for the Innovation Hub's healthtech initiatives. Organised an international workshop on Indian Knowledge Systems and Mental Health with participants from India, Japan, and Southeast Asia.",tags:["HealthTech","International","PR","Workshops"],order:4},
    {title:"Uttarakhand Tourism — COVID Crisis PR",category:"Crisis Communication",year:"2020–2021",description:"Led crisis communication strategy during COVID-19 to reposition Uttarakhand as a safe wellness tourism destination. Drafted speeches for the Tourism Minister and generated 20+ national media placements.",tags:["Crisis Comms","Tourism","Government","Media"],order:5},
    {title:"WWF India & HDFC Parivartan",category:"Pro Bono / CSR",year:"2023–2025",description:"Communication Consultant at Revive Media — developed creative concepts and messaging for WWF India's wildlife conservation campaigns and HDFC Bank Parivartan community development initiatives.",tags:["CSR","Conservation","Campaigns","Pro Bono"],order:6}
  ],
  testimonials: [
    {name:"Sanjeev Chopra",title:"Senior Fellow, PMML | Former Director General, LBSNAA",relationship:"Direct Manager at NCGG",quote:"Monisha has successfully carried out her mandate as a communications and PR specialist by highlighting the activities of the organisation. She is a dedicated professional whose talents lie in developing communication strategy and building meaningful stakeholder relationships.",order:1},
    {name:"Sanyukta Samaddar",title:"IAS (UP, 1999) | Principal Secretary, Govt of UP | ex-Adviser SDGs, NITI Aayog",relationship:"Direct Manager at NCGG",quote:"Monisha is a dedicated, extremely diligent and sincere professional. I have witnessed her competence and professionalism during my 2 years association with the National Centre for Good Governance, Government of India.",order:2},
    {name:"Akshat Samaria",title:"Strategy & Impact | Sustainability, Finance & Energy",relationship:"Colleague at NCGG",quote:"Monisha is highly professional, proactive, and brings great value to any team through her thoughtful and impactful approach. I highly recommend her for strategic roles and am confident in her ability to make a meaningful impact.",order:3}
  ],
  publications: [
    {title:"It Happened One Night and Other Stories",type:"Published Book",year:"–",description:"Published fiction contributor — short story anthology.",order:1},
    {title:"Brush with Fate and Other Stories",type:"Published Book",year:"–",description:"Published fiction contributor — short story anthology.",order:2},
    {title:"Agri-Startup Innovations 2022",type:"Co-authored Report",year:"2022",description:"Women-centric and climate-focused startup case studies, published by Pusa Krishi, IARI.",order:3},
    {title:"Good Governance Policies Compilation",type:"Documentation",year:"2024",description:"Compiled and documented governance case studies from the 7th Capacity Building Programme for Senior Civil Servants of Sri Lanka, NCGG.",order:4},
    {title:"Augmented Reality in Communication",type:"Research Paper",year:"2019",description:"Presented at International Conference on Innovations in Business Management (AIJR).",order:5},
    {title:"Urban Voices (Ongoing)",type:"Column / Articles",year:"2024–Present",description:"Environmental storytelling and urban governance narratives from Uttarakhand.",order:6},
    {title:"The Pioneer — 30+ Bylines",type:"Journalism",year:"2018–2019",description:"Authored 30+ articles covering environment, migration, governance, climate change, and social impact.",order:7}
  ]
};

async function tryLoadJSON(url) {
  try {
    const r = await fetch(url);
    if (r.ok) return await r.json();
    return null;
  } catch { return null; }
}

async function loadData() {
  // Try to load from CMS files, fall back to built-in data
  const [hp, ...projectResults] = await Promise.all([
    tryLoadJSON('/cms-data/homepage.json'),
    tryLoadJSON('/cms-data/projects/tian-films.json'),
    tryLoadJSON('/cms-data/projects/ncgg.json'),
    tryLoadJSON('/cms-data/projects/iari-pusa-krishi.json'),
    tryLoadJSON('/cms-data/projects/iit-mandi.json'),
    tryLoadJSON('/cms-data/projects/uttarakhand-tourism.json'),
    tryLoadJSON('/cms-data/projects/wwf-hdfc.json'),
  ]);

  const [t1,t2,t3] = await Promise.all([
    tryLoadJSON('/cms-data/testimonials/sanjeev-chopra.json'),
    tryLoadJSON('/cms-data/testimonials/sanyukta-samaddar.json'),
    tryLoadJSON('/cms-data/testimonials/akshat-samaria.json'),
  ]);

  const pubNames = ['it-happened-one-night','brush-with-fate','agri-startup-innovations','good-governance-compilation','augmented-reality-research','urban-voices','the-pioneer'];
  const pubResults = await Promise.all(pubNames.map(n => tryLoadJSON(`/cms-data/publications/${n}.json`)));

  return {
    homepage:     hp || FALLBACK.homepage,
    projects:     projectResults.filter(Boolean).length > 0 ? projectResults.filter(Boolean).sort((a,b)=>a.order-b.order) : FALLBACK.projects,
    testimonials: [t1,t2,t3].filter(Boolean).length > 0 ? [t1,t2,t3].filter(Boolean).sort((a,b)=>a.order-b.order) : FALLBACK.testimonials,
    publications: pubResults.filter(Boolean).length > 0 ? pubResults.filter(Boolean).sort((a,b)=>a.order-b.order) : FALLBACK.publications,
  };
}

document.addEventListener('DOMContentLoaded', async () => {

  // ── CUSTOM CURSOR ─────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0, folX = 0, folY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px';
  });
  function animateFollower() {
    folX += (mouseX - folX) * 0.12; folY += (mouseY - folY) * 0.12;
    follower.style.left = folX + 'px'; follower.style.top = folY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
  document.querySelectorAll('a, button, .project-tile, .skill-chip').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  // ── LOAD ALL DATA ─────────────────────────────────────────
  const { homepage: d, projects, testimonials, publications } = await loadData();

  // ── PAGE TITLE ────────────────────────────────────────────
  document.title = d.name + ' — Communications & PR';

  // ── TICKER ────────────────────────────────────────────────
  const track = document.getElementById('ticker-track');
  const stats = [...d.stats, ...d.stats];
  track.innerHTML = stats.map(s => `
    <div class="ticker-item">
      <span class="ticker-num">${s.number}</span>
      <span class="ticker-lbl">${s.label}</span>
    </div>`).join('');

  // ── PROJECTS WALL ─────────────────────────────────────────
  document.getElementById('projects-wall').innerHTML = projects.map((p, i) => {
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
          <div class="project-tags">${(p.tags||[]).map(t=>`<span class="project-tag">${t}</span>`).join('')}</div>
        </div>
      </article>`;
  }).join('');

  // ── ABOUT ─────────────────────────────────────────────────
  document.getElementById('about-bio').innerHTML = (d.bio||[]).map(p=>`<p>${p}</p>`).join('');
  document.getElementById('skills-wrap').innerHTML = (d.skills||[]).map(s=>`<span class="skill-chip">${s}</span>`).join('');

  // ── TESTIMONIALS ──────────────────────────────────────────
  document.getElementById('testimonials-grid').innerHTML = testimonials.map((t,i)=>`
    <div class="tcard reveal" style="transition-delay:${i*0.1}s">
      <p class="tcard-quote">"${t.quote}"</p>
      <div class="tcard-name">${t.name}</div>
      <div class="tcard-title">${t.title}</div>
      <div class="tcard-rel">${t.relationship}</div>
    </div>`).join('');

  // ── PUBLICATIONS ──────────────────────────────────────────
  document.getElementById('pub-list').innerHTML = publications.map((p,i)=>`
    <div class="pub-item reveal" style="transition-delay:${i*0.06}s">
      <span class="pub-type">${p.type}</span>
      <div><div class="pub-title">${p.title}</div><div class="pub-desc">${p.description}</div></div>
      <span class="pub-year">${p.year}</span>
    </div>`).join('');

  // ── EMAIL / LINKEDIN ──────────────────────────────────────
  document.querySelectorAll('[data-email]').forEach(el => {
    el.textContent = d.email; el.setAttribute('href', `mailto:${d.email}`);
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
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('hero').classList.add('hero-animated');
    const heroImg = document.getElementById('hero-img');
    if (heroImg) heroImg.classList.add('loaded');
  }, 1000);

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
