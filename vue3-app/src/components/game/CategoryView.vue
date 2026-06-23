<template>
  <section class="lobby-section" :data-screen-label="title">
    <div class="section-head">
      <h2 class="section-title">
        <Icon v-if="icon" :name="icon" :size="18" />
        {{ title }}
        <span class="count">{{ filtered.length }}</span>
      </h2>
    </div>

    <div class="cv-tabs">
      <button
        v-for="tb in tabs" :key="tb"
        class="cv-tab"
        :class="{ active: filter === tb }"
        @click="filter = tb; expanded = false"
      >
        <svg v-if="tb === 'Favorites'" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 20s-7-4.6-9.3-9C1.2 8 2.6 4.5 6 4.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.4 0 4.8 3.5 3.3 6.5C19 15.4 12 20 12 20Z"/>
        </svg>
        {{ tb }}
        <span v-if="tb === 'Favorites' && favs.size > 0" class="cv-tab-count">{{ favs.size }}</span>
      </button>
    </div>

    <div v-if="shown.length === 0" class="cv-empty">
      {{ filter === 'Favorites'
        ? 'No favorites yet — tap the ♥ on any game to save it here.'
        : 'No games to show.' }}
    </div>
    <div v-else class="grid">
      <GameCard
        v-for="g in shown" :key="g.id"
        :game="g"
        :is-fav="favs.has(g.id)"
        :show-fav="true"
        @open="emit('open', $event)"
        @fav="toggle"
      />
    </div>

    <div v-if="filtered.length > 50" class="cv-foot">
      <button class="cv-view-all" @click="expanded = !expanded">
        {{ expanded ? 'Show less ↑' : `View all (${filtered.length}) →` }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useFavorites } from '@/composables/useFavorites.js';
import Icon     from '@/components/ui/Icon.vue';
import GameCard from '@/components/game/GameCard.vue';

const props = defineProps({
  title: { type: String, required: true },
  icon:  { type: String, default: null },
  games: { type: Array,  default: () => [] },
});
const emit = defineEmits(['open']);

const { favs, toggle } = useFavorites();

const filter   = ref('All');
const expanded = ref(false);
const tabs     = ['All', 'Favorites'];

const filtered = computed(() => {
  if (filter.value === 'Favorites') return props.games.filter(g => favs.value.has(g.id));
  return props.games;
});

const shown = computed(() => expanded.value ? filtered.value : filtered.value.slice(0, 50));
</script>
