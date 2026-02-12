import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis;

export function initScroll() {
  // Initialize Lenis smooth scrolling
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Progress bar
  initProgressBar();

  // Reveal animations
  initRevealAnimations();

  // Section observer for nav dots
  initSectionObserver();
}

function initProgressBar() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => el.classList.add('is-visible'),
      once: true,
    });
  });
}

function initSectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  const dots = document.querySelectorAll('.nav__dot');
  const navLinks = document.querySelectorAll('.nav__link');
  const nav = document.getElementById('mainNav');

  // Nav background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav?.classList.add('is-scrolled');
    } else {
      nav?.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // Section observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          dots.forEach((dot) => {
            dot.classList.toggle('is-active', dot.dataset.section === id);
          });

          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

export function scrollTo(target) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.5 });
  }
}

export { gsap, ScrollTrigger };
