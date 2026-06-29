<template>
  <div v-if="game" class="modal-bg" @click="emit('close')">
    <div class="modal" @click.stop>
      <div class="modal-head">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="font-family:var(--font-display);font-weight:700;font-size:17px">{{ game.title }}</div>
          <span class="gcard-provider" style="font-size:12px">{{ game.provider }}</span>
        </div>
        <button class="modal-close" @click="emit('close')">
          <Icon name="close" :size="14" />
        </button>
      </div>

      <div class="modal-body">
        <div class="game-modal-art" :style="{ '--gm-bg': game.bg }">
          [ {{ game.title.toUpperCase() }} GAMEPLAY PREVIEW ]
        </div>
        <div style="color:var(--text-mid);font-size:13.5px;line-height:1.6">
          {{ game.title }} is a {{ game.category }} game from {{ game.provider }}.
          Spin volatile reels, stack multipliers, and bank wins instantly to your crypto balance.
          Provably fair on every round.
        </div>
        <div class="game-modal-stats">
          <div class="game-modal-stat">
            <div class="game-modal-stat-label">RTP</div>
            <div class="game-modal-stat-val">{{ game.rtp }}%</div>
          </div>
          <div class="game-modal-stat">
            <div class="game-modal-stat-label">Max win</div>
            <div class="game-modal-stat-val">{{ game.maxWin }}</div>
          </div>
          <div class="game-modal-stat">
            <div class="game-modal-stat-label">Volatility</div>
            <div class="game-modal-stat-val">High</div>
          </div>
        </div>
      </div>

      <div class="modal-foot">
        <button class="btn">Demo</button>
        <button class="btn primary">Play for real →</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import Icon from '@/components/ui/Icon.vue';

const props = defineProps({
  game: { type: Object, default: null },
});
const emit = defineEmits(['close']);

function onKey(e) { if (e.key === 'Escape') emit('close'); }
onMounted(()   => window.addEventListener('keydown', onKey));
onUnmounted(() => window.removeEventListener('keydown', onKey));
</script>
