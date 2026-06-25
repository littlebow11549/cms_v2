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

// 只認「真的有 ≥4 張遊戲卡(含圖片的 .group)」的格子,Coming Soon/版面格子不算
function findGameGrids() {
  const cards = [...document.querySelectorAll('#container .group')].filter((c) => c.querySelector('img[alt]'));
  const m = new Map();
  cards.forEach((c) => { const p = c.parentElement; m.set(p, (m.get(p) || 0) + 1); });
  return [...m.entries()].filter(([, n]) => n >= 4).map(([p]) => p);
}

function removeExistingLoadMore() {
  [...document.querySelectorAll('#container button')].forEach((b) => {
    if (!/load more/i.test(b.textContent)) return;
    const wrap = b.parentElement;
    if (wrap && wrap.children.length === 1) wrap.remove(); else b.remove();
  });
}

function setupGamePage() {
  // 先清掉所有既有 Load more(靜態 HTML + 先前注入),避免重複/殘留
  removeExistingLoadMore();
  // 只給真的有遊戲卡的格子加一顆 Load more;Coming Soon/無遊戲頁不加
  findGameGrids().forEach((grid) => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;justify-content:center;margin-top:24px;margin-bottom:8px';
    const btn = document.createElement('button');
    btn.textContent = 'Load more';
    wrap.appendChild(btn);
    grid.parentElement.insertBefore(wrap, grid.nextSibling);
    lmStyle(btn); lmHover(btn);
    btn.addEventListener('click', () => lmAppend(grid));
  });
}

document.addEventListener('page:rendered', (e) => {
  if (GAME_PAGES.includes(e.detail.slug)) setupGamePage();
});

// === 輪播 ‹ › 箭頭:捲動同一個 section 內的橫向 rail ===
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const isLeft = !!btn.querySelector('svg.lucide-chevron-left');
  const isRight = !!btn.querySelector('svg.lucide-chevron-right');
  if (!isLeft && !isRight) return;
  const sect = btn.closest('section');
  const rail = sect && sect.querySelector('.overflow-x-auto');
  if (!rail) return;
  e.preventDefault();
  const amount = Math.max(rail.clientWidth * 0.8, 200);
  rail.scrollBy({ left: isLeft ? -amount : amount, behavior: 'smooth' });
});
