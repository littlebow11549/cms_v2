<script setup lang="ts">
import { useCatalogStore } from '~/stores/catalog';

const catalog = useCatalogStore();
</script>

<template>
  <nav class="bg-[#0f1419] border-b border-gray-800">
    <div class="container mx-auto px-4 flex gap-1 overflow-x-auto">
      <button
        v-for="c in catalog.categories"
        :key="c.key"
        class="px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2"
        :class="catalog.active === c.key ? 'text-[#98E7D2] border-[#98E7D2]' : 'text-gray-400 border-transparent hover:text-white'"
        @click="catalog.setActive(c.key)"
      >
        {{ c.label }}
      </button>
    </div>
  </nav>
</template>
