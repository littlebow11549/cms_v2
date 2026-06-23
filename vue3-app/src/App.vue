<template>
  <AppLayout
    :sidebar-collapsed="sidebarCollapsed"
    :mobile-sidebar-open="mobileSidebarOpen"
    @close-sidebar="mobileSidebarOpen = false"
  >
    <!-- 側邊欄 -->
    <template #sidebar>
      <Sidebar
        v-model:collapsed="sidebarCollapsed"
        v-model:activeCat="activeCat"
        :user="user"
        @sign-in="showSignIn = true"
        @support="showSupport = true"
      />
    </template>

    <!-- 頂部列 -->
    <template #header>
      <TopBar
        :user="user"
        :balance="balance"
        @sign-in="showSignIn = true"
        @logout="user = null"
        @home="activeCat = 'Lobby'"
        @navigate="(cat) => activeCat = cat"
      />
    </template>

    <!-- Account pages -->
    <AccountOverview v-if="activeCat === 'Account Overview'"
      :user="user" :balance="balance"
      @navigate="activeCat = $event"
    />
    <DepositPage v-else-if="activeCat === 'DepositForm'"
      @navigate="activeCat = $event"
    />
    <WithdrawalPage v-else-if="activeCat === 'WithdrawalForm'"
      :user="user"
      @navigate="activeCat = $event"
    />
    <PersonalInfo v-else-if="activeCat === 'Personal Info'"
      :user="user"
      @navigate="activeCat = $event"
    />
    <SecurityCenter v-else-if="activeCat === 'Security Center'"
      @navigate="activeCat = $event"
      @logout="user = null; activeCat = 'Lobby'"
    />
    <CustomerServicePage v-else-if="activeCat === 'Customer Service'"
      @navigate="activeCat = $event"
    />
    <RecordTable v-else-if="['Betting Record','Deposit Record','Withdrawal Record','Profit And Loss','Account Record'].includes(activeCat)"
      :title="activeCat"
      @navigate="activeCat = $event"
    />
    <SupportPage v-else-if="activeCat === 'Support'"
      @navigate="activeCat = $event"
    />

    <!-- 首頁區塊 -->
    <template v-else-if="activeCat === 'Lobby'">
      <Hero />
      <PromoRibbon v-if="showPromos" />
      <RewardsBanner v-if="user" :user="user" />
      <Promos v-if="showPromos" v-model:active="catTab" />

      <!-- Lobby tab -->
      <template v-if="catTab === 'Lobby'">
        <Rail title="Recently played" :games="RECENTLY_PLAYED" :count="RECENTLY_PLAYED.length" @open="openGame = $event" />
        <Rail title="Slots"       icon="fire" :games="GAMES.slots" @open="openGame = $event" />
        <Rail title="Live Casino" icon="bolt" :games="GAMES.live"  @open="openGame = $event" />
        <FilteredGrid @open="openGame = $event" />
        <Leaderboard />
        <Tournaments />
        <Promotion />
        <Providers />
      </template>

      <!-- Hot Games tab -->
      <CategoryView v-else-if="catTab === 'Hot Games'"
        title="Hot Games" icon="fire"
        :games="[...GAMES.slots, ...GAMES.live, ...GAMES.originals]"
        @open="openGame = $event"
      />

      <!-- Mini Games tab -->
      <CategoryView v-else-if="catTab === 'Mini Games'"
        title="Mini Games" icon="star"
        :games="GAMES.originals"
        @open="openGame = $event"
      />

      <!-- Slots tab -->
      <CategoryView v-else-if="catTab === 'Slots'"
        title="Slots" icon="fire"
        :games="GAMES.slots"
        @open="openGame = $event"
      />

      <!-- Live tab -->
      <CategoryView v-else-if="catTab === 'Live'"
        title="Live" icon="bolt"
        :games="GAMES.live"
        @open="openGame = $event"
      />

      <!-- Fish tab -->
      <CategoryView v-else-if="catTab === 'Fish'"
        title="Fish"
        :games="GAMES.slots"
        @open="openGame = $event"
      />

      <!-- Sports tab -->
      <Sports v-else-if="catTab === 'Sports'" />

      <!-- Promotion tab -->
      <Promotion v-else-if="catTab === 'Promotion'" />

      <!-- Fallback -->
      <div v-else style="color:var(--text-dim);padding:40px 0;text-align:center;font-family:var(--font-mono);font-size:13px">
        {{ catTab }} — coming soon
      </div>
    </template>

    <!-- 其他主頁 -->
    <div v-else style="color:var(--text);padding:40px 0;font-family:var(--font-display)">
      <h2>{{ activeCat }}</h2>
    </div>

    <!-- 頁尾 -->
    <template #footer>
      <AppFooter />
    </template>

    <!-- 手機底部導覽 -->
    <template #mobile-nav>
      <MobileNav
        :cat-tab="catTab"
        :mobile-sidebar-open="mobileSidebarOpen"
        @browse="mobileSidebarOpen = !mobileSidebarOpen"
        @close-sidebar="mobileSidebarOpen = false"
        @navigate="({ cat, tab }) => { activeCat = cat; if (tab) catTab = tab; }"
      />
    </template>
  </AppLayout>

  <!-- Modals -->
  <GameModal
    v-if="openGame"
    :game="openGame"
    @close="openGame = null"
  />
  <SignInModal
    v-if="showSignIn"
    @close="showSignIn = false"
    @login="user = $event"
  />
  <CustomerServiceModal
    v-if="showSupport"
    @close="showSupport = false"
  />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import AppLayout      from '@/layouts/AppLayout.vue';
import Sidebar        from '@/components/layout/Sidebar.vue';
import TopBar         from '@/components/layout/TopBar.vue';
import AppFooter      from '@/components/layout/AppFooter.vue';
import MobileNav      from '@/components/layout/MobileNav.vue';
import Hero           from '@/components/home/Hero.vue';
import PromoRibbon    from '@/components/home/PromoRibbon.vue';
import RewardsBanner  from '@/components/home/RewardsBanner.vue';
import Promos         from '@/components/home/Promos.vue';
import Rail           from '@/components/game/Rail.vue';
import FilteredGrid   from '@/components/game/FilteredGrid.vue';
import CategoryView   from '@/components/game/CategoryView.vue';
import Leaderboard            from '@/components/lobby/Leaderboard.vue';
import Tournaments            from '@/components/lobby/Tournaments.vue';
import Sports                 from '@/components/lobby/Sports.vue';
import Promotion              from '@/components/lobby/Promotion.vue';
import Providers              from '@/components/lobby/Providers.vue';
import GameModal              from '@/components/modal/GameModal.vue';
import SignInModal            from '@/components/modal/SignInModal.vue';
import CustomerServiceModal   from '@/components/modal/CustomerServiceModal.vue';
import AccountOverview        from '@/components/account/AccountOverview.vue';
import DepositPage            from '@/components/account/DepositPage.vue';
import WithdrawalPage         from '@/components/account/WithdrawalPage.vue';
import PersonalInfo           from '@/components/account/PersonalInfo.vue';
import SecurityCenter         from '@/components/account/SecurityCenter.vue';
import CustomerServicePage    from '@/components/account/CustomerServicePage.vue';
import RecordTable            from '@/components/account/RecordTable.vue';
import SupportPage            from '@/components/account/SupportPage.vue';
import { useTweaks }          from '@/composables/useTweaks.js';
import { GAMES, RECENTLY_PLAYED } from '@/data/index.js';

const { t } = useTweaks();

const openGame          = ref(null);
const sidebarCollapsed  = ref(false);
const mobileSidebarOpen = ref(false);
const activeCat         = ref('Lobby');
const catTab            = ref('Lobby');
const showSignIn        = ref(false);
const showSupport       = ref(false);
const balance           = ref(1284.32);
const user              = ref(null);

// showPromos 從 tweaks 驅動
const showPromos = computed(() => t.showPromos);

// 模擬餘額浮動
let balanceTimer;
onMounted(()    => { balanceTimer = setInterval(() => { balance.value = +(balance.value + (Math.random() * 4 - 1.7)).toFixed(2); }, 5500); });
onUnmounted(()  => clearInterval(balanceTimer));
</script>
