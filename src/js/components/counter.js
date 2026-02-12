import { ScrollTrigger } from '../scroll.js';
import { animateCounter } from '../utils.js';

export function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.count, 10);

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
