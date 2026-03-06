/**
 * PageBuilder — Generates all page DOM elements for the flipbook.
 * Mirrors generate-pdf.js logic but outputs DOM elements instead of HTML strings.
 */
import womenData from '../../data/women.json';
import EXTENDED_BIOS from '../../book/extended-bios.js';
import EXTRA_DATA from '../../book/extra-data.js';

const women = womenData.women;
const BOOK_EDITION_YEAR = 2026;

const CATEGORIES = {
  science:  { name: 'Bilim ve Teknoloji', color: '#6B4C9A', light: '#f0ebf5', icon: '🔬', desc: 'Bilimin sınırlarını zorlayan kadınlar' },
  arts:     { name: 'Sanat ve Edebiyat',  color: '#C75B39', light: '#faf0ec', icon: '🎨', desc: 'Sanatı ve edebiyatı şekillendiren kadınlar' },
  politics: { name: 'Siyaset ve Aktivizm', color: '#2E6B62', light: '#ecf3f2', icon: '⚖️', desc: 'Haklar ve özgürlükler için mücadele eden kadınlar' },
  sports:   { name: 'Spor',               color: '#CF8B3A', light: '#faf3e8', icon: '🏅', desc: 'Rekorları kırıp tarihe geçen kadınlar' },
  business: { name: 'İş Dünyası',         color: '#3A6B9F', light: '#ecf1f7', icon: '💼', desc: 'İş dünyasını dönüştüren kadınlar' },
};

const CATEGORY_ORDER = ['science', 'arts', 'politics', 'sports', 'business'];

const COUNTRIES = {
  PL: 'Polonya', GB: 'İngiltere', US: 'ABD', CN: 'Çin', IR: 'İran',
  FR: 'Fransa', TR: 'Türkiye', MX: 'Meksika', KE: 'Kenya', IQ: 'Irak',
  PK: 'Pakistan', DE: 'Almanya', RO: 'Romanya', IN: 'Hindistan',
  JP: 'Japonya', EG: 'Mısır', GT: 'Guatemala', NZ: 'Yeni Zelanda',
  ZA: 'Güney Afrika', LR: 'Liberya', TW: 'Tayvan', NG: 'Nijerya',
  GR: 'Yunanistan', JM: 'Jamaika', AT: 'Avusturya', JO: 'Ürdün',
};

const SVG_ORNAMENT = `<svg width="60" height="8" viewBox="0 0 60 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4 Q15 0 30 4 Q45 8 60 4" stroke="currentColor" stroke-width="0.7" fill="none" opacity="0.3"/></svg>`;
const SVG_VENUS = `<svg width="16" height="22" viewBox="0 0 16 22" fill="currentColor" opacity="0.15"><circle cx="8" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="13" x2="8" y2="20" stroke="currentColor" stroke-width="1.2"/><line x1="5" y1="17" x2="11" y2="17" stroke="currentColor" stroke-width="1.2"/></svg>`;

function lifeSpan(w) {
  const b = w.birthYear;
  const d = w.deathYear;
  if (b < 0) return `MÖ ${Math.abs(b)}–MÖ ${Math.abs(d)}`;
  return d ? `${b}–${d}` : `${b}–`;
}

function countryName(nat) {
  if (Array.isArray(nat)) return nat.map(c => COUNTRIES[c] || c).join(' / ');
  return COUNTRIES[nat] || nat;
}

/** Image extension map for non-jpg files */
const IMG_EXT = {
  'ada-lovelace': 'png',
  'murasaki-shikibu': 'png',
  'leyla-alaton': 'webp',
  'nur-tatar': 'webp',
  'yasemin-dalkilic': 'webp',
};

function getImageSrc(id) {
  const ext = IMG_EXT[id] || 'jpg';
  return `images/book/${id}.${ext}`;
}

function el(tag, classes = '', attrs = {}) {
  const elem = document.createElement(tag);
  if (classes) elem.className = classes;
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'style' && typeof v === 'object') {
      Object.entries(v).forEach(([sk, sv]) => elem.style[sk] = sv);
    } else if (k === 'innerHTML') {
      elem.innerHTML = v;
    } else {
      elem.setAttribute(k, v);
    }
  });
  return elem;
}

export class PageBuilder {

  buildAllPages() {
    const pages = [];

    // 1. Cover
    pages.push(this.buildCoverPage());
    // 2. Inner cover
    pages.push(this.buildInnerPage());
    // 3. TOC
    pages.push(this.buildTocPage());
    // 4. Foreword
    pages.push(this.buildForewordPage());

    // 5. Chapters + Women
    let pageNum = 5;
    for (const catKey of CATEGORY_ORDER) {
      pages.push(this.buildChapterDivider(catKey));
      pageNum++;
      const catWomen = women.filter(w => w.category === catKey);
      for (const w of catWomen) {
        pages.push(this.buildWomanPage(w, pageNum));
        pageNum++;
      }
    }

    // 6. Afterword
    pages.push(this.buildAfterwordPage());

    return pages;
  }

  buildCoverPage() {
    const page = el('div', 'page cover-page', { 'data-density': 'hard' });
    page.innerHTML = `
      <div class="cover-venus">♀</div>
      <div class="cover-eight">8</div>
      <div class="cover-mart">M A R T</div>
      <div class="cover-line"></div>
      <div class="cover-title">Tarihi Yazan<br><em>Kadınlar</em></div>
      <div class="cover-line"></div>
      <div class="cover-subtitle">Dünyayı değiştiren kadınların<br>ilham veren hikâyeleri</div>
      <div class="cover-bottom">8 Mart · Dünya Kadınlar Günü</div>
    `;
    return page;
  }

  buildInnerPage() {
    const totalWomen = women.length;
    const totalCategories = CATEGORY_ORDER.length;
    const page = el('div', 'page inner-page', { 'data-density': 'hard' });
    page.innerHTML = `
      <div class="inner-ornament">${SVG_VENUS}</div>
      <div class="inner-title">Tarihi Yazan Kadınlar</div>
      <div class="inner-subtitle">Dünyayı değiştiren ${totalWomen} kadının ilham veren hikâyeleri</div>
      <div class="inner-line"></div>
      <div class="inner-info">8 Mart Dünya Kadınlar Günü · ${BOOK_EDITION_YEAR}</div>
      <div class="inner-bottom">${totalCategories} kategori · ${totalWomen} kadın · Bilim, Sanat, Siyaset, Spor, İş Dünyası</div>
    `;
    return page;
  }

  buildTocPage() {
    const page = el('div', 'page toc-page');
    let html = `
      <h1 class="toc-title">İçindekiler</h1>
      <div class="toc-ornament">${SVG_ORNAMENT}</div>
      <div class="toc-content">`;

    let pn = 5;
    for (const catKey of CATEGORY_ORDER) {
      const cat = CATEGORIES[catKey];
      const catWomen = women.filter(w => w.category === catKey);
      html += `<div class="toc-chapter">
        <div class="toc-chapter-header">
          <span class="toc-chapter-icon">${cat.icon}</span>
          <span class="toc-chapter-title" style="color:${cat.color}">${cat.name}</span>
        </div>`;
      pn++;
      for (const w of catWomen) {
        html += `<div class="toc-entry" data-goto="${pn}">
          <span class="toc-name">${w.name.tr}</span>
          <span class="toc-dots"></span>
          <span class="toc-pn">${pn}</span>
        </div>`;
        pn++;
      }
      html += '</div>';
    }
    html += '</div>';
    page.innerHTML = html;
    return page;
  }

  buildForewordPage() {
    const page = el('div', 'page foreword-page');
    page.innerHTML = `
      <div class="foreword-ornament">${SVG_ORNAMENT}</div>
      <h1 class="foreword-title">Önsöz</h1>
      <div class="foreword-subtitle">— BU KİTAP HAKKINDA —</div>
      <div class="foreword-text">
        <p>Tarih boyunca kadınlar, bilimden sanata, siyasetten spora, iş dünyasından aktivizme kadar hayatın her alanında olağanüstü başarılara imza attılar. Ancak bu başarıların büyük bir kısmı, yeterince bilinmedi, anlatılmadı ya da görmezden gelindi.</p>
        <p>Bu kitap, farklı coğrafyalardan, farklı dönemlerden ve farklı alanlardan 54 kadının hikâyesini bir araya getiriyor.</p>
        <p>8 Mart Dünya Kadınlar Günü vesilesiyle hazırlanan bu derleme, geçmişin ilham veren kadınlarını tanıtırken geleceğin kadınlarına da cesaret vermek amacıyla oluşturuldu.</p>
        <p>Bu kadınların hikâyeleri sadece tarih değil, aynı zamanda bir çağrıdır — hayallerinizin peşinden gitmeye cesaret edin.</p>
      </div>
      <div class="foreword-sig">8 Mart ${BOOK_EDITION_YEAR}</div>
    `;
    return page;
  }

  buildChapterDivider(catKey) {
    const cat = CATEGORIES[catKey];
    const count = women.filter(w => w.category === catKey).length;
    const page = el('div', 'page chapter-page', { 'data-density': 'hard' });
    page.innerHTML = `
      <div class="chapter-bg" style="background:linear-gradient(160deg, ${cat.color}06, ${cat.color}15, ${cat.color}06)"></div>
      <div class="chapter-content">
        <div class="chapter-icon">${cat.icon}</div>
        <div class="chapter-line-top" style="background:${cat.color}"></div>
        <h1 class="chapter-title" style="color:${cat.color}">${cat.name}</h1>
        <p class="chapter-desc">${cat.desc}</p>
        <div class="chapter-line-bottom" style="background:${cat.color}"></div>
        <p class="chapter-count">${count} kadın</p>
      </div>
    `;
    return page;
  }

  buildWomanPage(w, pageNum) {
    const cat = CATEGORIES[w.category];
    const initials = w.name.tr.split(' ').map(n => n[0]).join('');
    const imgSrc = getImageSrc(w.id);
    const bio = EXTENDED_BIOS[w.id] || w.bio.tr;
    const extra = EXTRA_DATA[w.id];

    // Build achievements
    const achievements = (w.achievements?.tr || [])
      .map(a => `<li><span class="ach-dot" style="background:${cat.color}"></span>${a}</li>`).join('');

    // Quote
    const quote = w.quote?.tr
      ? `<div class="quote-box"><div class="quote-mark" style="color:${cat.color}">"</div><p class="quote-text">${w.quote.tr}</p></div>`
      : '';

    // Timeline
    let timelineHtml = '';
    if (extra?.timeline?.length) {
      const items = extra.timeline.map(t => {
        const yr = t.year < 0 ? `MÖ ${Math.abs(t.year)}` : t.year;
        return `<div class="timeline-item">
          <span class="timeline-dot" style="background:${cat.color}"></span>
          <span class="timeline-year" style="color:${cat.color}">${yr}</span>
          <span class="timeline-event">${t.event}</span>
        </div>`;
      }).join('');
      timelineHtml = `<div class="timeline-section">
        <div class="timeline-title" style="color:${cat.color}">Yaşam Çizelgesi</div>
        <div class="timeline" style="border-color:${cat.color}30">${items}</div>
      </div>`;
    }

    // Extra quotes
    let extraQuotesHtml = '';
    if (extra?.extraQuotes?.length) {
      const items = extra.extraQuotes.map(q =>
        `<div class="extra-quote-item" style="border-color:${cat.color}50">"${q}"</div>`
      ).join('');
      extraQuotesHtml = `<div class="extra-quotes">${items}</div>`;
    }

    const page = el('div', 'page woman-page');
    page.setAttribute('data-woman-id', w.id);
    page.innerHTML = `
      <div class="page-accent-line" style="background:${cat.color}"></div>
      <div class="woman-top">
        <div class="portrait-frame" style="border-color:${cat.color}40">
          <div class="portrait-wrapper">
            <img src="${imgSrc}" alt="${w.name.tr}" class="portrait" loading="lazy"
              onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
            />
            <div class="portrait-placeholder" style="display:none;background:linear-gradient(145deg, ${cat.color}18, ${cat.color}35)">
              <span class="portrait-initials" style="color:${cat.color}">${initials}</span>
            </div>
          </div>
        </div>
        <div class="woman-info">
          <div class="cat-label" style="color:${cat.color}">${cat.name.toUpperCase()}</div>
          <h2 class="woman-name">${w.name.tr}</h2>
          <div class="woman-meta">
            <span class="meta-years">${lifeSpan(w)}</span>
            <span class="meta-sep">·</span>
            <span class="meta-country">${countryName(w.nationality)}</span>
          </div>
          <div class="ornament" style="color:${cat.color}">${SVG_ORNAMENT}</div>
          <p class="woman-short">${w.shortBio?.tr || ''}</p>
        </div>
      </div>
      <div class="woman-body">
        <p class="bio-text">${bio}</p>
      </div>
      ${quote}
      ${achievements ? `<div class="ach-section"><div class="ach-title" style="color:${cat.color}">Önemli Başarılar</div><ul class="achievements">${achievements}</ul></div>` : ''}
      ${timelineHtml}
      ${extraQuotesHtml}
      <div class="page-footer">
        <span class="venus-icon" style="color:${cat.color}">${SVG_VENUS}</span>
        <span class="page-num">${pageNum}</span>
      </div>
    `;
    return page;
  }

  buildAfterwordPage() {
    const page = el('div', 'page afterword-page', { 'data-density': 'hard' });
    page.innerHTML = `
      <div class="afterword-ornament">${SVG_ORNAMENT}</div>
      <div class="afterword-title">Son Söz</div>
      <div class="afterword-text">
        <p>Bu kitaptaki 54 kadın, tarihin farklı dönemlerinde ve dünyanın dört bir yanında insanlığın ilerlemesine katkıda bulunan sayısız kadından yalnızca birkaçıdır.</p>
        <p>Onların hikâyeleri bize şunu öğretiyor: Engeller, sınırlar ve önyargılar ne kadar büyük olursa olsun, kararlılık ve cesaretle her şeyin üstesinden gelinebilir.</p>
        <p>Geleceği yazan kadınlara…</p>
      </div>
      <div class="afterword-venus">♀</div>
      <div class="afterword-final">Her büyük değişim, bir kadının cesaretiyle başlar.</div>
    `;
    return page;
  }
}

// Export women data and categories for use by TocPanel
export { women, CATEGORIES, CATEGORY_ORDER };
