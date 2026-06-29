<template>
  <aside class="sidebar" :class="{ collapsed }">

    <!-- 搜尋 -->
    <div class="sidebar-search">
      <div class="search">
        <Icon name="search" :size="14" />
        <input placeholder="Search any game or provider" />
      </div>
    </div>

    <!-- 導覽列表 -->
    <nav class="sidebar-list">
      <a
        v-for="item in items" :key="item.name"
        href="#"
        class="sb-item"
        :class="{ active: activeCat === item.name }"
        :title="collapsed ? item.name : undefined"
        @click.prevent="handleNav(item)"
      >
        <span class="sb-icon">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path v-if="item.icon === 'home'" d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8Z" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round" />
            <g v-else-if="item.icon === 'grid'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
            </g>
            <g v-else-if="item.icon === 'ticket'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
              <path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5L7.2 18l.9-5.4-3.9-3.8 5.4-.8L12 3Z" />
            </g>
            <g v-else-if="item.icon === 'down'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
              <path d="M12 4v12m0 0-4-4m4 4 4-4" /><path d="M4 20h16" />
            </g>
            <g v-else-if="item.icon === 'chart'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
              <path d="m4 16 5-5 4 4 7-9" /><path d="M14 6h6v6" />
            </g>
            <g v-else-if="item.icon === 'swap'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
              <path d="M7 4v13m0 0-3-3m3 3 3-3" /><path d="M17 20V7m0 0 3 3m-3-3-3 3" />
            </g>
            <g v-else-if="item.icon === 'book'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9h10M7 13h10M7 17h6" />
            </g>
            <g v-else-if="item.icon === 'person'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9" /><circle cx="12" cy="10" r="3" /><path d="M6 19a6 6 0 0 1 12 0" />
            </g>
            <g v-else-if="item.icon === 'shield'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
              <path d="M12 3 4 6v6c0 4.5 3.3 8 8 9 4.7-1 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" />
            </g>
          </svg>
        </span>
        <span class="sb-label">{{ item.name }}</span>
      </a>
    </nav>

    <!-- 語言 + 存提款 -->
    <div class="sidebar-extra">
      <div class="sb-lang-wrap" ref="langRef">
        <button class="sb-lang" :class="{ open: langOpen }" @click="langOpen = !langOpen">
          <svg class="sb-lang-globe" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
          </svg>
          <span class="sb-flag" aria-hidden="true">
            <svg v-if="lang === 'en'" width="18" height="12" viewBox="0 0 60 40">
              <rect width="60" height="40" fill="#012169" />
              <path d="M0 0 60 40M60 0 0 40" stroke="#fff" stroke-width="6" />
              <path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="10" />
              <path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="6" />
            </svg>
            <svg v-else-if="lang === 'ko'" width="18" height="12" viewBox="0 0 60 40">
              <rect width="60" height="40" fill="#fff" />
              <circle cx="30" cy="20" r="8" fill="#cd2e3a" />
              <path d="M22 20a8 8 0 0 1 16 0 4 4 0 0 1-8 0 4 4 0 0 0-8 0Z" fill="#0047a0" />
              <g stroke="#000" stroke-width="1.4">
                <path d="M11 11l4 6M13 9l4 6M15 7l4 6" />
                <path d="M41 23l4 6M43 21l4 6M45 19l4 6" />
                <path d="M45 11l-4 6M47 13l-4 6M49 15l-4 6" />
                <path d="M11 29l4-6M13 31l4-6M15 33l4-6" />
              </g>
            </svg>
          </span>
          <span class="sb-lang-label">{{ LANGS[lang].label }}</span>
          <svg class="sb-lang-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <div v-if="langOpen" class="sb-lang-menu">
          <button
            v-for="(v, k) in LANGS" :key="k"
            class="sb-lang-item" :class="{ active: lang === k }"
            @click="lang = k; langOpen = false"
          >
            <span class="sb-flag">
              <svg v-if="k === 'en'" width="18" height="12" viewBox="0 0 60 40">
                <rect width="60" height="40" fill="#012169" />
                <path d="M0 0 60 40M60 0 0 40" stroke="#fff" stroke-width="6" />
                <path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="10" />
                <path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="6" />
              </svg>
              <svg v-else-if="k === 'ko'" width="18" height="12" viewBox="0 0 60 40">
                <rect width="60" height="40" fill="#fff" />
                <circle cx="30" cy="20" r="8" fill="#cd2e3a" />
                <path d="M22 20a8 8 0 0 1 16 0 4 4 0 0 1-8 0 4 4 0 0 0-8 0Z" fill="#0047a0" />
                <g stroke="#000" stroke-width="1.4">
                  <path d="M11 11l4 6M13 9l4 6M15 7l4 6" />
                  <path d="M41 23l4 6M43 21l4 6M45 19l4 6" />
                  <path d="M45 11l-4 6M47 13l-4 6M49 15l-4 6" />
                  <path d="M11 29l4-6M13 31l4-6M15 33l4-6" />
                </g>
              </svg>
            </span>
            <span>{{ v.label }}</span>
            <svg v-if="lang === k" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12l5 5 9-10" />
            </svg>
          </button>
        </div>
      </div>

      <div class="sb-money">
        <button class="sb-deposit"  @click="handleDeposit">Deposit</button>
        <button class="sb-withdraw" @click="handleWithdraw">Withdrawal</button>
      </div>
    </div>

    <!-- 社群 + 折疊 -->
    <div class="sidebar-foot">
      <div class="sb-socials">
        <a href="#" class="sb-social" aria-label="Customer support" title="Customer support" @click.prevent="emit('support')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round">
            <path d="M4 12a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-2v-7h5" />
            <path d="M4 12v4a3 3 0 0 0 3 3h2v-7H4" />
          </svg>
        </a>
        <a href="#" class="sb-social" aria-label="Telegram" title="Telegram">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.05 3.4 2.7 10.5c-1.1.45-1.1 1.1-.2 1.4l4.6 1.45 1.8 5.7c.2.55.4.75.8.75.4 0 .55-.18.75-.4l2.3-2.3 4.7 3.45c.85.5 1.45.25 1.65-.8L21.95 4.6c.3-1.4-.45-2-1.5-1.55Z" />
          </svg>
        </a>
      </div>
      <button class="sb-collapse" aria-label="Toggle sidebar" @click="emit('update:collapsed', !collapsed)">
        {{ collapsed ? '›' : '‹' }}
      </button>
    </div>

  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Icon from '@/components/ui/Icon.vue';

const props = defineProps({
  collapsed:  { type: Boolean, default: false },
  activeCat:  { type: String,  default: 'Lobby' },
  activeTab:  { type: String,  default: 'Casino' },
  user:       { type: Object,  default: null },
});

const emit = defineEmits([
  'update:collapsed',
  'update:activeCat',
  'update:activeTab',
  'sign-in',
  'support',
]);

const lang     = ref('en');
const langOpen = ref(false);
const langRef  = ref(null);

const LANGS = {
  en: { label: 'English' },
  ko: { label: '한국어'   },
};

const items = [
  { name: 'Lobby',            icon: 'home'   },
  { name: 'Account Overview', icon: 'grid'   },
  { name: 'Betting Record',   icon: 'ticket' },
  { name: 'Deposit Record',   icon: 'down'   },
  { name: 'Profit And Loss',  icon: 'chart'  },
  { name: 'Withdrawal Record',icon: 'swap'   },
  { name: 'Account Record',   icon: 'book'   },
  { name: 'Personal Info',    icon: 'person' },
  { name: 'Security Center',  icon: 'shield' },
];

function handleNav(item) {
  if (item.name === 'Withdrawal Record' && !props.user) { emit('sign-in'); return; }
  if (item.name !== 'Lobby' && !props.user)             { emit('sign-in'); return; }
  emit('update:activeCat', item.name);
}

function handleDeposit()  {
  if (!props.user) { emit('sign-in'); return; }
  emit('update:activeCat', 'DepositForm');
}
function handleWithdraw() {
  if (!props.user) { emit('sign-in'); return; }
  emit('update:activeCat', 'WithdrawalForm');
}

function onDocClick(e) {
  if (langRef.value && !langRef.value.contains(e.target)) langOpen.value = false;
}
onMounted(()    => document.addEventListener('mousedown', onDocClick));
onUnmounted(()  => document.removeEventListener('mousedown', onDocClick));
</script>
