import { gsap, ScrollTrigger } from '../scroll.js';
import { getCategoryColor } from '../utils.js';

export function initQuotes(women, lang) {
  const container = document.getElementById('quotesCarousel');
  if (!container) return;

  container.innerHTML = '';

  // Get women with quotes
  const withQuotes = women.filter((w) => w.quote && w.quote[lang] && w.quote[lang].length > 0);

  // Shuffle and take up to 12
  const selected = [...withQuotes].sort(() => Math.random() - 0.5).slice(0, 12);

  selected.forEach((woman, index) => {
    const quoteEl = createQuoteElement(woman, lang, index);
    container.appendChild(quoteEl);
  });

  // Animate quotes on scroll
  const quoteItems = container.querySelectorAll('.quote-item');

  quoteItems.forEach((item, i) => {
    gsap.set(item, { opacity: 0, y: 50 });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: i * 0.08,
          ease: 'power3.out',
        });
      },
    });
  });
}

function createQuoteElement(woman, lang, index) {
  const el = document.createElement('div');
  el.className = 'quote-item';

  const categoryColor = getCategoryColor(woman.category);

  // Initials
  const initials = woman.name[lang]
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  // Large decorative quotation mark
  const quoteMarkColor = index % 2 === 0 ? 'var(--color-gold)' : 'var(--color-burgundy-light)';

  el.innerHTML = `
    <div style="position:relative;text-align:center;padding:3rem 1.5rem;max-width:48rem;margin:0 auto;${index > 0 ? 'border-top:1px solid rgba(200,169,81,0.12);' : ''}">
      <!-- Large decorative quote mark -->
      <div style="position:absolute;top:1.5rem;left:50%;transform:translateX(-50%);font-family:'Playfair Display',serif;font-size:6rem;line-height:1;color:${quoteMarkColor};opacity:0.08;pointer-events:none;">"</div>

      <!-- Initials circle -->
      <div style="display:flex;justify-content:center;margin-bottom:1.5rem;">
        <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg, ${categoryColor}20, ${categoryColor}40);display:flex;align-items:center;justify-content:center;border:2px solid ${categoryColor}30;box-shadow:0 4px 15px ${categoryColor}15;">
          <span style="font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:${categoryColor};">${initials}</span>
        </div>
      </div>

      <!-- Quote text -->
      <blockquote style="font-family:'Playfair Display',serif;font-size:clamp(1.15rem, 2.5vw, 1.6rem);font-style:italic;color:var(--color-cream);line-height:1.7;margin-bottom:1.5rem;position:relative;z-index:1;">
        "${woman.quote[lang]}"
      </blockquote>

      <!-- Attribution -->
      <cite style="font-family:'Inter',sans-serif;font-style:normal;font-size:0.95rem;font-weight:600;color:var(--color-gold);display:block;">
        — ${woman.name[lang]}
      </cite>
      <span style="font-size:0.8rem;color:var(--color-gold-light);opacity:0.5;display:block;margin-top:0.25rem;">
        ${woman.shortBio[lang]}
      </span>
    </div>
  `;

  return el;
}
