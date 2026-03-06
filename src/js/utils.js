import { womanImageMap } from '../data/woman-image-map.js';

export function debounce(fn, delay = 250) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export function throttle(fn, limit = 100) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function formatNumber(num, lang = 'tr') {
  return new Intl.NumberFormat(lang === 'tr' ? 'tr-TR' : 'en-US').format(num);
}

export function formatYear(year, lang = 'tr') {
  return year.toString();
}

export function formatDateRange(birthYear, deathYear) {
  if (!deathYear) return `${birthYear}–`;
  return `${birthYear}–${deathYear}`;
}

export function resolveAssetUrl(url) {
  if (!url || !url.startsWith('/')) return url;
  return `${import.meta.env.BASE_URL}${url.slice(1)}`;
}

export function getWomanImageUrl(woman) {
  const localUrl = womanImageMap[woman.id];
  return resolveAssetUrl(localUrl || woman.imageUrl);
}

export function getCategoryColor(category) {
  const colors = {
    science: '#6B4C9A',
    arts: '#C75B39',
    politics: '#2E6B62',
    sports: '#CF8B3A',
    business: '#3A6B9F',
  };
  return colors[category] || '#8B2252';
}

export function getCategoryLightColor(category) {
  const colors = {
    science: '#8B6FBA',
    arts: '#E07A5A',
    politics: '#4A9A8E',
    sports: '#E8A85A',
    business: '#5A8BBF',
  };
  return colors[category] || '#A83A6A';
}

export function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();
  const decimals = Number.parseInt(element.dataset.decimals || '0', 10);
  const locale = document.documentElement.lang === 'en' ? 'en-US' : 'tr-TR';
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const currentValue = start + (target - start) * eased;
    const roundedValue = decimals > 0
      ? Number(currentValue.toFixed(decimals))
      : Math.round(currentValue);
    element.textContent = formatter.format(roundedValue);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = formatter.format(target);
    }
  }

  requestAnimationFrame(update);
}

export function getResponsiveValue(mobile, tablet, desktop) {
  const width = window.innerWidth;
  if (width < 640) return mobile;
  if (width < 1024) return tablet;
  return desktop;
}
