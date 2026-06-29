<template>
  <section class="lobby-section ap-page" data-screen-label="Security Center">
    <button class="ap-back" @click="emit('navigate', 'Account Overview')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6-6 6 6 6" /></svg>
      Back
    </button>
    <h1 class="ap-h1">Security Center</h1>

    <h3 class="sc-h">Last login</h3>
    <div class="ap-panel sc-login">
      <div class="sc-login-row"><span class="muted">Time</span><span>2026/04/21 13:29:25</span></div>
      <div class="sc-login-row"><span class="muted">IP Address</span><span>125.227.44.193</span></div>
    </div>

    <h3 class="sc-h">Security Setting</h3>
    <div class="ap-panel sc-list">
      <button v-for="(it, i) in items" :key="i" class="sc-item"
        @click="it.logout ? emit('logout') : it.go ? emit('navigate', it.go) : null"
      >
        <span class="sc-item-ico">
          <svg width="22" height="22" viewBox="0 0 24 24" v-html="icons[it.icon]"></svg>
        </span>
        <span class="sc-item-text">
          <span class="sc-item-name">{{ it.name }}</span>
          <span class="sc-item-sub">{{ it.sub }}</span>
        </span>
        <span class="sc-item-status">Not set ›</span>
      </button>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(['navigate', 'logout']);

const items = [
  { name: 'Personal Info',                sub: 'Complete your personal profile',                          icon: 'user', go: 'Personal Info' },
  { name: 'Change Login Password',         sub: 'Recommended letter and number combination',               icon: 'lock' },
  { name: 'Change Transaction Password',   sub: 'Set a password to improve the security of fund operations', icon: 'key' },
  { name: 'Banking Details',               sub: 'Recommended letter and number combination',               icon: 'card', go: 'WithdrawalForm' },
  { name: 'Logout',                         sub: 'Logout safely',                                          icon: 'out', logout: true },
];

const icons = {
  user: `<g fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="3.5"/><path d="M5 21a7 7 0 0 1 14 0"/></g>`,
  lock: `<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></g>`,
  key:  `<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><circle cx="8" cy="12" r="3.5"/><path d="M11 12h9M17 12v3M20 12v2"/></g>`,
  card: `<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></g>`,
  out:  `<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></g>`,
};
</script>
