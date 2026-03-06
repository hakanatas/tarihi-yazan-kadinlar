import { gsap, ScrollTrigger } from '../scroll.js';
import { getCategoryColor, formatDateRange, getWomanImageUrl } from '../utils.js';
import { t } from '../i18n.js';

export function initToday(women, lang) {
  const container = document.getElementById('todayGrid');
  if (!container) return;

  container.innerHTML = '';

  // Filter contemporary women (still living or born after 1960)
  const contemporary = women
    .filter((w) => !w.deathYear || w.birthYear >= 1960)
    .sort(() => Math.random() - 0.5)
    .slice(0, 9);

  contemporary.forEach((woman, index) => {
    const card = createTodayCard(woman, lang);
    container.appendChild(card);

    gsap.set(card, { opacity: 0, y: 40, scale: 0.95 });

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: index * 0.08,
          ease: 'power3.out',
        });
      },
    });
  });
}

function createTodayCard(woman, lang) {
  const card = document.createElement('article');
  card.className = 'woman-card';

  const categoryColor = getCategoryColor(woman.category);
  const initials = woman.name[lang]
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);
  const imageSrc = getWomanImageUrl(woman);

  const imageContent = imageSrc
    ? `<img src="${imageSrc}" alt="${woman.name[lang]}" class="woman-card__image" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';

  card.innerHTML = `
    <div class="woman-card__image-wrapper">
      ${imageContent}
      <div style="width:100%;height:100%;display:${imageSrc ? 'none' : 'flex'};align-items:center;justify-content:center;background:linear-gradient(145deg, ${categoryColor}10, ${categoryColor}25, ${categoryColor}12);">
        <span style="font-family:'Playfair Display',serif;font-size:3.5rem;font-weight:700;color:${categoryColor};opacity:0.4;">${initials}</span>
      </div>
      <span class="woman-card__category-badge woman-card__category-badge--${woman.category}">
        ${t(`categories.${woman.category}`)}
      </span>
    </div>
    <div class="woman-card__content">
      <h3 class="woman-card__name">${woman.name[lang]}</h3>
      <p class="woman-card__dates">${formatDateRange(woman.birthYear, woman.deathYear)} &bull; ${woman.nationality}</p>
      <p class="woman-card__bio">${woman.shortBio[lang]}</p>
      <div class="woman-card__achievements">
        ${woman.achievements[lang]
          .slice(0, 3)
          .map((a) => `<span class="achievement-pill">${a}</span>`)
          .join('')}
      </div>
    </div>
  `;

  card.classList.add('is-visible');

  return card;
}
