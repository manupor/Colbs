import { readFileSync, writeFileSync, existsSync } from 'fs';
import { createHash } from 'crypto';

const html = readFileSync('site.html', 'utf8');

// Reproduce shell filename logic: md5(url + "\n") first 10 chars + basename first 40 chars
const localName = (url) => {
  const h = createHash('md5').update(url + '\n').digest('hex').slice(0, 10);
  const base = url.split('/').pop().slice(0, 40);
  return `${h}_${base}`;
};

const rewrite = (text) =>
  text.replace(/(?:https?:)?\/\/colbs\.cr(\/+\wp-content[^"'\s)>]*?\.(?:jpe?g|png|webp|svg|gif|woff2?|ttf|eot)(?:\?[^"'\s)>]*)?)/gi,
    (m, p) => {
      const urlA = 'https://colbs.cr/' + p.replace(/^\/+/, '');
      const urlB = 'https://colbs.cr//' + p.replace(/^\/+/, '');
      const name = existsSync(`colbs-frontend/public/assets/${localName(urlA)}`)
        ? localName(urlA)
        : localName(urlB);
      return `/assets/${name}`;
    });

// 1. Extract <style> blocks
const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
const fixedStyles = styles.map(s => rewrite(s)).join('\n\n')
  .replace(/\.hero-intro \.elementor-contai\s*\n/, '}\n'); // el CSS inline original estaba truncado en el HTML fuente
writeFileSync('colbs-frontend/src/styles.css', fixedStyles + `

/* React: revelar elementos que WordPress mostraba vía JS */
.sc_layouts_menu { visibility: visible !important; overflow: visible !important; }
#sb_instagram .sbi_item, .sbi .sbi_item { opacity: 1 !important; transition: none !important; }
`);

// 2. Extract body inner content, strip scripts and preloader
let body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
const inlineScripts = [...body.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(m => !/type=["'](?!text\/javascript|module)[^"']*["']/i.test(m[1] || ''))
  .map(m => m[2].trim())
  .filter(s => s && !s.includes('datepicker.setDefaults')
    && !(s.startsWith('{') && (() => { try { JSON.parse(s); return true; } catch { return false; } })()));
writeFileSync('colbs-frontend/public/vendor/inline.js',
  inlineScripts.map(s => `try {\n${s}\n} catch (e) { console.warn('inline script:', e); }`).join('\n;\n'));
body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
body = body.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
// Quitar el preloader (su JS no existe en React y tapa toda la página)
const pi = body.indexOf('class="preloader-plus"');
if (pi > -1) {
  const divStart = body.lastIndexOf('<div', pi);
  let depth = 0, i = divStart;
  while (i < body.length) {
    const open = body.indexOf('<div', i);
    const close = body.indexOf('</div>', i);
    if (close === -1) break;
    if (open !== -1 && open < close) { depth++; i = open + 4; }
    else { depth--; i = close + 6; if (depth === 0) break; }
  }
  body = body.slice(0, divStart) + body.slice(i);
}
body = rewrite(body);
writeFileSync('colbs-frontend/src/page-body.html', body);

// 3. Report any colbs.cr URLs left in body/styles that we didn't localize
const leftovers = (rewrite(body) + styles.join('')).match(/https?:\/\/colbs\.cr[^"'\s)>]*/g) || [];
console.log('leftover colbs urls:', [...new Set(leftovers)].slice(0, 10));
console.log('body bytes:', body.length, 'css bytes:', styles.join('').length);
