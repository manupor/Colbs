import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:5173';
const out = process.argv[3] || 'shot.png';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('pageerror', (e) => console.log('PAGEERROR:', e.message?.slice(0, 300)));
page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE:', m.text().slice(0, 300)); });
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => { });
await page.waitForTimeout(2500);

const info = await page.evaluate(() => {
  const menu = document.querySelector('#menu_main');
  if (!menu) return { menu: 'NO EXISTE' };
  const cs = getComputedStyle(menu);
  const r = menu.getBoundingClientRect();
  const li = menu.querySelector('li a');
  const lcs = li ? getComputedStyle(li) : null;
  return {
    display: cs.display, visibility: cs.visibility, opacity: cs.opacity,
    height: cs.height, width: cs.width,
    rect: { x: r.x, y: r.y, w: r.width, h: r.height },
    items: menu.querySelectorAll('li').length,
    linkColor: lcs?.color, linkFontSize: lcs?.fontSize,
    navParentDisplay: getComputedStyle(menu.closest('nav')).display,
    headerText: document.querySelector('.sc_layouts_column')?.innerText?.slice(0, 120),
  };
});
console.log(JSON.stringify(info, null, 1));
await page.screenshot({ path: out });
await browser.close();
