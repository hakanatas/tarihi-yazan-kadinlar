/**
 * Flipbook entry point — Tarihi Yazan Kadınlar interactive book.
 */
import './flipbook.css';
import { FlipbookApp } from './js/FlipbookApp.js';

// Wait for fonts to load, then initialize
document.fonts.ready.then(() => {
  const container = document.getElementById('flipbook-app');
  if (!container) {
    console.error('Flipbook container not found');
    return;
  }

  const app = new FlipbookApp(container);
  app.init().catch(err => {
    console.error('Flipbook initialization failed:', err);
    const loading = document.getElementById('loading');
    if (loading) {
      loading.querySelector('.loading-subtitle').textContent = 'Yükleme hatası. Lütfen sayfayı yenileyin.';
      loading.querySelector('.loading-spinner').style.display = 'none';
    }
  });
});
