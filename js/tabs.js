// === 頁籤切換 (首頁 Mini/Slot/Live + sport/live 供應商) ===
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

function homeCard(name, i) {
  return `<div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">`
    + `<div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">`
    + `<img src="${pic(i)}" alt="${name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"></div>`
    + `<h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">${name}</h3></div>`;
}

function homeIndicator() {
  const d = document.createElement('div');
  d.className = 'absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700';
  d.innerHTML = '<div class="h-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]"></div>';
  return d;
}

const PROVIDERS = /^(BTI|SABA|Sexy|Pragmatic Play|Yeebet|Favorites)$/;

document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const label = (btn.querySelector('span')?.textContent || btn.textContent || '').trim();

  // --- 首頁 Mini/Slot/Live 頁籤 ---
  if (HOME_TABS[label]) {
    const group = btn.parentElement;
    const sect = btn.closest('section');
    if (!group || !sect) return;
    [...group.querySelectorAll('button')].forEach((b) => {
      const l = (b.querySelector('span')?.textContent || '').trim();
      const active = l === label;
      b.classList.toggle('text-white', active);
      b.classList.toggle('text-gray-500', !active);
      let ind = b.querySelector(':scope > div.absolute');
      if (active && !ind) b.appendChild(homeIndicator());
      else if (!active && ind) ind.remove();
    });
    const rail = sect.querySelector('.animate-slideIn');
    if (rail) rail.innerHTML = HOME_TABS[label].map((n, i) => homeCard(n, i)).join('');
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
  }
});
