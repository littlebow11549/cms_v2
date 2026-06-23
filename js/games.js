// === 遊戲頁 Load more (每頁皆有 + hover + 載入更多) ===
const GAME_PAGES = ['hot-games', 'mini-games', 'slot', 'sport', 'live', 'fish'];

function lmStyle(b) {
  b.style.background = 'rgba(255,255,255,0.05)';
  b.style.border = '1px solid rgba(255,255,255,0.2)';
  b.style.borderRadius = '8px';
  b.style.padding = '12px 60px';
  b.style.color = '#D1D5DB';
  b.style.fontWeight = '500';
  b.style.cursor = 'pointer';
  b.style.transition = 'all .2s';
}
function lmHover(b) {
  if (b._lmHover) return; b._lmHover = true;
  b.addEventListener('mouseenter', () => { b.style.background = '#313E40'; b.style.color = '#AAE5D3'; b.style.borderColor = '#AAE5D3'; });
  b.addEventListener('mouseleave', () => { b.style.background = 'rgba(255,255,255,0.05)'; b.style.color = '#D1D5DB'; b.style.borderColor = 'rgba(255,255,255,0.2)'; });
}
function lmAppend(grid) {
  const cards = [...grid.children].filter((c) => !c._clone);
  cards.slice(0, Math.min(cards.length, 12)).forEach((c) => { const n = c.cloneNode(true); n._clone = true; grid.appendChild(n); });
}

function findGrids() {
  const set = new Set();
  document.querySelectorAll('#container [class*="grid-cols"]').forEach((g) => { if (g.children.length >= 4) set.add(g); });
  const cards = [...document.querySelectorAll('#container .group')].filter((c) => c.querySelector('img[alt]'));
  const m = new Map();
  cards.forEach((c) => { const p = c.parentElement; m.set(p, (m.get(p) || 0) + 1); });
  [...m.entries()].filter(([, n]) => n >= 4).forEach(([p]) => set.add(p));
  return [...set];
}

function setupGamePage() {
  const grids = findGrids();
  grids.forEach((grid) => {
    // 該 grid 後面是否已有 Load more?
    let btn = null;
    let probe = grid.nextElementSibling;
    for (let i = 0; i < 3 && probe; i++, probe = probe.nextElementSibling) {
      const b = probe.matches && probe.matches('button') ? probe : probe.querySelector && probe.querySelector('button');
      if (b && /load more/i.test(b.textContent)) { btn = b; break; }
    }
    if (!btn) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;justify-content:center;margin-top:24px;margin-bottom:8px';
      btn = document.createElement('button');
      btn.textContent = 'Load more';
      wrap.appendChild(btn);
      grid.parentElement.insertBefore(wrap, grid.nextSibling);
    }
    lmStyle(btn); lmHover(btn);
    if (!btn._lmClick) {
      btn._lmClick = true;
      btn.addEventListener('click', () => lmAppend(grid));
    }
  });
}

document.addEventListener('page:rendered', (e) => {
  if (GAME_PAGES.includes(e.detail.slug)) setupGamePage();
});
