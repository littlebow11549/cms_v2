<template>
  <div class="hero" @touchstart="onTouchStart" @touchend="onTouchEnd">

    <div
      v-for="(s, i) in HERO_SLIDES" :key="i"
      class="hero-slide"
      :class="{ active: i === idx }"
      :style="{
        '--hero-hue':   `oklch(0.5 0.2 ${s.hue})`,
        '--hero-hue-2': `oklch(0.55 0.2 ${(s.hue + 60) % 360})`
      }"
    >
      <div class="hero-bg" />
      <div class="hero-content">
        <div>
          <h1 class="hero-title">{{ s.title }}</h1>
          <p  class="hero-sub">{{ s.sub }}</p>
        </div>
      </div>
      <div class="hero-side">[ FEATURE ARTWORK ]</div>
    </div>

    <!-- 指示點 -->
    <div class="hero-dots">
      <button
        v-for="(_, i) in HERO_SLIDES" :key="i"
        class="hero-dot"
        :class="{ active: i === idx }"
        :aria-label="`Slide ${i + 1}`"
        @click="goTo(i)"
      />
    </div>

    <!-- 左右箭頭 -->
    <div class="hero-controls">
      <button class="icon-btn" aria-label="Previous" @click="prev">
        <Icon name="arrL" />
      </button>
      <button class="icon-btn" aria-label="Next" @click="next">
        <Icon name="arrR" />
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Icon          from '@/components/ui/Icon.vue';
import { HERO_SLIDES } from '@/data/index.js';

const idx         = ref(0);
const touchStartX = ref(null);
const autoTimer   = ref(null);
const len         = HERO_SLIDES.length;

function resetAuto() {
  clearInterval(autoTimer.value);
  autoTimer.value = setInterval(() => { idx.value = (idx.value + 1) % len; }, 6500);
}

function next()      { idx.value = (idx.value + 1)           % len; resetAuto(); }
function prev()      { idx.value = (idx.value - 1 + len)     % len; resetAuto(); }
function goTo(i)     { idx.value = i;                                resetAuto(); }

function onTouchStart(e) { touchStartX.value = e.touches[0].clientX; }
function onTouchEnd(e)   {
  if (touchStartX.value === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX.value;
  if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  touchStartX.value = null;
}

onMounted(()   => resetAuto());
onUnmounted(() => clearInterval(autoTimer.value));
</script>
