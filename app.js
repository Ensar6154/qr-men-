// ---- Veri ----
const DATA = {
    categories: ["Başlangıçlar", "Salatalar", "Ana Yemekler", "Tatlılar", "İçecekler"],
    items: [
        { id: 1, name: "Zeytinyağlı Yaprak Sarma", price: 120, desc: "Limon ve yoğurt eşliğinde.", category: "Başlangıçlar" },
        { id: 2, name: "Günün Çorbası", price: 95, desc: "Mevsim sebzeleriyle.", category: "Başlangıçlar" },
        { id: 3, name: "Akdeniz Salata", price: 160, desc: "Zeytin, peynir, roka.", category: "Salatalar" },
        { id: 4, name: "Kinoalı Yeşil Salata", price: 175, desc: "Avokado ve nar taneleri.", category: "Salatalar" },
        { id: 5, name: "Izgara Somon", price: 320, desc: "Köz sebzelerle.", category: "Ana Yemekler" },
        { id: 6, name: "Kuzu İncik", price: 345, desc: "Fırın patates ve sos.", category: "Ana Yemekler" },
        { id: 7, name: "Mantı", price: 230, desc: "Tereyağı & yoğurt sos.", category: "Ana Yemekler" },
        { id: 8, name: "San Sebastian Cheesecake", price: 165, desc: "Kremamsı dokulu.", category: "Tatlılar" },
        { id: 9, name: "Çikolatalı Sufle", price: 150, desc: "Sıcak servis, dondurma ile.", category: "Tatlılar" },
        { id: 10, name: "Soğuk Demleme Kahve", price: 95, desc: "12 saat demleme.", category: "İçecekler" },
        { id: 11, name: "Taze Limonata", price: 80, desc: "Naneli ve ferah.", category: "İçecekler" },
    ],
    currency: "₺"
};

// Elemanlar
const chipbar = document.getElementById('chipbar');
const sectionsWrap = document.getElementById('menuSections');
document.getElementById('year').textContent = new Date().getFullYear();

// Kategori Barı
function renderChips(active) {
    chipbar.innerHTML = '';
    const all = createChip('Tümü', !active);
    all.onclick = () => { renderChips(null); renderSections(); };
    chipbar.appendChild(all);

    DATA.categories.forEach(cat => {
        const el = createChip(cat, active === cat);
        el.onclick = () => { renderChips(cat); scrollToSection(cat); };
        chipbar.appendChild(el);
    });
}
function createChip(label, active = false) {
    const b = document.createElement('button');
    b.className = 'chip' + (active ? ' active' : '');
    b.textContent = label;
    return b;
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
    const price = document.createElement('div'); price.className = 'price'; price.textContent = `${DATA.currency}${i.price}`;
    row.appendChild(name); row.appendChild(price);
    name.appendChild(dots);

    if (i.desc) {
        const desc = document.createElement('div'); desc.className = 'desc'; desc.textContent = i.desc;
        row.appendChild(desc);
    }
    return row;
}

function slug(s) { return s.toLowerCase().replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ]+/gi, '-'); }

function scrollToSection(cat) {
    const el = document.getElementById(slug(cat));
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    [...chipbar.children].forEach(c => c.classList.remove('active'));
    const b = [...chipbar.children].find(c => c.textContent === cat);
    if (b) b.classList.add('active');
}

// Yukarı çık butonu
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
});
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// İlk yükleme
(function init() {
    renderChips(null);
    renderSections();
})();
