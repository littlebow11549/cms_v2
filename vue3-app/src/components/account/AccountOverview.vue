<template>
  <section class="lobby-section ap-page" data-screen-label="Account Overview">
    <h1 class="ap-h1">Account Overview</h1>

    <!-- Hero -->
    <div class="ap-hero">
      <div class="ap-hero-bg" aria-hidden="true"></div>
      <div class="ap-hero-avatar">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
          <circle cx="12" cy="9" r="3.5" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      </div>
      <div class="ap-hero-info">
        <div class="ap-hero-name">
          <span>{{ user?.name || 'beaucat' }}</span>
          <span class="ap-tag-new">신규(New)</span>
        </div>
        <div class="ap-hero-nick">
          <span class="muted">Nickname：</span>
          <span>Meow</span>
          <button class="ap-pencil" aria-label="Edit nickname">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
              <path d="m4 20 4-1 11-11-3-3L5 16l-1 4Z" />
            </svg>
          </button>
        </div>
        <div class="ap-hero-balance">
          <span>₩{{ Math.round(balance * 778000).toLocaleString() }}</span>
          <button class="ap-refresh" :class="{ spinning: spin }" aria-label="Refresh balance"
            @click="spin = true; setTimeout(() => spin = false, 700)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round">
              <path d="M20 11a8 8 0 1 1-2.34-5.66L20 8" /><path d="M20 3v5h-5" />
            </svg>
          </button>
        </div>
      </div>
      <div class="ap-hero-rollover">
        <div class="ap-rollover-title">Rollover</div>
        <div class="ap-rollover-label">Remaining Turnover Amount:</div>
        <div class="ap-rollover-amt">₩16,517.41</div>
      </div>
    </div>

    <!-- Quick actions + Banking -->
    <div class="ap-grid">
      <div class="ap-panel">
        <h3 class="ap-panel-h">Quick Actions</h3>
        <button class="ap-btn primary" @click="emit('navigate', 'DepositForm')">Deposit</button>
        <button class="ap-btn" @click="emit('navigate', 'WithdrawalForm')">Withdraw</button>
      </div>

      <div class="ap-panel">
        <div class="ap-bank-head">
          <h3 class="ap-panel-h">Banking Details</h3>
          <div v-if="banks.length > 1" class="ap-bank-nav">
            <button class="ap-bank-arrow" aria-label="Previous account" @click="prevBank">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6-6 6 6 6" /></svg>
            </button>
            <span class="ap-bank-count">{{ safeIdx + 1 }}/{{ banks.length }}</span>
            <button class="ap-bank-arrow" aria-label="Next account" @click="nextBank">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 6 6 6-6 6" /></svg>
            </button>
          </div>
        </div>

        <template v-if="cur">
          <div class="ap-bank-row">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" />
            </svg>
            <span class="ap-bank-num">{{ cur.num }}</span>
          </div>
          <div class="ap-bank-row">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
              <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />
            </svg>
            <span>{{ cur.bank }}</span>
            <button class="ap-bank-del" aria-label="Delete account" @click="confirmDel = true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
                <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13M10 11v6M14 11v6" />
              </svg>
            </button>
          </div>
        </template>
        <div v-else class="ap-bank-empty">No bank accounts yet.</div>

        <a href="#" class="ap-add-bank">+ Add New Bank Account</a>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="ap-panel ap-tx-panel">
      <div class="ap-tx-head">
        <h3 class="ap-panel-h">Recent Transactions</h3>
        <a href="#" class="ap-view-more">View More Records →</a>
      </div>
      <div class="ap-tx-table">
        <div class="ap-tx-row ap-tx-headrow">
          <span>Type</span><span>Amount</span><span>Date</span><span>Time</span><span>Status</span>
        </div>
        <div v-for="(tx, i) in txs" :key="i" class="ap-tx-row">
          <span>{{ tx.type }}</span>
          <span class="ap-amt" :class="tx.dir">{{ tx.amount }}</span>
          <span class="muted">{{ tx.date }}</span>
          <span class="muted">{{ tx.time }}</span>
          <span><span class="ap-status">{{ tx.status }}</span></span>
        </div>
      </div>
    </div>

    <!-- Delete confirm dialog -->
    <div v-if="confirmDel" class="modal-bg" @click="confirmDel = false">
      <div class="confirm-dialog" @click.stop>
        <div class="confirm-ico">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
          </svg>
        </div>
        <div class="confirm-title">Delete Account?</div>
        <div class="confirm-sub">
          Are you sure you want to remove <strong>{{ cur?.bank }}</strong>? This action cannot be undone.
        </div>
        <div class="confirm-actions">
          <button class="ap-btn-wide outline" @click="confirmDel = false">Cancel</button>
          <button class="ap-btn-wide confirm-del-btn" @click="removeBank">Delete</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  user:    { type: Object, default: null },
  balance: { type: Number, default: 0 },
});
const emit = defineEmits(['navigate']);

const spin       = ref(false);
const confirmDel = ref(false);
const bankIdx    = ref(0);

const banks = ref([
  { bank: 'KB Bank',      num: '**** **** **** 1234' },
  { bank: 'Shinhan Bank', num: '**** **** **** 5678' },
  { bank: 'Woori Bank',   num: '**** **** **** 9012' },
]);

const txs = [
  { type: 'SABA Bet Started', amount: '+₩ 1,000', dir: 'pos', date: '2025-08-12', time: '15:48', status: 'Approved' },
  { type: 'SABA Bet Started', amount: '-₩ 500',   dir: 'neg', date: '2025-08-12', time: '14:30', status: 'Approved' },
  { type: 'SABA Bet Started', amount: '+₩ 2,500', dir: 'pos', date: '2025-08-11', time: '18:20', status: 'Approved' },
  { type: 'SABA Bet Started', amount: '-₩ 1,000', dir: 'neg', date: '2025-08-11', time: '12:15', status: 'Approved' },
  { type: 'SABA Bet Started', amount: '+₩ 750',   dir: 'pos', date: '2025-08-10', time: '16:45', status: 'Approved' },
];

const safeIdx = computed(() => Math.min(bankIdx.value, Math.max(0, banks.value.length - 1)));
const cur     = computed(() => banks.value[safeIdx.value]);

function prevBank() { bankIdx.value = (bankIdx.value - 1 + banks.value.length) % banks.value.length; }
function nextBank() { bankIdx.value = (bankIdx.value + 1) % banks.value.length; }

function removeBank() {
  banks.value = banks.value.filter((_, i) => i !== safeIdx.value);
  bankIdx.value = Math.max(0, bankIdx.value - 1);
  confirmDel.value = false;
}
</script>
