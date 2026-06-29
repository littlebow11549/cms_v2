<template>
  <nav class="mobile-nav" aria-label="Main">
    <button
      v-for="item in items" :key="item.name"
      class="mnav-btn"
      :class="{ active: activeName === item.name }"
      @click="handleClick(item.name)"
    >
      <span class="mnav-icon">
        <svg width="22" height="22" viewBox="0 0 24 24">
          <template v-if="item.icon === 'browse'">
            <g stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round" stroke-linecap="round">
              <path d="M4 6h12M4 12h12M4 18h12" />
              <circle cx="20" cy="6" r=".8" fill="currentColor" />
              <circle cx="20" cy="12" r=".8" fill="currentColor" />
              <circle cx="20" cy="18" r=".8" fill="currentColor" />
            </g>
          </template>
          <template v-else-if="item.icon === 'home'">
            <g fill="currentColor">
              <path d="M12 3 3 11l1.4 1.4L5 12v8a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-8l.6.4L21 11 12 3Z" />
            </g>
          </template>
          <template v-else-if="item.icon === 'deposit'">
            <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round">
              <path d="M12 4v12m0 0-4-4m4 4 4-4" />
              <path d="M4 20h16" />
            </g>
          </template>
          <template v-else-if="item.icon === 'gift'">
            <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
              <rect x="3" y="9" width="18" height="5" rx="1" />
              <path d="M5 14v7h14v-7M12 9v12M9 9a2 2 0 1 1 3-2 2 2 0 1 1 3 2" />
            </g>
          </template>
          <template v-else-if="item.icon === 'member'">
            <g fill="currentColor">
              <circle cx="12" cy="9" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0H4Z" />
            </g>
          </template>
        </svg>
      </span>
      <span class="mnav-label">{{ item.name }}</span>
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  catTab:            { type: String, default: 'Lobby' },
  mobileSidebarOpen: { type: Boolean, default: false },
});

const emit = defineEmits(['browse', 'navigate', 'close-sidebar']);

const items = [
  { name: 'Browse',    icon: 'browse'  },
  { name: 'Home',      icon: 'home'    },
  { name: 'Deposit',   icon: 'deposit' },
  { name: 'Promotion', icon: 'gift'    },
  { name: 'Member',    icon: 'member'  },
];

const activeName = computed(() => {
  if (props.mobileSidebarOpen) return 'Browse';
  if (props.catTab === 'Lobby')     return 'Home';
  if (props.catTab === 'Promotion') return 'Promotion';
  return null;
});

function handleClick(name) {
  if (name === 'Browse')    { emit('browse'); return; }
  emit('close-sidebar');
  if (name === 'Home')      emit('navigate', { cat: 'Lobby',            tab: 'Lobby' });
  else if (name === 'Deposit')   emit('navigate', { cat: 'DepositForm',       tab: null });
  else if (name === 'Promotion') emit('navigate', { cat: 'Lobby',            tab: 'Promotion' });
  else if (name === 'Member')    emit('navigate', { cat: 'Account Overview',  tab: null });
}
</script>
