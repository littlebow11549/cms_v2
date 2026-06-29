<template>
  <section class="lobby-section" data-screen-label="Providers">
    <div class="section-head">
      <h2 class="section-title">Providers<span class="count">{{ PROVIDERS.length }}</span></h2>
      <a href="#" class="see-all">All providers →</a>
    </div>
    <div class="providers">
      <a v-for="p in PROVIDERS" :key="p" href="#" class="provider">{{ p }}</a>
    </div>
  </section>
</template>

<script setup>
import { PROVIDERS } from '@/data/index.js';
</script>
