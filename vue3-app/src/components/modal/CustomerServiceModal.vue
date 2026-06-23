<template>
  <div class="modal-bg" @click="emit('close')">
    <div class="modal sm cs-modal" @click.stop>
      <div class="modal-head">
        <div style="display:flex;align-items:center;gap:10px;font-family:var(--font-display);font-weight:700;font-size:17px">
          <span class="cs-modal-ico">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round">
              <path d="M4 12a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-2v-7h5M4 12v4a3 3 0 0 0 3 3h2v-7H4" />
            </svg>
          </span>
          Customer Service
        </div>
        <button class="modal-close" @click="emit('close')">
          <Icon name="close" :size="14" />
        </button>
      </div>

      <div class="modal-body">
        <div class="cs-box-title">Select a channel</div>

        <a href="#" class="cs-opt">
          <span class="cs-opt-ico">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round">
              <path d="M21 12c0 4.4-4 8-9 8a10 10 0 0 1-3.6-.7L3 21l1.4-4.5A8 8 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8Z" />
            </svg>
          </span>
          <span class="cs-opt-text">
            <strong>Live Chat Support</strong>
            <small>24/7 instant help from our team</small>
          </span>
          <span class="cs-opt-arrow">›</span>
        </a>

        <a href="#" class="cs-opt">
          <span class="cs-opt-ico">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.05 3.4 2.7 10.5c-1.1.45-1.1 1.1-.2 1.4l4.6 1.45 1.8 5.7c.2.55.4.75.8.75.4 0 .55-.18.75-.4l2.3-2.3 4.7 3.45c.85.5 1.45.25 1.65-.8L21.95 4.6c.3-1.4-.45-2-1.5-1.55Z" />
            </svg>
          </span>
          <span class="cs-opt-text">
            <strong>Telegram Channel</strong>
            <small>Promotions &amp; announcements</small>
          </span>
          <span class="cs-opt-arrow">›</span>
        </a>

        <a href="#" class="cs-opt">
          <span class="cs-opt-ico">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round">
              <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
            </svg>
          </span>
          <span class="cs-opt-text">
            <strong>Email Us</strong>
            <small>support@100.gg · reply within 24h</small>
          </span>
          <span class="cs-opt-arrow">›</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import Icon from '@/components/ui/Icon.vue';

const emit = defineEmits(['close']);

function onKey(e) { if (e.key === 'Escape') emit('close'); }
onMounted(()   => window.addEventListener('keydown', onKey));
onUnmounted(() => window.removeEventListener('keydown', onKey));
</script>
