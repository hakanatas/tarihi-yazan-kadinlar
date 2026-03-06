/**
 * TocPanel — Slide-out Table of Contents panel.
 */
import { women, CATEGORIES, CATEGORY_ORDER } from './PageBuilder.js';

export class TocPanel {
  constructor(container, pageFlip) {
    this.container = container;
    this.pageFlip = pageFlip;
    this.el = null;
    this.overlay = null;
    this.isOpen = false;
  }

  init() {
    // Overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'toc-overlay';
    this.overlay.addEventListener('click', () => this.close());
    this.container.appendChild(this.overlay);

    // Panel
    this.el = document.createElement('div');
    this.el.className = 'toc-panel';

    let html = `
      <div class="toc-panel-header">
        <h2>İçindekiler</h2>
        <button class="toc-close" title="Kapat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="toc-panel-body">
        <div class="toc-panel-item toc-special" data-page="0">
          <span class="toc-panel-name">Kapak</span>
        </div>
        <div class="toc-panel-item toc-special" data-page="2">
          <span class="toc-panel-name">İçindekiler</span>
        </div>
        <div class="toc-panel-item toc-special" data-page="3">
          <span class="toc-panel-name">Önsöz</span>
        </div>
    `;

    // Build chapter entries
    let pageNum = 4;
    for (const catKey of CATEGORY_ORDER) {
      const cat = CATEGORIES[catKey];
      const catWomen = women.filter(w => w.category === catKey);

      html += `
        <div class="toc-panel-chapter" data-page="${pageNum}">
          <span class="toc-panel-icon">${cat.icon}</span>
          <span class="toc-panel-chapter-title" style="color:${cat.color}">${cat.name}</span>
        </div>`;
      pageNum++;

      for (const w of catWomen) {
        html += `
          <div class="toc-panel-item" data-page="${pageNum}" data-woman="${w.id}">
            <span class="toc-panel-dot" style="background:${cat.color}"></span>
            <span class="toc-panel-name">${w.name.tr}</span>
            <span class="toc-panel-pn">${pageNum + 1}</span>
          </div>`;
        pageNum++;
      }
    }

    html += `
        <div class="toc-panel-item toc-special" data-page="${pageNum}">
          <span class="toc-panel-name">Son Söz</span>
        </div>
      </div>`;

    this.el.innerHTML = html;
    this.container.appendChild(this.el);

    // Events
    this.el.querySelector('.toc-close').addEventListener('click', () => this.close());

    // Click on items to navigate
    this.el.querySelectorAll('[data-page]').forEach(item => {
      item.addEventListener('click', (e) => {
        const page = parseInt(item.dataset.page, 10);
        if (!isNaN(page)) {
          this.pageFlip.turnToPage(page);
          this.close();
        }
      });
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.el.classList.add('open');
    this.overlay.classList.add('open');
  }

  close() {
    this.isOpen = false;
    this.el.classList.remove('open');
    this.overlay.classList.remove('open');
  }

  highlightPage(pageIndex) {
    // Remove old highlight
    this.el.querySelectorAll('.toc-active').forEach(el => el.classList.remove('toc-active'));

    // Find and highlight
    const item = this.el.querySelector(`[data-page="${pageIndex}"]`);
    if (item) {
      item.classList.add('toc-active');
      // Scroll into view if panel is open
      if (this.isOpen) {
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }
}
