<template>
  <section class="lobby-section" data-screen-label="Tournaments">
    <div class="section-head">
      <h2 class="section-title">
        <span class="live-pip"></span>Live sport
      </h2>
      <a href="#" class="see-all">All tournaments →</a>
    </div>

    <div class="tourn-grid">
      <div
        v-for="(t, i) in TOURNAMENTS" :key="i"
        class="tourn"
        style="--tourn-hue: var(--accent)"
      >
        <span v-if="t.tag" class="tourn-tag" :class="{ hot: t.tag === 'ENDS SOON' }">{{ t.tag }}</span>
        <div class="tourn-prize-label">Prize pool</div>
        <div class="tourn-prize">{{ t.prize }}</div>
        <h3 class="tourn-title">{{ t.title }}</h3>
        <div class="tourn-foot">
          <div style="display:flex;gap:18px">
            <div class="tourn-meta">
              <span>Ends in</span><span>{{ t.endsIn }}</span>
            </div>
            <div class="tourn-meta">
              <span>Players</span><span>{{ t.players.toLocaleString() }}</span>
            </div>
          </div>
          <button class="btn primary">Join</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { TOURNAMENTS } from '@/data/index.js';
</script>
