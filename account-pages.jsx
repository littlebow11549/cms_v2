// Account / Deposit / Withdrawal pages
const { useState: useStateAP, useRef: useRefAP, useEffect: useEffectAP } = React;

/* ─── ACCOUNT OVERVIEW ──────────────────── */
function AccountOverview({ user, balance, setActiveCat }) {
  const [spin, setSpin] = useStateAP(false);
  const txs = [
  { type: 'SABA Bet Started', amount: '+₩ 1,000', dir: 'pos', date: '2025-08-12', time: '15:48', status: 'Approved' },
  { type: 'SABA Bet Started', amount: '-₩ 500', dir: 'neg', date: '2025-08-12', time: '14:30', status: 'Approved' },
  { type: 'SABA Bet Started', amount: '+₩ 2,500', dir: 'pos', date: '2025-08-11', time: '18:20', status: 'Approved' },
  { type: 'SABA Bet Started', amount: '-₩ 1,000', dir: 'neg', date: '2025-08-11', time: '12:15', status: 'Approved' },
  { type: 'SABA Bet Started', amount: '+₩ 750', dir: 'pos', date: '2025-08-10', time: '16:45', status: 'Approved' }];

  const [banks, setBanks] = useStateAP([
  { bank: 'KB Bank', num: '**** **** **** 1234' },
  { bank: 'Shinhan Bank', num: '**** **** **** 5678' },
  { bank: 'Woori Bank', num: '**** **** **** 9012' }]
  );
  const [bankIdx, setBankIdx] = useStateAP(0);
  const [confirmDel, setConfirmDel] = useStateAP(false);
  const safeIdx = Math.min(bankIdx, Math.max(0, banks.length - 1));
  const cur = banks[safeIdx];
  const prevBank = () => setBankIdx((i) => (i - 1 + banks.length) % banks.length);
  const nextBank = () => setBankIdx((i) => (i + 1) % banks.length);
  const removeBank = () => {
    setBanks((bs) => bs.filter((_, i) => i !== safeIdx));
    setBankIdx((i) => Math.max(0, i - 1));
    setConfirmDel(false);
  };
  return (
    <section className="lobby-section ap-page" data-screen-label="Account Overview">
      <h1 className="ap-h1">Account Overview</h1>

      <div className="ap-hero">
        <div className="ap-hero-bg" aria-hidden="true"></div>
        <div className="ap-hero-avatar">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            <circle cx="12" cy="9" r="3.5" />
            <path d="M5 20a7 7 0 0 1 14 0" />
          </svg>
        </div>
        <div className="ap-hero-info">
          <div className="ap-hero-name">
            <span>{user?.name || 'beaucat'}</span>
            <span className="ap-tag-new">신규(New)</span>
          </div>
          <div className="ap-hero-nick">
            <span className="muted">Nickname：</span>
            <span>Meow</span>
            <button className="ap-pencil" aria-label="Edit nickname">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
                <path d="m4 20 4-1 11-11-3-3L5 16l-1 4Z" />
              </svg>
            </button>
          </div>
          <div className="ap-hero-balance">
            <span>₩{(balance * 778000).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            <button className={`ap-refresh ${spin ? 'spinning' : ''}`} aria-label="Refresh balance"
            onClick={() => {setSpin(true);setTimeout(() => setSpin(false), 700);}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
                <path d="M20 11a8 8 0 1 1-2.34-5.66L20 8" />
                <path d="M20 3v5h-5" />
              </svg>
            </button>
          </div>
        </div>
        <div className="ap-hero-rollover">
          <div className="ap-rollover-title">Rollover</div>
          <div className="ap-rollover-label">Remaining Turnover Amount:</div>
          <div className="ap-rollover-amt">₩16,517.41</div>
        </div>
      </div>

      <div className="ap-grid">
        <div className="ap-panel">
          <h3 className="ap-panel-h">Quick Actions</h3>
          <button className="ap-btn primary" onClick={() => setActiveCat('DepositForm')}>Deposit</button>
          <button className="ap-btn" onClick={() => setActiveCat('WithdrawalForm')}>Withdraw</button>
        </div>
        <div className="ap-panel">
          <div className="ap-bank-head">
            <h3 className="ap-panel-h">Banking Details</h3>
            {banks.length > 1 &&
            <div className="ap-bank-nav">
                <button className="ap-bank-arrow" onClick={prevBank} aria-label="Previous account">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
                </button>
                <span className="ap-bank-count">{safeIdx + 1}/{banks.length}</span>
                <button className="ap-bank-arrow" onClick={nextBank} aria-label="Next account">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10 6 6 6-6 6" /></svg>
                </button>
              </div>
            }
          </div>
          {cur ?
          <>
              <div className="ap-bank-row">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                <span className="ap-bank-num">{cur.num}</span>
              </div>
              <div className="ap-bank-row">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />
                </svg>
                <span>{cur.bank}</span>
                <button className="ap-bank-del" onClick={() => setConfirmDel(true)} aria-label="Delete account">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
                    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13M10 11v6M14 11v6" />
                  </svg>
                </button>
              </div>
            </> :

          <div className="ap-bank-empty">No bank accounts yet.</div>
          }
          <a href="#" className="ap-add-bank">+ Add New Bank Account</a>
        </div>
      </div>

      <div className="ap-panel ap-tx-panel">
        <div className="ap-tx-head">
          <h3 className="ap-panel-h">Recent Transactions</h3>
          <a href="#" className="ap-view-more">View More Records →</a>
        </div>
        <div className="ap-tx-table">
          <div className="ap-tx-row ap-tx-headrow">
            <span>Type</span><span>Amount</span><span>Date</span><span>Time</span><span>Status</span>
          </div>
          {txs.map((tx, i) =>
          <div key={i} className="ap-tx-row">
              <span>{tx.type}</span>
              <span className={`ap-amt ${tx.dir}`}>{tx.amount}</span>
              <span className="muted">{tx.date}</span>
              <span className="muted">{tx.time}</span>
              <span><span className="ap-status">{tx.status}</span></span>
            </div>
          )}
        </div>
      </div>
      {confirmDel &&
      <div className="modal-bg" onClick={() => setConfirmDel(false)}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-ico">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" /></svg>
            </div>
            <div className="confirm-title">Delete Account?</div>
            <div className="confirm-sub">Are you sure you want to remove <strong>{cur?.bank}</strong>? This action cannot be undone.</div>
            <div className="confirm-actions">
              <button className="ap-btn-wide outline" onClick={() => setConfirmDel(false)}>Cancel</button>
              <button className="ap-btn-wide confirm-del-btn" onClick={removeBank}>Delete</button>
            </div>
          </div>
        </div>
      }
    </section>);

}

/* ─── DEPOSIT PAGE ──────────────────────── */
function DepositPage({ setActiveCat }) {
  const presets = [10000, 50000, 100000, 500000, 1000000];
  const [amount, setAmount] = useStateAP(10000);
  const [custom, setCustom] = useStateAP('10,000');
  const [promo, setPromo] = useStateAP(null);
  const [step, setStep] = useStateAP(1);
  const pick = (n) => {setAmount(n);setCustom(n.toLocaleString());};

  if (step === 2) {
    return (
      <section className="lobby-section ap-page" data-screen-label="Deposit">
        <button className="ap-back" onClick={() => setStep(1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
          Back
        </button>
        <h1 className="ap-h1">Deposit</h1>
        <div className="ap-transfer">
          <div className="ap-transfer-pill">Transfer Details</div>
          <div className="ap-form-card">
            <div className="ap-transfer-amt-row">
              <span className="ap-transfer-label">Deposit Amount</span>
              <span className="ap-transfer-amt">₩ {custom || '0'}</span>
            </div>
            <div className="ap-transfer-acc-row">
              <span className="ap-transfer-label">Deposit Account</span>
              <span className="ap-transfer-acc">wururu1234</span>
            </div>
            <p className="ap-transfer-note">
              Once the transfer is complete, please click the "Complete Deposit" button below. Should you have any questions, please feel free to contact our Customer Service team.
            </p>
            <a href="#" className="ap-transfer-cs" onClick={(e) => {e.preventDefault();setActiveCat('Customer Service');}}>Customer Service</a>
            <button className="ap-btn-wide ap-grad" onClick={() => {setStep(1);setActiveCat('Account Overview');}}>Complete</button>
            <button className="ap-btn-wide outline" onClick={() => setStep(1)}>Back</button>
          </div>
        </div>
      </section>);

  }

  return (
    <section className="lobby-section ap-page" data-screen-label="Deposit">
      <button className="ap-back" onClick={() => setActiveCat('Account Overview')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
        Back
      </button>
      <h1 className="ap-h1">Deposit</h1>

      <div className="ap-form-card">
        <h3 className="ap-section-h"><span className="ap-mark"></span>Deposit Amount</h3>
        <div className="ap-amount-grid">
          {presets.map((n) =>
          <button key={n}
          className={`ap-amount-btn ${amount === n ? 'active' : ''}`}
          onClick={() => pick(n)}>
              {n.toLocaleString()}
            </button>
          )}
        </div>
        <input className="ap-input"
        value={'₩ ' + custom}
        onChange={(e) => setCustom(e.target.value.replace(/[^\d,]/g, ''))} />
        <p className="ap-error">* Minimum Amount: ₩ 10,000; Maximum Amount: ₩ 9,000,000 *</p>

        <h3 className="ap-section-h"><span className="ap-mark"></span>Choose promotion</h3>
        <div className="ap-promo-list">
          <label className={`ap-promo-card ${promo === 'a' ? 'active' : ''}`}>
            <input type="radio" name="promo" checked={promo === 'a'} onChange={() => setPromo('a')} />
            <span className="ap-radio"></span>
            <div>
              <div className="ap-promo-title">New Sign-up First Deposit 50%</div>
              <ul className="ap-promo-bullets">
                <li>Note: This event is not applicable to Evolution Gaming and Pragmatic Play casino games.</li>
                <li>Rollover Requirement: The rollover for all funds is calculated as 300% of (Deposit Amount + Bonus).</li>
                <li>Bets with odds less than 1.7 will not count towards the rollover requirement.</li>
              </ul>
            </div>
          </label>
          <label className={`ap-promo-card ${promo === 'b' ? 'active' : ''}`}>
            <input type="radio" name="promo" checked={promo === 'b'} onChange={() => setPromo('b')} />
            <span className="ap-radio"></span>
            <div>
              <div className="ap-promo-title">Exclusive to Evolution Gaming, Pragmatic Play Casinos Unlimited Deposit…</div>
              <ul className="ap-promo-bullets">
                <li>The rollover for all funds is (Deposit Amount + Bonus) multiplied by</li>
                <li>Maximum Bonus Amount: ₩200,000.</li>
                <li>Withdrawal Rollover Condition: 10 times (1,000%).</li>
                <li>Example: Deposit ₩1,000,000, receive a ₩200,000 bonus.</li>
                <li>(1,000,000 + 200,000) × 10 = 12,000,000</li>
              </ul>
            </div>
          </label>
        </div>

        <button className="ap-btn-wide" disabled={!promo} onClick={() => setStep(2)}>Next</button>
        <button className="ap-btn-wide outline" onClick={() => setActiveCat('Account Overview')}>Back</button>
      </div>
    </section>);

}

/* ─── WITHDRAWAL PAGE ───────────────────── */
function WithdrawalPage({ setActiveCat, user }) {
  const [amount, setAmount] = useStateAP('');
  const [pw, setPw] = useStateAP('');
  const [show, setShow] = useStateAP(false);
  const banks = [
  { bank: 'KB Bank', num: '**** **** **** 1234' },
  { bank: 'Shinhan Bank', num: '**** **** **** 5678' },
  { bank: 'Woori Bank', num: '**** **** **** 9012' }];

  const [bankIdx, setBankIdx] = useStateAP(0);
  const cur = banks[bankIdx];
  return (
    <section className="lobby-section ap-page" data-screen-label="Withdrawal">
      <button className="ap-back" onClick={() => setActiveCat('Account Overview')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
        Back
      </button>
      <h1 className="ap-h1">Withdrawl</h1>

      <div className="ap-form-card">
        <h3 className="ap-section-h"><span className="ap-mark"></span>My Bank Accounts</h3>
        {user ?
        <div className="ap-bank-saved">
            <div className="ap-bank-saved-card">
              <div className="ap-bank-saved-top">
                <span className="ap-bank-saved-bank">{cur.bank}</span>
                <div className="ap-bank-saved-nav">
                  {bankIdx === 0 && <span className="ap-bank-saved-default">Default</span>}
                  <button className="ap-bank-arrow" onClick={() => setBankIdx((i) => (i - 1 + banks.length) % banks.length)} aria-label="Previous card">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
                  </button>
                  <span className="ap-bank-count">{bankIdx + 1}/{banks.length}</span>
                  <button className="ap-bank-arrow" onClick={() => setBankIdx((i) => (i + 1) % banks.length)} aria-label="Next card">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10 6 6 6-6 6" /></svg>
                  </button>
                </div>
              </div>
              <div className="ap-bank-saved-num">{cur.num}</div>
              <div className="ap-bank-saved-holder">
                <span className="muted">Account Holder</span>
                <span>{user.name}</span>
              </div>
            </div>
            <button className="ap-yellow-btn ap-bank-add-sm">+ Add Account</button>
          </div> :

        <div className="ap-empty-bank">
            <div className="ap-empty-art" aria-hidden="true"></div>
            <div className="ap-empty-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3">
                <rect x="3" y="6" width="18" height="13" rx="2" />
                <path d="M3 11h18" />
              </svg>
            </div>
            <div className="ap-empty-text">Empty Bank Account</div>
            <button className="ap-yellow-btn">Add Account</button>
          </div>
        }

        <button className="ap-refresh-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 11a8 8 0 1 1-2.34-5.66L20 8" />
            <path d="M20 3v5h-5" />
          </svg>
          Refresh
        </button>

        <div className="ap-wallet">
          <div className="ap-wallet-label">Main Wallet</div>
          <div className="ap-wallet-amt">₩ {user ? 786513 .toLocaleString() : '0.00'}</div>
          <div className="ap-wallet-rem">
            Remaining Turnover Amount:<br />
            <strong>₩16,517.41</strong>
          </div>
        </div>

        <h3 className="ap-section-h"><span className="ap-mark"></span>Withdrawal Amount &amp; Password</h3>
        <input className="ap-input" placeholder="₩ 10,000 ~ ₩ 9,000,000"
        value={amount} onChange={(e) => setAmount(e.target.value)} />
        <div className="ap-input-wrap">
          <input className="ap-input" type={show ? 'text' : 'password'}
          placeholder="* * * * * *"
          value={pw} onChange={(e) => setPw(e.target.value)} />
          <button className="ap-eye" onClick={() => setShow((s) => !s)} aria-label="Toggle password">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
        <div className="ap-rollover">
          <span><span className="muted">*Rollover Achieved</span><br />amount: ₩0.00</span>
          <span><span className="muted">Target amount:</span><br />₩0.00</span>
        </div>

        <button className="ap-btn-wide" disabled>Submit</button>
        <button className="ap-btn-wide outline" onClick={() => setActiveCat('Account Overview')}>Back</button>
      </div>
    </section>);

}

/* ─── SUPPORT / ABOUT US PAGE ───────────── */
/* content blocks: {p:'text'} paragraph, {ul:[...]} bullets, {ol:[...]} numbered */
const SUP_CONTENT = {
  Support: [
  { panel: 'Please contact our Customer Center.', body: [] }],

  Notice: [
  { panel: 'Urgent Notice — 100% Official Telegram Change.', body: [
    { p: 'Impersonators pretending to be 100% are increasing.\n100% provides guidance through only one official Telegram. If there is any problem with the existing Telegram, we will only provide guidance through this channel or live chat.' },
    { p: '100% Official Telegram notice room: https://t.me/100kor' },
    { p: 'If you cannot reach us through the existing Telegram, please verify through live chat that it is not an impersonator before proceeding with your inquiry.' }]
  },
  { panel: 'How to inquire about deposit accounts', body: [
    { p: 'For deposit account inquiries, please contact us via live chat or the Customer Center Telegram after signing up.' }]
  }],

  About: [
  { panel: 'About 100%', body: [
    { p: '100% is legally registered as a sportsbook, online betting, and casino operator, and holds a license issued by the relevant authorities. All services and products provided are licensed and regulated by the relevant institutions.' },
    { p: '100% provides the best products and services to users around the world and has established itself as one of the most popular sites. As a leader in the online gaming industry, the 100% trademark represents an innovative marketing concept and special service for both new and existing players across Asia. Our philosophy is to provide the best games and an enjoyable experience to our users as we continue to grow into an ever-better 100%.' }]
  }],

  Privacy: [
  { panel: 'Privacy Policy', body: [
    { p: 'This policy describes how the information and data you provide to 100% (also referred to as "we" or "us") are used between 100% and the customer.' },
    { p: 'We process your personal information based on the terms provided through the 100% (or website) membership application form or by other means, or the personal information we hold about you. By submitting your information and using the site, you consent to the use of your information in accordance with this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use the site or provide personal information.' }]
  },
  { panel: 'Information Collection & Use', body: [
    { p: 'We collect, use, and dispose of information and data about you, including the following:' },
    { ol: [
      'All information you create and submit by email or on the website;',
      'All other means of recording email, phone, and conversation information through the website;',
      'Responses to surveys or customer research;',
      'Transaction history related to the website;',
      'Details of your site visits, such as traffic data, location data, blogs, and other communication data.']
    },
    { p: 'The processing of your personal information and data is used for the following purposes:' },
    { ol: [
      'Payment transactions including offline and online payments;',
      'Betting transactions;',
      'Managing customer accounts and building member profiles;',
      'Compliance with our legal and regulatory obligations;',
      'Customer research, surveys, and analysis;',
      'Events, products, and services;',
      'For fraud prevention: monitoring transactions between customers for irregular betting activity, money laundering, illegal bonus acquisition, collusion, and fraudulent behavior.']
    }]
  }],

  Info: [
  { panel: 'Additional Notes', body: [
    { p: '100% is not responsible for the content or accuracy of internal or external websites.\nAll information provided by the company is based on fact. However, the company is not responsible for any errors or omissions in the information. The company reserves the right to correct obvious errors.\nThe company holds the exclusive right to revise, update, and modify these terms of use at any time.\nRevised, updated, or modified terms of use are posted on the website(s) and take effect immediately upon posting.' }]
  }],

  Addiction: [
  { panel: 'Preventing Gaming Addiction', body: [
    { p: '100% encourages members to enjoy gaming while also preventing gaming addiction. We help members recognize their own limits and set their own gaming limits through the management page.\nGaming is a form of entertainment. However, it should never become an emotional or financial burden. We hope you will enjoy gaming responsibly at 100%!' },
    { ul: ['Self-assessment', 'Betting management', 'Deposit limit management', 'Child protection', 'Help & suggestions'] }]
  },
  { panel: 'Self-Assessment', body: [
    { ol: [
      'Do you play games to escape a boring or unhappy life?',
      'After losing in a game, have you ever felt you needed to win back what you lost as quickly as possible?',
      'When you play, do you tend to keep playing until all your funds are exhausted?',
      'Have you ever lied to hide the amount of money or time you spent gambling?',
      'Have you lost interest in family, friends, or hobbies because of gambling?',
      'When you run out of money while playing, have you ever felt the urge to play again quickly after feeling despair or disappointment?']
    },
    { p: 'Do you feel depressed or suicidal because of gambling? If your answer to most of these questions is "Yes," you may have a gaming addiction. If you would like free or independent advice to talk to someone about this, please contact an organization such as Gambling Therapy (https://www.gamblingtherapy.org/) or contact us.' }]
  },
  { panel: 'Deposit Limit Management', body: [
    { p: 'If you wish to change or lower your deposit limit, please contact a customer agent via live chat.' }]
  },
  { panel: 'Help & Suggestions', body: [
    { p: 'You can get help with preventing gaming addiction through the organizations below.' },
    { p: 'GamCare — 0808 8020 133 (free call in the UK) or www.gamcare.org.uk' },
    { p: 'GambleAware — www.gambleaware.org' },
    { p: 'Gambling Therapy — www.gamblingtherapy.org' },
    { p: 'Gamblers Anonymous — www.gamblersanonymous.org' }]
  }],

  Rules: [
  { panel: 'Rules & Regulations', body: [
    { p: 'We at 100% strictly penalize members who sign up with the intent to use the site through abnormal methods such as arbitrage betting, betting-related program use, reporting and hacking, blackmail, promotion abuse, and organized group betting. If a member is deemed to be in violation of the stated rules and regulations, 100% has the right to confiscate the member\u2019s account without prior warning. By signing up and using 100%, members are deemed to have understood and agreed to all terms of use, rules, and regulations.' }]
  },
  { panel: 'Deposit & Withdrawal', body: [
    { ul: [
      'If you deposit to the wrong account without confirming beforehand, 100% accepts no responsibility for that amount under any circumstances.',
      'Our site operates on GMT+8. Unless otherwise specified for an event/promotion, all time references are recognized and processed as GMT+8.',
      'Deposit and withdrawal requests can only be made with account information registered under your own name. Requests with account information that is not in your name cannot be processed.',
      'Your account information cannot be registered under the name of family, relatives, acquaintances, or others — only under the name of the actual user of the site.',
      'We at 100% strictly prohibit the use of virtual accounts. Deposits or withdrawals using virtual accounts are not possible.',
      'If you deposit using an account in someone else\u2019s name, the deposit cannot be processed and 100% may request relevant documents to take action on the transaction.',
      'To prevent illegal money laundering and financial fraud, the full deposit amount must be wagered before withdrawal is possible.',
      'Deposits via check or promissory note are not possible.']
    }]
  }]

};

const SUP_EXCLUSION = [
{ name: 'Sicbo', type: 'Slot', vendor: 'AG', pct: '100%' },
{ name: 'Ema Black Jack D21', type: 'Live', vendor: 'AG', pct: '100%' },
{ name: '1000 Diamond Bet Roulette', type: 'Slot', vendor: 'PT', pct: '100%' },
{ name: 'Lightning Roulette', type: 'Live', vendor: 'EVO', pct: '100%' },
{ name: 'Crazy Time', type: 'Live', vendor: 'EVO', pct: '100%' },
{ name: 'Sweet Bonanza', type: 'Slot', vendor: 'PP', pct: '50%' }];


function SupBlocks({ blocks }) {
  return blocks.map((b, i) =>
  <div key={i} className="sup-panel">
      <div className="sup-panel-h">{b.panel}</div>
      {b.body.length > 0 &&
    <div className="sup-panel-body">
          {b.body.map((blk, j) => {
        if (blk.p) return <p key={j} className="sup-p">{blk.p}</p>;
        if (blk.ul) return <ul key={j} className="sup-ul">{blk.ul.map((li, k) => <li key={k}>{li}</li>)}</ul>;
        if (blk.ol) return <ol key={j} className="sup-ol">{blk.ol.map((li, k) => <li key={k}>{li}</li>)}</ol>;
        return null;
      })}
        </div>
    }
    </div>
  );
}

function SupportPage({ setActiveCat }) {
  const tabs = ['Support', 'Notice', 'About', 'Privacy', 'Info', 'Addiction', 'Rules', 'Exclusion turnover list', 'FAQ'];
  const [tab, setTab] = useStateAP('FAQ');
  const [exFilter, setExFilter] = useStateAP('All');
  const [exQuery, setExQuery] = useStateAP('');
  const groups = [
  {
    title: 'General Information',
    faqs: [
    { q: 'About 100%', a: '100% is an overseas betting site that provides trusted and verified games. From sports, slot games, live casinos to mini games, we are doing our best to closely follow the trends of online entertainment products. You can experience exciting games while receiving various benefits such as attractive promotions and bonuses like various customer loyalty programs.', open: true },
    { q: 'Are the games provided on the site fair?', a: '100% is a legally registered company, and game results are absolutely fair, just, and based on facts.', open: true },
    { q: 'Is my personal information safe?', a: 'All personal data is encrypted in transit and at rest. We never share your information with third parties without consent.' }]

  },
  {
    title: 'Account Management',
    faqs: [
    { q: 'How do I change my password?', a: 'Go to Security Center from your account menu, enter your current password and your new password twice, then confirm.' },
    { q: 'I lost my password, how can I get it reissued?', a: 'Click "Forgot?" on the login window, enter your username and registered email, and we will send password reset instructions.' }]

  }];

  const [openMap, setOpenMap] = useStateAP(() => {
    const m = {};
    groups.forEach((g, gi) => g.faqs.forEach((f, fi) => {m[gi + '-' + fi] = !!f.open;}));
    return m;
  });
  const toggle = (k) => setOpenMap((m) => ({ ...m, [k]: !m[k] }));
  const exTypes = ['All', ...Array.from(new Set(SUP_EXCLUSION.map((e) => e.type)))];
  const exList = SUP_EXCLUSION.filter((e) =>
  (exFilter === 'All' || e.type === exFilter) &&
  e.name.toLowerCase().includes(exQuery.toLowerCase())
  );
  return (
    <section className="lobby-section ap-page sup-page" data-screen-label="About Us">
      <button className="ap-back" onClick={() => setActiveCat('Lobby')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
        Back
      </button>
      <h1 className="sup-h1">About Us</h1>
      <div className="sup-tabs">
        {tabs.map((t) =>
        <button key={t}
        className={`sup-tab ${tab === t ? 'active' : ''}`}
        onClick={() => setTab(t)}>
            {t}
            {t === 'Exclusion turnover list' &&
          <span className="sup-info-i" aria-hidden="true">ⓘ</span>
          }
          </button>
        )}
      </div>

      {tab === 'FAQ' && groups.map((g, gi) =>
      <div key={gi} className="sup-group">
          <h2 className="sup-group-title">{g.title}</h2>
          <div className="sup-faq-list">
            {g.faqs.map((f, fi) => {
            const k = gi + '-' + fi;
            const isOpen = openMap[k];
            return (
              <div key={fi} className={`sup-faq ${isOpen ? 'open' : ''}`}>
                  <button className="sup-faq-q" onClick={() => toggle(k)}>
                    <span>{f.q}</span>
                    <svg className="sup-faq-caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                  {isOpen && <div className="sup-faq-a">{f.a}</div>}
                </div>);

          })}
          </div>
        </div>
      )}

      {tab === 'Exclusion turnover list' &&
      <div className="sup-ex">
          <div className="sup-ex-filters">
            <select className="sup-ex-select" value={exFilter} onChange={(e) => setExFilter(e.target.value)}>
              {exTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <div className="sup-ex-search">
              <Icon name="search" size={14} />
              <input placeholder="Game Name" value={exQuery} onChange={(e) => setExQuery(e.target.value)} />
            </div>
          </div>
          {exList.map((e, i) =>
        <div key={i} className="sup-panel">
              <div className="sup-panel-h">{e.name}</div>
              <div className="sup-panel-body">
                <ul className="sup-ul">
                  <li>Game type: {e.type}</li>
                  <li>Game Vendor: {e.vendor}</li>
                  <li>Exclusion Percentage: {e.pct}</li>
                </ul>
              </div>
            </div>
        )}
        </div>
      }

      {SUP_CONTENT[tab] && <SupBlocks blocks={SUP_CONTENT[tab]} />}
    </section>);

}

/* ─── RECORD TABLE (configurable) ───────── */
const RECORD_CONFIGS = {
  'Betting Record': {
    status: false, autoRefresh: false, total: null,
    cols: ['Order No', 'Game', 'Settlement Time', 'Bet Amount', 'Valid Bet', 'Winnings', 'Bet P&L'],
    rows: [
    ['202508120001', 'Sports', '2025-08-12 15:48', '50,000', '50,000', '92,500', '+42,500'],
    ['202508120002', 'Slots', '2025-08-12 14:30', '20,000', '20,000', '0', '-20,000'],
    ['202508110007', 'Live Casino', '2025-08-11 18:20', '35,000', '35,000', '78,000', '+43,000'],
    ['202508110003', 'Sports', '2025-08-11 12:15', '10,000', '10,000', '8,500', '-1,500']],

    plCols: [6]
  },
  'Deposit Record': {
    status: true, autoRefresh: true, total: 'Total Deposit Amount',
    cols: ['Transaction No.', 'Date Time', 'Deposit Amount', 'Status', 'Request Amount', 'Bonus', 'Method', 'Bank Reference', 'Deposit Time', 'Bank Charge', 'Promotion', 'Remark'],
    rows: [
    ['DP25081201', '2025-08-12 09:14', '100,000', 'Approved', '100,000', '10,000', 'Bank', 'KB-8841', '2025-08-12 09:18', '0', '100% Bonus', '-'],
    ['DP25081105', '2025-08-11 21:02', '50,000', 'Approved', '50,000', '0', 'Bank', 'SH-2210', '2025-08-11 21:05', '0', '-', '-'],
    ['DP25081008', '2025-08-10 13:48', '200,000', 'Pending', '200,000', '20,000', 'Crypto', 'USDT-4f1', '-', '0', 'VIP Reload', '-'],
    ['DP25080902', '2025-08-09 18:33', '30,000', 'Rejected', '30,000', '0', 'Bank', 'WR-0093', '-', '0', '-', 'Name mismatch']],

    statusCol: 3, totalCol: 2, totalVal: '350,000'
  },
  'Profit And Loss': {
    status: false, autoRefresh: true, total: null,
    cols: ['Game Type', 'Total P&L', 'Betting', 'Valid Bet', 'Win Amount', 'Rebate'],
    rows: [
    ['Sports', '+128,500', '420,000', '420,000', '548,500', '4,200'],
    ['Slots', '-65,000', '310,000', '310,000', '245,000', '3,100'],
    ['Live Casino', '+92,000', '180,000', '180,000', '272,000', '1,800'],
    ['Mini Games', '-12,000', '60,000', '60,000', '48,000', '600'],
    ['Originals', '+33,500', '95,000', '95,000', '128,500', '950'],
    ['Fish', '0', '0', '0', '0', '0']],

    plCols: [1]
  },
  'Withdrawal Record': {
    status: true, autoRefresh: true, total: 'Total Withdrawal Amount',
    cols: ['Transaction No.', 'Request Time', 'Paid Amount', 'Status', 'Request Amount', 'Bank Name', 'Paid Date', 'Remark'],
    rows: [
    ['WD25081201', '2025-08-12 10:20', '80,000', 'Approved', '80,000', 'KB Bank', '2025-08-12 10:45', '-'],
    ['WD25081104', '2025-08-11 16:50', '150,000', 'Approved', '150,000', 'Shinhan', '2025-08-11 17:10', '-'],
    ['WD25081006', '2025-08-10 11:05', '40,000', 'Pending', '40,000', 'Woori', '-', '-'],
    ['WD25080903', '2025-08-09 22:14', '25,000', 'Rejected', '25,000', 'KB Bank', '-', 'Rollover left']],

    statusCol: 3, totalCol: 2, totalVal: '270,000'
  },
  'Account Record': {
    status: true, autoRefresh: false, total: null,
    cols: ['Transaction Type', 'Time', 'Transaction Amount', 'Current Balance', 'Transaction No.', 'Content'],
    rows: [
    ['Deposit', '2025-08-12 09:18', '+100,000', '1,284,320', 'DP25081201', 'Bank deposit approved'],
    ['Bet', '2025-08-12 15:48', '-50,000', '1,234,320', 'BT25081201', 'Sports — Champions League'],
    ['Win', '2025-08-12 15:52', '+92,500', '1,326,820', 'WN25081201', 'Sports settlement'],
    ['Withdrawal', '2025-08-12 10:45', '-80,000', '1,246,820', 'WD25081201', 'Bank withdrawal paid']],

    plCols: [2]
  }
};

function StatusPill({ value }) {
  const cls = value === 'Approved' ? 'ok' : value === 'Pending' ? 'pend' : value === 'Rejected' ? 'rej' : '';
  return <span className={`rec-pill ${cls}`}>{value}</span>;
}

function fmtDate(v) {
  if (!v) return 'YYYY/MM/DD';
  const [y, m, d] = v.split('-');
  return `${y}/${m}/${d}`;
}

function RecordTable({ title, setActiveCat }) {
  const cfg = RECORD_CONFIGS[title] || RECORD_CONFIGS['Betting Record'];
  const [statusOpen, setStatusOpen] = useStateAP(false);
  const [status, setStatus] = useStateAP('All');
  const [secs, setSecs] = useStateAP(18);
  const [dateFrom, setDateFrom] = useStateAP('');
  const [dateTo, setDateTo] = useStateAP('');
  const statusRef = useRefAP(null);
  useEffectAP(() => {
    if (!cfg.autoRefresh) return;
    const t = setInterval(() => setSecs((s) => s <= 1 ? 20 : s - 1), 1000);
    return () => clearInterval(t);
  }, [cfg.autoRefresh]);
  useEffectAP(() => {
    const onDoc = (e) => {if (statusRef.current && !statusRef.current.contains(e.target)) setStatusOpen(false);};
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const rows = cfg.statusCol != null && status !== 'All' ?
  cfg.rows.filter((r) => r[cfg.statusCol] === status) :
  cfg.rows;
  const plSet = new Set(cfg.plCols || []);
  return (
    <section className="lobby-section ap-page rec-page" data-screen-label={title}>
      <button className="ap-back" onClick={() => setActiveCat('Account Overview')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
        Back
      </button>
      <h1 className="ap-h1">{title}</h1>

      <div className="rec-toolbar">
        <div className="rec-filters" data-comment-anchor="4252b3fba9-div-700-9">
          {cfg.status &&
          <div className="rec-status-wrap" ref={statusRef}>
              <button className="rec-status-btn" onClick={() => setStatusOpen((o) => !o)}>
                Status : {status}
              </button>
              {statusOpen &&
            <div className="rec-status-menu">
                  {['All', 'Pending', 'Approved', 'Rejected'].map((s) =>
              <button key={s} className={`rec-status-opt ${status === s ? 'active' : ''}`}
              onClick={() => {setStatus(s);setStatusOpen(false);}}>{s}</button>
              )}
                </div>
            }
            </div>
          }
          <div className="rec-date" data-comment-anchor="88e716e670-div-716-11">
            <label className="rec-date-cell" onClick={(e) => { const inp = e.currentTarget.querySelector('input'); try { inp.showPicker(); } catch (x) { inp.focus(); } }}>
              <span className={`rec-date-text ${dateFrom ? '' : 'ph'}`}>{fmtDate(dateFrom)}</span>
              <svg className="rec-date-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>
              <input className="rec-date-input" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} aria-label="From date" data-comment-anchor="970c17562d-input-712-13" />
            </label>
            <span className="rec-date-sep">-</span>
            <label className="rec-date-cell" onClick={(e) => { const inp = e.currentTarget.querySelector('input'); try { inp.showPicker(); } catch (x) { inp.focus(); } }}>
              <span className={`rec-date-text ${dateTo ? '' : 'ph'}`}>{fmtDate(dateTo)}</span>
              <svg className="rec-date-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>
              <input className="rec-date-input" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} aria-label="To date" data-comment-anchor="54ad53661c-input-714-13" />
            </label>
          </div>
          <button className="rec-confirm">Confirm</button>
        </div>
        <div className="rec-actions">
          {cfg.autoRefresh &&
          <div className="rec-refresh">
            Auto refresh in <strong>{secs}</strong>s
            <button className="rec-refresh-btn" onClick={() => setSecs(20)} aria-label="Refresh">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d="M20 11a8 8 0 1 0-2.3 5.7" /><path d="M20 4v7h-7" /></svg>
            </button>
          </div>
          }
        </div>
      </div>

      <div className="rec-table-scroll">
        <table className="rec-table">
          <thead>
            <tr>{cfg.cols.map((c, i) => <th key={i}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.length === 0 ?
            <tr><td className="rec-empty" colSpan={cfg.cols.length}>No records found.</td></tr> :
            rows.map((r, ri) =>
            <tr key={ri}>
                {r.map((cell, ci) =>
              <td key={ci}
              className={cfg.statusCol === ci ? 'rec-status-cell' : plSet.has(ci) ? `rec-pl ${String(cell).startsWith('+') ? 'pos' : String(cell).startsWith('-') ? 'neg' : ''}` : ''}>
                    {cfg.statusCol === ci ? <StatusPill value={cell} /> : cell}
                  </td>
              )}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {cfg.total &&
      <div className="rec-total">
          <span>{cfg.total}</span>
          <span className="rec-total-val">{cfg.totalVal || '0.00'}</span>
        </div>
      }
    </section>);

}

/* ─── PERSONAL INFO ─────────────────────── */
function PersonalInfo({ user, setActiveCat }) {
  const [nick, setNick] = useStateAP('');
  const [dob, setDob] = useStateAP('2008-03-03');
  const [done, setDone] = useStateAP(false);
  return (
    <section className="lobby-section ap-page" data-screen-label="Personal Info">
      <button className="ap-back" onClick={() => setActiveCat('Account Overview')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
        Back
      </button>
      <h1 className="ap-h1">Personal Info</h1>
      <div className="ap-form-card pi-card">
        <div className="pi-username">Username : {(user?.name || 'player').toUpperCase()}</div>
        <div className="pi-field">
          <span className="pi-ico">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></svg>
          </span>
          <input placeholder="Please enter your nickname" value={nick} onChange={(e) => setNick(e.target.value)} />
        </div>
        <div className="pi-field"><span className="pi-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg></span><input className="pi-date" lang="en-US" type="date" value={dob} onChange={(e) => setDob(e.target.value)} /></div>
        <div className="pi-field locked"><span className="pi-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg></span><span className="pi-val">xxxxxxx</span></div>
        <div className="pi-field locked"><span className="pi-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M5 16a3 3 0 0 1 6 0M14 9h4M14 13h3" /></svg></span><span className="pi-val">s**</span></div>
        <div className="pi-phone-row">
          <div className="pi-field locked pi-cc"><span className="pi-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg></span><span className="pi-val">+82</span></div>
          <div className="pi-field locked"><span className="pi-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg></span><span className="pi-val">123*********</span></div>
        </div>
        <div className="pi-privacy-pill">We care about your privacy</div>
        <p className="pi-note">All the user data are encrypted to ensure your personal privacy is protected.<br />For updates to your personal info, please contact support.</p>
        <button className="ap-btn-wide ap-grad" onClick={() => setDone(true)}>Submit</button>
        <button className="ap-btn-wide outline" onClick={() => setActiveCat('Account Overview')}>Back</button>
      </div>
      {done &&
      <div className="modal-bg" onClick={() => setDone(false)}>
          <div className="pi-success" onClick={(e) => e.stopPropagation()}>
            <div className="pi-success-check">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
            </div>
            <div className="pi-success-title">Success!</div>
            <div className="pi-success-sub">Profile updated successfully.</div>
            <button className="ap-btn-wide ap-grad" onClick={() => setDone(false)}>Got It</button>
          </div>
        </div>
      }
    </section>);

}

/* ─── SECURITY CENTER ───────────────────── */
function SecurityCenter({ setActiveCat, onLogout }) {
  const items = [
  { name: 'Personal Info', sub: 'Complete your personal profile', icon: 'user', go: 'Personal Info' },
  { name: 'Change Login Password', sub: 'Recommended letter and number combination', icon: 'lock' },
  { name: 'Change Transaction Password', sub: 'Set a password to improve the security of fund operations', icon: 'key' },
  { name: 'Banking Details', sub: 'Recommended letter and number combination', icon: 'card', go: 'WithdrawalForm' },
  { name: 'Logout', sub: 'Logout safely', icon: 'out', logout: true }];

  const ico = (n) => {
    const m = {
      user: <g fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="8" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0" /></g>,
      lock: <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></g>,
      key: <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><circle cx="8" cy="12" r="3.5" /><path d="M11 12h9M17 12v3M20 12v2" /></g>,
      card: <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></g>,
      out: <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></g>
    };
    return <svg width="22" height="22" viewBox="0 0 24 24">{m[n]}</svg>;
  };
  return (
    <section className="lobby-section ap-page" data-screen-label="Security Center">
      <button className="ap-back" onClick={() => setActiveCat('Account Overview')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
        Back
      </button>
      <h1 className="ap-h1">Security Center</h1>
      <h3 className="sc-h">Last login</h3>
      <div className="ap-panel sc-login">
        <div className="sc-login-row"><span className="muted">Time</span><span>2026/04/21 13:29:25</span></div>
        <div className="sc-login-row"><span className="muted">IP Address</span><span>125.227.44.193</span></div>
      </div>
      <h3 className="sc-h">Security Setting</h3>
      <div className="ap-panel sc-list">
        {items.map((it, i) =>
        <button key={i} className="sc-item"
        onClick={() => {if (it.logout) onLogout?.();else if (it.go) setActiveCat(it.go);}}>
            <span className="sc-item-ico">{ico(it.icon)}</span>
            <span className="sc-item-text">
              <span className="sc-item-name">{it.name}</span>
              <span className="sc-item-sub">{it.sub}</span>
            </span>
            <span className="sc-item-status">Not set ›</span>
          </button>
        )}
      </div>
    </section>);

}

/* ─── CUSTOMER SERVICE ──────────────────── */
function CustomerServicePage({ setActiveCat }) {
  return (
    <section className="lobby-section ap-page" data-screen-label="Customer Service">
      <button className="ap-back" onClick={() => setActiveCat('Account Overview')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
        Back
      </button>
      <h1 className="ap-h1">Customer Service</h1>
      <div className="cs-box">
        <div className="cs-box-title">Select Customer Service</div>
        <a href="#" className="cs-opt">
          <span className="cs-opt-ico">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d="M4 12a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-2v-7h5M4 12v4a3 3 0 0 0 3 3h2v-7H4" /></svg>
          </span>
          Live Chat Customer Service Center
        </a>
        <a href="#" className="cs-opt">
          <span className="cs-opt-ico">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.05 3.4 2.7 10.5c-1.1.45-1.1 1.1-.2 1.4l4.6 1.45 1.8 5.7c.2.55.4.75.8.75.4 0 .55-.18.75-.4l2.3-2.3 4.7 3.45c.85.5 1.45.25 1.65-.8L21.95 4.6c.3-1.4-.45-2-1.5-1.55Z" /></svg>
          </span>
          Promotion Announcement Room
        </a>
      </div>
    </section>);

}

Object.assign(window, { AccountOverview, DepositPage, WithdrawalPage, SupportPage, RecordTable, PersonalInfo, SecurityCenter, CustomerServicePage });