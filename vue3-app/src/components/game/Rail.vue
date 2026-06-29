<template>
  <section class="lobby-section" :data-screen-label="title">
    <div class="section-head">
      <h2 class="section-title">
        <Icon v-if="icon" :name="icon" :size="18" />
        {{ title }}
        <span class="count">{{ count ?? games.length }}</span>
      </h2>
      <div class="section-actions">
        <a href="#" class="see-all">See all →</a>
        <button class="arrow" :disabled="!canL" aria-label="Scroll left" @click="scroll(-1)">
          <Icon name="arrL" />
        </button>
        <button class="arrow" :disabled="!canR" aria-label="Scroll right" @click="scroll(1)">
          <Icon name="arrR" />
        </button>
      </div>
    </div>

    <div class="rail-wrap">
      <div class="rail" ref="railEl" @scroll="update">
        <GameCard
          v-for="g in games" :key="g.id"
          :game="g"
          @open="emit('open', $event)"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Icon     from '@/components/ui/Icon.vue';
import GameCard from '@/components/game/GameCard.vue';

const props = defineProps({
  title:  { type: String,  required: true },
  games:  { type: Array,   default: () => [] },
  count:  { type: Number,  default: null },
  icon:   { type: String,  default: null },
});
const emit = defineEmits(['open']);

const railEl = ref(null);
const canL   = ref(false);
const canR   = ref(true);

function update() {
  const el = railEl.value;
  if (!el) return;
  canL.value = el.scrollLeft > 4;
  canR.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
}

function scroll(dir) {
  const el = railEl.value;
  if (!el) return;
  el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
}

onMounted(() => {
  update();
  window.addEventListener('resize', update);
});
onUnmounted(() => window.removeEventListener('resize', update));
</script>
