<script setup lang="ts">
import { useMemberStore } from '~/stores/member';

const member = useMemberStore();
</script>

<template>
  <aside class="w-60 shrink-0 bg-[#1a2128] border border-gray-800 rounded-lg p-2 self-start">
    <button
      v-for="m in member.menu"
      :key="m.key"
      class="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1"
      :class="member.active === m.key
        ? 'bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 font-semibold'
        : 'text-gray-300 hover:bg-[#0f1419] hover:text-white'"
      @click="member.setActive(m.key)"
    >
      {{ m.label }}
    </button>
  </aside>
</template>
