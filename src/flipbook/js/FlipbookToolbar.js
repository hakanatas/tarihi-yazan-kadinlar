/**
 * FlipbookToolbar — Bottom navigation bar with page controls.
 */

export class FlipbookToolbar {
  constructor(container, pageFlip, totalPages) {
    this.container = container;
    this.pageFlip = pageFlip;
    this.totalPages = totalPages;
    this.currentPage = 0;
    this.onTocToggle = null;
    this.el = null;
  }

  init() {
    this.el = document.createElement('div');
    this.el.className = 'flipbook-toolbar';
    this.el.innerHTML = `
      <div class="toolbar-left">
        <a href="index.html" class="toolbar-back" title="Siteye Dön">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </a>
        <button class="toolbar-btn toolbar-toc" title="İçindekiler">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="toolbar-center">
        <button class="toolbar-btn toolbar-prev" title="Önceki Sayfa">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div class="toolbar-page-info">
          <span class="toolbar-current">1</span>
          <span class="toolbar-sep">/</span>
          <span class="toolbar-total">${this.totalPages}</span>
        </div>
        <button class="toolbar-btn toolbar-next" title="Sonraki Sayfa">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
      <div class="toolbar-right">
        <button class="toolbar-btn toolbar-fullscreen" title="Tam Ekran (F)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </button>
      </div>
      <div class="toolbar-progress">
        <div class="toolbar-progress-bar" style="width: 0%"></div>
      </div>
    `;

    this.container.appendChild(this.el);

    // Bind events
    this.el.querySelector('.toolbar-prev').addEventListener('click', () => this.pageFlip.flipPrev());
    this.el.querySelector('.toolbar-next').addEventListener('click', () => this.pageFlip.flipNext());
    this.el.querySelector('.toolbar-toc').addEventListener('click', () => this.onTocToggle?.());
    this.el.querySelector('.toolbar-fullscreen').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        this.container.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    });
  }

  updatePage(pageIndex) {
    this.currentPage = pageIndex;
    const currentEl = this.el.querySelector('.toolbar-current');
    const progressBar = this.el.querySelector('.toolbar-progress-bar');

    if (currentEl) currentEl.textContent = pageIndex + 1;
    if (progressBar) {
      const pct = ((pageIndex + 1) / this.totalPages) * 100;
      progressBar.style.width = `${pct}%`;
    }
  }

  updateLayout() {
    // Could adjust toolbar based on viewport
  }
}
