<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

interface NavItem {
  label: string;
  to: string;
  icon: string;
  dropdown?: string[];
}

const nav: NavItem[] = [
  { label: 'Home', to: '/', icon: 'house' },
  { label: 'Hot Games', to: '/hot-games', icon: 'flame' },
  { label: 'Mini Games', to: '/mini-games', icon: 'gamepad2' },
  { label: 'Sports', to: '/sport', icon: 'trophy', dropdown: ['BTI', 'SABA'] },
  { label: 'Live', to: '/live', icon: 'video', dropdown: ['Sexy', 'Pragmatic Play', 'Yeebet'] },
  { label: 'Fish', to: '/fish', icon: 'fish' },
  { label: 'Slots', to: '/slot', icon: 'cherry' },
  { label: 'Promotion', to: '/promotion', icon: 'gift' },
];

const mobileLinks = [
  { label: 'Home', to: '/' },
  { label: 'Hot Games', to: '/hot-games' },
  { label: 'Mini Games', to: '/mini-games' },
  { label: 'Slots', to: '/slot' },
  { label: 'Sports', to: '/sport' },
  { label: 'Live', to: '/live' },
  { label: 'Fish', to: '/fish' },
  { label: 'Promotion', to: '/promotion' },
];

const route = useRoute();
const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to));

const { loggedIn, open: openAuth } = useAuth();

const base = 'px-2 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap';
const activeCls = 'text-gray-900 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] shadow-md font-semibold';
const inactiveCls = 'text-gray-300 hover:text-gray-900 hover:bg-gradient-to-r hover:from-[#CBE8E4] hover:to-[#98E7D2]';

// hover dropdowns
const openDd = ref<string | null>(null);
let ddTimer: ReturnType<typeof setTimeout> | null = null;
const showDd = (label: string) => { if (ddTimer) clearTimeout(ddTimer); openDd.value = label; };
const hideDd = () => { ddTimer = setTimeout(() => { openDd.value = null; }, 160); };

// mobile slide-in menu
const mobileOpen = ref(false);
</script>

<template>
  <header class="bg-[#1a2128] border-b border-gray-800 sticky top-0 z-50">
    <!-- desktop -->
    <div class="hidden md:flex items-stretch px-[50px]">
      <NuxtLink class="flex items-center pr-6 flex-shrink-0" to="/">
        <img src="/logo.png" alt="Casino Logo" class="h-10 mix-blend-lighten">
      </NuxtLink>
      <div class="flex flex-col flex-1">
        <div class="flex items-center justify-end gap-3 py-2 text-sm">
          <div class="relative">
            <button class="text-gray-300 hover:text-white flex items-center gap-1">
              <AppIcon name="globe" class="w-4 h-4" /><span>EN</span>
            </button>
          </div>
          <template v-if="loggedIn">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:nowrap">
              <span style="color:#fff;font-size:13px;white-space:nowrap">ID:meqomcao</span>
              <span style="background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#111827;font-size:11px;font-weight:700;padding:2px 8px;border-radius:9999px">VIP1</span>
              <span style="color:#98E7D2;font-weight:700;font-size:14px;white-space:nowrap">₩1,000,000,000</span>
              <NuxtLink to="/deposit" style="background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#111827;padding:6px 16px;border-radius:8px;font-weight:600;font-size:13px;text-decoration:none;white-space:nowrap">Deposit</NuxtLink>
            </div>
          </template>
          <template v-else>
            <button class="bg-[#2a3138] text-white px-5 py-1.5 rounded-lg hover:opacity-90 transition-opacity" @click="openAuth('login')">Login</button>
            <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-5 py-1.5 rounded-lg hover:opacity-90 transition-opacity font-semibold" @click="openAuth('register')">Register</button>
          </template>
        </div>
        <nav class="flex items-center justify-end gap-1 py-1.5 border-t border-gray-800 text-sm relative">
          <template v-for="item in nav" :key="item.to">
            <div v-if="item.dropdown" class="relative" @mouseenter="showDd(item.label)" @mouseleave="hideDd">
              <NuxtLink :to="item.to" :class="[base, isActive(item.to) ? activeCls : inactiveCls]">
                <AppIcon :name="item.icon" class="w-3.5 h-3.5" />
                <span>{{ item.label }}</span>
                <AppIcon name="chevron-down" class="w-3 h-3" />
              </NuxtLink>
              <div
                v-show="openDd === item.label"
                class="absolute left-0 top-full z-[1000]"
                style="margin-top:6px;background:#1a2128;border:1px solid #2a3441;border-radius:10px;padding:6px;min-width:160px;box-shadow:0 12px 30px rgba(0,0,0,.45)"
                @mouseenter="showDd(item.label)" @mouseleave="hideDd"
              >
                <div
                  v-for="d in item.dropdown" :key="d"
                  class="rounded-md cursor-pointer"
                  style="padding:9px 14px;color:#d1d5db;font-size:14px"
                  @mouseover="(e) => ((e.currentTarget as HTMLElement).style.background = '#0f1419')"
                  @mouseout="(e) => ((e.currentTarget as HTMLElement).style.background = '')"
                >{{ d }}</div>
              </div>
            </div>
            <NuxtLink v-else :to="item.to" :class="[base, isActive(item.to) ? activeCls : inactiveCls]">
              <AppIcon :name="item.icon" class="w-3.5 h-3.5" />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </template>
        </nav>
      </div>
    </div>

    <!-- mobile -->
    <div class="flex md:hidden items-center justify-between h-14 px-4">
      <NuxtLink class="whitespace-nowrap flex-shrink-0" to="/">
        <img src="/logo.png" alt="Casino Logo" class="h-10 mix-blend-lighten">
      </NuxtLink>
      <button class="text-gray-300 hover:text-white" aria-label="Menu" @click="mobileOpen = true">
        <AppIcon name="menu" class="w-5 h-5" />
      </button>
    </div>

    <!-- mobile slide-in menu -->
    <Teleport to="body">
      <div v-if="mobileOpen" class="fixed inset-0 z-[10001]" style="background:rgba(0,0,0,.6)" @click.self="mobileOpen = false">
        <div
          class="absolute top-0 left-0 bottom-0 overflow-y-auto"
          style="width:80%;max-width:300px;background:#0a0e1a;border-right:1px solid #1f2937;padding:18px;box-shadow:4px 0 24px rgba(0,0,0,.5)"
        >
          <div class="flex justify-between items-center mb-3.5">
            <span style="color:#98E7D2;font-weight:800;font-size:18px">WIN100%</span>
            <button style="background:none;border:0;color:#fff;font-size:22px;cursor:pointer" @click="mobileOpen = false">×</button>
          </div>
          <NuxtLink
            v-for="m in mobileLinks" :key="m.to" :to="m.to"
            class="block border-b border-[#1a2128]"
            style="padding:12px 8px;color:#d1d5db;text-decoration:none;font-size:15px"
            @click="mobileOpen = false"
          >{{ m.label }}</NuxtLink>
          <div v-if="!loggedIn" class="flex gap-2.5 mt-4">
            <button style="flex:1;padding:10px;border-radius:8px;border:1px solid #2a3138;background:#2a3138;color:#fff;cursor:pointer;font-weight:600" @click="mobileOpen = false; openAuth('login')">Login</button>
            <button style="flex:1;padding:10px;border-radius:8px;border:0;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#111827;cursor:pointer;font-weight:700" @click="mobileOpen = false; openAuth('register')">Register</button>
          </div>
        </div>
      </div>
    </Teleport>

    <AuthModal />
  </header>
</template>
