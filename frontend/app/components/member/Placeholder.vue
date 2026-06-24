<script setup lang="ts">
import { useMemberStore } from '~/stores/member';

const member = useMemberStore();
</script>

<template>
  <div class="bg-[#1a2128] border border-gray-800 rounded-lg p-6">
    <h2 class="text-white text-xl font-bold mb-2">{{ member.activeLabel }}</h2>
    <p class="text-gray-400">This section is under construction.</p>
  </div>
</template>
