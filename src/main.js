import { initI18n, onLanguageChange, getCurrentLang } from './js/i18n.js';
import { initScroll, gsap, ScrollTrigger } from './js/scroll.js';
import { initNavigation } from './js/navigation.js';
import { initHero } from './js/sections/hero.js';
import { initTimeline } from './js/sections/timeline.js';
import { initConstellation } from './js/sections/constellation.js';
import { initStories } from './js/sections/stories.js';
import { initWorldMap } from './js/sections/worldmap.js';
import { initStatistics } from './js/sections/statistics.js';
import { initQuotes } from './js/sections/quotes.js';
import { initToday } from './js/sections/today.js';
import { initCounters } from './js/components/counter.js';
import womenData from './data/women.json';
import statisticsData from './data/statistics.json';

function syncCounter(id, value, decimals = 0) {
  const counter = document.getElementById(id);
  if (!counter) return;

  counter.dataset.count = String(value);

  if (decimals > 0) {
    counter.dataset.decimals = String(decimals);
  } else {
    delete counter.dataset.decimals;
  }
}

function syncOverviewCounters(women, statistics) {
  const uniqueCategories = new Set(women.map((woman) => woman.category).filter(Boolean)).size;
  const uniqueNationalities = new Set(women.map((woman) => woman.nationality).filter(Boolean)).size;

  syncCounter('counterWomen', women.length);
  syncCounter('counterCategories', uniqueCategories);
  syncCounter('counterCountries', uniqueNationalities);

  syncCounter('statNobel', statistics.highlights.totalNobelWomen);
  syncCounter('statLeaders', statistics.highlights.parliamentPercentage, 1);
  syncCounter('statCEO', statistics.highlights.fortune500CEOs);
}

async function init() {
  // Phase 1: i18n
  await initI18n();

  // Phase 2: Scroll and navigation
  initScroll();
  initNavigation();

  // Phase 3: Hero animations
  initHero();

  // Phase 4: Counters
  syncOverviewCounters(womenData.women, statisticsData);
  initCounters();

  // Phase 5: Data-driven sections
  const lang = getCurrentLang();
  initTimeline(womenData.women, lang);
  initConstellation(womenData.women, lang);
  initStories(womenData.women, lang);
  initWorldMap(womenData.women, lang);
  initStatistics(lang);
  initQuotes(womenData.women, lang);
  initToday(womenData.women, lang);

  // Language change handler
  onLanguageChange((newLang) => {
    initTimeline(womenData.women, newLang);
    initConstellation(womenData.women, newLang);
    initStories(womenData.women, newLang);
    initWorldMap(womenData.women, newLang);
    initStatistics(newLang);
    initQuotes(womenData.women, newLang);
    initToday(womenData.women, newLang);
  });
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
