// === 頁籤切換 (首頁 Mini/Slot/Live 自動輪播+進度條 + sport/live 供應商) ===
const IMG = '_external/images.unsplash.com/';
const PICS = [
  'photo-1534620780923-1ce0db377c3f__w-200',
  'photo-1604028297236-42130c7dcc3a__w-200',
  'photo-1604028296525-8304e1a4969f__w-200',
  'photo-1771775606196-70dccc0d9bde__w-200',
  'photo-1525018667593-176858caed6a__w-200',
  'photo-1590336225155-d7e19a3a954f__w-200',
];
const pic = (i) => IMG + PICS[i % PICS.length];

const HOME_TABS = {
  'Mini Game': ['Mega Fortune', 'Starburst', 'Limbo', 'Mines', 'Plinko', 'Dice', 'Tower', 'Keno', 'Hilo', 'Wheel', 'Crash', 'Coin Flip', 'Rocket', 'Caves', 'Video Poker', 'Scratch Card'],
  'Slot Game': ['Gates of Olympus', 'Sweet Bonanza', 'Book of Dead', 'Starburst', 'Wolf Gold', 'Mega Moolah', 'Gonzo Quest', 'Dead or Alive', 'Sugar Rush', 'Big Bass', 'Money Train', 'Wild West Gold'],
  'Live Game': ['Lightning Roulette', 'Crazy Time', 'Mega Wheel', 'Baccarat', 'Dragon Tiger', 'Monopoly Live', 'Blackjack VIP', 'Sic Bo', 'Dream Catcher', 'Speed Roulette', 'Football Studio', 'Andar Bahar'],
};
const HOME_ORDER = ['Mini Game', 'Slot Game', 'Live Game'];
const CYCLE_MS = 6000, STEP_MS = 50;

function homeCard(name, i) {
  return `<div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">`
    + `<div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">`
    + `<img src="${pic(i)}" alt="${name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"></div>`
    + `<h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">${name}</h3></div>`;
}

// --- 首頁頁籤自動輪播 + 進度條 ---
let homeCtx = null, homeTimer = null, homeIdx = 0, homeProgress = 0, homePaused = false;

function findHomeTabGroup() {
  const span = [...document.querySelectorAll('#container button > span')]
    .find((s) => HOME_TABS[s.textContent.trim()]);
  if (!span) return null;
  const btn = span.closest('button');
  return { group: btn.parentElement, sect: btn.closest('section') };
}

function applyHomeTab(ctx, idx) {
  const label = HOME_ORDER[idx];
  [...ctx.group.querySelectorAll('button')].forEach((b) => {
    const l = (b.querySelector('span')?.textContent || '').trim();
    const active = l === label;
    b.classList.toggle('text-white', active);
    b.classList.toggle('text-gray-500', !active);
    // 移除任何既有指示器(含 Figma 匯出的靜態 46% 進度條),避免重複
    b.querySelectorAll(':scope > div.absolute').forEach((d) => d.remove());
    if (active) {
      const track = document.createElement('div');
      track.className = 'tab-prog absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700';
      track.innerHTML = '<div class="tab-fill h-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] transition-all duration-100" style="width:0%"></div>';
      b.appendChild(track);
    }
  });
  const rail = ctx.sect && ctx.sect.querySelector('.animate-slideIn');
  if (rail && HOME_TABS[label]) rail.innerHTML = HOME_TABS[label].map((n, i) => homeCard(n, i)).join('');
}

function setHomeFill(ctx, pct) {
  const fill = ctx.group.querySelector('.tab-prog .tab-fill');
  if (fill) fill.style.width = pct + '%';
}

function gotoHomeTab(idx, resetGames) {
  if (!homeCtx) return;
  homeIdx = ((idx % HOME_ORDER.length) + HOME_ORDER.length) % HOME_ORDER.length;
  homeProgress = 0;
  applyHomeTab(homeCtx, homeIdx);
  setHomeFill(homeCtx, 0);
}

function initHomeTabs() {
  clearInterval(homeTimer);
  homeCtx = findHomeTabGroup();
  if (!homeCtx) return;
  homeIdx = 0; homeProgress = 0; homePaused = false;
  applyHomeTab(homeCtx, homeIdx);
  setHomeFill(homeCtx, 0);
  if (homeCtx.sect) {
    homeCtx.sect.addEventListener('mouseenter', () => { homePaused = true; });
    homeCtx.sect.addEventListener('mouseleave', () => { homePaused = false; });
  }
  homeTimer = setInterval(() => {
    if (homePaused || !homeCtx) return;
    homeProgress += (STEP_MS / CYCLE_MS) * 100;
    if (homeProgress >= 100) {
      homeProgress = 0;
      homeIdx = (homeIdx + 1) % HOME_ORDER.length;
      applyHomeTab(homeCtx, homeIdx);
    }
    setHomeFill(homeCtx, homeProgress);
  }, STEP_MS);
  window._homeTabTimer = homeTimer;
}
window.initHomeTabs = initHomeTabs;
document.addEventListener('page:rendered', (e) => {
  if (!e.detail || e.detail.slug === 'home') initHomeTabs();
  if (e.detail && (e.detail.slug === 'sport' || e.detail.slug === 'live')) applyProviderFilter();
});

// --- sport / live 供應商頁籤 + 比賽收藏 ---
const PROVIDERS = /^(BTI|SABA|Sexy|Pragmatic Play|Yeebet|Favorites)$/;

// 所有比賽卡(含星號的 .rounded-xl 卡片)
function matchCards() {
  return [...document.querySelectorAll('#container svg.lucide-star')]
    .map((s) => s.closest('[class*="rounded-xl"]'))
    .filter(Boolean);
}
// 目前作用中的供應商頁籤文字
function activeProviderLabel() {
  for (const r of document.querySelectorAll('#container .border-b')) {
    const btns = [...r.querySelectorAll('button')].filter((b) => PROVIDERS.test((b.textContent || '').trim()));
    if (!btns.length) continue;
    const act = btns.find((b) => b.classList.contains('text-[#98E7D2]'));
    return ((act || btns[0]).textContent || '').trim();
  }
  return '';
}
// Favorites 只顯示已收藏;其它供應商顯示全部
function applyProviderFilter() {
  const cards = matchCards();
  if (!cards.length) return;
  const favOnly = activeProviderLabel() === 'Favorites';
  let shown = 0;
  cards.forEach((c) => {
    const show = !favOnly || c.dataset.fav === '1';
    c.style.display = show ? '' : 'none';
    if (show) shown++;
  });
  const grid = cards[0].parentElement;
  let empty = grid && grid.querySelector(':scope > .fav-empty');
  if (favOnly && shown === 0) {
    if (!empty && grid) {
      empty = document.createElement('div');
      empty.className = 'fav-empty';
      empty.style.cssText = 'grid-column:1/-1;text-align:center;color:#9ca3af;padding:48px 16px';
      empty.textContent = 'No favorite matches yet — tap the ☆ on a match to add it.';
      grid.appendChild(empty);
    }
  } else if (empty) {
    empty.remove();
  }
}

// 點比賽卡的星號 → 切換收藏
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  const star = btn && btn.querySelector('svg.lucide-star');
  if (!star) return;
  e.preventDefault();
  e.stopPropagation();
  const card = btn.closest('[class*="rounded-xl"]');
  const on = (card ? card.dataset.fav : btn.dataset.fav) !== '1';
  if (card) card.dataset.fav = on ? '1' : '';
  btn.dataset.fav = on ? '1' : '';
  star.style.color = on ? '#98E7D2' : 'rgb(75, 85, 99)';
  star.setAttribute('fill', on ? '#98E7D2' : 'none');
  applyProviderFilter();
});

document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const label = (btn.querySelector('span')?.textContent || btn.textContent || '').trim();

  // --- 首頁 Mini/Slot/Live 頁籤(手動切換,重置進度條)---
  if (HOME_TABS[label]) {
    if (!homeCtx) homeCtx = findHomeTabGroup();
    gotoHomeTab(HOME_ORDER.indexOf(label));
    return;
  }

  // --- sport / live 供應商頁籤 ---
  const tabRow = btn.closest('.border-b');
  if (tabRow && PROVIDERS.test(label)) {
    [...tabRow.querySelectorAll('button')].forEach((b) => {
      const active = b === btn;
      b.classList.toggle('text-[#98E7D2]', active);
      b.classList.toggle('text-gray-400', !active);
      let u = b.querySelector(':scope > div.absolute');
      if (active && !u) {
        u = document.createElement('div');
        u.className = 'absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]';
        b.appendChild(u);
      } else if (!active && u) {
        u.remove();
      }
    });
    applyProviderFilter();   // 切換供應商後套用 Favorites 過濾
  }
});
