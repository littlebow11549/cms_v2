// === 表單細節:密碼顯示/隱藏切換 (原生 JS) ===
document.addEventListener('click', (e) => {
  const eye = e.target.closest('button[type="button"]');
  if (!eye || !eye.querySelector('svg') || !/absolute/.test(eye.className)) return;
  const inp = eye.parentElement && eye.parentElement.querySelector('input');
  if (inp && (inp.type === 'password' || inp.dataset.pw === '1')) {
    e.preventDefault();
    inp.dataset.pw = '1';
    inp.type = inp.type === 'password' ? 'text' : 'password';
  }
});
