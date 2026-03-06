import i18next from 'i18next';
import trTranslations from '../i18n/tr.json';
import enTranslations from '../i18n/en.json';

let onLanguageChangeCallbacks = [];

export async function initI18n() {
  const lng = detectLanguage();

  await i18next.init({
    lng,
    fallbackLng: 'tr',
    resources: {
      tr: { translation: trTranslations },
      en: { translation: enTranslations },
    },
    interpolation: { escapeValue: false },
  });

  document.documentElement.lang = lng;
  updateAllTranslations();
  updateLangToggle(lng);
}

function detectLanguage() {
  const urlParam = new URLSearchParams(window.location.search).get('lang');
  if (urlParam && ['tr', 'en'].includes(urlParam)) return urlParam;

  const stored = localStorage.getItem('lang');
  if (stored && ['tr', 'en'].includes(stored)) return stored;

  const browserLang = navigator.language.slice(0, 2);
  return browserLang === 'en' ? 'en' : 'tr';
}

export function t(key, options) {
  return i18next.t(key, options);
}

export function getCurrentLang() {
  return i18next.language;
}

export function switchLanguage(lang) {
  if (!['tr', 'en'].includes(lang)) return;
  i18next.changeLanguage(lang);
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
  updateURL(lang);
  updateAllTranslations();
  updateLangToggle(lang);
  onLanguageChangeCallbacks.forEach((cb) => cb(lang));
}

export function onLanguageChange(callback) {
  onLanguageChangeCallbacks.push(callback);
}

function updateURL(lang) {
  const url = new URL(window.location);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url);
}

function updateAllTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const translated = i18next.t(key);
    if (translated && translated !== key) {
      el.textContent = translated;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = i18next.t(key);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    el.setAttribute('aria-label', i18next.t(key));
  });

  updateDocumentMetadata();
}

function updateLangToggle(lang) {
  document.querySelectorAll('.lang-toggle__option').forEach((opt) => {
    opt.classList.toggle('lang-toggle__option--active', opt.dataset.lang === lang);
  });
}

function updateDocumentMetadata() {
  const title = i18next.t('site.title');
  const description = i18next.t('site.description');
  const locale = i18next.language === 'en' ? 'en_US' : 'tr_TR';
  const alternateLocale = i18next.language === 'en' ? 'tr_TR' : 'en_US';

  document.title = title;

  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:locale"]', locale);
  setMetaContent('meta[property="og:locale:alternate"]', alternateLocale);
  setMetaContent('meta[name="twitter:title"]', title);
}

function setMetaContent(selector, content) {
  const meta = document.querySelector(selector);
  if (meta) {
    meta.setAttribute('content', content);
  }
}

// Expose for footer buttons
window.switchLanguage = switchLanguage;
