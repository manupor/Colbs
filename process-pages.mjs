import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { createHash } from 'crypto';

const cssDir = 'colbs-frontend/public/css';
const assetsDir = 'colbs-frontend/public/assets';
mkdirSync('colbs-frontend/src/pages', { recursive: true });

const md5_10 = (s) => createHash('md5').update(s + '\n').digest('hex').slice(0, 10);
const localName = (url) => `${md5_10(url)}_${url.split('/').pop().split('?')[0].slice(0, 40)}`;

// Encuentra el nombre local (variante con 1 o 2 slashes, igual que los downloads)
const assetPath = (url) => {
  const clean = url.replace(/^https?:\/\//, '').replace(/^\/+/, '').replace(/^colbs\.cr\/+/, '');
  const urlA = 'https://colbs.cr/' + clean.replace(/^colbs\.cr\//, '');
  const urlB = 'https://colbs.cr//' + clean.replace(/^colbs\.cr\//, '');
  for (const u of [urlA, urlB]) {
    if (existsSync(`${assetsDir}/${localName(u)}`)) return `/assets/${localName(u)}`;
  }
  return null;
};

const SLUGS = {
  team: 'pages/team.html',
  'our-features': 'pages/our-features.html',
  'areas-of-practice': 'pages/areas-of-practice.html',
  blog: 'pages/blog.html',
  news: 'pages/news.html',
  contacts: 'pages/contacts.html',
  'team/julissa-diaz': 'pages/team/julissa-diaz.html',
  'team/ricardo-soto': 'pages/team/ricardo-soto.html',
};

const download = async (url, dest) => {
  try {
    const r = await fetch(url);
    if (!r.ok) return false;
    writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
    return true;
  } catch { return false; }
};

// ---- 1. CSS links nuevos de las páginas internas ----
const known = new Set(readFileSync('colbs-frontend/css-links.txt', 'utf8').trim().split('\n'));
const newCss = [];
for (const f of readdirSync('pages')) {
  if (!f.endsWith('.html')) continue;
  const html = readFileSync(`pages/${f}`, 'utf8');
  for (const m of html.matchAll(/<link\b[^>]*rel=['"]stylesheet['"][^>]*>/gi)) {
    const href = m[0].match(/href=['"]([^'"]+)['"]/i)?.[1];
    if (!href || !href.includes('colbs.cr') || href.includes('preloader')) continue;
    const url = href.replace(/^\/?\/?colbs\.cr/, 'https://colbs.cr');
    const name = localName(url);
    const local = `/css/${name}`;
    if (known.has(local)) continue;
    if (!existsSync(`${cssDir}/${name}`) && !(await download(url, `${cssDir}/${name}`))) { console.log('FAIL css', url); continue; }
    // Reescritura de url() dentro del CSS → descargar assets referenciados
    let css = readFileSync(`${cssDir}/${name}`, 'utf8');
    const base = new URL(url);
    const jobs = [];
    css = css.replace(/url\((['"]?)([^'")]+)\1\)/g, (mm, q, u) => {
      u = u.trim();
      if (u.startsWith('data:') || (u.startsWith('http') && !u.includes('colbs.cr'))) return mm;
      const abs = u.startsWith('http') || u.startsWith('//') ? (u.startsWith('//') ? 'https:' + u : u) : new URL(u, base).href;
      if (!abs.includes('colbs.cr')) return mm;
      const an = localName(abs.replace(/\/+/g, '/').replace('https:/', 'https://'));
      if (!existsSync(`${assetsDir}/${an}`)) jobs.push([abs, an]);
      return `url(/assets/${an})`;
    });
    writeFileSync(`${cssDir}/${name}`, css);
    for (const [u2, an] of jobs) await download(u2, `${assetsDir}/${an}`);
    newCss.push(local); known.add(local);
  }
}
if (newCss.length) {
  const all = readFileSync('colbs-frontend/css-links.txt', 'utf8').trim() + '\n' + newCss.join('\n');
  writeFileSync('colbs-frontend/css-links.txt', all);
  let idx = readFileSync('colbs-frontend/index.html', 'utf8');
  const tags = all.trim().split('\n').map(h => `    <link rel="stylesheet" href="${h}" />`).join('\n');
  idx = idx.replace(/(    <link rel="stylesheet" href="\/css\/[^"]+" \/>\n)+/, tags + '\n');
  writeFileSync('colbs-frontend/index.html', idx);
  console.log('css nuevos:', newCss.length);
}

// ---- 2. Por página: estilos inline, body, clases ----
const existingStyles = readFileSync('colbs-frontend/src/styles.css', 'utf8');
const styleHashes = new Set(existingStyles.split('\n\n').map(s => md5_10(s.trim())));
const extraStyles = [];
const manifest = {};

const rewriteAssets = (text) =>
  text.replace(/(?:https?:)?\/\/colbs\.cr(\/+wp-content[^"'\s)>]*?\.(?:jpe?g|png|webp|svg|gif|woff2?|ttf|eot)(?:\?[^"'\s)>]*)?)/gi, (m, p) => {
    const p2 = assetPath('colbs.cr/' + p.replace(/^\/+/, ''));
    return p2 || m;
  });

const rewriteLinks = (text) =>
  text.replace(/href="(?:https?:)?\/\/colbs\.cr\/?(team\/[a-z0-9-]+|team|our-features|areas-of-practice|blog|news|contacts)?\/?([^"]*)"/gi,
    (m, slug, rest) => (slug && !rest ? `href="/${slug}"` : !slug && !rest ? 'href="/"' : m));

mkdirSync('colbs-frontend/public/pagejs', { recursive: true });
const extractInline = (html) =>
  [...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(m => !/type=["'](?!text\/javascript|module)[^"']*["']/i.test(m[1] || ''))
    .map(m => m[2].trim())
    .filter(s => s && !s.includes('datepicker.setDefaults') && !s.includes('wp-emoji')
      && !(s.startsWith('{') && (() => { try { JSON.parse(s); return true; } catch { return false; } })()));

// Smash Balloon: los <img> quedan con placeholder gris; el real está en data-img-src-set (JSON escapado, clave "640")
async function fixSbiPlaceholders(body) {
  const phRe = new RegExp('(<img[^>]*?src=")/assets/[a-f0-9]+_placeholder\\.png("[^>]*>)', 'gi');
  const jobs = [];
  body = body.replace(phRe, (m, pre, post, offset) => {
    const before = body.slice(Math.max(0, offset - 2500), offset);
    const matches = [...before.matchAll(/640(?:&quot;|"):(?:&quot;|")([^"&]+?)(?:&quot;|")/g)];
    if (!matches.length) return m;
    const url = matches[matches.length - 1][1].replace(/\\\//g, '/');
    const name = localName('https://colbs.cr/' + url.replace(/^https?:\/\/?\/?colbs\.cr\/+/, ''));
    jobs.push([url.replace(/^\/\//, 'https://'), name]);
    return `${pre}/assets/${name}${post}`;
  });
  for (const [url, name] of jobs) {
    if (!existsSync(`${assetsDir}/${name}`)) await download(url, `${assetsDir}/${name}`);
  }
  console.log('sbi placeholders reemplazados:', jobs.length);
  return body;
}

const pageScripts = {};
mkdirSync('colbs-frontend/src/pages/team', { recursive: true });
for (const [slug, file] of Object.entries(SLUGS)) {
  const html = readFileSync(file, 'utf8');
  const inlines = extractInline(html);
  if (inlines.length) {
    const jsName = slug.replace(/\//g, '__') + '.js';
    writeFileSync(`colbs-frontend/public/pagejs/${jsName}`,
      inlines.map(s => `try {\n${s}\n} catch (e) { console.warn('inline script:', e); }`).join('\n;\n'));
    pageScripts[slug] = `/pagejs/${jsName}`;
  }
  // estilos inline nuevos
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    const s = rewriteAssets(m[1]);
    const h = md5_10(s.trim());
    if (!styleHashes.has(h)) { styleHashes.add(h); extraStyles.push(s); }
  }
  // clases del body
  const bodyTag = html.match(/<body[^>]*class="([^"]*)"/i);
  manifest[slug] = (bodyTag?.[1] || '').replace(/\s+/g, ' ').trim();
  // body interno
  let body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
  body = rewriteAssets(body);
  body = rewriteLinks(body);
  body = await fixSbiPlaceholders(body);
  writeFileSync(`colbs-frontend/src/pages/${slug}.html`, body);
}
// home también necesita rewrite de links internos
{
  let home = readFileSync('colbs-frontend/src/page-body.html', 'utf8');
  home = rewriteLinks(home);
  writeFileSync('colbs-frontend/src/pages/home.html', home);
  const homeBody = readFileSync('site.html', 'utf8').match(/<body[^>]*class="([^"]*)"/i);
  manifest['home'] = (homeBody?.[1] || '').replace(/\s+/g, ' ').trim();
}

if (extraStyles.length) {
  writeFileSync('colbs-frontend/src/styles.css',
    existingStyles + '\n\n/* ===== estilos páginas internas ===== */\n' + extraStyles.join('\n\n')
      .replace(/\.hero-intro \.elementor-contai\s*\n/, '}\n'));
}
writeFileSync('colbs-frontend/src/pages/manifest.js',
  'export const BODY_CLASSES = ' + JSON.stringify(manifest, null, 2) + ';\n' +
  'export const PAGE_SCRIPTS = ' + JSON.stringify(pageScripts, null, 2) + ';\n');
console.log('páginas procesadas:', Object.keys(SLUGS).length, '| estilos inline nuevos:', extraStyles.length, '| scripts por página:', Object.keys(pageScripts).length);
