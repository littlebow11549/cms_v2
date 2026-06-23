// === 登入 / 註冊 Modal + 登入狀態 (原生 JS) ===
function closeAuthModal() { const m = document.getElementById('auth-modal'); if (m) m.remove(); }

function authForm(mode) {
  const isReg = mode === 'register';
  const inp = 'width:100%;box-sizing:border-box;background:#0f1419;border:1px solid #374151;border-radius:8px;padding:10px 14px;color:#fff;margin-bottom:14px;outline:none';
  return `
    <div style="display:flex;border-bottom:1px solid #2a3441;margin-bottom:20px">
      <button data-mode="login" style="flex:1;padding:12px;background:none;border:0;cursor:pointer;font-weight:600;font-size:15px;color:${isReg ? '#9ca3af' : '#98E7D2'};border-bottom:2px solid ${isReg ? 'transparent' : '#98E7D2'}">Login</button>
      <button data-mode="register" style="flex:1;padding:12px;background:none;border:0;cursor:pointer;font-weight:600;font-size:15px;color:${isReg ? '#98E7D2' : '#9ca3af'};border-bottom:2px solid ${isReg ? '#98E7D2' : 'transparent'}">Register</button>
    </div>
    <label style="display:block;color:#9ca3af;font-size:13px;margin-bottom:6px">Username</label>
    <input type="text" placeholder="Enter your username" style="${inp}">
    <label style="display:block;color:#9ca3af;font-size:13px;margin-bottom:6px">Password</label>
    <input type="password" placeholder="Enter your password" style="${inp}">
    ${isReg ? `<label style="display:block;color:#9ca3af;font-size:13px;margin-bottom:6px">Confirm Password</label><input type="password" placeholder="Re-enter password" style="${inp}">` : `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;font-size:13px"><label style="color:#9ca3af;display:flex;align-items:center;gap:6px"><input type="checkbox">Remember me</label><a style="color:#98E7D2;cursor:pointer">Forgot Password?</a></div>`}
    <button data-submit style="width:100%;padding:12px;border:0;border-radius:10px;cursor:pointer;font-weight:700;color:#111827;background:linear-gradient(90deg,#CBE8E4,#98E7D2)">${isReg ? 'Register Now' : 'Login'}</button>`;
}

function openAuthModal(mode) {
  closeAuthModal();
  const o = document.createElement('div');
  o.id = 'auth-modal';
  o.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;padding:16px';
  o.innerHTML = `<div style="background:#1a2128;border:1px solid #2a3441;border-radius:16px;max-width:380px;width:100%;padding:24px;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.5)">
      <button data-close style="position:absolute;top:14px;right:14px;width:30px;height:30px;border-radius:50%;background:#0f1419;color:#fff;border:0;cursor:pointer;font-size:16px">×</button>
      <h3 style="color:#fff;font-size:18px;font-weight:700;margin:0 0 18px">Welcome to WIN100%</h3>
      <div data-body>${authForm(mode)}</div>
    </div>`;
  o.addEventListener('click', (ev) => {
    if (ev.target === o || ev.target.closest('[data-close]')) return closeAuthModal();
    const tab = ev.target.closest('[data-mode]');
    if (tab) { o.querySelector('[data-body]').innerHTML = authForm(tab.dataset.mode); return; }
    if (ev.target.closest('[data-submit]')) { window._loggedIn = true; closeAuthModal(); applyLoginState(); }
  });
  document.body.appendChild(o);
}

function applyLoginState() {
  if (!window._loggedIn) return;
  const loginBtn = [...document.querySelectorAll('#container button')].find((b) => b.textContent.trim() === 'Login');
  if (!loginBtn) return;
  const regBtn = [...document.querySelectorAll('#container button')].find((b) => b.textContent.trim() === 'Register');
  const w = document.createElement('div');
  w.style.cssText = 'display:flex;align-items:center;gap:10px;flex-wrap:nowrap';
  w.innerHTML = `<span style="color:#fff;font-size:13px;white-space:nowrap">ID:meqomcao</span>
    <span style="background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#111827;font-size:11px;font-weight:700;padding:2px 8px;border-radius:9999px">VIP1</span>
    <span style="color:#98E7D2;font-weight:700;font-size:14px;white-space:nowrap">₩1,000,000,000</span>
    <a href="../deposit" style="background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#111827;padding:6px 16px;border-radius:8px;font-weight:600;font-size:13px;text-decoration:none;white-space:nowrap">Deposit</a>`;
  loginBtn.parentElement.insertBefore(w, loginBtn);
  loginBtn.remove();
  if (regBtn) regBtn.remove();
}

window.openAuthModal = openAuthModal;
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAuthModal(); });
document.addEventListener('page:rendered', applyLoginState);
document.addEventListener('click', (e) => {
  if (e.target.closest('#auth-modal')) return;
  const b = e.target.closest('button'); if (!b) return;
  const t = (b.textContent || '').trim();
  if (t === 'Login') { e.preventDefault(); openAuthModal('login'); }
  else if (t === 'Register') { e.preventDefault(); openAuthModal('register'); }
});
