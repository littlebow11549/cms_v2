// Components for the 100% games lobby

const { useState, useEffect, useRef, useMemo, useCallback } = React;
const { GAMES, HERO_SLIDES, PROMOS, WINNERS, TOURNAMENTS, RECENTLY_PLAYED, PROVIDERS } = window.LOBBY_DATA;

/* ─── FAVORITES (localStorage-backed) ────────── */
const FAV_KEY = 'lobby_favs_v1';
function loadFavs() {
  try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); }
  catch { return new Set(); }
}
function useFavorites() {
  const [favs, setFavs] = useState(loadFavs);
  const toggle = useCallback((id) => {
    setFavs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      try { localStorage.setItem(FAV_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }, []);
  return [favs, toggle];
}

/* ─── ICONS ──────────────────────────────────── */
const Icon = ({ name, size = 16 }) => {
  const paths = {
    search: <path d="M11 19a8 8 0 1 1 5.3-14 8 8 0 0 1-5.3 14Zm10 2-4.3-4.3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />,
    bell: <path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8m4 12a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    chat: <path d="M21 12c0 4.4-4 8-9 8a10 10 0 0 1-3.6-.7L3 21l1.4-4.5A8 8 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />,
    arrL: <path d="m14 6-6 6 6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    arrR: <path d="m10 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    play: <path d="M7 4v16l13-8L7 4Z" fill="currentColor" />,
    close: <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
    star: <path d="m12 3 2.6 6 6.4.6-4.8 4.4 1.4 6.4L12 17l-5.6 3.4 1.4-6.4L3 9.6l6.4-.6L12 3Z" fill="currentColor" />,
    fire: <path d="M12 2c1 4 5 5 5 10a5 5 0 1 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9Z" fill="currentColor" />,
    bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" fill="currentColor" />,
    chevD: <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">{paths[name]}</svg>);

};

/* ─── MOBILE BOTTOM NAV ──────────────────────── */
function MobileNav({ catTab, setCatTab, onBrowse, mobileSidebarOpen, setActiveCat, onCloseSidebar }) {
  const items = [
  { name: 'Browse', icon: 'browse' },
  { name: 'Home', icon: 'home' },
  { name: 'Deposit', icon: 'deposit' },
  { name: 'Promotion', icon: 'gift' },
  { name: 'Member', icon: 'member' }];

  const icon = (n) => {
    const map = {
      browse: <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round">
                <path d="M4 6h12M4 12h12M4 18h12" />
                <circle cx="20" cy="6" r=".8" fill="currentColor" />
                <circle cx="20" cy="12" r=".8" fill="currentColor" />
                <circle cx="20" cy="18" r=".8" fill="currentColor" />
              </g>,
      home: <g fill="currentColor"><path d="M12 3 3 11l1.4 1.4L5 12v8a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-8l.6.4L21 11 12 3Z" /></g>,
      deposit: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
                 <path d="M12 4v12m0 0-4-4m4 4 4-4" />
                 <path d="M4 20h16" />
               </g>,
      gift: <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="9" width="18" height="5" rx="1" /><path d="M5 14v7h14v-7M12 9v12M9 9a2 2 0 1 1 3-2 2 2 0 1 1 3 2" /></g>,
      member: <g fill="currentColor"><circle cx="12" cy="9" r="4" /><path d="M4 21a8 8 0 0 1 16 0H4Z" /></g>
    };
    return <svg width="22" height="22" viewBox="0 0 24 24">{map[n]}</svg>;
  };
  const activeName = mobileSidebarOpen ?
  'Browse' :
  catTab === 'Lobby' ? 'Home' : catTab === 'Promotion' ? 'Promotion' : null;
  return (
    <nav className="mobile-nav" aria-label="Main">
      {items.map((it) =>
      <button key={it.name}
      className={`mnav-btn ${activeName === it.name ? 'active' : ''}`}
      onClick={() => {
        if (it.name === 'Browse') {onBrowse?.();return;}
        onCloseSidebar?.();
        if (it.name === 'Home') {setCatTab('Lobby');setActiveCat?.('Lobby');} else
        if (it.name === 'Deposit') setActiveCat?.('DepositForm');else
        if (it.name === 'Promotion') {setCatTab('Promotion');setActiveCat?.('Lobby');} else
        if (it.name === 'Member') setActiveCat?.('Account Overview');
      }}>
          <span className="mnav-icon">{icon(it.icon)}</span>
          <span className="mnav-label">{it.name}</span>
        </button>
      )}
    </nav>);

}

/* ─── SIDEBAR ────────────────────────────────── */
function Sidebar({ collapsed, setCollapsed, activeCat, setActiveCat, activeTab, setActiveTab, user, onSignIn, onSupport }) {
  const tabs = ['Casino', 'Prizes', 'Sports'];
  const [lang, setLang] = useState('en');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  useEffect(() => {
    const onDoc = (e) => {if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);};
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const LANGS = {
    en: {
      label: 'English',
      flag:
      <svg width="18" height="12" viewBox="0 0 60 40">
          <rect width="60" height="40" fill="#012169" />
          <path d="M0 0 60 40M60 0 0 40" stroke="#fff" strokeWidth="6" />
          <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="10" />
          <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="6" />
        </svg>

    },
    ko: {
      label: '한국어',
      flag:
      <svg width="18" height="12" viewBox="0 0 60 40">
          <rect width="60" height="40" fill="#fff" />
          <circle cx="30" cy="20" r="8" fill="#cd2e3a" />
          <path d="M22 20a8 8 0 0 1 16 0 4 4 0 0 1-8 0 4 4 0 0 0-8 0Z" fill="#0047a0" />
          <g stroke="#000" strokeWidth="1.4">
            <path d="M11 11l4 6M13 9l4 6M15 7l4 6" />
            <path d="M41 23l4 6M43 21l4 6M45 19l4 6" />
            <path d="M45 11l-4 6M47 13l-4 6M49 15l-4 6" />
            <path d="M11 29l4-6M13 31l4-6M15 33l4-6" />
          </g>
        </svg>

    }
  };
  const items = [
  { name: 'Lobby', icon: 'home' },
  { name: 'Account Overview', icon: 'grid' },
  { name: 'Betting Record', icon: 'ticket' },
  { name: 'Deposit Record', icon: 'down' },
  { name: 'Profit And Loss', icon: 'chart' },
  { name: 'Withdrawal Record', icon: 'swap' },
  { name: 'Account Record', icon: 'book' },
  { name: 'Personal Info', icon: 'person' },
  { name: 'Security Center', icon: 'shield' }];

  const sbIcon = (name) => {
    const map = {
      home: <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8Z" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round" />,
      grid: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </g>,
      ticket: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                <path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5L7.2 18l.9-5.4-3.9-3.8 5.4-.8L12 3Z" />
              </g>,
      down: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
              <path d="M12 4v12m0 0-4-4m4 4 4-4" />
              <path d="M4 20h16" />
            </g>,
      chart: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
              <path d="m4 16 5-5 4 4 7-9" />
              <path d="M14 6h6v6" />
            </g>,
      swap: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
              <path d="M7 4v13m0 0-3-3m3 3 3-3" />
              <path d="M17 20V7m0 0 3 3m-3-3-3 3" />
            </g>,
      book: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M7 9h10M7 13h10M7 17h6" />
            </g>,
      person: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="10" r="3" />
                <path d="M6 19a6 6 0 0 1 12 0" />
              </g>,
      shield: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                <path d="M12 3 4 6v6c0 4.5 3.3 8 8 9 4.7-1 8-4.5 8-9V6l-8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </g>,
      support: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                <path d="M4 14a8 8 0 0 1 16 0v3a3 3 0 0 1-3 3h-2v-7h5" />
                <path d="M4 14v3a3 3 0 0 0 3 3h2v-7H4" />
              </g>
    };
    if (map[name]) return <svg width="18" height="18" viewBox="0 0 24 24">{map[name]}</svg>;
    return <Icon name={name} size={16} />;
  };
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-search">
        <div className="search">
          <Icon name="search" size={14} />
          <input placeholder="Search any game or provider" />
        </div>
      </div>
      <nav className="sidebar-list" data-comment-anchor="dfece45d09-nav-71-7">
        {items.map((it) =>
        <a key={it.name} href="#"
        className={`sb-item ${activeCat === it.name ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          if (it.name === 'Customer Service') {onSupport?.();return;}
          if (it.name === 'Withdrawal Record') {if (!user) {onSignIn?.();return;}setActiveCat(it.name);return;}
          if (it.name !== 'Lobby' && !user) {onSignIn?.();return;}
          setActiveCat(it.name);
        }}
        title={collapsed ? it.name : undefined}>
            <span className="sb-icon">{sbIcon(it.icon)}</span>
            <span className="sb-label">{it.name}</span>
            {it.live && <span className="live"></span>}
          </a>
        )}
      </nav>
      <div className="sidebar-extra">
        <div className="sb-lang-wrap" ref={langRef}>
          <button className={`sb-lang ${langOpen ? 'open' : ''}`} onClick={() => setLangOpen((o) => !o)}>
            <svg className="sb-lang-globe" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            <span className="sb-flag" aria-hidden="true">{LANGS[lang].flag}</span>
            <span className="sb-lang-label">{LANGS[lang].label}</span>
            <svg className="sb-lang-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {langOpen &&
          <div className="sb-lang-menu">
              {Object.entries(LANGS).map(([k, v]) =>
            <button key={k}
            className={`sb-lang-item ${lang === k ? 'active' : ''}`}
            onClick={() => {setLang(k);setLangOpen(false);}}>
                  <span className="sb-flag">{v.flag}</span>
                  <span>{v.label}</span>
                  {lang === k &&
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5 9-10" />
                    </svg>
              }
                </button>
            )}
            </div>
          }
        </div>
        <div className="sb-money">
          <button className="sb-deposit" onClick={() => {if (!user) {onSignIn?.();return;}setActiveCat('DepositForm');}}>Deposit</button>
          <button className="sb-withdraw" onClick={() => {if (!user) {onSignIn?.();return;}setActiveCat('WithdrawalForm');}}>Withdrawal</button>
        </div>
      </div>
      <div className="sidebar-foot">
        <div className="sb-socials">
          <a href="#" className="sb-social" aria-label="Customer support" title="Customer support"
          onClick={(e) => {e.preventDefault();onSupport?.();}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
              <path d="M4 12a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-2v-7h5" />
              <path d="M4 12v4a3 3 0 0 0 3 3h2v-7H4" />
            </svg>
          </a>
          <a href="#" className="sb-social" aria-label="Telegram" title="Telegram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" data-comment-anchor="1259c0ee87-svg-187-13">
              <path d="M21.05 3.4 2.7 10.5c-1.1.45-1.1 1.1-.2 1.4l4.6 1.45 1.8 5.7c.2.55.4.75.8.75.4 0 .55-.18.75-.4l2.3-2.3 4.7 3.45c.85.5 1.45.25 1.65-.8L21.95 4.6c.3-1.4-.45-2-1.5-1.55l.6.35Z" />
            </svg>
          </a>
        </div>
        <button className="sb-collapse" aria-label="Toggle sidebar"
        onClick={() => setCollapsed((c) => !c)}>
          {collapsed ? '›' : '‹'}
        </button>
      </div>
    </aside>);

}

/* ─── TOP BAR (right of sidebar) ─────────────── */
function TopBar({ onSignIn, balance, user, onLogout, onHome, setActiveCat }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const onDoc = (e) => {if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);};
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const initials = user ? user.name.slice(0, 2).toUpperCase() : '';
  const menuIcon = (n) => {
    const map = {
      grid: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </g>,
      ticket: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                <path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5L7.2 18l.9-5.4-3.9-3.8 5.4-.8L12 3Z" />
              </g>,
      down: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
              <path d="M12 4v12m0 0-4-4m4 4 4-4" />
              <path d="M4 20h16" />
            </g>,
      chart: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
              <path d="m4 16 5-5 4 4 7-9" />
              <path d="M14 6h6v6" />
            </g>,
      swap: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
              <path d="M7 4v13m0 0-3-3m3 3 3-3" />
              <path d="M17 20V7m0 0 3 3m-3-3-3 3" />
            </g>,
      book: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M7 9h10M7 13h10M7 17h6" />
            </g>,
      person: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="10" r="3" />
                <path d="M6 19a6 6 0 0 1 12 0" />
              </g>,
      shield: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                <path d="M12 3 4 6v6c0 4.5 3.3 8 8 9 4.7-1 8-4.5 8-9V6l-8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </g>,
      support: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                <path d="M4 14a8 8 0 0 1 16 0v3a3 3 0 0 1-3 3h-2v-7h5" />
                <path d="M4 14v3a3 3 0 0 0 3 3h2v-7H4" />
              </g>,
      lock: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></g>,
      key: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><circle cx="8" cy="12" r="3.5"/><path d="M11 12h9M17 12v3M20 12v2"/></g>,
      card: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></g>
    };
    return <svg width="16" height="16" viewBox="0 0 24 24">{map[n]}</svg>;
  };
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner" style={{ justifyContent: 'space-between' }}>
        <a href="#" className="topbar-brand" onClick={(e) => {e.preventDefault();onHome?.();}}>
          <img src="assets/logo.png" alt="100%" className="topbar-logo" />
        </a>
        <div className="header-actions">
          {user ?
          <>
              <div className="tb-balance">
                <div className="tb-balance-rows">
                  <div className="tb-balance-row">
                    <span className="tb-balance-label">Balance:</span>
                    <span className="tb-balance-num">{balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="tb-balance-row">
                    <span className="tb-balance-label">Points:</span>
                    <span className="tb-balance-num">0.00</span>
                  </div>
                </div>
              </div>
              <div className="tb-user-wrap" ref={menuRef}>
                <button className="tb-user-circle" onClick={() => setMenuOpen((o) => !o)} aria-label="Account">
                  <span className="tb-avatar circle">{initials}</span>
                  <span className="tb-tier-badge" aria-hidden="true">
                    <svg width="10" height="11" viewBox="0 0 12 14" fill="currentColor">
                      <path d="M6 0 0 3.5v7L6 14l6-3.5v-7L6 0Z" />
                    </svg>
                  </span>
                </button>
                {menuOpen &&
              <div className="tb-menu">
                    <div className="tb-menu-head">
                      <div className="tb-avatar lg">{initials}</div>
                      <div>
                        <div className="tb-menu-name">{user.name}</div>
                        <div className="tb-menu-email">{user.email}</div>
                      </div>
                    </div>
                    {[
                { name: 'Personal Info', sub: 'Complete your personal profile', icon: 'person', go: 'Personal Info' },
                { name: 'Change Login Password', sub: 'Recommended letter and number combination', icon: 'lock', go: 'Security Center' },
                { name: 'Change Transaction Password', sub: 'Set a password to improve the security of fund operations', icon: 'key', go: 'Security Center' },
                { name: 'Banking Details', sub: 'Recommended letter and number combination', icon: 'card', go: 'WithdrawalForm' }].
                map((it) =>
                <a key={it.name} href="#" className="tb-menu-item tb-menu-item-2l"
                onClick={(e) => {e.preventDefault();setActiveCat?.(it.go);setMenuOpen(false);}}>
                        <span className="tb-menu-ico">{menuIcon(it.icon)}</span>
                        <span className="tb-menu-2l-text">
                          <span className="tb-menu-2l-name">{it.name}</span>
                        </span>
                      </a>
                )}
                    <div className="tb-menu-sep"></div>
                    <button className="tb-menu-item logout tb-menu-item-2l" onClick={() => {onLogout();setMenuOpen(false);}}>
                      <span className="tb-menu-ico">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                        </svg>
                      </span>
                      <span className="tb-menu-2l-text">
                        <span className="tb-menu-2l-name">Logout</span>
                      </span>
                    </button>
                  </div>
              }
              </div>
            </> :

          <>
              <button className="btn" onClick={onSignIn}>Login</button>
              <button className="btn" onClick={onSignIn}>Register</button>
            </>
          }
        </div>
      </div>
    </header>);
}

/* ─── PROMO RIBBON ──────────────────────────── */
function PromoRibbon() {
  const items = [
  'Max Payout Guarantee', 'Massive Blockchain Prizes', 'Huge Rewards',
  'Largest Community', 'Fastest Transactions', 'Provably Fair',
  'Instant Crypto Payouts', '24/7 Live Support'];

  const doubled = [...items, ...items];
  return (
    <div className="promo-ribbon">
      <div className="track">
        {doubled.map((t, i) =>
        <span key={i} className="item"><span className="dot">✦</span>{t}</span>
        )}
      </div>
    </div>);

}

/* ─── HERO ───────────────────────────────────── */
function Hero() {
  const [idx, setIdx] = useState(0);
  const len = HERO_SLIDES.length;
  const touchStartX = useRef(null);
  const autoRef = useRef(null);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => setIdx((i) => (i + 1) % len), 6500);
  };

  useEffect(() => {
    resetAuto();
    return () => clearInterval(autoRef.current);
  }, [len]);

  const next = () => { setIdx((i) => (i + 1) % len); resetAuto(); };
  const prev = () => { setIdx((i) => (i - 1 + len) % len); resetAuto(); };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div className="hero" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {HERO_SLIDES.map((s, i) =>
      <div key={i} className={`hero-slide ${i === idx ? 'active' : ''}`}
      style={{
        '--hero-hue': `oklch(0.5 0.2 ${s.hue})`,
        '--hero-hue-2': `oklch(0.55 0.2 ${(s.hue + 60) % 360})`
      }}>
          <div className="hero-bg" />
          <div className="hero-content">
            <div>
              <h1 className="hero-title">{s.title}</h1>
              <p className="hero-sub">{s.sub}</p>
            </div>
          </div>
          <div className="hero-side">[ FEATURE ARTWORK ]</div>
        </div>
      )}
      <div className="hero-dots">
        {HERO_SLIDES.map((_, i) =>
        <button key={i}
        className={`hero-dot ${i === idx ? 'active' : ''}`}
        onClick={() => setIdx(i)}
        aria-label={`Slide ${i + 1}`} />
        )}
      </div>
      <div className="hero-controls">
        <button className="icon-btn" onClick={prev} aria-label="Previous"><Icon name="arrL" /></button>
        <button className="icon-btn" onClick={next} aria-label="Next"><Icon name="arrR" /></button>
      </div>
    </div>);

}

/* ─── REWARDS PROGRESS BANNER (logged-in) ───── */
function RewardsBanner({ user }) {
  const [count, setCount] = useState({ h: 20, m: 33, s: 6 });
  useEffect(() => {
    const t = setInterval(() => {
      setCount(({ h, m, s }) => {
        s -= 1;
        if (s < 0) {s = 59;m -= 1;}
        if (m < 0) {m = 59;h -= 1;}
        if (h < 0) {h = 23;}
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n) => String(n).padStart(2, '0');
  const wagered = 6200;
  const goal = 10000;
  const pct = Math.min(100, Math.round(wagered / goal * 100));
  const initials = user ? user.name.slice(0, 2).toUpperCase() : '';
  const userId = user ? user.name.toLowerCase().padEnd(8, '0').slice(0, 8) : '00000000';
  return (
    <div className="rewards-wrap" data-screen-label="Rewards progress">
      <div className="rewards-banner">
        <div className="rb-brand">
          <div className="rb-avatar-wrap">
            <span className="tb-avatar circle rb-big-avatar">{initials || 'PL'}</span>
            <span className="tb-tier-badge rb-big-tier" aria-hidden="true">
              <svg width="14" height="15" viewBox="0 0 12 14" fill="currentColor">
                <path d="M6 0 0 3.5v7L6 14l6-3.5v-7L6 0Z" />
              </svg>
            </span>
          </div>
          <div className="rb-brand-text">
            <div className="rb-username">{user?.name || 'player'}</div>
            <div className="rb-day">Rewards · Day 27, 03:26 UTC</div>
          </div>
        </div>
        <div className="rb-user">
          <div className="rb-progress-track">
            <div className="rb-progress-fill" style={{ width: `${pct}%` }}></div>
          </div>
          <div className="rb-progress-meta">
            <span>Current: <strong>Unranked</strong> <span className="rb-tier-dot u"></span></span>
            <span className="rb-progress-count">{wagered.toLocaleString()} / {goal / 1000}K</span>
            <span style={{ textAlign: 'right' }}>Next: <strong className="next">Bronze</strong> <span className="rb-tier-dot b"></span></span>
          </div>
        </div>
        <div className="rb-timer" style={{ display: 'none' }}>
          <div className="rb-timer-label">Rewards</div>
          <div className="rb-timer-val">
            Next in {pad(count.h)}h : {pad(count.m)}m : {pad(count.s)}s
          </div>
          <button className="rb-lock" aria-label="Locked">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </button>
        </div>
      </div>
    </div>);

}

/* ─── PROMOS / CATEGORY TABS ─────────────────── */
function Promos({ active, setActive }) {
  const tabs = [
  { name: 'Lobby', icon: 'home' },
  { name: 'Hot Games', icon: 'fire' },
  { name: 'Mini Games', icon: 'rocket' },
  { name: 'Slots', icon: 'slot' },
  { name: 'Sports', icon: 'ball' },
  { name: 'Live', icon: 'tv' },
  { name: 'Fish', icon: 'fish' },
  { name: 'Promotion', icon: 'gift' }];

  const tabIcon = (n) => {
    const map = {
      home: <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8Z" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round" />,
      fire: <path d="M12 2c1 4 5 5 5 10a5 5 0 1 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9Z" fill="currentColor" />,
      mark: <g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round" strokeLinecap="round"><path d="M5 5l6 8M19 5l-6 8M9 19h6" /><path d="M11 13v6M13 13v6" /></g>,
      new: <g fill="currentColor" stroke="none"><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" /><path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" opacity=".7" /></g>,
      rocket: <g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round" strokeLinecap="round"><path d="M14 4c4 0 6 2 6 6-2 0-3.5 1-5 2.5L10 17l-3-3 4.5-5C13 7.5 14 6 14 4Z" /><path d="m9 15-3 6 6-3" /><circle cx="15" cy="9" r="1.4" fill="currentColor" stroke="none" /></g>,
      slot: <g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round"><rect x="4" y="6" width="16" height="12" rx="2" /><path d="M8 10v4M12 10v4M16 10v4" /></g>,
      ball: <g stroke="currentColor" strokeWidth="1.7" fill="none"><circle cx="12" cy="12" r="8" /><path d="M12 4v16M4 12h16M6.5 6.5l11 11M17.5 6.5l-11 11" /></g>,
      tv: <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><rect x="3" y="4" width="18" height="13" rx="2" fill="currentColor" fillOpacity=".15" /><path d="M8 21h8" /><path d="M12 17v4" /></g>,
      fish: <g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round"><path d="M3 12c3-4 8-5 12-4l4-2v12l-4-2c-4 1-9 0-12-4Z" /><circle cx="16" cy="11" r="0.8" fill="currentColor" stroke="none" /></g>,
      gift: <g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round"><rect x="3" y="9" width="18" height="5" rx="1" /><path d="M5 14v7h14v-7M12 9v12M9 9a2 2 0 1 1 3-2 2 2 0 1 1 3 2" /></g>
    };
    return <svg width="18" height="18" viewBox="0 0 24 24">{map[n]}</svg>;
  };
  return (
    <div className="cat-tabs" data-screen-label="Categories" data-comment-anchor="9a95898f44-div-312-5">
      {tabs.map((t) =>
      <button key={t.name}
      className={`cat-tab ${active === t.name ? 'active' : ''}`}
      onClick={() => setActive(t.name)}>
          <span className="cat-tab-icon">{tabIcon(t.icon)}</span>
          {t.name}
        </button>
      )}
    </div>);

}

/* ─── GAME CARD ──────────────────────────────── */
function GameCard({ game, onOpen, isFav, onFav }) {
  return (
    <article className="gcard" onClick={() => onOpen(game)}>
      <div className="gcard-art" style={{ '--gcard-bg': game.bg }}>
        {game.tag &&
        <span className={`gcard-tag ${game.tag === 'Hot' ? 'hot' : game.tag === 'New' ? 'new' : ''}`}>
            {game.tag}
          </span>
        }
        {onFav &&
        <button className={`gcard-fav ${isFav ? 'on' : ''}`}
          aria-label={isFav ? 'Remove favorite' : 'Add favorite'}
          onClick={(e) => { e.stopPropagation(); onFav(game.id); }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
            <path d="M12 20s-7-4.6-9.3-9C1.2 8 2.6 4.5 6 4.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.4 0 4.8 3.5 3.3 6.5C19 15.4 12 20 12 20Z"/>
          </svg>
        </button>
        }
        <span className="ph-label">{`${game.title.toUpperCase()} ART`}</span>
        {game.category === 'live' &&
        <div className="gcard-players">
            <span className="live-dot"></span>{game.players.toLocaleString()} playing
          </div>
        }
        <div className="gcard-hover">
          <button className="play-btn" aria-label="Play"><Icon name="play" size={22} /></button>
          <div className="quick-info">
            <span>RTP {game.rtp}%</span>
            <span>·</span>
            <span>Max {game.maxWin}</span>
          </div>
        </div>
      </div>
      <div className="gcard-meta">
        <div className="gcard-title">{game.title}</div>
        <div className="gcard-provider">{game.provider}</div>
      </div>
    </article>);

}

/* ─── RAIL (with arrows) ─────────────────────── */
function Rail({ title, count, games, onOpen, density, icon }) {
  const ref = useRef(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(true);
  const update = () => {
    const el = ref.current;
    if (!el) return;
    setCanL(el.scrollLeft > 4);
    setCanR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };
  useEffect(() => {
    update();
    const el = ref.current;
    el?.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      el?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [games.length]);
  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: 'smooth' });
  };
  return (
    <section className="lobby-section" data-screen-label={title}>
      <div className="section-head">
        <h2 className="section-title">
          {icon && <Icon name={icon} size={18} />}
          {title}
          <span className="count">{count ?? games.length}</span>
        </h2>
        <div className="section-actions">
          <a href="#" className="see-all">See all →</a>
          <button className="arrow" onClick={() => scroll(-1)} disabled={!canL} aria-label="Scroll left">
            <Icon name="arrL" /></button>
          <button className="arrow" onClick={() => scroll(1)} disabled={!canR} aria-label="Scroll right">
            <Icon name="arrR" /></button>
        </div>
      </div>
      <div className="rail-wrap">
        <div className={`rail ${density}`} ref={ref}>
          {games.map((g) => <GameCard key={g.id} game={g} onOpen={onOpen} />)}
        </div>
      </div>
    </section>);

}

/* ─── FILTER BAR + GRID ──────────────────────── */
function FilteredGrid({ onOpen, density }) {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('popular');
  const cats = ['All', ...PROVIDERS];
  const all = useMemo(() => {
    return [...GAMES.slots, ...GAMES.live, ...GAMES.originals];
  }, []);
  const filtered = useMemo(() => {
    let xs = all;
    if (cat !== 'All') xs = all.filter((g) => g.provider === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      xs = xs.filter((g) => g.title.toLowerCase().includes(s) || g.provider.toLowerCase().includes(s));
    }
    if (sort === 'rtp') xs = [...xs].sort((a, b) => +b.rtp - +a.rtp);
    if (sort === 'new') xs = [...xs].slice().reverse();
    if (sort === 'az') xs = [...xs].sort((a, b) => a.title.localeCompare(b.title));
    return xs.slice(0, 24);
  }, [all, cat, q, sort]);
  return (
    <section className="lobby-section" data-screen-label="Browse all">
      <div className="section-head">
        <h2 className="section-title">Browse all<span className="count">{filtered.length} of {all.length}</span></h2>
      </div>
      <div className="filter-bar">
        <div className="search">
          <Icon name="search" size={15} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search games or providers" />
          <kbd>⌘K</kbd>
        </div>
        <div className="chips">
          {cats.map((c) =>
          <button key={c}
          className={`chip ${cat === c ? 'active' : ''}`}
          onClick={() => setCat(c)}>
              {c}
            </button>
          )}
        </div>
        <div className="sort">
          <span>Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popular">Popular</option>
            <option value="new">New</option>
            <option value="rtp">High RTP</option>
            <option value="az">A → Z</option>
          </select>
        </div>
      </div>
      {filtered.length === 0 ?
      <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          No games match "{q}" — try another search.
        </div> :

      <div className={`grid ${density}`}>
          {filtered.map((g) => <GameCard key={g.id} game={g} onOpen={onOpen} />)}
        </div>
      }
    </section>);

}

/* ─── LEADERBOARD ────────────────────────────── */
function Leaderboard() {
  const [rows, setRows] = useState(() => WINNERS.slice(0, 10));
  const [fresh, setFresh] = useState(null);
  useEffect(() => {
    const t = setInterval(() => {
      setRows((prev) => {
        const pick = WINNERS[Math.floor(Math.random() * WINNERS.length)];
        const noise = Math.random() * 80 + 5;
        const mult = Math.random() * 50 + 1.5;
        const newRow = {
          ...pick,
          id: 'r' + Date.now(),
          bet: noise.toFixed(2),
          mult: mult.toFixed(2),
          payout: (noise * mult).toFixed(2)
        };
        setFresh(newRow.id);
        return [newRow, ...prev.slice(0, 9)];
      });
    }, 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="lobby-section" data-screen-label="Leaderboard">
      <div className="section-head">
        <h2 className="section-title">
          <Icon name="bolt" size={18} />Top wins · last hour
        </h2>
        <div className="section-actions">
          <a href="#" className="see-all">All winners →</a>
        </div>
      </div>
      <div className="leaderboard-wrap">
        <div className="leaderboard">
          <div className="lb-head">
            <span>#</span><span>Player</span><span>Game</span>
            <span>Bet</span><span>Mult</span><span style={{ textAlign: 'right' }}>Payout</span>
          </div>
          {rows.map((r, i) =>
          <div key={r.id} className={`lb-row ${r.id === fresh ? 'fresh' : ''}`}>
              <span className={`lb-rank ${i < 3 ? 'top' : ''}`}>{String(i + 1).padStart(2, '0')}</span>
              <div className="lb-user">
                <div className="lb-avatar"
              style={{ '--avatar-bg': `linear-gradient(135deg, oklch(0.55 0.2 ${r.hue}), oklch(0.4 0.18 ${(r.hue + 80) % 360}))` }} />
                {r.user}
              </div>
              <span className="lb-game">{r.game}</span>
              <span className="lb-num">{r.bet}</span>
              <span className="lb-num">{r.mult}×</span>
              <span className="lb-payout">+{Number(r.payout).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          )}
        </div>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-lg)',
          padding: 22,
          display: 'flex', flexDirection: 'column', gap: 12
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
            Your rank
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 700, lineHeight: 1 }}>
            #1,284
          </div>
          <div style={{ color: 'var(--text-mid)', fontSize: 13 }}>
            Wager $50 more this hour to climb into the top 1,000.
          </div>
          <div style={{
            height: 6, background: 'var(--bg-elev)', borderRadius: 999, marginTop: 6, overflow: 'hidden'
          }}>
            <div style={{
              height: '100%', width: '64%',
              background: 'linear-gradient(90deg, var(--accent), var(--accent-2))'
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)' }}>
            <span>Wagered $128.40</span><span>$200 needed</span>
          </div>
          <button className="btn primary" style={{ marginTop: 'auto', padding: '11px' }}>Wager more →</button>
        </div>
      </div>
    </section>);

}

/* ─── CATEGORY VIEW (grid + view all) ────────── */
function CategoryView({ title, icon, games, onOpen, density }) {
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState('All');
  const [favs, toggleFav] = useFavorites();

  const vendors = useMemo(() => {
    return [...new Set(games.map((g) => g.provider))];
  }, [games]);

  const filtered = useMemo(() => {
    if (filter === 'All') return games;
    if (filter === 'Favorites') return games.filter((g) => favs.has(g.id));
    return games.filter((g) => g.provider === filter);
  }, [games, filter, favs]);

  const shown = expanded ? filtered : filtered.slice(0, 50);

  const tabs = ['All', 'Favorites'];
  const tabIco = (t) => {
    if (t === 'Favorites') return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20s-7-4.6-9.3-9C1.2 8 2.6 4.5 6 4.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.4 0 4.8 3.5 3.3 6.5C19 15.4 12 20 12 20Z"/></svg>
    );
    return null;
  };

  return (
    <section className="lobby-section" data-screen-label={title} data-comment-anchor="5d897b5aab-section-815-5">
      <div className="section-head">
        <h2 className="section-title">
          {icon && <Icon name={icon} size={18} />}
          {title}
          <span className="count">{filtered.length}</span>
        </h2>
      </div>
      <div className="cv-tabs">
        {tabs.map((tb) => (
          <button key={tb}
                  className={`cv-tab ${filter === tb ? 'active' : ''}`}
                  onClick={() => { setFilter(tb); setExpanded(false); }}>
            {tabIco(tb)}
            {tb}
            {tb === 'Favorites' && favs.size > 0 && <span className="cv-tab-count">{favs.size}</span>}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <div className="cv-empty">
          {filter === 'Favorites'
            ? 'No favorites yet — tap the ♥ on any game to save it here.'
            : 'No games to show.'}
        </div>
      ) : (
        <div className={`grid ${density}`}>
          {shown.map((g) => (
            <GameCard key={g.id} game={g} onOpen={onOpen}
                      isFav={favs.has(g.id)} onFav={toggleFav} />
          ))}
        </div>
      )}
      {filtered.length > 50 &&
      <div className="cv-foot">
          <button className="cv-view-all" onClick={() => setExpanded((e) => !e)}>
            {expanded ? 'Show less ↑' : `View all (${filtered.length}) →`}
          </button>
        </div>
      }
    </section>);

}

/* ─── SPORTS SECTION ─────────────────────────── */
function Sports() {
  const allMatches = [
  { league: 'Champions League', home: 'Real Madrid', away: 'Bayern', start: 'Today · 20:00', odds: ['1.85', '3.40', '4.20'], live: true, score: '1 - 0', min: '34\'', provider: 'Saba' },
  { league: 'Premier League', home: 'Arsenal', away: 'Man City', start: 'Today · 22:30', odds: ['2.95', '3.20', '2.40'], provider: 'Bti' },
  { league: 'NBA', home: 'Lakers', away: 'Celtics', start: 'Tomorrow · 03:30', odds: ['1.65', '—', '2.25'], provider: 'Saba' },
  { league: 'La Liga', home: 'Barcelona', away: 'Atletico', start: 'Sat · 21:00', odds: ['1.55', '4.10', '5.60'], provider: 'Bti' },
  { league: 'Serie A', home: 'Inter', away: 'Juventus', start: 'Sun · 19:45', odds: ['2.10', '3.30', '3.60'], provider: 'Saba' },
  { league: 'NFL', home: 'Chiefs', away: 'Eagles', start: 'Sun · 23:00', odds: ['1.90', '—', '1.95'], provider: 'Bti' }];

  const [filter, setFilter] = useState('All');
  const tabs = ['All', 'Saba', 'Bti'];
  const matches = filter === 'All' ? allMatches : allMatches.filter((m) => m.provider === filter);

  return (
    <section className="lobby-section" data-screen-label="Sports">
      <div className="section-head">
        <h2 className="section-title">Sportsbook<span className="count">{matches.length}</span></h2>
        <a href="#" className="see-all">All matches →</a>
      </div>
      <div className="cv-tabs">
        {tabs.map((tb) =>
        <button key={tb}
                className={`cv-tab ${filter === tb ? 'active' : ''}`}
                onClick={() => setFilter(tb)}>
            {tb}
          </button>
        )}
      </div>
      <div className="sports-grid">
        {matches.map((m, i) =>
        <article key={i} className={`sport-card ${m.live ? 'live' : ''}`}>
            <div className="sport-head">
              <span className="sport-league">{m.league}</span>
              {m.live ?
            <span className="sport-live"><span className="dot"></span>LIVE {m.min}</span> :

            <span className="sport-time">{m.start}</span>
            }
            </div>
            <div className="sport-teams">
              <div className="sport-team">
                <div className="sport-team-logo" style={{ '--logo-hue': 200 }}>{m.home.slice(0, 2).toUpperCase()}</div>
                <span>{m.home}</span>
              </div>
              {m.live && <div className="sport-score">{m.score}</div>}
              <div className="sport-team">
                <span>{m.away}</span>
                <div className="sport-team-logo" style={{ '--logo-hue': 340 }}>{m.away.slice(0, 2).toUpperCase()}</div>
              </div>
            </div>
            <div className="sport-odds">
              <button className="sport-odd"><span>1</span><strong>{m.odds[0]}</strong></button>
              <button className="sport-odd" disabled={m.odds[1] === '—'}><span>X</span><strong>{m.odds[1]}</strong></button>
              <button className="sport-odd"><span>2</span><strong>{m.odds[2]}</strong></button>
            </div>
          </article>
        )}
      </div>
    </section>);

}

/* ─── PROMOTION SECTION ──────────────────────── */
function Promotion() {
  const offers = [
  { tag: 'WELCOME', title: '100% First Deposit', sub: 'Match up to 10,000 USDT on your first top-up.', cta: 'View', hue: 200 },
  { tag: 'DAILY', title: '15% Daily Reload', sub: 'Every day, every deposit — instant cashback to balance.', cta: 'View', hue: 280 },
  { tag: 'REFERRAL', title: 'Refer & Earn 25%', sub: 'Lifetime commission from every friend you bring.', cta: 'View', hue: 340 },
  { tag: 'VIP', title: 'Up to 20% Cashback', sub: 'Weekly cashback scales with your VIP tier — no max cap.', cta: 'View', hue: 50 }];

  return (
    <section className="lobby-section" data-screen-label="Promotion">
      <div className="section-head">
        <h2 className="section-title">Promotions<span className="count">{offers.length}</span></h2>
        <a href="#" className="see-all">All promotions →</a>
      </div>
      <div className="promo-grid">
        {offers.map((o, i) =>
        <article key={i} className="promo-card" style={{ '--promo-hue': 'var(--accent)' }}>
            <span className="promo-card-tag">{o.tag}</span>
            <div className="promo-card-art" aria-hidden="true"></div>
            <h3 className="promo-card-title">{o.title}</h3>
            <p className="promo-card-sub">{o.sub}</p>
            <button className="promo-card-cta">{o.cta} →</button>
          </article>
        )}
      </div>
    </section>);

}

/* ─── TOURNAMENTS ────────────────────────────── */
function Tournaments() {
  return (
    <section className="lobby-section" data-screen-label="Tournaments">
      <div className="section-head">
        <h2 className="section-title">
          <span className="live-pip"></span>Live sport
        </h2>
        <a href="#" className="see-all">All tournaments →</a>
      </div>
      <div className="tourn-grid">
        {TOURNAMENTS.map((t, i) =>
        <div key={i} className="tourn"
        style={{ '--tourn-hue': 'var(--accent)' }}>
            {t.tag && <span className={`tourn-tag ${t.tag === 'ENDS SOON' ? 'hot' : ''}`}>{t.tag}</span>}
            <div className="tourn-prize-label">Prize pool</div>
            <div className="tourn-prize">{t.prize}</div>
            <h3 className="tourn-title">{t.title}</h3>
            <div className="tourn-foot">
              <div style={{ display: 'flex', gap: 18 }}>
                <div className="tourn-meta">
                  <span>Ends in</span><span>{t.endsIn}</span>
                </div>
                <div className="tourn-meta">
                  <span>Players</span><span>{t.players.toLocaleString()}</span>
                </div>
              </div>
              <button className="btn primary">Join</button>
            </div>
          </div>
        )}
      </div>
    </section>);

}

/* ─── PROVIDERS ──────────────────────────────── */
function Providers() {
  return (
    <section className="lobby-section" data-screen-label="Providers">
      <div className="section-head">
        <h2 className="section-title">Providers<span className="count">{PROVIDERS.length}</span></h2>
        <a href="#" className="see-all">All providers →</a>
      </div>
      <div className="providers">
        {PROVIDERS.map((p) =>
        <a key={p} href="#" className="provider">{p}</a>
        )}
      </div>
    </section>);

}

/* ─── FOOTER ─────────────────────────────────── */
/* ─── FOOTER ─────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer footer-min">
      <div className="container">
        <div className="footer-min-logo">
          <img src="assets/logo.png" alt="100%" />
        </div>
        <p className="footer-min-notice">
          Gambling can be addictive, please play responsibly. For information on support measures, please visit our Responsible Gambling Help page.<br />
          By accessing, continuing to use or navigating throughout this site you accept that we will use certain browser cookies to improve your customer experience with us.
        </p>
        <p className="footer-min-copy">win100% © All rights reserved and protected by law</p>
      </div>
    </footer>);

}

/* ─── GAME MODAL ─────────────────────────────── */
function GameModal({ game, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  if (!game) return null;
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>{game.title}</div>
            <span className="gcard-provider" style={{ fontSize: 12 }}>{game.provider}</span>
          </div>
          <button className="modal-close" onClick={onClose}><Icon name="close" size={14} /></button>
        </div>
        <div className="modal-body">
          <div className="game-modal-art" style={{ '--gm-bg': game.bg }}>
            [ {game.title.toUpperCase()} GAMEPLAY PREVIEW ]
          </div>
          <div style={{ color: 'var(--text-mid)', fontSize: 13.5, lineHeight: 1.6 }}>
            {game.title} is a {game.category} game from {game.provider}. Spin volatile reels, stack
            multipliers, and bank wins instantly to your crypto balance. Provably fair on every round.
          </div>
          <div className="game-modal-stats">
            <div className="game-modal-stat">
              <div className="game-modal-stat-label">RTP</div>
              <div className="game-modal-stat-val">{game.rtp}%</div>
            </div>
            <div className="game-modal-stat">
              <div className="game-modal-stat-label">Max win</div>
              <div className="game-modal-stat-val">{game.maxWin}</div>
            </div>
            <div className="game-modal-stat">
              <div className="game-modal-stat-label">Volatility</div>
              <div className="game-modal-stat-val">High</div>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn">Demo</button>
          <button className="btn primary">Play for real →</button>
        </div>
      </div>
    </div>);

}

/* ─── CUSTOMER SERVICE MODAL ──────────────────── */
function CustomerServiceModal({ onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal sm cs-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>
            <span className="cs-modal-ico">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d="M4 12a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-2v-7h5M4 12v4a3 3 0 0 0 3 3h2v-7H4" /></svg>
            </span>
            Customer Service
          </div>
          <button className="modal-close" onClick={onClose}><Icon name="close" size={14} /></button>
        </div>
        <div className="modal-body">
          <div className="cs-box-title">Select a channel</div>
          <a href="#" className="cs-opt">
            <span className="cs-opt-ico">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d="M21 12c0 4.4-4 8-9 8a10 10 0 0 1-3.6-.7L3 21l1.4-4.5A8 8 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8Z" /></svg>
            </span>
            <span className="cs-opt-text">
              <strong>Live Chat Support</strong>
              <small>24/7 instant help from our team</small>
            </span>
            <span className="cs-opt-arrow">›</span>
          </a>
          <a href="#" className="cs-opt">
            <span className="cs-opt-ico">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.05 3.4 2.7 10.5c-1.1.45-1.1 1.1-.2 1.4l4.6 1.45 1.8 5.7c.2.55.4.75.8.75.4 0 .55-.18.75-.4l2.3-2.3 4.7 3.45c.85.5 1.45.25 1.65-.8L21.95 4.6c.3-1.4-.45-2-1.5-1.55Z" /></svg>
            </span>
            <span className="cs-opt-text">
              <strong>Telegram Channel</strong>
              <small>Promotions &amp; announcements</small>
            </span>
            <span className="cs-opt-arrow">›</span>
          </a>
          <a href="#" className="cs-opt">
            <span className="cs-opt-ico">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d="M4 6h16v12H4zM4 7l8 6 8-6" /></svg>
            </span>
            <span className="cs-opt-text">
              <strong>Email Us</strong>
              <small>support@100.gg · reply within 24h</small>
            </span>
            <span className="cs-opt-arrow">›</span>
          </a>
        </div>
      </div>
    </div>);

}

/* ─── SIGN-IN MODAL ──────────────────────────── */
function SignInModal({ onClose, onLogin }) {
  const [tab, setTab] = useState('signin');
  const [email, setEmail] = useState('player@100.gg');
  const [pw, setPw] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  const submit = (e) => {
    e.preventDefault();
    const name = tab === 'register' && username ?
    username :
    email.split('@')[0] || 'player';
    onLogin({ name, email: email || 'player@100.gg' });
    onClose();
  };
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>
            {tab === 'forgot' ? 'Forgot Password' : tab === 'signin' ? 'Welcome back' : 'Create your account'}
          </div>
          <button className="modal-close" onClick={onClose}><Icon name="close" size={14} /></button>
        </div>
        <div className="modal-body">
          {tab === 'forgot' ?
          <form onSubmit={(e) => {e.preventDefault();setTab('signin');}}>
              <p className="forgot-intro">Enter your username and email address to receive password reset instructions.</p>
              <div className="field">
                <label>Username</label>
                <input placeholder="Enter your username"
              value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" placeholder="Enter your email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button type="submit" className="reset-btn">Send Reset Link</button>
              <div className="signin-foot">
                Remember your password? <a href="#" onClick={(e) => {e.preventDefault();setTab('signin');}}>Back to Login</a>
              </div>
            </form> :

          <>
          <div className="signin-tabs">
            <button className={`signin-tab ${tab === 'signin' ? 'active' : ''}`} onClick={() => setTab('signin')}>Sign in</button>
            <button className={`signin-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>Register</button>
          </div>
          <form onSubmit={submit}>
            {tab === 'register' &&
              <div className="field">
                <label>Username</label>
                <input placeholder="player_one"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
              </div>
              }
            <div className="field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com" />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)}
                placeholder="••••••••" />
            </div>
            {tab === 'register' &&
              <div className="field">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-mid)' }}>
                  <input type="checkbox" defaultChecked style={{ margin: 0 }} />
                  <span style={{ fontSize: 12 }}>I'm 18+ and accept the Terms</span>
                </label>
              </div>
              }
            <button type="submit" className="btn primary" style={{ width: '100%', padding: '12px', marginTop: 6 }}>
              {tab === 'signin' ? 'Sign in →' : 'Create account →'}
            </button>
          </form>
          <div className="signin-foot">
            {tab === 'signin' ?
              <>No account? <a href="#" onClick={(e) => {e.preventDefault();setTab('register');}}>Register</a> · <a href="#" onClick={(e) => {e.preventDefault();setTab('forgot');}}>Forgot?</a></> :
              <>Already a player? <a href="#" onClick={(e) => {e.preventDefault();setTab('signin');}}>Sign in</a></>
              }
          </div>
          </>
          }
        </div>
      </div>
    </div>);

}

/* expose */
Object.assign(window, {
  Sidebar, MobileNav, TopBar, PromoRibbon,
  Hero, RewardsBanner, Promos, Rail, CategoryView, FilteredGrid, Leaderboard, Tournaments, Sports, Promotion, Providers, Footer,
  GameModal, SignInModal, CustomerServiceModal, Icon
});