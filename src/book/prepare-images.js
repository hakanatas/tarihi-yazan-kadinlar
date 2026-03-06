/**
 * Prepare images for the flipbook.
 * Downloads all woman images using Puppeteer (same technique as generate-pdf.js)
 * and saves them as individual files in public/images/book/.
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const OUTPUT_DIR = path.join(ROOT, 'public/images/book');

const womenData = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/women.json'), 'utf8'));
const women = womenData.women;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function main() {
  console.log(`\n  Flipbook resimleri hazırlanıyor...`);
  console.log(`  ${women.length} kadın, çıktı: ${OUTPUT_DIR}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let success = 0;
  let skipped = 0;

  // Handle local images first
  for (const w of women) {
    if (w.imageUrl && w.imageUrl.startsWith('/images/')) {
      const localPath = path.join(ROOT, 'public', w.imageUrl);
      const outPath = path.join(OUTPUT_DIR, `${w.id}.webp`);
      if (fs.existsSync(localPath)) {
        fs.copyFileSync(localPath, outPath);
        success++;
        console.log(`  [local] ${w.id} ✓`);
      }
    }
  }

  // Handle remote images via Puppeteer navigate
  const remoteWomen = women.filter(w => w.imageUrl && !w.imageUrl.startsWith('/images/'));

  if (remoteWomen.length > 0) {
    const dlPage = await browser.newPage();
    await dlPage.setExtraHTTPHeaders({
      'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'Referer': 'https://en.wikipedia.org/',
    });

    for (let i = 0; i < remoteWomen.length; i++) {
      const w = remoteWomen[i];
      const outPath = path.join(OUTPUT_DIR, `${w.id}.jpg`);

      // Skip if already downloaded
      if (fs.existsSync(outPath) && fs.statSync(outPath).size > 5000) {
        skipped++;
        if ((i + 1) % 10 === 0) process.stdout.write(`  ${i + 1}/${remoteWomen.length} `);
        continue;
      }

      try {
        const response = await dlPage.goto(w.imageUrl, {
          waitUntil: 'networkidle0',
          timeout: 15000,
        });

        if (response && response.ok()) {
          const ct = response.headers()['content-type'] || '';
          if (ct.includes('image')) {
            const buf = await response.buffer();
            if (buf.length > 5000) {
              // Determine extension from content type
              let ext = 'jpg';
              if (ct.includes('png')) ext = 'png';
              else if (ct.includes('webp')) ext = 'webp';

              const finalPath = path.join(OUTPUT_DIR, `${w.id}.${ext}`);
              fs.writeFileSync(finalPath, buf);
              success++;
            }
          }
        }
      } catch (err) {
        console.log(`  [error] ${w.id}: ${err.message.slice(0, 60)}`);
      }

      if ((i + 1) % 10 === 0) {
        console.log(`  ${i + 1}/${remoteWomen.length} (${success} başarılı)`);
      }
    }

    await dlPage.close();
  }

  await browser.close();

  // List results
  const files = fs.readdirSync(OUTPUT_DIR);
  console.log(`\n  ✅ Tamamlandı: ${files.length} resim kaydedildi`);
  if (skipped > 0) console.log(`  ⏭️  ${skipped} resim zaten mevcuttu (atlandı)`);
  console.log(`  📁 ${OUTPUT_DIR}\n`);
}

main().catch(console.error);
