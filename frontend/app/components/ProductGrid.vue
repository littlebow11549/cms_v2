<script setup lang="ts">
import { useCatalogStore } from '~/stores/catalog';

const catalog = useCatalogStore();
</script>

<template>
  <section class="container mx-auto px-4 py-8">
    <h2 class="text-white text-xl font-bold mb-4">{{ catalog.activeCategory.label }}</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="p in catalog.activeCategory.products"
        :key="p.id"
        class="rounded-lg overflow-hidden border border-gray-800 bg-[#1a2128] hover:border-[#98E7D2] transition-colors cursor-pointer"
      >
        <div class="aspect-[4/3]" :style="{ background: `linear-gradient(135deg, ${p.accent}33, #0f1419)` }" />
        <div class="p-2">
          <p class="text-white text-sm truncate">{{ p.name }}</p>
          <p class="text-gray-500 text-xs">{{ p.provider }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
