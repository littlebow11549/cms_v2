<template>
  <section class="lobby-section ap-page" data-screen-label="Customer Service">
    <button class="ap-back" @click="emit('navigate', 'Account Overview')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6-6 6 6 6" /></svg>
      Back
    </button>
    <h1 class="ap-h1">Customer Service</h1>

    <div class="cs-box">
      <div class="cs-box-title">Select Customer Service</div>
      <a href="#" class="cs-opt">
        <span class="cs-opt-ico">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round">
            <path d="M4 12a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-2v-7h5M4 12v4a3 3 0 0 0 3 3h2v-7H4" />
          </svg>
        </span>
        Live Chat Customer Service Center
      </a>
      <a href="#" class="cs-opt">
        <span class="cs-opt-ico">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.05 3.4 2.7 10.5c-1.1.45-1.1 1.1-.2 1.4l4.6 1.45 1.8 5.7c.2.55.4.75.8.75.4 0 .55-.18.75-.4l2.3-2.3 4.7 3.45c.85.5 1.45.25 1.65-.8L21.95 4.6c.3-1.4-.45-2-1.5-1.55Z" />
          </svg>
        </span>
        Promotion Announcement Room
      </a>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(['navigate']);
</script>
