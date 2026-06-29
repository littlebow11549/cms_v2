<script setup lang="ts">
import { ref } from 'vue';
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
  { label: 'Home', to: '/', icon: 'house' },
  { label: 'Hot Games', to: '/hot-games', icon: 'flame' },
  { label: 'Mini Games', to: '/mini-games', icon: 'gamepad2' },
  { label: 'Slots', to: '/slot', icon: 'cherry' },
  { label: 'Sports', to: '/sport', icon: 'trophy' },
  { label: 'Live', to: '/live', icon: 'video' },
  { label: 'Fish', to: '/fish', icon: 'fish' },
  { label: 'Promotion', to: '/promotion', icon: 'gift' },
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
const mobileOpen = useState<boolean>('ui:mobileMenuOpen', () => false);
</script>

<template>
  <header class="bg-[#1a2128] border-b border-gray-800 sticky top-0 z-50">
    <!-- desktop -->
    <div class="hidden md:flex items-stretch px-[70px]">
      <NuxtLink class="flex items-center pr-6 flex-shrink-0" to="/">
        <img src="/logo.png" alt="Casino Logo" class="h-10 mix-blend-lighten">
      </NuxtLink>
      <div class="flex flex-col flex-1">
        <div class="flex items-center justify-end gap-3 py-2 text-sm min-h-[44px]">
          <div v-if="!loggedIn" class="relative">
            <button class="text-gray-300 hover:text-white flex items-center gap-1">
              <AppIcon name="globe" class="w-4 h-4" /><span>EN</span>
            </button>
          </div>
          <template v-if="loggedIn">
            <NuxtLink
              to="/account"
              class="flex items-center gap-3 text-gray-300 hover:text-white transition-colors whitespace-nowrap"
            >
              <span class="text-gray-300 font-semibold">ID:</span>
              <span class="text-white font-semibold">meqomcao</span>
              <span class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-sm font-bold px-3 py-1 rounded-full leading-none">VIP1</span>
            </NuxtLink>
            <span class="h-5 w-px bg-gray-700"></span>
            <NuxtLink to="/account" class="flex items-center gap-2 whitespace-nowrap hover:opacity-90 transition-opacity">
              <span class="text-gray-400 font-semibold">Balance:</span>
              <span class="text-white font-bold">₩1,000,000,000</span>
            </NuxtLink>
            <NuxtLink to="/account" class="text-gray-300 hover:text-white transition-colors" aria-label="Account">
              <AppIcon name="user" class="w-5 h-5" />
            </NuxtLink>
          </template>
          <template v-else>
            <button class="bg-[#2a3138] text-white px-5 py-1.5 rounded-lg hover:opacity-90 transition-opacity" @click="openAuth('login')">Login</button>
            <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-5 py-1.5 rounded-lg hover:opacity-90 transition-opacity font-semibold" @click="openAuth('register')">Register</button>
          </template>
        </div>
        <nav class="flex items-center justify-end gap-1.5 py-1.5 border-t border-gray-800 text-sm relative">
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
          style="width:100%;max-width:430px;background:#1a2128;border-right:1px solid #1f2937;box-shadow:4px 0 24px rgba(0,0,0,.5);padding-bottom:84px"
        >
          <div class="flex justify-between items-center h-[92px] px-6 border-b border-gray-800">
            <img src="/logo.png" alt="Casino Logo" class="h-12 mix-blend-lighten">
            <button class="text-gray-300 hover:text-white" aria-label="Close menu" @click="mobileOpen = false">
              <AppIcon name="x" class="w-7 h-7" />
            </button>
          </div>
          <NuxtLink
            v-for="m in mobileLinks" :key="m.to" :to="m.to"
            class="mx-6 flex items-center gap-5 rounded-2xl text-[25px] font-semibold transition-colors"
            :class="isActive(m.to) ? 'bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900' : 'text-gray-300 hover:text-white'"
            style="padding:17px 24px;margin-top:16px;text-decoration:none"
            @click="mobileOpen = false"
          >
            <AppIcon :name="m.icon" class="w-6 h-6 flex-shrink-0" />
            <span>{{ m.label }}</span>
          </NuxtLink>
          <div class="mx-6 mt-8 pt-8 border-t border-gray-700">
            <template v-if="loggedIn">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 flex items-center justify-center flex-shrink-0">
                  <AppIcon name="user" class="w-8 h-8" />
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-3">
                    <span class="text-white text-2xl font-bold truncate">meqomcao</span>
                    <span class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-base font-bold px-3 py-1 rounded-full leading-none">VIP1</span>
                  </div>
                  <div class="mt-1 text-xl font-semibold">
                    <span class="text-gray-400">Balance: </span>
                    <span class="text-[#98E7D2]">₩1,000,000,000</span>
                  </div>
                </div>
              </div>
              <NuxtLink
                to="/account"
                class="mt-5 block text-center rounded-2xl bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-2xl font-bold"
                style="padding:18px 24px;text-decoration:none"
                @click="mobileOpen = false"
              >View Account</NuxtLink>
            </template>
            <div v-else class="flex gap-2.5">
              <button style="flex:1;padding:12px;border-radius:8px;border:1px solid #2a3138;background:#2a3138;color:#fff;cursor:pointer;font-weight:600" @click="mobileOpen = false; openAuth('login')">Login</button>
              <button style="flex:1;padding:12px;border-radius:8px;border:0;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#111827;cursor:pointer;font-weight:700" @click="mobileOpen = false; openAuth('register')">Register</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <AuthModal />
  </header>
</template>
