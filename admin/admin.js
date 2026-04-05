// =============================================
//  ADMIN DASHBOARD — FULL JS (English)
// =============================================

if (sessionStorage.getItem('mg_admin_auth') !== 'true') {
  window.location.href = 'login.html';
}

let editingId = null;

// ===== NAVIGATION =====
function showSection(name, el) {
  document.querySelectorAll('.section-content').forEach(s => s.style.display = 'none');
  document.querySelector('#sec-' + name).style.display = 'block';
  document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
  if (el) el.classList.add('active');
  document.getElementById('topbarTitle').textContent = el ? el.textContent.trim() : 'Dashboard';
  const loaders = {
    dashboard: loadDashboard, courses: loadCoursesTable, fees: loadFeesTable,
    results: loadResultsTable, facilities: loadFacilitiesTable,
    gallery: loadGalleryAdmin, notices: loadNoticesTable, contact: loadContactForm
  };
  if (loaders[name]) loaders[name]();
}

// ===== ALERT =====
function showAlert(msg, type = 'success') {
  const box = document.getElementById('alertBox');
  box.innerHTML = `<div class="alert alert-${type}"><i class="fas fa-${type==='success'?'check-circle':'exclamation-circle'}"></i> ${msg}</div>`;
  box.style.display = 'block';
  setTimeout(() => box.style.display = 'none', 3000);
}

// ===== DASHBOARD =====
function loadDashboard() {
  document.getElementById('dc-courses').textContent  = getData('courses').length;
  document.getElementById('dc-fees').textContent     = getData('fees').length;
  document.getElementById('dc-results').textContent  = getData('results').length;
  document.getElementById('dc-notices').textContent  = getData('notices').length;
}

// =============================================
//  COURSES
// =============================================
function loadCoursesTable() {
  const tbody = document.querySelector('#coursesTable tbody');
  tbody.innerHTML = getData('courses').map((c, i) => `
    <tr>
      <td>${i+1}</td>
      <td style="font-size:24px">${c.icon}</td>
      <td><strong>${c.title}</strong></td>
      <td>${c.subtitle}</td>
      <td><span class="badge badge-blue">${c.price}</span></td>
      <td>
        <button class="btn btn-outline btn-xs" onclick="editCourse(${c.id})"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-xs" onclick="deleteCourse(${c.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>`).join('');
}

function openAddCourse() {
  editingId = null;
  document.getElementById('courseModalTitle').textContent = 'Add New Course';
  ['c-id','c-icon','c-title','c-subtitle','c-price','c-per','c-tags'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('c-features').value = '';
  openModal('courseModal');
}

function editCourse(id) {
  const c = getData('courses').find(x => x.id === id);
  if (!c) return;
  editingId = id;
  document.getElementById('courseModalTitle').textContent = 'Edit Course';
  document.getElementById('c-id').value       = c.id;
  document.getElementById('c-icon').value     = c.icon;
  document.getElementById('c-title').value    = c.title;
  document.getElementById('c-subtitle').value = c.subtitle;
  document.getElementById('c-price').value    = c.price;
  document.getElementById('c-per').value      = c.per;
  document.getElementById('c-tags').value     = c.tags.join(', ');
  document.getElementById('c-features').value = c.features.join('\n');
  openModal('courseModal');
}

function saveCourse() {
  const courses = getData('courses');
  const obj = {
    id:       editingId || Date.now(),
    icon:     document.getElementById('c-icon').value.trim() || '📚',
    title:    document.getElementById('c-title').value.trim(),
    subtitle: document.getElementById('c-subtitle').value.trim(),
    price:    document.getElementById('c-price').value.trim(),
    per:      document.getElementById('c-per').value.trim(),
    tags:     document.getElementById('c-tags').value.split(',').map(t => t.trim()).filter(Boolean),
    features: document.getElementById('c-features').value.split('\n').map(f => f.trim()).filter(Boolean),
  };
  if (!obj.title) { showAlert('Title is required!', 'error'); return; }
  if (editingId) { const idx = courses.findIndex(x => x.id === editingId); courses[idx] = obj; }
  else courses.push(obj);
  saveData('courses', courses);
  closeModal('courseModal');
  loadCoursesTable();
  showAlert('Course saved successfully!');
}

function deleteCourse(id) {
  if (!confirm('Delete this course?')) return;
  saveData('courses', getData('courses').filter(x => x.id !== id));
  loadCoursesTable();
  showAlert('Course deleted!');
}

// =============================================
//  FEES
// =============================================
function loadFeesTable() {
  const tbody = document.querySelector('#feesTable tbody');
  tbody.innerHTML = getData('fees').map((f, i) => `
    <tr>
      <td>${i+1}</td>
      <td><strong>${f.title}</strong><br/><small style="color:#94a3b8">${f.subtitle}</small></td>
      <td><span class="badge badge-green">₹${f.amount}</span></td>
      <td>${f.featured ? '<span class="badge badge-gold">Yes</span>' : '—'}</td>
      <td>
        <button class="btn btn-outline btn-xs" onclick="editFee(${f.id})"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-xs" onclick="deleteFee(${f.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>`).join('');
}

function editFee(id) {
  const f = getData('fees').find(x => x.id === id);
  if (!f) return;
  editingId = id;
  document.getElementById('feeModalTitle').textContent = 'Edit Fee Plan';
  document.getElementById('f-id').value       = f.id;
  document.getElementById('f-title').value    = f.title;
  document.getElementById('f-subtitle').value = f.subtitle;
  document.getElementById('f-amount').value   = f.amount;
  document.getElementById('f-period').value   = f.period;
  document.getElementById('f-badge').value    = f.badge || '';
  document.getElementById('f-featured').value = f.featured ? 'true' : 'false';
  document.getElementById('f-includes').value = f.includes.join('\n');
  openModal('feeModal');
}

function saveFee() {
  const fees = getData('fees');
  const obj = {
    id:       editingId || Date.now(),
    title:    document.getElementById('f-title').value.trim(),
    subtitle: document.getElementById('f-subtitle').value.trim(),
    amount:   document.getElementById('f-amount').value.trim(),
    period:   document.getElementById('f-period').value.trim(),
    badge:    document.getElementById('f-badge').value.trim(),
    featured: document.getElementById('f-featured').value === 'true',
    includes: document.getElementById('f-includes').value.split('\n').map(x => x.trim()).filter(Boolean),
  };
  if (!obj.title) { showAlert('Title is required!', 'error'); return; }
  if (editingId) { const idx = fees.findIndex(x => x.id === editingId); fees[idx] = obj; }
  else fees.push(obj);
  saveData('fees', fees);
  closeModal('feeModal');
  loadFeesTable();
  showAlert('Fee plan saved successfully!');
}

function deleteFee(id) {
  if (!confirm('Delete this fee plan?')) return;
  saveData('fees', getData('fees').filter(x => x.id !== id));
  loadFeesTable();
  showAlert('Fee plan deleted!');
}

// =============================================
//  RESULTS
// =============================================
function loadResultsTable() {
  const tbody = document.querySelector('#resultsTable tbody');
  tbody.innerHTML = getData('results').map((r, i) => `
    <tr>
      <td>${i+1}</td>
      <td style="font-size:22px">${r.emoji}</td>
      <td><strong>${r.name}</strong></td>
      <td>${r.exam}</td>
      <td><span class="badge badge-gold">${r.rank}</span></td>
      <td>${r.year}</td>
      <td>
        <button class="btn btn-outline btn-xs" onclick="editResult(${r.id})"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-xs" onclick="deleteResult(${r.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>`).join('');
}

function editResult(id) {
  const r = getData('results').find(x => x.id === id);
  if (!r) return;
  editingId = id;
  document.getElementById('resultModalTitle').textContent = 'Edit Result';
  document.getElementById('r-id').value    = r.id;
  document.getElementById('r-emoji').value = r.emoji;
  document.getElementById('r-name').value  = r.name;
  document.getElementById('r-exam').value  = r.exam;
  document.getElementById('r-rank').value  = r.rank;
  document.getElementById('r-year').value  = r.year;
  openModal('resultModal');
}

function saveResult() {
  const results = getData('results');
  const obj = {
    id:    editingId || Date.now(),
    emoji: document.getElementById('r-emoji').value.trim() || '🎓',
    name:  document.getElementById('r-name').value.trim(),
    exam:  document.getElementById('r-exam').value.trim(),
    rank:  document.getElementById('r-rank').value.trim(),
    year:  document.getElementById('r-year').value.trim(),
  };
  if (!obj.name) { showAlert('Name is required!', 'error'); return; }
  if (editingId) { const idx = results.findIndex(x => x.id === editingId); results[idx] = obj; }
  else results.push(obj);
  saveData('results', results);
  closeModal('resultModal');
  loadResultsTable();
  showAlert('Result saved successfully!');
}

function deleteResult(id) {
  if (!confirm('Delete this result?')) return;
  saveData('results', getData('results').filter(x => x.id !== id));
  loadResultsTable();
  showAlert('Result deleted!');
}

// =============================================
//  FACILITIES
// =============================================
function loadFacilitiesTable() {
  const tbody = document.querySelector('#facilitiesTable tbody');
  tbody.innerHTML = getData('facilities').map((f, i) => `
    <tr>
      <td>${i+1}</td>
      <td><i class="${f.icon}" style="color:#1d4ed8;font-size:18px"></i></td>
      <td><strong>${f.title}</strong></td>
      <td style="color:#64748b;font-size:13px;max-width:280px">${f.desc}</td>
      <td>
        <button class="btn btn-outline btn-xs" onclick="editFacility(${f.id})"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-xs" onclick="deleteFacility(${f.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>`).join('');
}

function editFacility(id) {
  const f = getData('facilities').find(x => x.id === id);
  if (!f) return;
  editingId = id;
  document.getElementById('facilityModalTitle').textContent = 'Edit Facility';
  document.getElementById('fac-id').value    = f.id;
  document.getElementById('fac-icon').value  = f.icon;
  document.getElementById('fac-title').value = f.title;
  document.getElementById('fac-desc').value  = f.desc;
  openModal('facilityModal');
}

function saveFacility() {
  const fac = getData('facilities');
  const obj = {
    id:    editingId || Date.now(),
    icon:  document.getElementById('fac-icon').value.trim() || 'fas fa-star',
    title: document.getElementById('fac-title').value.trim(),
    desc:  document.getElementById('fac-desc').value.trim(),
  };
  if (!obj.title) { showAlert('Title is required!', 'error'); return; }
  if (editingId) { const idx = fac.findIndex(x => x.id === editingId); fac[idx] = obj; }
  else fac.push(obj);
  saveData('facilities', fac);
  closeModal('facilityModal');
  loadFacilitiesTable();
  showAlert('Facility saved successfully!');
}

function deleteFacility(id) {
  if (!confirm('Delete this facility?')) return;
  saveData('facilities', getData('facilities').filter(x => x.id !== id));
  loadFacilitiesTable();
  showAlert('Facility deleted!');
}

// =============================================
//  GALLERY
// =============================================
function loadGalleryAdmin() {
  const grid = document.getElementById('galleryAdminGrid');
  grid.innerHTML = getData('gallery').map(g => `
    <div class="gallery-admin-item">
      ${g.img
        ? `<img src="${g.img}" alt="${g.caption}"/>`
        : `<div class="gallery-admin-placeholder"><i class="fas fa-image"></i><p>${g.caption}</p></div>`}
      <div class="gallery-admin-actions">
        <button class="btn btn-outline btn-xs" onclick="editGallery(${g.id})" style="flex:1"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-xs" onclick="deleteGallery(${g.id})"><i class="fas fa-trash"></i></button>
      </div>
    </div>`).join('');
}

function handleGalleryFile(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('g-img').value = e.target.result;
    document.getElementById('g-preview-img').src = e.target.result;
    document.getElementById('g-preview').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function editGallery(id) {
  const g = getData('gallery').find(x => x.id === id);
  if (!g) return;
  editingId = id;
  document.getElementById('galleryModalTitle').textContent = 'Edit Photo';
  document.getElementById('g-id').value      = g.id;
  document.getElementById('g-caption').value = g.caption;
  document.getElementById('g-img').value     = g.img || '';
  const prev = document.getElementById('g-preview');
  if (g.img) { document.getElementById('g-preview-img').src = g.img; prev.style.display = 'block'; }
  else prev.style.display = 'none';
  openModal('galleryModal');
}

function saveGallery() {
  const gallery = getData('gallery');
  const obj = {
    id:      editingId || Date.now(),
    caption: document.getElementById('g-caption').value.trim(),
    img:     document.getElementById('g-img').value.trim(),
  };
  if (!obj.caption) { showAlert('Caption is required!', 'error'); return; }
  if (editingId) { const idx = gallery.findIndex(x => x.id === editingId); gallery[idx] = obj; }
  else gallery.push(obj);
  saveData('gallery', gallery);
  closeModal('galleryModal');
  loadGalleryAdmin();
  showAlert('Gallery item saved!');
}

function deleteGallery(id) {
  if (!confirm('Delete this photo?')) return;
  saveData('gallery', getData('gallery').filter(x => x.id !== id));
  loadGalleryAdmin();
  showAlert('Photo deleted!');
}

// =============================================
//  NOTICES
// =============================================
function loadNoticesTable() {
  const tbody = document.querySelector('#noticesTable tbody');
  tbody.innerHTML = getData('notices').map((n, i) => `
    <tr>
      <td>${i+1}</td>
      <td style="font-size:22px">${n.icon}</td>
      <td><strong>${n.title}</strong></td>
      <td><span class="badge badge-${n.type==='urgent'?'red':n.type==='success'?'green':'blue'}">${n.type}</span></td>
      <td>${n.date}</td>
      <td>
        <button class="btn btn-outline btn-xs" onclick="editNotice(${n.id})"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-xs" onclick="deleteNotice(${n.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>`).join('');
}

function editNotice(id) {
  const n = getData('notices').find(x => x.id === id);
  if (!n) return;
  editingId = id;
  document.getElementById('noticeModalTitle').textContent = 'Edit Notice';
  document.getElementById('n-id').value    = n.id;
  document.getElementById('n-icon').value  = n.icon;
  document.getElementById('n-type').value  = n.type;
  document.getElementById('n-date').value  = n.date;
  document.getElementById('n-title').value = n.title;
  document.getElementById('n-desc').value  = n.desc;
  openModal('noticeModal');
}

function saveNotice() {
  const notices = getData('notices');
  const obj = {
    id:    editingId || Date.now(),
    icon:  document.getElementById('n-icon').value.trim() || '📢',
    type:  document.getElementById('n-type').value,
    date:  document.getElementById('n-date').value.trim(),
    title: document.getElementById('n-title').value.trim(),
    desc:  document.getElementById('n-desc').value.trim(),
  };
  if (!obj.title) { showAlert('Title is required!', 'error'); return; }
  if (editingId) { const idx = notices.findIndex(x => x.id === editingId); notices[idx] = obj; }
  else notices.push(obj);
  saveData('notices', notices);
  closeModal('noticeModal');
  loadNoticesTable();
  showAlert('Notice saved successfully!');
}

function deleteNotice(id) {
  if (!confirm('Delete this notice?')) return;
  saveData('notices', getData('notices').filter(x => x.id !== id));
  loadNoticesTable();
  showAlert('Notice deleted!');
}

// =============================================
//  CONTACT
// =============================================
function loadContactForm() {
  const c = getData('contact');
  document.getElementById('c-address').value = c.address;
  document.getElementById('c-phone').value   = c.phone;
  document.getElementById('c-email').value   = c.email;
  document.getElementById('c-timing').value  = c.timing;
}

function saveContact() {
  saveData('contact', {
    address: document.getElementById('c-address').value.trim(),
    phone:   document.getElementById('c-phone').value.trim(),
    email:   document.getElementById('c-email').value.trim(),
    timing:  document.getElementById('c-timing').value.trim(),
  });
  showAlert('Contact information saved!');
}

// =============================================
//  SETTINGS
// =============================================
function changePassword() {
  const np = document.getElementById('newPass').value;
  const cp = document.getElementById('confirmPass').value;
  if (!np) { showAlert('Please enter a new password!', 'error'); return; }
  if (np !== cp) { showAlert('Passwords do not match!', 'error'); return; }
  saveData('adminPass', np);
  showAlert('Password updated! Update login.html with the new password.');
  document.getElementById('newPass').value   = '';
  document.getElementById('confirmPass').value = '';
}

// =============================================
//  MODAL HELPERS
// =============================================
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  editingId = null;
}
function closeModalOutside(e, id) {
  if (e.target.id === id) closeModal(id);
}
function logout() {
  sessionStorage.removeItem('mg_admin_auth');
  window.location.href = 'login.html';
}

// Init
loadDashboard();