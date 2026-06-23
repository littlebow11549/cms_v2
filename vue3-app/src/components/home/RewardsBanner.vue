<template>
  <div class="rewards-wrap">
    <div class="rewards-banner">

      <!-- 左：頭像 + 用戶名 -->
      <div class="rb-brand">
        <div class="rb-avatar-wrap">
          <span class="tb-avatar circle rb-big-avatar">{{ initials || 'PL' }}</span>
          <span class="tb-tier-badge rb-big-tier" aria-hidden="true">
            <svg width="14" height="15" viewBox="0 0 12 14" fill="currentColor">
              <path d="M6 0 0 3.5v7L6 14l6-3.5v-7L6 0Z" />
            </svg>
          </span>
        </div>
        <div class="rb-brand-text">
          <div class="rb-username">{{ user?.name || 'player' }}</div>
          <div class="rb-day">Rewards · Day 27, 03:26 UTC</div>
        </div>
      </div>

      <!-- 中：進度條 -->
      <div class="rb-user">
        <div class="rb-progress-track">
          <div class="rb-progress-fill" :style="{ width: pct + '%' }"></div>
        </div>
        <div class="rb-progress-meta">
          <span>Current: <strong>Unranked</strong> <span class="rb-tier-dot u"></span></span>
          <span class="rb-progress-count">{{ wagered.toLocaleString() }} / {{ goal / 1000 }}K</span>
          <span style="text-align:right">Next: <strong class="next">Bronze</strong> <span class="rb-tier-dot b"></span></span>
        </div>
      </div>

      <!-- 右：計時器（隱藏，保留結構） -->
      <div class="rb-timer" style="display:none">
        <div class="rb-timer-label">Rewards</div>
        <div class="rb-timer-val">
          Next in {{ pad(count.h) }}h : {{ pad(count.m) }}m : {{ pad(count.s) }}s
        </div>
        <button class="rb-lock" aria-label="Locked">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  user: { type: Object, default: null },
});

const wagered = 6200;
const goal    = 10000;
const pct     = Math.min(100, Math.round(wagered / goal * 100));

const count = reactive({ h: 20, m: 33, s: 6 });
let timer;

function tick() {
  count.s -= 1;
  if (count.s < 0) { count.s = 59; count.m -= 1; }
  if (count.m < 0) { count.m = 59; count.h -= 1; }
  if (count.h < 0) { count.h = 23; }
}
function pad(n) { return String(n).padStart(2, '0'); }

const initials = computed(() => props.user ? props.user.name.slice(0, 2).toUpperCase() : '');

onMounted(()   => { timer = setInterval(tick, 1000); });
onUnmounted(() => clearInterval(timer));
</script>
