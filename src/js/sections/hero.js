import { gsap, ScrollTrigger } from '../scroll.js';

export function initHero() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Initial state - hide everything
  gsap.set('.hero-symbol', { scale: 0, opacity: 0 });
  gsap.set('.hero__title-line', { y: 80, opacity: 0 });
  gsap.set('.hero__subtitle', { y: 40, opacity: 0 });
  gsap.set('.hero__date', { y: 30, opacity: 0 });
  gsap.set('.hero__scroll-prompt', { opacity: 0 });
  gsap.set('.hero__botanical', { scale: 0, opacity: 0 });

  // Main reveal timeline
  tl
    // Symbol: dramatic scale-in with glow
    .to('.hero-symbol', {
      scale: 1,
      opacity: 1,
      duration: 1.4,
      ease: 'elastic.out(1, 0.5)',
    })
    // Sparkle ring around symbol
    .fromTo(
      '.hero__symbol-ring',
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    )
    // Title lines stagger with clip-path reveal
    .to('.hero__title-line', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      ease: 'power4.out',
    }, '-=0.5')
    // Subtitle
    .to('.hero__subtitle', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5')
    // Date with handwriting feel
    .to('.hero__date', {
      y: 0,
      opacity: 1,
      duration: 0.6,
    }, '-=0.3')
    // Scroll prompt fade in
    .to('.hero__scroll-prompt', {
      opacity: 1,
      duration: 0.8,
    }, '-=0.2')
    // Floating botanicals bloom in
    .to('.hero__botanical', {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      stagger: 0.12,
      ease: 'back.out(1.5)',
    }, '-=0.8');

  // Parallax on scroll - hero content moves up, botanicals move at different speeds
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 0.5,
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.set('.hero__content', { y: progress * 100, opacity: 1 - progress * 1.5 });
      gsap.set('.hero__botanical:nth-child(1)', { y: progress * 60 });
      gsap.set('.hero__botanical:nth-child(2)', { y: progress * 80 });
      gsap.set('.hero__botanical:nth-child(3)', { y: progress * 40 });
      gsap.set('.hero__scroll-prompt', { opacity: 1 - progress * 3 });
    },
  });

  // Create floating particle effect
  createParticles();
}

function createParticles() {
  const container = document.querySelector('.hero__floating-elements');
  if (!container) return;

  const colors = ['var(--color-gold)', 'var(--color-burgundy-light)', 'var(--color-sage-light)'];

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero__particle';
    const size = 2 + Math.random() * 4;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: 0;
      pointer-events: none;
    `;
    container.appendChild(particle);

    // Animate each particle
    gsap.to(particle, {
      opacity: 0.3 + Math.random() * 0.4,
      duration: 1 + Math.random(),
      delay: 2 + Math.random() * 2,
      ease: 'power2.out',
    });

    gsap.to(particle, {
      y: `${-50 - Math.random() * 100}`,
      x: `${(Math.random() - 0.5) * 60}`,
      duration: 6 + Math.random() * 8,
      delay: 2 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }
}
