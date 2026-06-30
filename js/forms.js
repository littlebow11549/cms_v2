// === 表單細節:密碼顯示/隱藏切換 (原生 JS) ===
function ensurePaymentMethodStyles() {
  if (document.getElementById('payment-method-style')) return;
  const style = document.createElement('style');
  style.id = 'payment-method-style';
  style.textContent = `
    .pm-tabs{display:flex;gap:12px;margin:0 auto 18px;width:100%;max-width:56rem}
    .pm-tab{display:flex;align-items:center;gap:10px;padding:12px 18px;border-radius:10px;border:1px solid #374151;background:#0f1419;color:#d1d5db;font-weight:700;font-size:15px;cursor:pointer;transition:border-color .18s,background .18s,color .18s}
    .pm-tab svg{width:22px;height:22px;flex:0 0 auto}
    .pm-tab.active{border-color:#98E7D2;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622}
    .pm-shell{width:100%;max-width:56rem;margin:0 auto}
    .pm-panel[hidden]{display:none!important}
    .pm-crypto-card{background:#1a2128;border:1px solid #1f2937;border-radius:10px;padding:24px}
    .pm-title{display:flex;align-items:center;gap:10px;color:#aae5d3;font-size:18px;font-weight:700;margin:0 0 20px}
    .pm-title:before{content:'';width:4px;height:22px;border-radius:99px;background:#98E7D2;box-shadow:0 0 12px rgba(152,231,210,.45)}
    .pm-method-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:22px}
    .pm-method{display:flex;align-items:center;gap:10px;min-width:170px;padding:13px 16px;border-radius:10px;border:1px solid #374151;background:#0f1419;color:#d1d5db;font-weight:700}
    .pm-method.active{border-color:#98E7D2;color:#fff;background:#14251f}
    .pm-coin{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:#12a97b;color:#fff;font-weight:900}
    .pm-bitcoin{background:#f59e0b;color:#fff}
    .pm-grid{display:grid;grid-template-columns:190px minmax(0,1fr);gap:14px 18px;align-items:center;margin-bottom:18px}
    .pm-label{color:#d1d5db;font-weight:600}
    .pm-input{width:100%;max-width:420px;background:#0f1419;border:1px solid #374151;border-radius:8px;padding:12px 14px;color:#fff;outline:none}
    .pm-input:focus{border-color:#98E7D2}
    .pm-note{color:#fb7185;font-size:14px;font-weight:600;line-height:1.7;margin:0}
    .pm-rate{color:#d1d5db;font-size:14px;margin:8px 0 24px}
    .pm-promos{display:grid;gap:12px}
    .pm-promo{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px;border-radius:10px;border:1px solid #374151;background:#0f1419;color:#d1d5db;cursor:pointer;transition:border-color .18s,background .18s}
    .pm-promo.active{border-color:#98E7D2;background:#14251f}
    .pm-radio{width:18px;height:18px;border-radius:50%;border:2px solid #6b7280;flex:0 0 auto}
    .pm-promo.active .pm-radio{border-color:#98E7D2;box-shadow:inset 0 0 0 4px #0f1419;background:#98E7D2}
    .pm-promo-main{display:flex;align-items:center;gap:12px;font-weight:700}
    .pm-promo-amount{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:#98E7D2;font-weight:800;white-space:nowrap}
    .pm-action{margin-top:20px;padding:12px 24px;border:0;border-radius:999px;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622;font-weight:800;cursor:pointer}
    .pm-wallet-layout{display:grid;grid-template-columns:minmax(0,1fr);gap:20px}
    .pm-wallet-empty{min-height:210px;border:1px dashed #374151;border-radius:14px;background:linear-gradient(135deg,#101820,#172128);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#9ca3af;padding:26px}
    .pm-empty-coin{width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#222c35;color:#6b7280;font-size:34px;font-weight:900;margin-bottom:10px}
    .pm-add-wallet{display:inline-flex;align-items:center;gap:8px;margin-top:16px;padding:10px 20px;border-radius:999px;border:0;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622;font-weight:800;cursor:pointer}
    .pm-wallet-form{margin-top:18px;display:grid;grid-template-columns:160px minmax(0,1fr);gap:12px 16px;align-items:center}
    .pm-wallet-form label{color:#d1d5db;font-weight:700}
    .pm-select{appearance:none;background:#0f1419;border:1px solid #374151;border-radius:8px;padding:12px 36px 12px 14px;color:#d1d5db}
    .pm-balance{display:grid;grid-template-columns:160px minmax(0,1fr);gap:8px 16px;margin-top:20px;color:#d1d5db}
    .pm-balance strong{color:#98E7D2;font-size:22px}
    .wm-mode-tabs{display:flex;gap:24px;width:100%;max-width:56rem;margin:0 auto 18px;border-bottom:1px solid #263241}
    .wm-mode-tab{position:relative;padding:0 0 12px;background:none;border:0;color:#9ca3af;font-weight:800;font-size:16px;cursor:pointer}
    .wm-mode-tab.active{color:#98E7D2}
    .wm-mode-tab.active:after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:3px;border-radius:99px;background:#98E7D2}
    .wm-management[hidden],.wm-method-panel[hidden]{display:none!important}
    .wm-management{width:100%;max-width:56rem;margin:0 auto;background:#1a2128;border:1px solid #1f2937;border-radius:10px;padding:24px}
    .wm-method-tabs{display:flex;gap:12px;margin-bottom:22px}
    .wm-method-tab{display:flex;align-items:center;gap:10px;min-width:170px;padding:12px 16px;border-radius:10px;border:1px solid #374151;background:#0f1419;color:#d1d5db;font-weight:800;cursor:pointer}
    .wm-method-tab.active{border-color:#98E7D2;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622}
    .wm-management-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,.9fr);gap:28px}
    .wm-form-grid{display:grid;grid-template-columns:160px minmax(0,1fr);gap:14px 16px;align-items:center}
    .wm-form-grid label{color:#d1d5db;font-weight:700}
    .wm-section-title{display:flex;align-items:center;gap:10px;color:#aae5d3;font-weight:800;font-size:17px;margin:0 0 18px}
    .wm-section-title:before{content:'';width:4px;height:20px;border-radius:99px;background:#98E7D2}
    .wm-registered-card{display:flex;align-items:center;gap:16px;border-radius:12px;background:linear-gradient(135deg,#21342e,#263239);border:1px solid rgba(152,231,210,.22);padding:16px;color:#d1d5db}
    .wm-bank-logo{display:flex;align-items:center;justify-content:center;width:80px;height:50px;border-radius:8px;background:#dbeafe;color:#0f172a;font-weight:900}
    .wm-card-title{color:#fff;font-weight:800;margin-bottom:4px}
    .wm-card-muted{color:#9ca3af;font-size:13px}
    .wm-empty-list{min-height:260px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#9ca3af;border:1px dashed #374151;border-radius:12px;background:#101820}
    .wm-empty-list .pm-empty-coin{margin-bottom:12px}
    @media(max-width:700px){
      .pm-tabs{gap:8px}
      .pm-tab{flex:1;justify-content:center;padding:10px 12px;font-size:14px}
      .pm-crypto-card{padding:18px}
      .pm-grid,.pm-wallet-form,.pm-balance{grid-template-columns:1fr}
      .pm-wallet-layout{grid-template-columns:1fr}
      .pm-promo{align-items:flex-start;flex-direction:column}
      .wm-management{padding:18px}
      .wm-management-grid,.wm-form-grid{grid-template-columns:1fr}
      .wm-method-tab{flex:1;min-width:0;justify-content:center}
    }
  `;
  document.head.appendChild(style);
}

function paymentIcon(type) {
  if (type === 'crypto') {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 8h3.8a2.2 2.2 0 0 1 0 4.4H9.5z"/><path d="M9.5 12.4h4.2a2.3 2.3 0 0 1 0 4.6H9.5z"/><path d="M9.5 6v12M11 4.5V6M14 4.5V6M11 18v1.5M14 18v1.5"/></svg>';
  }
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h4"/></svg>';
}

function methodTabs(active) {
  return `
    <div class="pm-tabs" data-payment-tabs>
      <button class="pm-tab ${active === 'bank' ? 'active' : ''}" type="button" data-pay-tab="bank">${paymentIcon('bank')}<span>Bank Card</span></button>
      <button class="pm-tab ${active === 'crypto' ? 'active' : ''}" type="button" data-pay-tab="crypto">${paymentIcon('crypto')}<span>Crypto Wallet</span></button>
    </div>`;
}

function depositCryptoPanel() {
  return `
    <div class="pm-panel" data-pay-panel="crypto" hidden>
      <div class="pm-crypto-card">
        <h2 class="pm-title">Deposit Info</h2>
        <div class="pm-method-row">
          <div class="pm-method active"><span class="pm-coin">₮</span><span>USDT TRC20</span></div>
        </div>
        <div class="pm-grid">
          <div class="pm-label">Deposit Amounts:</div>
          <div><input class="pm-input" data-crypto-deposit-amount placeholder="Deposit Amounts" inputmode="numeric"><p class="pm-note">Deposit Limit: ₩ 50,000 (32.96 USDT) - ₩ 8,999,999 (5,932.83 USDT)</p></div>
          <div class="pm-label">Converted Crypto Amount:</div>
          <div><input class="pm-input" data-crypto-converted-amount value="0.00" disabled> <span class="pm-label" style="margin-left:10px">USDT</span></div>
        </div>
        <p class="pm-rate">Exchange rate: <strong>1 USDT = ₩ 1,516.98</strong></p>
        <h2 class="pm-title">Choose promotion</h2>
        <div class="pm-promos">
          ${['[USDT only] Slot Daily First Deposit 5%','[USDT only] Casino Reload 5%','[USDT only] Slot Reload 5%'].map((text) => `
            <label class="pm-promo">
              <span class="pm-promo-main"><span class="pm-radio"></span><span>${text}</span></span>
              <span class="pm-promo-amount">≥₩ 10,000.00</span>
            </label>`).join('')}
        </div>
        <button class="pm-action" type="button">Apply for Deposit</button>
      </div>
    </div>`;
}

function withdrawalCryptoPanel() {
  return `
    <div class="pm-panel" data-pay-panel="crypto" hidden>
      <div class="pm-crypto-card">
        <h2 class="pm-title">Crypto Wallet</h2>
        <div class="pm-wallet-layout">
          <div class="pm-wallet-empty">
            <div class="pm-empty-coin">₿</div>
            <div>Empty wallet list</div>
            <button class="pm-add-wallet" type="button"><span style="font-size:20px;line-height:1">+</span>Add wallet</button>
          </div>
        </div>
        <div class="pm-balance">
          <div>Central Wallet:</div><strong>0.00</strong>
          <div>Available Amount:</div><strong>0.00</strong>
        </div>
        <h2 class="pm-title" style="margin-top:24px">Withdrawal Amount & Password</h2>
        <div class="pm-wallet-form">
          <label>Wallet type:</label><select class="pm-select"><option>Please select wallet type</option><option>USDT TRC20</option></select>
          <label>Wallet address:</label><input class="pm-input" placeholder="Please fill in wallet address">
          <label>Withdrawal Amount:</label><input class="pm-input" placeholder="100,000 ~ 20,000,000">
          <label>Transaction Password:</label><input class="pm-input" type="password" placeholder="Please fill in the transaction password">
        </div>
        <button class="pm-action" type="button">Submit</button>
      </div>
    </div>`;
}

function withdrawalModeTabs() {
  return `
    <div class="wm-mode-tabs" data-withdrawal-mode-tabs>
      <button class="wm-mode-tab active" type="button" data-withdrawal-mode="withdraw">Withdraw</button>
      <button class="wm-mode-tab" type="button" data-withdrawal-mode="management">Account Management</button>
    </div>`;
}

function accountManagementPanel() {
  return `
    <div class="wm-management" data-withdrawal-management hidden>
      <div class="wm-method-tabs" data-account-method-tabs>
        <button class="wm-method-tab active" type="button" data-account-method="bank">${paymentIcon('bank')}<span>Bank Account</span></button>
        <button class="wm-method-tab" type="button" data-account-method="crypto">${paymentIcon('crypto')}<span>Crypto Wallet</span></button>
      </div>

      <div class="wm-method-panel" data-account-panel="bank">
        <div class="wm-management-grid">
          <div>
            <div class="wm-form-grid">
              <label>Select Bank:</label><select class="pm-select"><option>Please Select a Bank</option><option>Shinhan Bank</option><option>KB Bank</option></select>
              <label>Name on Card:</label><input class="pm-input" value="T***" disabled>
              <label>Account Number:</label><input class="pm-input" placeholder="Please Enter Account/Card/Phone number">
              <label>Transaction Password:</label><input class="pm-input" type="password" placeholder="Please Fill in the Transaction Password">
            </div>
            <button class="pm-action" type="button">Submit</button>
          </div>
          <div>
            <h2 class="wm-section-title">Registered Withdrawal Accounts <span style="color:#d1d5db;font-weight:700">(1/5)</span></h2>
            <div class="wm-registered-card">
              <div class="wm-bank-logo">신한은행</div>
              <div>
                <div class="wm-card-title">Shinhan Bank</div>
                <div class="wm-card-muted">********5123</div>
                <div class="wm-card-muted">2025-01-08 21:22:25</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="wm-method-panel" data-account-panel="crypto" hidden>
        <div class="wm-management-grid">
          <div>
            <div class="wm-form-grid">
              <label>Wallet type:</label><select class="pm-select"><option>Please select wallet type</option><option>USDT TRC20</option></select>
              <label>Wallet address:</label><input class="pm-input" placeholder="Please fill in wallet address">
              <label>Transaction Password:</label><input class="pm-input" type="password" placeholder="Please Fill in the Transaction Password">
            </div>
            <button class="pm-action" type="button">Submit</button>
          </div>
          <div>
            <h2 class="wm-section-title">Bound wallet <span style="color:#d1d5db;font-weight:700">(0/1)</span></h2>
            <div class="wm-empty-list">
              <div class="pm-empty-coin">₿</div>
              <div>Empty wallet list</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function switchPaymentPanel(root, target) {
  root.querySelectorAll('[data-pay-tab]').forEach((button) => {
    button.classList.toggle('active', button.dataset.payTab === target);
  });
  root.querySelectorAll('[data-pay-panel]').forEach((panel) => {
    panel.hidden = panel.dataset.payPanel !== target;
  });
}

function switchWithdrawalMode(main, target) {
  main.querySelectorAll('[data-withdrawal-mode]').forEach((button) => {
    button.classList.toggle('active', button.dataset.withdrawalMode === target);
  });
  const showManagement = target === 'management';
  const paymentTabs = main.querySelector('[data-payment-tabs]');
  const shell = main.querySelector('.pm-shell');
  const management = main.querySelector('[data-withdrawal-management]');
  if (paymentTabs) paymentTabs.hidden = showManagement;
  if (shell) shell.hidden = showManagement;
  if (management) management.hidden = !showManagement;
}

function switchAccountMethod(main, target) {
  main.querySelectorAll('[data-account-method]').forEach((button) => {
    button.classList.toggle('active', button.dataset.accountMethod === target);
  });
  main.querySelectorAll('[data-account-panel]').forEach((panel) => {
    panel.hidden = panel.dataset.accountPanel !== target;
  });
}

function syncDepositCryptoAmount(input) {
  const panel = input.closest('[data-pay-panel="crypto"]');
  const output = panel?.querySelector('[data-crypto-converted-amount]');
  if (!output) return;
  const amount = Number((input.value || '').replace(/[^\d]/g, ''));
  output.value = amount > 0 ? (amount / 1516.98).toFixed(2) : '0.00';
}

function initPaymentMethods(slug) {
  if (slug !== 'deposit' && slug !== 'withdrawal') return;
  const main = document.querySelector('#container main');
  if (!main || main.dataset.paymentReady === '1') return;
  const card = [...main.children].find((el) => el.tagName === 'DIV' && el.textContent.includes(slug === 'deposit' ? 'Deposit Amount' : 'My Bank Accounts'));
  if (!card) return;
  ensurePaymentMethodStyles();
  main.dataset.paymentReady = '1';
  const shell = document.createElement('div');
  shell.className = 'pm-shell';
  card.parentNode.insertBefore(shell, card);
  if (slug === 'withdrawal') shell.insertAdjacentHTML('beforebegin', withdrawalModeTabs());
  shell.insertAdjacentHTML('beforebegin', methodTabs('bank'));
  card.dataset.payPanel = 'bank';
  card.classList.add('pm-panel');
  shell.appendChild(card);
  shell.insertAdjacentHTML('beforeend', slug === 'deposit' ? depositCryptoPanel() : withdrawalCryptoPanel());
  if (slug === 'withdrawal') shell.insertAdjacentHTML('afterend', accountManagementPanel());
  const tabs = main.querySelector('[data-payment-tabs]');
  tabs.addEventListener('click', (e) => {
    const button = e.target.closest('[data-pay-tab]');
    if (!button) return;
    switchPaymentPanel(main, button.dataset.payTab);
  });
  main.addEventListener('click', (e) => {
    const promo = e.target.closest('.pm-promo');
    if (!promo || !main.contains(promo)) return;
    main.querySelectorAll('.pm-promo').forEach((item) => item.classList.toggle('active', item === promo));
  });
  main.addEventListener('input', (e) => {
    const input = e.target.closest('[data-crypto-deposit-amount]');
    if (input) syncDepositCryptoAmount(input);
  });
  if (slug === 'withdrawal') {
    main.querySelector('[data-withdrawal-mode-tabs]')?.addEventListener('click', (e) => {
      const button = e.target.closest('[data-withdrawal-mode]');
      if (button) switchWithdrawalMode(main, button.dataset.withdrawalMode);
    });
    main.querySelector('[data-account-method-tabs]')?.addEventListener('click', (e) => {
      const button = e.target.closest('[data-account-method]');
      if (button) switchAccountMethod(main, button.dataset.accountMethod);
    });
  }
}

document.addEventListener('page:rendered', (e) => {
  initPaymentMethods(e.detail?.slug);
});

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
