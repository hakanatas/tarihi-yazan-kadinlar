import { scrollTo } from './scroll.js';

export function initNavigation() {
  initSmoothLinks();
  initMobileMenu();
  initLangToggle();
}

function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      scrollTo(target);

      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobileMenu');
      mobileMenu?.classList.remove('is-open');
    });
  });
}

function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-open');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('is-open');
    }
  });
}

function initLangToggle() {
  const toggle = document.getElementById('langToggle');
  if (!toggle) return;

  toggle.querySelectorAll('.lang-toggle__option').forEach((opt) => {
    opt.addEventListener('click', () => {
      const lang = opt.dataset.lang;
      if (window.switchLanguage) {
        window.switchLanguage(lang);
      }
    });
  });
}
