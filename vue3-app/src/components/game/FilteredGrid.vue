<template>
  <section class="lobby-section" data-screen-label="Browse all">
    <div class="section-head">
      <h2 class="section-title">
        Browse all
        <span class="count">{{ filtered.length }} of {{ all.length }}</span>
      </h2>
    </div>

    <div class="filter-bar">
      <div class="search">
        <Icon name="search" :size="15" />
        <input v-model="q" placeholder="Search games or providers" />
        <kbd>⌘K</kbd>
      </div>
      <div class="chips">
        <button
          v-for="c in cats" :key="c"
          class="chip"
          :class="{ active: cat === c }"
          @click="cat = c"
        >{{ c }}</button>
      </div>
      <div class="sort">
        <span>Sort</span>
        <select v-model="sort">
          <option value="popular">Popular</option>
          <option value="new">New</option>
          <option value="rtp">High RTP</option>
          <option value="az">A → Z</option>
        </select>
      </div>
    </div>

    <div v-if="filtered.length === 0"
      style="padding:40px 0;text-align:center;color:var(--text-dim);font-family:var(--font-mono);font-size:13px"
    >
      No games match "{{ q }}" — try another search.
    </div>
    <div v-else class="grid">
      <GameCard
        v-for="g in filtered" :key="g.id"
        :game="g"
        @open="emit('open', $event)"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { PROVIDERS, GAMES } from '@/data/index.js';
import Icon     from '@/components/ui/Icon.vue';
import GameCard from '@/components/game/GameCard.vue';

const emit = defineEmits(['open']);

const cat  = ref('All');
const q    = ref('');
const sort = ref('popular');

const cats = ['All', ...PROVIDERS];

const all = computed(() => [
  ...GAMES.slots,
  ...GAMES.live,
  ...GAMES.originals,
]);

const filtered = computed(() => {
  let xs = all.value;
  if (cat.value !== 'All') xs = xs.filter(g => g.provider === cat.value);
  if (q.value.trim()) {
    const s = q.value.toLowerCase();
    xs = xs.filter(g => g.title.toLowerCase().includes(s) || g.provider.toLowerCase().includes(s));
  }
  if (sort.value === 'rtp')  xs = [...xs].sort((a, b) => +b.rtp - +a.rtp);
  if (sort.value === 'new')  xs = [...xs].slice().reverse();
  if (sort.value === 'az')   xs = [...xs].sort((a, b) => a.title.localeCompare(b.title));
  return xs.slice(0, 24);
});
</script>
