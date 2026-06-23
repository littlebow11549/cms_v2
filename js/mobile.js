// === 手機版互動:底部導覽 + 漢堡選單(對齊原版) ===
const M_LINKS = [
  ['Home', 'home'], ['Hot Games', 'hot-games'], ['Mini Games', 'mini-games'], ['Slots', 'slot'],
  ['Sports', 'sport'], ['Live', 'live'], ['Fish', 'fish'], ['Promotion', 'promotion'],
];
function closeMobileMenu() {
  const m = document.getElementById('mobile-menu');
  if (!m) return;
  const panel = m.querySelector('[data-panel]');
  if (panel) panel.style.transform = 'translateX(-100%)';
  m.style.background = 'rgba(0,0,0,0)';
  setTimeout(() => m.remove(), 220);
}
function openMobileMenu() {
  if (document.getElementById('mobile-menu')) return;
  const o = document.createElement('div');
  o.id = 'mobile-menu';
  o.style.cssText = 'position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,0);transition:background .2s';
  const loggedIn = !!window._loggedIn;
  o.innerHTML = `<div data-panel style="position:absolute;top:0;left:0;bottom:0;width:80%;max-width:300px;background:#0a0e1a;border-right:1px solid #1f2937;overflow-y:auto;padding:18px;box-shadow:4px 0 24px rgba(0,0,0,.5);transform:translateX(-100%);transition:transform .25s ease">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <span style="color:#98E7D2;font-weight:800;font-size:18px">WIN100%</span>
        <button data-close style="background:none;border:0;color:#fff;font-size:22px;cursor:pointer">×</button>
      </div>
      ${M_LINKS.map(([t, s]) => `<a href="#/${s}" data-mslug="${s}" style="display:block;padding:12px 8px;color:#d1d5db;text-decoration:none;border-bottom:1px solid #1a2128;font-size:15px">${t}</a>`).join('')}
      ${loggedIn ? '' : `<div style="display:flex;gap:10px;margin-top:16px">
        <button data-auth="login" style="flex:1;padding:10px;border-radius:8px;border:1px solid #2a3138;background:#2a3138;color:#fff;cursor:pointer;font-weight:600">Login</button>
        <button data-auth="register" style="flex:1;padding:10px;border-radius:8px;border:0;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#111827;cursor:pointer;font-weight:700">Register</button>
      </div>`}
    </div>`;
  o.addEventListener('click', (ev) => {
    if (ev.target === o || ev.target.closest('[data-close]')) return closeMobileMenu();
    const auth = ev.target.closest('[data-auth]');
    if (auth) { closeMobileMenu(); if (window.openAuthModal) window.openAuthModal(auth.dataset.auth); return; }
    const a = ev.target.closest('[data-mslug]');
    if (a) { location.hash = '#/' + a.dataset.mslug; closeMobileMenu(); }
  });
  document.body.appendChild(o);
  requestAnimationFrame(() => { o.style.background = 'rgba(0,0,0,.6)'; o.querySelector('[data-panel]').style.transform = 'translateX(0)'; });
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  if (btn.querySelector('svg.lucide-menu')) { e.preventDefault(); openMobileMenu(); return; }
  if (e.target.closest('nav[class*="bottom-0"]') || e.target.closest('nav.fixed')) {
    const label = (btn.textContent || '').trim();
    const map = { Home: 'home', Deposit: 'deposit', Promotion: 'promotion', Member: 'account' };
    if (map[label]) { e.preventDefault(); location.hash = '#/' + map[label]; }
  }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMobileMenu(); });
