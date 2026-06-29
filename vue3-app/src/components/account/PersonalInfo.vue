<template>
  <section class="lobby-section ap-page" data-screen-label="Personal Info">
    <button class="ap-back" @click="emit('navigate', 'Account Overview')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6-6 6 6 6" /></svg>
      Back
    </button>
    <h1 class="ap-h1">Personal Info</h1>

    <div class="ap-form-card pi-card">
      <div class="pi-username">Username : {{ (user?.name || 'player').toUpperCase() }}</div>

      <div class="pi-field">
        <span class="pi-ico">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></svg>
        </span>
        <input v-model="nick" placeholder="Please enter your nickname" />
      </div>

      <div class="pi-field">
        <span class="pi-ico">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
        </span>
        <input class="pi-date" type="date" v-model="dob" lang="en-US" />
      </div>

      <div class="pi-field locked">
        <span class="pi-ico">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
        </span>
        <span class="pi-val">xxxxxxx</span>
      </div>

      <div class="pi-field locked">
        <span class="pi-ico">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M5 16a3 3 0 0 1 6 0M14 9h4M14 13h3" /></svg>
        </span>
        <span class="pi-val">s**</span>
      </div>

      <div class="pi-phone-row">
        <div class="pi-field locked pi-cc">
          <span class="pi-ico">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
          </span>
          <span class="pi-val">+82</span>
        </div>
        <div class="pi-field locked">
          <span class="pi-ico">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
          </span>
          <span class="pi-val">123*********</span>
        </div>
      </div>

      <div class="pi-privacy-pill">We care about your privacy</div>
      <p class="pi-note">
        All the user data are encrypted to ensure your personal privacy is protected.<br />
        For updates to your personal info, please contact support.
      </p>

      <button class="ap-btn-wide ap-grad" @click="done = true">Submit</button>
      <button class="ap-btn-wide outline" @click="emit('navigate', 'Account Overview')">Back</button>
    </div>

    <!-- Success dialog -->
    <div v-if="done" class="modal-bg" @click="done = false">
      <div class="pi-success" @click.stop>
        <div class="pi-success-check">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12l5 5 9-10" />
          </svg>
        </div>
        <div class="pi-success-title">Success!</div>
        <div class="pi-success-sub">Profile updated successfully.</div>
        <button class="ap-btn-wide ap-grad" @click="done = false">Got It</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  user: { type: Object, default: null },
});
const emit = defineEmits(['navigate']);

const nick = ref('');
const dob  = ref('2008-03-03');
const done = ref(false);
</script>
