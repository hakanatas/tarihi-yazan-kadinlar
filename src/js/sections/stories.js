import { gsap, ScrollTrigger } from '../scroll.js';
import { getCategoryColor, formatDateRange, getWomanImageUrl } from '../utils.js';
import { t } from '../i18n.js';

export function initStories(women, lang) {
  const categories = ['science', 'arts', 'politics', 'sports', 'business'];

  categories.forEach((category) => {
    const container = document.querySelector(`.stories__cards[data-category="${category}"]`);
    if (!container) return;

    container.innerHTML = '';

    const categoryWomen = women
      .filter((w) => w.category === category)
      .slice(0, 6);

    categoryWomen.forEach((woman, index) => {
      const card = createStoryCard(woman, lang, index);
      container.appendChild(card);

      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        },
      });
    });
  });
}

function createStoryCard(woman, lang, index) {
  const card = document.createElement('article');
  card.className = 'story-card';
  card.style.opacity = '0';
  card.style.transform = index % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)';

  const categoryColor = getCategoryColor(woman.category);
  const imageSrc = getWomanImageUrl(woman);

  // Generate illustration (image or gradient with initials)
  const initials = woman.name[lang]
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  const quoteHtml = woman.quote && woman.quote[lang]
    ? `<blockquote class="woman-card__quote" style="margin-top:0.75rem;border-left:3px solid ${categoryColor}33;padding-left:0.75rem;border-top:none;">
        "${woman.quote[lang]}"
      </blockquote>`
    : '';

  const illustrationContent = imageSrc
    ? `<img src="${imageSrc}" alt="${woman.name[lang]}" style="width:100%;height:100%;object-fit:cover;" loading="lazy" onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg, ${categoryColor}12, ${categoryColor}30, ${categoryColor}15);\\'><span style=\\'font-family:Playfair Display,serif;font-size:3.5rem;font-weight:700;color:${categoryColor};opacity:0.5;\\'>${initials}</span></div>'">`
    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg, ${categoryColor}12, ${categoryColor}30, ${categoryColor}15);">
        <span style="font-family:'Playfair Display',serif;font-size:3.5rem;font-weight:700;color:${categoryColor};opacity:0.5;text-shadow:0 2px 10px ${categoryColor}20;">${initials}</span>
      </div>`;

  card.innerHTML = `
    <div class="story-card__illustration" style="border:2px solid ${categoryColor}20;">
      ${illustrationContent}
    </div>
    <div class="story-card__content">
      <div class="category-label category-label--${woman.category}" style="margin-bottom:0.5rem;">
        ${t(`categories.${woman.category}`)}
      </div>
      <h3 class="story-card__name">${woman.name[lang]}</h3>
      <div class="story-card__meta">
        ${formatDateRange(woman.birthYear, woman.deathYear)} &bull; ${woman.nationality}
      </div>
      <p class="story-card__text">${woman.bio[lang]}</p>
      <div class="woman-card__achievements" style="margin-top:0.75rem;">
        ${woman.achievements[lang].map((a) => `<span class="achievement-pill" style="background:${categoryColor}15;color:${categoryColor};border:1px solid ${categoryColor}25;">${a}</span>`).join('')}
      </div>
      ${quoteHtml}
    </div>
  `;

  return card;
}
