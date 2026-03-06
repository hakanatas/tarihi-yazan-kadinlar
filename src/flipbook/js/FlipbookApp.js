/**
 * FlipbookApp — Main application class.
 * Initializes PageFlip, manages events, resize, and keyboard navigation.
 */
import { PageFlip } from 'page-flip';
import { PageBuilder } from './PageBuilder.js';
import { FlipbookToolbar } from './FlipbookToolbar.js';
import { TocPanel } from './TocPanel.js';

const PAGE_RATIO = 176 / 250; // B5 aspect ratio ≈ 0.704

export class FlipbookApp {
  constructor(container) {
    this.container = container;
    this.pageFlip = null;
    this.toolbar = null;
    this.tocPanel = null;
    this.totalPages = 0;
  }

  async init() {
    // 1. Build pages
    const builder = new PageBuilder();
    const pages = builder.buildAllPages();
    this.totalPages = pages.length;

    // 2. Create flipbook container
    const bookEl = document.createElement('div');
    bookEl.id = 'flipbook';
    this.container.appendChild(bookEl);

    // 3. Create pages container (PageFlip reads children)
    const pagesContainer = document.createElement('div');
    pagesContainer.id = 'pages-container';
    pages.forEach(p => pagesContainer.appendChild(p));
    this.container.appendChild(pagesContainer);

    // 4. Calculate dimensions
    const { width, height } = this.calculateDimensions();

    // 5. Initialize PageFlip
    this.pageFlip = new PageFlip(bookEl, {
      width,
      height,
      size: 'stretch',
      minWidth: 240,
      maxWidth: 800,
      minHeight: 340,
      maxHeight: 1140,
      showCover: true,
      drawShadow: true,
      flippingTime: 700,
      usePortrait: true,
      maxShadowOpacity: 0.4,
      mobileScrollSupport: false,
      swipeDistance: 30,
      clickEventForward: true,
      startPage: 0,
      startZIndex: 0,
      autoSize: true,
      useMouseEvents: true,
    });

    // 6. Load pages from HTML
    this.pageFlip.loadFromHTML(pagesContainer.querySelectorAll('.page'));

    // 7. Initialize toolbar
    this.toolbar = new FlipbookToolbar(this.container, this.pageFlip, this.totalPages);
    this.toolbar.init();

    // 8. Initialize TOC panel
    this.tocPanel = new TocPanel(this.container, this.pageFlip);
    this.tocPanel.init();

    // 9. Connect toolbar TOC button to panel
    this.toolbar.onTocToggle = () => this.tocPanel.toggle();

    // 10. Events
    this.pageFlip.on('flip', (e) => this.onPageFlip(e));
    this.pageFlip.on('changeOrientation', (e) => this.onOrientationChange(e));

    // 11. Keyboard navigation
    this.initKeyboardNav();

    // 12. Resize handler
    window.addEventListener('resize', () => this.onResize());

    // 13. Hide loading screen
    const loading = document.getElementById('loading');
    if (loading) {
      loading.classList.add('hide');
      setTimeout(() => loading.remove(), 600);
    }

    // 14. Handle image fallbacks — try alternate extensions
    this.fixImagePaths();
  }

  calculateDimensions() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const toolbarH = 56;
    const available = vh - toolbarH;
    const padding = 20;

    let height = Math.min(available - padding, 900);
    let width = Math.round(height * PAGE_RATIO);

    // In landscape (desktop), two pages side by side
    if (vw >= 1024) {
      if (width * 2 > vw - padding * 2) {
        width = Math.round((vw - padding * 2) / 2);
        height = Math.round(width / PAGE_RATIO);
      }
    } else {
      // Portrait mode (mobile/tablet) — single page
      if (width > vw - padding * 2) {
        width = vw - padding * 2;
        height = Math.round(width / PAGE_RATIO);
      }
    }

    return { width: Math.max(width, 240), height: Math.max(height, 340) };
  }

  onPageFlip(e) {
    if (this.toolbar) {
      this.toolbar.updatePage(e.data);
    }
    if (this.tocPanel) {
      this.tocPanel.highlightPage(e.data);
    }
  }

  onOrientationChange(e) {
    // Recalculate when switching between portrait/landscape
    this.fixImagePaths();
  }

  onResize() {
    // PageFlip handles resize internally with size: 'stretch'
    // But we update toolbar layout
    if (this.toolbar) {
      this.toolbar.updateLayout();
    }
  }

  initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (this.tocPanel?.isOpen) {
        if (e.key === 'Escape') {
          this.tocPanel.close();
          e.preventDefault();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          this.pageFlip.flipNext();
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          this.pageFlip.flipPrev();
          e.preventDefault();
          break;
        case 'Home':
          this.pageFlip.turnToPage(0);
          e.preventDefault();
          break;
        case 'End':
          this.pageFlip.turnToPage(this.totalPages - 1);
          e.preventDefault();
          break;
        case 'f':
        case 'F':
          if (!e.ctrlKey && !e.metaKey) {
            this.toggleFullscreen();
            e.preventDefault();
          }
          break;
      }
    });
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.container.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  /** Fix image paths — try .png and .webp if .jpg fails */
  fixImagePaths() {
    const imgs = this.container.querySelectorAll('.portrait[src]');
    imgs.forEach(img => {
      if (img.complete && img.naturalWidth === 0) {
        // Try png
        const src = img.getAttribute('src');
        if (src.endsWith('.jpg')) {
          img.src = src.replace('.jpg', '.png');
          img.onerror = () => {
            img.src = src.replace('.jpg', '.webp');
            img.onerror = () => {
              img.style.display = 'none';
              const placeholder = img.nextElementSibling;
              if (placeholder) placeholder.style.display = 'flex';
            };
          };
        }
      }
    });
  }
}
