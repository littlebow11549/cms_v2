<script setup lang="ts">
import { useUiStore } from '~/stores/ui';

const ui = useUiStore();
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-white p-8">
    <h1 class="text-2xl font-bold mb-4">WIN100% — Nuxt 4 + PrimeVue v4 + Tailwind + Pinia</h1>
    <p class="text-slate-400 mb-4">Pinia count: {{ ui.count }}</p>
    <Button label="PrimeVue Button" @click="ui.inc" />
  </div>
</template>
