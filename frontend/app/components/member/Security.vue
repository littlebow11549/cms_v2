<script setup lang="ts">
const items = [
  { label: 'Login Password', desc: 'Recommended letter and number combination', status: 'Set' },
  { label: 'Transaction Password', desc: 'Improve the security of fund operations', status: 'Not set' },
  { label: 'Banking Details', desc: 'Bind your withdrawal bank account', status: 'Not set' },
  { label: 'Two-Factor Auth', desc: 'Extra protection on login', status: 'Not set' },
];
</script>

<template>
  <div class="bg-[#1a2128] border border-gray-800 rounded-lg p-6">
    <h2 class="text-white text-xl font-bold mb-4">Security Center</h2>
    <div class="divide-y divide-gray-800">
      <div v-for="it in items" :key="it.label" class="flex items-center justify-between py-4 gap-4">
        <div class="min-w-0">
          <p class="text-white text-sm font-semibold">{{ it.label }}</p>
          <p class="text-gray-500 text-xs">{{ it.desc }}</p>
        </div>
        <span class="text-sm whitespace-nowrap flex-shrink-0" :class="it.status === 'Set' ? 'text-[#98E7D2]' : 'text-gray-500'">
          {{ it.status }} ›
        </span>
      </div>
    </div>
  </div>
</template>
