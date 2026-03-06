import { ScrollTrigger } from '../scroll.js';
import { animateCounter } from '../utils.js';

export function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  counters.forEach((counter) => {
    const target = Number.parseFloat(counter.dataset.count);
    if (Number.isNaN(target)) return;

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        animateCounter(counter, target, 2000);
      },
    });
  });
}
