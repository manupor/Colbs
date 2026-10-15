import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { createHash } from 'crypto';

const html = readFileSync('site.html', 'utf8');
const cssDir = 'colbs-frontend/public/css';
const assetsDir = 'colbs-frontend/public/assets';
mkdirSync(cssDir, { recursive: true });

// Extraer <link ... stylesheet ... href='...'> en orden (comillas simples o dobles)
const links = [...html.matchAll(/<link\b[^>]*rel=['"]stylesheet['"][^>]*>/gi)].map(m => m[0]);
const hrefs = links
  .map(l => l.match(/href=['"]([^'"]+)['"]/i)?.[1])
  .filter(Boolean)
  .map(h => h.replace(/^\/?\/?colbs\.cr/, 'https://colbs.cr'));

console.log('total css:', hrefs.length);

const localName = (url) =>
  `${createHash('md5').update(url + '\n').digest('hex').slice(0, 10)}_${url.split('/').pop().split('?')[0].slice(0, 40)}`;

const download = async (url, dest) => {
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
    return true;
  } catch { return null; }
};

const localLinks = [];
const assetJobs = [];

for (const href of new Set(hrefs)) {
  if (!href.includes('colbs.cr')) { localLinks.push(href); continue; }
  const name = localName(href);
  const dest = `${cssDir}/${name}`;
  const ok = existsSync(dest) || (await download(href, dest));
  if (!ok) { console.log('FAIL', href); continue; }
  // Reescribir url() relativos/absolutos dentro del CSS
  let css = readFileSync(dest, 'utf8');
  const base = new URL(href);
  css = css.replace(/url\((['"]?)([^'")]+)\1\)/g, (m, q, u) => {
    u = u.trim();
    if (u.startsWith('data:') || u.startsWith('http') && !u.includes('colbs.cr')) return m;
    const abs = u.startsWith('http') || u.startsWith('//')
      ? (u.startsWith('//') ? 'https:' + u : u)
      : new URL(u, base).href;
    if (!abs.includes('colbs.cr')) return m;
    const an = localName(abs);
    if (!existsSync(`${assetsDir}/${an}`)) assetJobs.push([abs, `${assetsDir}/${an}`]);
    return `url(/assets/${an})`;
  });
  writeFileSync(dest, css);
  localLinks.push(`/css/${name}`);
}

// Descargar assets referenciados por los CSS (fuentes, iconos, imágenes)
for (const [url, dest] of assetJobs) {
  if (!(await download(url, dest))) console.log('FAIL asset', url);
}
console.log('css assets extra:', assetJobs.length);

writeFileSync('colbs-frontend/css-links.txt', localLinks.join('\n'));
console.log('links listos:', localLinks.length);
