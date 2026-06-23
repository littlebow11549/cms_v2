<template>
  <section class="lobby-section" data-screen-label="Leaderboard">
    <div class="section-head">
      <h2 class="section-title">
        <Icon name="bolt" :size="18" />Top wins · last hour
      </h2>
      <div class="section-actions">
        <a href="#" class="see-all">All winners →</a>
      </div>
    </div>

    <div class="leaderboard-wrap">
      <div class="leaderboard">
        <div class="lb-head">
          <span>#</span><span>Player</span><span>Game</span>
          <span>Bet</span><span>Mult</span><span style="text-align:right">Payout</span>
        </div>
        <div
          v-for="(r, i) in rows" :key="r.id"
          class="lb-row"
          :class="{ fresh: r.id === freshId }"
        >
          <span class="lb-rank" :class="{ top: i < 3 }">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="lb-user">
            <div class="lb-avatar"
              :style="{ '--avatar-bg': `linear-gradient(135deg, oklch(0.55 0.2 ${r.hue}), oklch(0.4 0.18 ${(r.hue + 80) % 360}))` }"
            />
            {{ r.user }}
          </div>
          <span class="lb-game">{{ r.game }}</span>
          <span class="lb-num">{{ r.bet }}</span>
          <span class="lb-num">{{ r.mult }}×</span>
          <span class="lb-payout">+{{ Number(r.payout).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
        </div>
      </div>

      <div style="background:var(--bg-card);border:1px solid var(--line);border-radius:var(--radius-lg);padding:22px;display:flex;flex-direction:column;gap:12px">
        <div style="font-family:var(--font-mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-dim)">Your rank</div>
        <div style="font-family:var(--font-display);font-size:42px;font-weight:700;line-height:1">#1,284</div>
        <div style="color:var(--text-mid);font-size:13px">Wager $50 more this hour to climb into the top 1,000.</div>
        <div style="height:6px;background:var(--bg-elev);border-radius:999px;margin-top:6px;overflow:hidden">
          <div style="height:100%;width:64%;background:linear-gradient(90deg,var(--accent),var(--accent-2))" />
        </div>
        <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:11px;color:var(--text-dim)">
          <span>Wagered $128.40</span><span>$200 needed</span>
        </div>
        <button class="btn primary" style="margin-top:auto;padding:11px">Wager more →</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Icon from '@/components/ui/Icon.vue';
import { WINNERS } from '@/data/index.js';

const rows    = ref(WINNERS.slice(0, 10));
const freshId = ref(null);
let timer;

onMounted(() => {
  timer = setInterval(() => {
    const pick  = WINNERS[Math.floor(Math.random() * WINNERS.length)];
    const noise = Math.random() * 80 + 5;
    const mult  = Math.random() * 50 + 1.5;
    const newRow = {
      ...pick,
      id:     'r' + Date.now(),
      bet:    noise.toFixed(2),
      mult:   mult.toFixed(2),
      payout: (noise * mult).toFixed(2),
    };
    freshId.value = newRow.id;
    rows.value = [newRow, ...rows.value.slice(0, 9)];
  }, 2800);
});
onUnmounted(() => clearInterval(timer));
</script>
