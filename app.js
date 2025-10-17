// ---- Veri ----
const DATA = {
  categories: ["Ana Yemekler", "İçecekler"],
  items: [
    // Ana Yemekler
    { id: 1, name: "Köfte Ekmek", price: null, category: "Ana Yemekler" },
    { id: 2, name: "Tavuk Ekmek", price: null, category: "Ana Yemekler" },
    { id: 3, name: "Sucuk Ekmek", price: null, category: "Ana Yemekler" },
    { id: 4, name: "Kokoreç Ekmek", price: null, category: "Ana Yemekler" },
    { id: 5, name: "Köfte Tabakta", price: null, category: "Ana Yemekler" },
    { id: 6, name: "Tavuk Tabakta", price: null, category: "Ana Yemekler" },

    // İçecekler
    { id: 7, name: "Büyük Ayran", price: null, category: "İçecekler" },
    { id: 8, name: "Küçük Ayran", price: null, category: "İçecekler" },
    { id: 9, name: "Sade Soda", price: null, category: "İçecekler" },
    { id: 10, name: "Meyveli Soda", price: null, category: "İçecekler" },
    { id: 11, name: "Su", price: null, category: "İçecekler" },
  ],
  currency: "₺",
};

// Sadece para işareti göster (fiyat sonra eklenecek)
const fmtPrice = (n) => DATA.currency;

// Elemanlar
const chipbar = document.getElementById('chipbar');
const sectionsWrap = document.getElementById('menuSections');
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Kategori Barı
function renderChips(active) {
  chipbar.innerHTML = '';
  const all = createChip('Tümü', active == null);
  all.onclick = () => { renderChips(null); renderSections(); };
  chipbar.appendChild(all);

  DATA.categories.forEach(cat => {
    const el = createChip(cat, active === cat);
    el.onclick = () => { renderChips(cat); scrollToSection(cat); };
    chipbar.appendChild(el);
  });
}

function createChip(label, isActive = false) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'chip' + (isActive ? ' active' : '');
  btn.textContent = label;
  btn.setAttribute('aria-pressed', String(isActive));
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
  });
  return btn;
}

// Bölümler
function renderSections() {
  sectionsWrap.innerHTML = '';
  DATA.categories.forEach(cat => {
    const section = document.createElement('section');
    section.className = 'section';
    section.id = slug(cat);

    const h2 = document.createElement('h2');
    h2.textContent = cat;
    section.appendChild(h2);

    DATA.items.filter(i => i.category === cat).forEach(i => {
      section.appendChild(menuItem(i));
    });

    sectionsWrap.appendChild(section);
  });
}

function menuItem(i) {
  const row = document.createElement('div'); row.className = 'item';

  const name = document.createElement('div'); name.className = 'name'; name.textContent = i.name;
  const dots = document.createElement('div'); dots.className = 'dots';
  const price = document.createElement('div'); price.className = 'price'; price.textContent = fmtPrice(i.price);
  row.appendChild(name); row.appendChild(price);
  name.appendChild(dots);

  return row;
}

function slug(s) { return (s || '').toString().toLowerCase().replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ]+/gi, '-'); }

function scrollToSection(cat) {
  const el = document.getElementById(slug(cat));
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  [...chipbar.children].forEach(c => c.classList.remove('active'));
  const b = [...chipbar.children].find(c => c.textContent === cat);
  if (b) b.classList.add('active');
}

// Yukarı çık butonu
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// İlk yükleme
(function init() {
  renderChips(null);
  renderSections();
})();


