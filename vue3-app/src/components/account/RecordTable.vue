<template>
  <section class="lobby-section ap-page rec-page" :data-screen-label="title">
    <button class="ap-back" @click="emit('navigate', 'Account Overview')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6-6 6 6 6" /></svg>
      Back
    </button>
    <h1 class="ap-h1">{{ title }}</h1>

    <div class="rec-toolbar">
      <div class="rec-filters">
        <!-- Status filter -->
        <div v-if="cfg.status" class="rec-status-wrap" ref="statusWrapEl">
          <button class="rec-status-btn" @click="statusOpen = !statusOpen">
            Status : {{ statusFilter }}
          </button>
          <div v-if="statusOpen" class="rec-status-menu">
            <button v-for="s in ['All','Pending','Approved','Rejected']" :key="s"
              class="rec-status-opt" :class="{ active: statusFilter === s }"
              @click="statusFilter = s; statusOpen = false"
            >{{ s }}</button>
          </div>
        </div>

        <!-- Date range -->
        <div class="rec-date">
          <label class="rec-date-cell" @click="tryPicker($event)">
            <span class="rec-date-text" :class="{ ph: !dateFrom }">{{ fmtDate(dateFrom) }}</span>
            <svg class="rec-date-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>
            <input class="rec-date-input" type="date" v-model="dateFrom" aria-label="From date" />
          </label>
          <span class="rec-date-sep">-</span>
          <label class="rec-date-cell" @click="tryPicker($event)">
            <span class="rec-date-text" :class="{ ph: !dateTo }">{{ fmtDate(dateTo) }}</span>
            <svg class="rec-date-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>
            <input class="rec-date-input" type="date" v-model="dateTo" aria-label="To date" />
          </label>
        </div>
        <button class="rec-confirm">Confirm</button>
      </div>

      <div class="rec-actions">
        <div v-if="cfg.autoRefresh" class="rec-refresh">
          Auto refresh in <strong>{{ secs }}</strong>s
          <button class="rec-refresh-btn" aria-label="Refresh" @click="secs = 20">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="rec-table-scroll">
      <table class="rec-table">
        <thead>
          <tr><th v-for="(c, i) in cfg.cols" :key="i">{{ c }}</th></tr>
        </thead>
        <tbody>
          <tr v-if="rows.length === 0">
            <td class="rec-empty" :colspan="cfg.cols.length">No records found.</td>
          </tr>
          <tr v-for="(r, ri) in rows" :key="ri">
            <td v-for="(cell, ci) in r" :key="ci"
              :class="[
                cfg.statusCol === ci ? 'rec-status-cell' : '',
                plSet.has(ci) ? `rec-pl ${String(cell).startsWith('+') ? 'pos' : String(cell).startsWith('-') ? 'neg' : ''}` : ''
              ]"
            >
              <span v-if="cfg.statusCol === ci"
                class="rec-pill"
                :class="{ ok: cell === 'Approved', pend: cell === 'Pending', rej: cell === 'Rejected' }"
              >{{ cell }}</span>
              <template v-else>{{ cell }}</template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="cfg.total" class="rec-total">
      <span>{{ cfg.total }}</span>
      <span class="rec-total-val">{{ cfg.totalVal || '0.00' }}</span>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
});
const emit = defineEmits(['navigate']);

const CONFIGS = {
  'Betting Record': {
    status: false, autoRefresh: false, total: null,
    cols: ['Order No','Game','Settlement Time','Bet Amount','Valid Bet','Winnings','Bet P&L'],
    rows: [
      ['202508120001','Sports','2025-08-12 15:48','50,000','50,000','92,500','+42,500'],
      ['202508120002','Slots','2025-08-12 14:30','20,000','20,000','0','-20,000'],
      ['202508110007','Live Casino','2025-08-11 18:20','35,000','35,000','78,000','+43,000'],
      ['202508110003','Sports','2025-08-11 12:15','10,000','10,000','8,500','-1,500'],
    ],
    plCols: [6],
  },
  'Deposit Record': {
    status: true, autoRefresh: true, total: 'Total Deposit Amount',
    cols: ['Transaction No.','Date Time','Deposit Amount','Status','Request Amount','Bonus','Method','Bank Reference','Deposit Time','Bank Charge','Promotion','Remark'],
    rows: [
      ['DP25081201','2025-08-12 09:14','100,000','Approved','100,000','10,000','Bank','KB-8841','2025-08-12 09:18','0','100% Bonus','-'],
      ['DP25081105','2025-08-11 21:02','50,000','Approved','50,000','0','Bank','SH-2210','2025-08-11 21:05','0','-','-'],
      ['DP25081008','2025-08-10 13:48','200,000','Pending','200,000','20,000','Crypto','USDT-4f1','-','0','VIP Reload','-'],
      ['DP25080902','2025-08-09 18:33','30,000','Rejected','30,000','0','Bank','WR-0093','-','0','-','Name mismatch'],
    ],
    statusCol: 3, totalCol: 2, totalVal: '350,000',
  },
  'Profit And Loss': {
    status: false, autoRefresh: true, total: null,
    cols: ['Game Type','Total P&L','Betting','Valid Bet','Win Amount','Rebate'],
    rows: [
      ['Sports','+128,500','420,000','420,000','548,500','4,200'],
      ['Slots','-65,000','310,000','310,000','245,000','3,100'],
      ['Live Casino','+92,000','180,000','180,000','272,000','1,800'],
      ['Mini Games','-12,000','60,000','60,000','48,000','600'],
      ['Originals','+33,500','95,000','95,000','128,500','950'],
      ['Fish','0','0','0','0','0'],
    ],
    plCols: [1],
  },
  'Withdrawal Record': {
    status: true, autoRefresh: true, total: 'Total Withdrawal Amount',
    cols: ['Transaction No.','Request Time','Paid Amount','Status','Request Amount','Bank Name','Paid Date','Remark'],
    rows: [
      ['WD25081201','2025-08-12 10:20','80,000','Approved','80,000','KB Bank','2025-08-12 10:45','-'],
      ['WD25081104','2025-08-11 16:50','150,000','Approved','150,000','Shinhan','2025-08-11 17:10','-'],
      ['WD25081006','2025-08-10 11:05','40,000','Pending','40,000','Woori','-','-'],
      ['WD25080903','2025-08-09 22:14','25,000','Rejected','25,000','KB Bank','-','Rollover left'],
    ],
    statusCol: 3, totalCol: 2, totalVal: '270,000',
  },
  'Account Record': {
    status: true, autoRefresh: false, total: null,
    cols: ['Transaction Type','Time','Transaction Amount','Current Balance','Transaction No.','Content'],
    rows: [
      ['Deposit','2025-08-12 09:18','+100,000','1,284,320','DP25081201','Bank deposit approved'],
      ['Bet','2025-08-12 15:48','-50,000','1,234,320','BT25081201','Sports — Champions League'],
      ['Win','2025-08-12 15:52','+92,500','1,326,820','WN25081201','Sports settlement'],
      ['Withdrawal','2025-08-12 10:45','-80,000','1,246,820','WD25081201','Bank withdrawal paid'],
    ],
    plCols: [2],
  },
};

const cfg          = computed(() => CONFIGS[props.title] || CONFIGS['Betting Record']);
const plSet        = computed(() => new Set(cfg.value.plCols || []));
const statusFilter = ref('All');
const statusOpen   = ref(false);
const dateFrom     = ref('');
const dateTo       = ref('');
const secs         = ref(18);
const statusWrapEl = ref(null);

const rows = computed(() => {
  if (cfg.value.statusCol != null && statusFilter.value !== 'All')
    return cfg.value.rows.filter(r => r[cfg.value.statusCol] === statusFilter.value);
  return cfg.value.rows;
});

function fmtDate(v) {
  if (!v) return 'YYYY/MM/DD';
  const [y, m, d] = v.split('-');
  return `${y}/${m}/${d}`;
}

function tryPicker(e) {
  const inp = e.currentTarget.querySelector('input');
  try { inp.showPicker(); } catch { inp.focus(); }
}

let secTimer;
onMounted(() => {
  if (cfg.value.autoRefresh)
    secTimer = setInterval(() => { secs.value = secs.value <= 1 ? 20 : secs.value - 1; }, 1000);

  const onDoc = (e) => {
    if (statusWrapEl.value && !statusWrapEl.value.contains(e.target)) statusOpen.value = false;
  };
  document.addEventListener('mousedown', onDoc);
  onUnmounted(() => {
    clearInterval(secTimer);
    document.removeEventListener('mousedown', onDoc);
  });
});
</script>
