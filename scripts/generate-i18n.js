import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const locales = ['en', 'et', 'de', 'he', 'ru', 'ua', 'ko', 'ja', 'zh-tw']; // bez PL, bo PL jest w root
const pagesDir = path.join(__dirname, '../src/pages');

const pageTemplate = (title, lang) => `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="${title}" lang="${lang}">
  <h1>Wersja ${lang.toUpperCase()} - Strona w przygotowaniu</h1>
  <p>Treść korporacyjna Alnair dla rynku: ${lang}.</p>
</BaseLayout>
`;

locales.forEach(loc => {
  const dir = path.join(pagesDir, loc);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    // Tworzy stronę główną dla każdego języka: alnair.eu/en/
    fs.writeFileSync(path.join(dir, 'index.astro'), pageTemplate("Alnair Global", loc));
    // Tworzy stronę "About": alnair.eu/en/about
    fs.writeFileSync(path.join(dir, 'about.astro'), pageTemplate("About Alnair", loc));
    console.log(`✅ Utworzono strukturę stron dla: ${loc}`);
  }
});
