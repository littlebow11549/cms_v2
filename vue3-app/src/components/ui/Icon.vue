<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24">
    <path v-if="name === 'search'" d="M11 19a8 8 0 1 1 5.3-14 8 8 0 0 1-5.3 14Zm10 2-4.3-4.3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path v-else-if="name === 'bell'" d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8m4 12a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    <path v-else-if="name === 'chat'" d="M21 12c0 4.4-4 8-9 8a10 10 0 0 1-3.6-.7L3 21l1.4-4.5A8 8 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8Z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round" />
    <path v-else-if="name === 'arrL'" d="m14 6-6 6 6 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    <path v-else-if="name === 'arrR'" d="m10 6 6 6-6 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    <path v-else-if="name === 'play'" d="M7 4v16l13-8L7 4Z" fill="currentColor" />
    <path v-else-if="name === 'close'" d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    <path v-else-if="name === 'star'" d="m12 3 2.6 6 6.4.6-4.8 4.4 1.4 6.4L12 17l-5.6 3.4 1.4-6.4L3 9.6l6.4-.6L12 3Z" fill="currentColor" />
    <path v-else-if="name === 'fire'" d="M12 2c1 4 5 5 5 10a5 5 0 1 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9Z" fill="currentColor" />
    <path v-else-if="name === 'bolt'" d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" fill="currentColor" />
    <path v-else-if="name === 'chevD'" d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 16 },
});
</script>
