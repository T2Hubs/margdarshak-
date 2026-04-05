// =============================================
//  MARGDARSHAK — MAIN JS
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  renderFees();
  renderResults();
  renderFacilities();
  renderGallery();
  renderNotices();
  renderTicker();
  renderTestimonials();
  renderContact();
  initNavbar();
  initHamburger();
  initCounter();
  initReveal();
  initSlider();
  initContactForm();
  initLightbox();
});

function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
}

function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  btn.addEventListener('click', () => links.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

function initCounter() {
  const nums = document.querySelectorAll('.stat-num');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.target;
      let cur = 0;
      const step = Math.ceil(target / 60);
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur.toLocaleString();
        if (cur >= target) clearInterval(t);
      }, 25);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ===== COURSES =====
function renderCourses() {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;
  grid.innerHTML = getData('courses').map(c => `
    <div class="course-card reveal">
      <div class="course-header">
        <div class="course-icon">${c.icon}</div>
        <h3>${c.title}</h3>
        <p>${c.subtitle}</p>
      </div>
      <div class="course-body">
        <div class="course-tags">${c.tags.map(t => `<span class="course-tag">${t}</span>`).join('')}</div>
        <ul class="course-features">
          ${c.features.map(f => `<li><i class="fas fa-check-circle"></i>${f}</li>`).join('')}
        </ul>
      </div>
      <div class="course-footer">
        <div class="course-price">
          <span class="price">${c.price}</span>
          <span class="per">${c.per}</span>
        </div>
        <a href="pages/admission.html" class="btn btn-primary full-width" style="justify-content:center">
          Enroll Now <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>`).join('');
}

// ===== FEES =====
function renderFees() {
  const grid = document.getElementById('feesGrid');
  if (!grid) return;
  grid.innerHTML = getData('fees').map(f => `
    <div class="fee-card ${f.featured ? 'featured' : ''} reveal">
      ${f.badge ? `<div class="fee-badge">${f.badge}</div>` : ''}
      <div class="fee-header"><h3>${f.title}</h3><p>${f.subtitle}</p></div>
      <div class="fee-price">
        <div class="fee-amount"><span>₹</span>${f.amount}</div>
        <div class="fee-period">${f.period}</div>
      </div>
      <ul class="fee-includes">
        ${f.includes.map(i => `<li><i class="fas fa-check-circle"></i>${i}</li>`).join('')}
      </ul>
    </div>`).join('');
}

// ===== RESULTS =====
function renderResults() {
  const grid = document.getElementById('resultsGrid');
  if (!grid) return;
  grid.innerHTML = getData('results').map(r => `
    <div class="result-card reveal">
      <div class="result-avatar">${r.emoji}</div>
      <div class="result-name">${r.name}</div>
      <div class="result-exam">${r.exam}</div>
      <div class="result-rank">${r.rank}</div>
      <div class="result-year">${r.year}</div>
    </div>`).join('');
}

// ===== FACILITIES =====
function renderFacilities() {
  const grid = document.getElementById('facilitiesGrid');
  if (!grid) return;
  grid.innerHTML = getData('facilities').map(f => `
    <div class="facility-card reveal">
      <div class="facility-icon"><i class="${f.icon}"></i></div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>`).join('');
}

// ===== GALLERY =====
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = getData('gallery').map((g, i) => `
    <div class="gallery-item reveal" onclick="openLightbox(${i})">
      ${g.img
        ? `<img src="${g.img}" alt="${g.caption}" loading="lazy"/>`
        : `<div class="gallery-placeholder"><i class="fas fa-image"></i><p>${g.caption}</p></div>`}
      <div class="gallery-overlay"><i class="fas fa-expand"></i></div>
    </div>`).join('');
}

// ===== NOTICES =====
function renderNotices() {
  const list = document.getElementById('noticesList');
  if (!list) return;
  list.innerHTML = getData('notices').map(n => `
    <div class="notice-item ${n.type} reveal">
      <div class="notice-icon">${n.icon}</div>
      <div class="notice-content"><h4>${n.title}</h4><p>${n.desc}</p></div>
      <div class="notice-date">${n.date}</div>
    </div>`).join('');
}

// ===== TICKER =====
function renderTicker() {
  const el = document.getElementById('tickerContent');
  if (!el) return;
  el.innerHTML = getData('notices').map(n => `<span>📢 ${n.title}: ${n.desc}</span>`).join('');
}

// ===== TESTIMONIALS =====
let currentSlide = 0;
function renderTestimonials() {
  const slider = document.getElementById('testimonialsSlider');
  const dots   = document.getElementById('sliderDots');
  if (!slider) return;
  const t = getData('testimonials');
  slider.innerHTML = `<div class="testimonials-track" id="testimonialsTrack">
    ${t.map(item => `
      <div class="testimonial-card">
        <div class="testimonial-stars">${'★'.repeat(item.stars)}</div>
        <p class="testimonial-text">"${item.text}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${item.emoji}</div>
          <div>
            <div class="testimonial-name">${item.name}</div>
            <div class="testimonial-course">${item.course}</div>
          </div>
        </div>
      </div>`).join('')}
  </div>`;
  if (dots) dots.innerHTML = t.map((_,i) => `<div class="slider-dot ${i===0?'active':''}" onclick="goToSlide(${i})"></div>`).join('');
}

function initSlider() {
  document.getElementById('prevBtn')?.addEventListener('click', () => {
    const t = getData('testimonials');
    currentSlide = (currentSlide - 1 + t.length) % t.length;
    updateSlider();
  });
  document.getElementById('nextBtn')?.addEventListener('click', () => {
    const t = getData('testimonials');
    currentSlide = (currentSlide + 1) % t.length;
    updateSlider();
  });
  setInterval(() => {
    currentSlide = (currentSlide + 1) % getData('testimonials').length;
    updateSlider();
  }, 5000);
}

function goToSlide(i) { currentSlide = i; updateSlider(); }

function updateSlider() {
  const track = document.getElementById('testimonialsTrack');
  if (track) track.style.transform = `translateX(-${currentSlide * 364}px)`;
  document.querySelectorAll('.slider-dot').forEach((d,i) => d.classList.toggle('active', i === currentSlide));
}

// ===== CONTACT =====
function renderContact() {
  const c = getData('contact');
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('contactAddress', c.address);
  set('contactPhone',   c.phone);
  set('contactEmail',   c.email);
  set('contactTiming',  c.timing);
  set('footerAddress',  '📍 ' + c.address);
  set('footerPhone',    '📞 ' + c.phone);
  set('footerEmail',    '✉️ '  + c.email);
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ===== LIGHTBOX =====
function openLightbox(index) {
  const item = getData('gallery')[index];
  const lb   = document.getElementById('lightbox');
  const img  = document.getElementById('lightboxImg');
  const cap  = document.getElementById('lightboxCaption');
  if (!lb) return;
  img.src = item.img || '';
  img.style.display = item.img ? 'block' : 'none';
  cap.textContent = item.caption;
  lb.classList.add('active');
}

function initLightbox() {
  document.getElementById('lightboxOverlay')?.addEventListener('click', () => document.getElementById('lightbox').classList.remove('active'));
  document.getElementById('lightboxClose')?.addEventListener('click',   () => document.getElementById('lightbox').classList.remove('active'));
}