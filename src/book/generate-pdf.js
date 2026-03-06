import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EXTENDED_BIOS from './extended-bios.js';
import EXTRA_DATA from './extra-data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

// ─── Data ───
const womenData = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/women.json'), 'utf8'));
const women = womenData.women;
const BOOK_EDITION_YEAR = 2026;

// ─── Constants ───
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
  GR: 'Yunanistan', JM: 'Jamaika',
};

// ─── Image cache ───
const imageCache = new Map();

/**
 * Uses Puppeteer request interception to download images.
 * Navigates to each image URL and captures the response buffer.
 */
async function preloadAllImages(browser) {
  console.log('Resimler indiriliyor (Puppeteer navigate)...');
  const total = women.length;
  let success = 0;

  // Load local images first
  for (const w of women) {
    if (w.imageUrl && w.imageUrl.startsWith('/images/')) {
      const localPath = path.join(ROOT, 'public', w.imageUrl);
      if (fs.existsSync(localPath)) {
        const buf = fs.readFileSync(localPath);
        const ext = w.imageUrl.endsWith('.webp') ? 'webp' : w.imageUrl.endsWith('.png') ? 'png' : 'jpeg';
        imageCache.set(w.id, `data:image/${ext};base64,${buf.toString('base64')}`);
        success++;
      }
    }
  }
  console.log(`  ${success} yerel resim yüklendi`);

  // Download remote images by navigating to each URL
  const remoteWomen = women.filter(w => w.imageUrl && !w.imageUrl.startsWith('/images/'));
  console.log(`  ${remoteWomen.length} uzak resim indiriliyor...`);

  const dlPage = await browser.newPage();
  await dlPage.setExtraHTTPHeaders({
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://en.wikipedia.org/',
  });
  await dlPage.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  for (let i = 0; i < remoteWomen.length; i++) {
    const w = remoteWomen[i];
    try {
      const response = await dlPage.goto(w.imageUrl, {
        waitUntil: 'networkidle0',
        timeout: 15000,
      });

      if (response && response.ok()) {
        const ct = response.headers()['content-type'] || '';
        if (ct.includes('image')) {
          const buf = await response.buffer();
          if (buf.length > 5000) { // Real images are > 5KB
            const mime = ct.includes('png') ? 'image/png' : ct.includes('webp') ? 'image/webp' : 'image/jpeg';
            imageCache.set(w.id, `data:${mime};base64,${buf.toString('base64')}`);
            success++;
          }
        }
      }
    } catch (e) {
      // silently skip
    }

    if ((i + 1) % 5 === 0 || i === remoteWomen.length - 1) {
      process.stdout.write(`  ${i + 1}/${remoteWomen.length} (${success} başarılı)\r`);
    }
  }

  await dlPage.close();
  console.log(`\n  ${success}/${total} resim yüklendi (toplam)`);
}

// ─── Helpers ───
function countryName(code) { return COUNTRIES[code] || code; }
function lifeSpan(w) { return w.deathYear ? `${w.birthYear} – ${w.deathYear}` : `${w.birthYear} –`; }

// ─── SVG decorations ───
const SVG_ORNAMENT = `<svg width="60" height="8" viewBox="0 0 60 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4 Q15 0 30 4 Q45 8 60 4" stroke="currentColor" stroke-width="0.7" fill="none" opacity="0.3"/></svg>`;

const SVG_VENUS = `<svg width="16" height="22" viewBox="0 0 16 22" fill="currentColor" opacity="0.15"><circle cx="8" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="13" x2="8" y2="20" stroke="currentColor" stroke-width="1.2"/><line x1="5" y1="17" x2="11" y2="17" stroke="currentColor" stroke-width="1.2"/></svg>`;

// ─── Woman page ───
// ─── Timeline + Extra Quotes helpers ───
function timelineHtml(w, cat) {
  const extra = EXTRA_DATA[w.id];
  if (!extra || !extra.timeline || extra.timeline.length === 0) return '';
  const items = extra.timeline.map(t => {
    const yr = t.year < 0 ? `MÖ ${Math.abs(t.year)}` : t.year;
    return `<div class="timeline-item">
      <span class="timeline-dot" style="background:${cat.color}"></span>
      <span class="timeline-year" style="color:${cat.color}">${yr}</span>
      <span class="timeline-event">${t.event}</span>
    </div>`;
  }).join('');
  return `<div class="timeline-section">
    <div class="timeline-title" style="color:${cat.color}">Yaşam Çizelgesi</div>
    <div class="timeline" style="border-color:${cat.color}30">${items}</div>
  </div>`;
}

function extraQuotesHtml(w, cat) {
  const extra = EXTRA_DATA[w.id];
  if (!extra || !extra.extraQuotes || extra.extraQuotes.length === 0) return '';
  const items = extra.extraQuotes.map(q =>
    `<div class="extra-quote-item" style="border-color:${cat.color}50">"${q}"</div>`
  ).join('');
  return `<div class="extra-quotes">${items}</div>`;
}

function womanPage(w, pageNum) {
  const cat = CATEGORIES[w.category];
  const imgData = imageCache.get(w.id);
  const initials = w.name.tr.split(' ').map(n => n[0]).join('');

  const imageHtml = imgData
    ? `<img src="${imgData}" alt="${w.name.tr}" class="portrait" />`
    : `<div class="portrait portrait-placeholder" style="background:linear-gradient(145deg, ${cat.color}18, ${cat.color}35)">
         <span class="portrait-initials" style="color:${cat.color}">${initials}</span>
       </div>`;

  const achievements = (w.achievements?.tr || [])
    .map(a => `<li><span class="ach-dot" style="background:${cat.color}"></span>${a}</li>`).join('');

  const quote = w.quote?.tr
    ? `<div class="quote-box"><div class="quote-mark" style="color:${cat.color}">"</div><p class="quote-text">${w.quote.tr}</p></div>`
    : '';

  return `
    <div class="page woman-page">
      <div class="page-accent-line" style="background:${cat.color}"></div>

      <div class="woman-top">
        <div class="portrait-frame" style="border-color:${cat.color}40">
          <div class="portrait-wrapper">${imageHtml}</div>
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
        <p class="bio-text">${EXTENDED_BIOS[w.id] || w.bio.tr}</p>
      </div>

      ${quote}

      ${achievements ? `<div class="ach-section"><div class="ach-title" style="color:${cat.color}">Önemli Başarılar</div><ul class="achievements">${achievements}</ul></div>` : ''}

      ${timelineHtml(w, cat)}

      ${extraQuotesHtml(w, cat)}

      <div class="page-footer">
        <span class="venus-icon" style="color:${cat.color}">${SVG_VENUS}</span>
        <span class="page-num">${pageNum}</span>
      </div>
    </div>`;
}

// ─── Chapter divider ───
function chapterDivider(catKey) {
  const cat = CATEGORIES[catKey];
  const count = women.filter(w => w.category === catKey).length;
  return `
    <div class="page chapter-page">
      <div class="chapter-bg" style="background:linear-gradient(160deg, ${cat.color}06, ${cat.color}15, ${cat.color}06)"></div>
      <div class="chapter-content">
        <div class="chapter-icon">${cat.icon}</div>
        <div class="chapter-line-top" style="background:${cat.color}"></div>
        <h1 class="chapter-title" style="color:${cat.color}">${cat.name}</h1>
        <p class="chapter-desc">${cat.desc}</p>
        <div class="chapter-line-bottom" style="background:${cat.color}"></div>
        <p class="chapter-count">${count} kadın</p>
      </div>
    </div>`;
}

// ─── TOC ───
function tocPage() {
  let html = `<div class="page toc-page">
    <h1 class="toc-title">İçindekiler</h1>
    <div class="toc-ornament">${SVG_ORNAMENT}</div>
    <div class="toc-content">`;

  let pageNum = 5;
  for (const catKey of CATEGORY_ORDER) {
    const cat = CATEGORIES[catKey];
    const catWomen = women.filter(w => w.category === catKey);
    html += `<div class="toc-chapter">
      <div class="toc-chapter-header">
        <span class="toc-chapter-icon">${cat.icon}</span>
        <span class="toc-chapter-title" style="color:${cat.color}">${cat.name}</span>
      </div>`;
    pageNum++;
    for (const w of catWomen) {
      html += `<div class="toc-entry">
        <span class="toc-name">${w.name.tr}</span>
        <span class="toc-dots"></span>
        <span class="toc-pn">${pageNum}</span>
      </div>`;
      pageNum++;
    }
    html += `</div>`;
  }
  html += `</div></div>`;
  return html;
}

// ─── Build full HTML ───
function buildHTML() {
  let womenPages = '';
  for (const catKey of CATEGORY_ORDER) {
    womenPages += chapterDivider(catKey);
    let before = 4;
    for (const ck of CATEGORY_ORDER) {
      if (ck === catKey) break;
      before += 1 + women.filter(w => w.category === ck).length;
    }
    before += 1;
    const catWomen = women.filter(w => w.category === catKey);
    catWomen.forEach((w, i) => {
      womenPages += womanPage(w, before + i + 1);
    });
  }

  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600&family=Caveat:wght@400;600&display=swap" rel="stylesheet">
<style>
@page { size: 176mm 250mm; margin: 0; }

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', sans-serif;
  font-size: 9pt;
  line-height: 1.5;
  color: #2C2C2C;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.page {
  page-break-after: always;
  position: relative;
  width: 176mm;
  height: 250mm;
  overflow: hidden;
  padding: 15mm 16mm 15mm 16mm;
}

/* ═══════════ COVER ═══════════ */
.cover-page {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: 0;
  background: linear-gradient(170deg, #1A1A2E 0%, #2C1B47 35%, #1A1A2E 70%, #0f0f1e 100%);
  color: #FAF6F0;
}
.cover-stars { position: absolute; inset: 0; overflow: hidden; }
.cover-star {
  position: absolute; width: 2px; height: 2px;
  background: #fff; border-radius: 50%; opacity: 0.3;
}
.cover-venus { font-size: 56pt; color: #C8A951; opacity: 0.85; margin-bottom: 3mm; }
.cover-eight {
  font-family: 'Playfair Display', serif;
  font-size: 72pt; font-weight: 800;
  color: #FAF6F0; line-height: 0.9;
}
.cover-mart {
  font-size: 13pt; font-weight: 700;
  letter-spacing: 0.5em; color: #C8A951;
  margin-bottom: 14mm;
}
.cover-line { width: 50mm; height: 0.3pt; background: #C8A951; margin: 6mm 0; opacity: 0.5; }
.cover-title {
  font-family: 'Playfair Display', serif;
  font-size: 30pt; font-weight: 700; line-height: 1.15;
  margin-bottom: 4mm;
}
.cover-title em { color: #C8A951; font-style: normal; }
.cover-subtitle {
  font-size: 9.5pt; color: #E8D5A3;
  letter-spacing: 0.03em; max-width: 110mm; line-height: 1.6;
}
.cover-bottom {
  position: absolute; bottom: 18mm;
  font-family: 'Caveat', cursive;
  font-size: 11pt; color: #C8A951; opacity: 0.6;
}

/* ═══════════ INNER COVER ═══════════ */
.inner-page {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
}
.inner-ornament { color: #C8A951; margin-bottom: 10mm; }
.inner-title {
  font-family: 'Playfair Display', serif;
  font-size: 24pt; font-weight: 700; color: #2C2C2C; margin-bottom: 3mm;
}
.inner-subtitle { font-size: 10pt; color: #666; margin-bottom: 5mm; line-height: 1.6; }
.inner-line { width: 25mm; height: 0.5pt; background: #C8A951; margin: 5mm 0; }
.inner-info { font-size: 8pt; color: #999; }
.inner-bottom {
  position: absolute; bottom: 15mm;
  font-size: 7.5pt; color: #bbb; text-align: center;
}

/* ═══════════ TOC ═══════════ */
.toc-page { padding: 18mm 18mm; }
.toc-title {
  font-family: 'Playfair Display', serif;
  font-size: 20pt; font-weight: 700;
  text-align: center; margin-bottom: 3mm; color: #2C2C2C;
}
.toc-ornament { text-align: center; margin-bottom: 6mm; color: #C8A951; }
.toc-chapter { margin-bottom: 4.5mm; }
.toc-chapter-header {
  display: flex; align-items: center; gap: 2mm;
  padding-bottom: 1.5mm; margin-bottom: 1.5mm;
  border-bottom: 0.5pt solid #eee;
}
.toc-chapter-icon { font-size: 9pt; }
.toc-chapter-title {
  font-family: 'Playfair Display', serif;
  font-size: 10.5pt; font-weight: 600;
}
.toc-entry {
  display: flex; align-items: baseline;
  font-size: 8.5pt; padding: 0.6mm 0 0.6mm 6mm;
}
.toc-name { white-space: nowrap; color: #444; }
.toc-dots { flex: 1; border-bottom: 0.4pt dotted #ccc; margin: 0 2mm; min-width: 5mm; }
.toc-pn { white-space: nowrap; color: #999; font-size: 7.5pt; }

/* ═══════════ FOREWORD ═══════════ */
.foreword-page {
  display: flex; flex-direction: column;
  justify-content: center; padding: 22mm 20mm;
}
.foreword-ornament { text-align: center; color: #8B2252; margin-bottom: 5mm; }
.foreword-title {
  font-family: 'Playfair Display', serif;
  font-size: 18pt; font-weight: 700;
  text-align: center; margin-bottom: 2mm; color: #8B2252;
}
.foreword-subtitle {
  text-align: center; font-size: 8pt; color: #999;
  margin-bottom: 8mm; letter-spacing: 0.1em;
}
.foreword-text { font-size: 9.5pt; line-height: 1.75; text-align: justify; color: #3a3a3a; }
.foreword-text p { margin-bottom: 4mm; text-indent: 5mm; }
.foreword-text p:first-child { text-indent: 0; }
.foreword-text p:first-child::first-letter {
  font-family: 'Playfair Display', serif;
  font-size: 28pt; font-weight: 700; color: #8B2252;
  float: left; line-height: 0.85; margin-right: 2mm; margin-top: 1mm;
}
.foreword-sig {
  text-align: right; margin-top: 10mm;
  font-family: 'Caveat', cursive; font-size: 12pt; color: #8B2252;
}

/* ═══════════ CHAPTER DIVIDER ═══════════ */
.chapter-page { padding: 0; display: flex; align-items: center; justify-content: center; }
.chapter-bg {
  position: absolute; inset: 0;
}
.chapter-content {
  position: relative; text-align: center; z-index: 1;
}
.chapter-icon { font-size: 32pt; margin-bottom: 5mm; }
.chapter-line-top, .chapter-line-bottom {
  width: 35mm; height: 0.8pt; margin: 0 auto 5mm; opacity: 0.35;
}
.chapter-line-bottom { margin-top: 5mm; }
.chapter-title {
  font-family: 'Playfair Display', serif;
  font-size: 26pt; font-weight: 700;
}
.chapter-desc {
  font-size: 9.5pt; color: #666;
  font-style: italic; margin-top: 2mm;
}
.chapter-count {
  font-size: 9pt; color: #999; margin-top: 3mm;
  letter-spacing: 0.05em;
}

/* ═══════════ WOMAN PAGE ═══════════ */
.woman-page { padding: 0 16mm 12mm 16mm; }
.page-accent-line {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 2.5mm;
}

.woman-top {
  display: flex; gap: 5mm;
  padding-top: 8mm; margin-bottom: 4mm;
  align-items: flex-start;
}

.portrait-frame {
  flex-shrink: 0;
  padding: 1.5mm;
  border: 0.5pt solid;
  border-radius: 3mm;
}
.portrait-wrapper {
  width: 33mm; height: 40mm;
  border-radius: 2mm;
  overflow: hidden; background: #f5f0ea;
}
.portrait { width: 100%; height: 100%; object-fit: cover; display: block; }
.portrait-placeholder {
  display: flex; align-items: center; justify-content: center;
  width: 100%; height: 100%;
}
.portrait-initials {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem; font-weight: 700; opacity: 0.4;
}

.woman-info { flex: 1; padding-top: 1mm; }
.cat-label {
  font-size: 6.5pt; font-weight: 600;
  letter-spacing: 0.12em; margin-bottom: 1mm;
}
.woman-name {
  font-family: 'Playfair Display', serif;
  font-size: 17pt; font-weight: 700;
  line-height: 1.1; margin-bottom: 1.5mm; color: #2C2C2C;
}
.woman-meta { font-size: 8pt; color: #888; margin-bottom: 2mm; }
.meta-sep { margin: 0 1.5mm; }
.ornament { margin-bottom: 2mm; }
.woman-short {
  font-size: 8.5pt; color: #555;
  font-style: italic; line-height: 1.45;
}

.woman-body { margin-bottom: 4mm; }
.bio-text {
  font-size: 9pt; line-height: 1.65;
  text-align: justify; color: #333;
}

.quote-box {
  margin: 4mm 0;
  padding: 3mm 4mm 3mm 8mm;
  background: #faf8f4;
  border-radius: 2mm;
  position: relative;
}
.quote-mark {
  font-family: 'Playfair Display', serif;
  font-size: 32pt; font-weight: 700;
  position: absolute; left: 2mm; top: -2mm;
  opacity: 0.25; line-height: 1;
}
.quote-text {
  font-family: 'Caveat', cursive;
  font-size: 11pt; line-height: 1.4;
  color: #555; font-style: italic;
}

.ach-section { margin-top: 3mm; }
.ach-title {
  font-size: 7.5pt; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  margin-bottom: 2mm;
}
.achievements { list-style: none; display: flex; flex-wrap: wrap; gap: 1.5mm; }
.achievements li {
  font-size: 7.5pt; padding: 1.2mm 3mm;
  background: #faf8f4; border: 0.4pt solid #e8e2d8;
  border-radius: 1.5mm; color: #555;
  display: flex; align-items: center; gap: 1.5mm;
}
.ach-dot {
  display: inline-block; width: 3pt; height: 3pt;
  border-radius: 50%; flex-shrink: 0; opacity: 0.6;
}

/* ═══════════ TIMELINE ═══════════ */
.timeline-section { margin-top: 3mm; }
.timeline-title {
  font-size: 7.5pt; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  margin-bottom: 2mm;
}
.timeline {
  display: flex; flex-wrap: wrap; gap: 0;
  position: relative;
  padding-left: 3mm;
  border-left: 0.5pt solid;
}
.timeline-item {
  display: flex; align-items: baseline; gap: 2mm;
  font-size: 7.5pt; padding: 0.8mm 0;
  width: 100%;
}
.timeline-year {
  font-weight: 600; white-space: nowrap;
  min-width: 10mm;
}
.timeline-dot {
  width: 4pt; height: 4pt; border-radius: 50%;
  flex-shrink: 0; position: relative; left: -4.7mm;
  margin-right: -2.5mm;
}
.timeline-event { color: #555; flex: 1; }

/* ═══════════ EXTRA QUOTES ═══════════ */
.extra-quotes { margin-top: 3mm; }
.extra-quote-item {
  font-size: 8pt; color: #666;
  font-style: italic; line-height: 1.45;
  padding: 1.5mm 0 1.5mm 4mm;
  border-left: 1.5pt solid;
  margin-bottom: 2mm;
}

.page-footer {
  position: absolute; bottom: 10mm; left: 16mm; right: 16mm;
  display: flex; justify-content: space-between; align-items: center;
}
.page-num { font-size: 7.5pt; color: #bbb; }

/* ═══════════ AFTERWORD ═══════════ */
.afterword-page {
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  text-align: center; padding: 25mm 22mm;
}
.afterword-ornament { color: #8B2252; margin-bottom: 6mm; }
.afterword-title {
  font-family: 'Playfair Display', serif;
  font-size: 18pt; font-weight: 700;
  color: #8B2252; margin-bottom: 8mm;
}
.afterword-text {
  font-size: 9.5pt; line-height: 1.75;
  max-width: 120mm; color: #3a3a3a; text-align: center;
}
.afterword-text p { margin-bottom: 4mm; }
.afterword-venus { font-size: 24pt; color: #C8A951; margin-top: 12mm; opacity: 0.5; }
.afterword-final {
  font-family: 'Caveat', cursive;
  font-size: 13pt; color: #8B2252; margin-top: 6mm;
}
</style>
</head>
<body>

<!-- ═══ KAPAK ═══ -->
<div class="page cover-page">
  <div class="cover-venus">♀</div>
  <div class="cover-eight">8</div>
  <div class="cover-mart">M A R T</div>
  <div class="cover-line"></div>
  <div class="cover-title">Tarihi Yazan<br><em>Kadınlar</em></div>
  <div class="cover-line"></div>
  <div class="cover-subtitle">Dünyayı değiştiren kadınların<br>ilham veren hikâyeleri</div>
  <div class="cover-bottom">8 Mart · Dünya Kadınlar Günü</div>
</div>

<!-- ═══ İÇ KAPAK ═══ -->
<div class="page inner-page">
  <div class="inner-ornament">${SVG_VENUS}</div>
  <div class="inner-title">Tarihi Yazan Kadınlar</div>
  <div class="inner-subtitle">Dünyayı değiştiren ${women.length} kadının ilham veren hikâyeleri</div>
  <div class="inner-line"></div>
  <div class="inner-info">8 Mart Dünya Kadınlar Günü · ${BOOK_EDITION_YEAR}</div>
  <div class="inner-bottom">${CATEGORY_ORDER.length} kategori · ${women.length} kadın · Bilim, Sanat, Siyaset, Spor, İş Dünyası</div>
</div>

<!-- ═══ İÇİNDEKİLER ═══ -->
${tocPage()}

<!-- ═══ ÖNSÖZ ═══ -->
<div class="page foreword-page">
  <div class="foreword-ornament">${SVG_ORNAMENT}</div>
  <h1 class="foreword-title">Önsöz</h1>
  <div class="foreword-subtitle">— BU KİTAP HAKKINDA —</div>
  <div class="foreword-text">
    <p>Tarih boyunca kadınlar, bilimden sanata, siyasetten spora, iş dünyasından aktivizme kadar hayatın her alanında olağanüstü başarılara imza attılar. Ancak bu başarıların büyük bir kısmı, yeterince bilinmedi, anlatılmadı ya da görmezden gelindi.</p>
    <p>Bu kitap, farklı coğrafyalardan, farklı dönemlerden ve farklı alanlardan ${women.length} kadının hikâyesini bir araya getiriyor. Marie Curie'nin laboratuvarından Frida Kahlo'nun tuvaline, Rosa Parks'ın otobüsünden Simone Biles'ın jimnastik pistine uzanan bu yolculukta, her kadının ortak bir özelliği var: Karşılaştıkları engellere rağmen asla vazgeçmemeleri.</p>
    <p>8 Mart Dünya Kadınlar Günü vesilesiyle hazırlanan bu derleme, geçmişin ilham veren kadınlarını tanıtırken geleceğin kadınlarına da cesaret vermek amacıyla oluşturuldu. Çünkü her büyük değişim, bir kadının "yapabilirim" demesiyle başladı.</p>
    <p>Bu kadınların hikâyeleri sadece tarih değil, aynı zamanda bir çağrıdır — hayallerinizin peşinden gitmeye cesaret edin.</p>
  </div>
  <div class="foreword-sig">8 Mart ${BOOK_EDITION_YEAR}</div>
</div>

<!-- ═══ BÖLÜMLER ═══ -->
${womenPages}

<!-- ═══ SONSÖZ ═══ -->
<div class="page afterword-page">
  <div class="afterword-ornament">${SVG_ORNAMENT}</div>
  <div class="afterword-title">Son Söz</div>
  <div class="afterword-text">
    <p>Bu kitaptaki ${women.length} kadın, tarihin farklı dönemlerinde ve dünyanın dört bir yanında insanlığın ilerlemesine katkıda bulunan sayısız kadından yalnızca birkaçıdır.</p>
    <p>Onların hikâyeleri bize şunu öğretiyor: Engeller, sınırlar ve önyargılar ne kadar büyük olursa olsun, kararlılık ve cesaretle her şeyin üstesinden gelinebilir.</p>
    <p>Geleceği yazan kadınlara…</p>
  </div>
  <div class="afterword-venus">♀</div>
  <div class="afterword-final">Her büyük değişim, bir kadının cesaretiyle başlar.</div>
</div>

</body>
</html>`;
}

// ─── Main ───
async function main() {
  console.log('📖 Kitap oluşturuluyor...');
  console.log(`   ${women.length} kadın, ${CATEGORY_ORDER.length} kategori\n`);

  // Step 1: Launch browser (used for both image downloading and PDF generation)
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // Step 2: Preload images using browser fetch
  await preloadAllImages(browser);

  // Step 3: Build HTML
  const html = buildHTML();
  const htmlPath = path.join(ROOT, 'output', 'book.html');
  const pdfPath = path.join(ROOT, 'output', 'tarihi-yazan-kadinlar.pdf');

  fs.mkdirSync(path.join(ROOT, 'output'), { recursive: true });
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`\n   HTML: ${htmlPath}`);

  // Step 4: Generate PDF
  console.log('   PDF oluşturuluyor...');
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));

  await page.pdf({
    path: pdfPath,
    width: '176mm',
    height: '250mm',
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  const stats = fs.statSync(pdfPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n   ✅ PDF: ${pdfPath}`);
  console.log(`   📄 Boyut: ${sizeMB} MB`);
  console.log('\n   Tamamlandı!');
}

main().catch(err => {
  console.error('Hata:', err);
  process.exit(1);
});
