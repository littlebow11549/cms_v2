<template>
  <section class="lobby-section ap-page" data-screen-label="Withdrawal">
    <button class="ap-back" @click="emit('navigate', 'Account Overview')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6-6 6 6 6" /></svg>
      Back
    </button>
    <h1 class="ap-h1">Withdrawal</h1>

    <div class="ap-form-card">
      <h3 class="ap-section-h"><span class="ap-mark"></span>My Bank Accounts</h3>

      <!-- Has user: show saved banks -->
      <template v-if="user">
        <div class="ap-bank-saved">
          <div class="ap-bank-saved-card">
            <div class="ap-bank-saved-top">
              <span class="ap-bank-saved-bank">{{ cur.bank }}</span>
              <div class="ap-bank-saved-nav">
                <span v-if="bankIdx === 0" class="ap-bank-saved-default">Default</span>
                <button class="ap-bank-arrow" aria-label="Previous card" @click="bankIdx = (bankIdx - 1 + banks.length) % banks.length">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6-6 6 6 6" /></svg>
                </button>
                <span class="ap-bank-count">{{ bankIdx + 1 }}/{{ banks.length }}</span>
                <button class="ap-bank-arrow" aria-label="Next card" @click="bankIdx = (bankIdx + 1) % banks.length">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 6 6 6-6 6" /></svg>
                </button>
              </div>
            </div>
            <div class="ap-bank-saved-num">{{ cur.num }}</div>
            <div class="ap-bank-saved-holder">
              <span class="muted">Account Holder</span>
              <span>{{ user.name }}</span>
            </div>
          </div>
          <button class="ap-yellow-btn ap-bank-add-sm">+ Add Account</button>
        </div>
      </template>

      <!-- No user: empty state -->
      <template v-else>
        <div class="ap-empty-bank">
          <div class="ap-empty-art" aria-hidden="true"></div>
          <div class="ap-empty-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3 3">
              <rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 11h18" />
            </svg>
          </div>
          <div class="ap-empty-text">Empty Bank Account</div>
          <button class="ap-yellow-btn">Add Account</button>
        </div>
      </template>

      <button class="ap-refresh-link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 11a8 8 0 1 1-2.34-5.66L20 8" /><path d="M20 3v5h-5" />
        </svg>
        Refresh
      </button>

      <div class="ap-wallet">
        <div class="ap-wallet-label">Main Wallet</div>
        <div class="ap-wallet-amt">₩ {{ user ? (786513).toLocaleString() : '0.00' }}</div>
        <div class="ap-wallet-rem">
          Remaining Turnover Amount:<br />
          <strong>₩16,517.41</strong>
        </div>
      </div>

      <h3 class="ap-section-h"><span class="ap-mark"></span>Withdrawal Amount &amp; Password</h3>
      <input class="ap-input" placeholder="₩ 10,000 ~ ₩ 9,000,000" v-model="amount" />
      <div class="ap-input-wrap">
        <input class="ap-input" :type="showPw ? 'text' : 'password'" placeholder="* * * * * *" v-model="pw" />
        <button class="ap-eye" aria-label="Toggle password" @click="showPw = !showPw">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>

      <div class="ap-rollover">
        <span><span class="muted">*Rollover Achieved</span><br />amount: ₩0.00</span>
        <span><span class="muted">Target amount:</span><br />₩0.00</span>
      </div>

      <button class="ap-btn-wide" disabled>Submit</button>
      <button class="ap-btn-wide outline" @click="emit('navigate', 'Account Overview')">Back</button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  user: { type: Object, default: null },
});
const emit = defineEmits(['navigate']);

const banks = [
  { bank: 'KB Bank',      num: '**** **** **** 1234' },
  { bank: 'Shinhan Bank', num: '**** **** **** 5678' },
  { bank: 'Woori Bank',   num: '**** **** **** 9012' },
];

const bankIdx = ref(0);
const amount  = ref('');
const pw      = ref('');
const showPw  = ref(false);

const cur = computed(() => banks[bankIdx.value]);
</script>
