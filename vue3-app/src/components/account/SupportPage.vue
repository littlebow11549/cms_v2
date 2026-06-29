<template>
  <section class="lobby-section ap-page sup-page" data-screen-label="About Us">
    <button class="ap-back" @click="emit('navigate', 'Lobby')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6-6 6 6 6" /></svg>
      Back
    </button>
    <h1 class="sup-h1">About Us</h1>

    <div class="sup-tabs">
      <button v-for="t in TABS" :key="t"
        class="sup-tab" :class="{ active: tab === t }"
        @click="tab = t"
      >
        {{ t }}
        <span v-if="t === 'Exclusion turnover list'" class="sup-info-i" aria-hidden="true">ⓘ</span>
      </button>
    </div>

    <!-- FAQ -->
    <template v-if="tab === 'FAQ'">
      <div v-for="(g, gi) in FAQ_GROUPS" :key="gi" class="sup-group">
        <h2 class="sup-group-title">{{ g.title }}</h2>
        <div class="sup-faq-list">
          <div v-for="(f, fi) in g.faqs" :key="fi"
            class="sup-faq" :class="{ open: openMap[`${gi}-${fi}`] }"
          >
            <button class="sup-faq-q" @click="toggle(`${gi}-${fi}`)">
              <span>{{ f.q }}</span>
              <svg class="sup-faq-caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div v-if="openMap[`${gi}-${fi}`]" class="sup-faq-a">{{ f.a }}</div>
          </div>
        </div>
      </div>
    </template>

    <!-- Exclusion turnover list -->
    <template v-else-if="tab === 'Exclusion turnover list'">
      <div class="sup-ex">
        <div class="sup-ex-filters">
          <select class="sup-ex-select" v-model="exFilter">
            <option v-for="t in exTypes" :key="t" :value="t">{{ t }}</option>
          </select>
          <div class="sup-ex-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
            <input v-model="exQuery" placeholder="Game Name" />
          </div>
        </div>
        <div v-for="(e, i) in exList" :key="i" class="sup-panel">
          <div class="sup-panel-h">{{ e.name }}</div>
          <div class="sup-panel-body">
            <ul class="sup-ul">
              <li>Game type: {{ e.type }}</li>
              <li>Game Vendor: {{ e.vendor }}</li>
              <li>Exclusion Percentage: {{ e.pct }}</li>
            </ul>
          </div>
        </div>
      </div>
    </template>

    <!-- Content panels -->
    <template v-else-if="SUP_CONTENT[tab]">
      <div v-for="(block, bi) in SUP_CONTENT[tab]" :key="bi" class="sup-panel">
        <div class="sup-panel-h">{{ block.panel }}</div>
        <div v-if="block.body.length" class="sup-panel-body">
          <template v-for="(blk, j) in block.body" :key="j">
            <p v-if="blk.p" class="sup-p">{{ blk.p }}</p>
            <ul v-else-if="blk.ul" class="sup-ul"><li v-for="(li, k) in blk.ul" :key="k">{{ li }}</li></ul>
            <ol v-else-if="blk.ol" class="sup-ol"><li v-for="(li, k) in blk.ol" :key="k">{{ li }}</li></ol>
          </template>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';

const emit = defineEmits(['navigate']);

const TABS = ['Support','Notice','About','Privacy','Info','Addiction','Rules','Exclusion turnover list','FAQ'];

const SUP_CONTENT = {
  Support: [{ panel: 'Please contact our Customer Center.', body: [] }],
  Notice: [
    { panel: 'Urgent Notice — 100% Official Telegram Change.', body: [
      { p: 'Impersonators pretending to be 100% are increasing.\n100% provides guidance through only one official Telegram. If there is any problem with the existing Telegram, we will only provide guidance through this channel or live chat.' },
      { p: '100% Official Telegram notice room: https://t.me/100kor' },
      { p: 'If you cannot reach us through the existing Telegram, please verify through live chat that it is not an impersonator before proceeding with your inquiry.' },
    ]},
    { panel: 'How to inquire about deposit accounts', body: [
      { p: 'For deposit account inquiries, please contact us via live chat or the Customer Center Telegram after signing up.' },
    ]},
  ],
  About: [{ panel: 'About 100%', body: [
    { p: '100% is legally registered as a sportsbook, online betting, and casino operator, and holds a license issued by the relevant authorities.' },
    { p: '100% provides the best products and services to users around the world and has established itself as one of the most popular sites.' },
  ]}],
  Privacy: [
    { panel: 'Privacy Policy', body: [
      { p: 'This policy describes how the information and data you provide to 100% are used between 100% and the customer.' },
      { p: 'By submitting your information and using the site, you consent to the use of your information in accordance with this Privacy Policy.' },
    ]},
    { panel: 'Information Collection & Use', body: [
      { p: 'We collect, use, and dispose of information and data about you, including the following:' },
      { ol: ['All information you create and submit by email or on the website;','Transaction history related to the website;','Details of your site visits, such as traffic data and location data.'] },
    ]},
  ],
  Info: [{ panel: 'Additional Notes', body: [
    { p: '100% is not responsible for the content or accuracy of internal or external websites.\nAll information provided by the company is based on fact. The company reserves the right to correct obvious errors.' },
  ]}],
  Addiction: [
    { panel: 'Preventing Gaming Addiction', body: [
      { p: '100% encourages members to enjoy gaming while also preventing gaming addiction.' },
      { ul: ['Self-assessment','Betting management','Deposit limit management','Child protection','Help & suggestions'] },
    ]},
    { panel: 'Deposit Limit Management', body: [
      { p: 'If you wish to change or lower your deposit limit, please contact a customer agent via live chat.' },
    ]},
    { panel: 'Help & Suggestions', body: [
      { p: 'GamCare — 0808 8020 133 (free call in the UK) or www.gamcare.org.uk' },
      { p: 'GambleAware — www.gambleaware.org' },
      { p: 'Gamblers Anonymous — www.gamblersanonymous.org' },
    ]},
  ],
  Rules: [
    { panel: 'Rules & Regulations', body: [
      { p: 'We at 100% strictly penalize members who sign up with the intent to use the site through abnormal methods. If a member is deemed to be in violation of the stated rules, 100% has the right to confiscate the member\'s account without prior warning.' },
    ]},
    { panel: 'Deposit & Withdrawal', body: [
      { ul: [
        'If you deposit to the wrong account without confirming beforehand, 100% accepts no responsibility for that amount.',
        'Deposit and withdrawal requests can only be made with account information registered under your own name.',
        'To prevent illegal money laundering and financial fraud, the full deposit amount must be wagered before withdrawal is possible.',
      ]},
    ]},
  ],
};

const EXCLUSION = [
  { name: 'Sicbo',                    type: 'Slot', vendor: 'AG',  pct: '100%' },
  { name: 'Ema Black Jack D21',        type: 'Live', vendor: 'AG',  pct: '100%' },
  { name: '1000 Diamond Bet Roulette', type: 'Slot', vendor: 'PT',  pct: '100%' },
  { name: 'Lightning Roulette',        type: 'Live', vendor: 'EVO', pct: '100%' },
  { name: 'Crazy Time',                type: 'Live', vendor: 'EVO', pct: '100%' },
  { name: 'Sweet Bonanza',             type: 'Slot', vendor: 'PP',  pct: '50%'  },
];

const FAQ_GROUPS = [
  { title: 'General Information', faqs: [
    { q: 'About 100%',                     a: '100% is an overseas betting site that provides trusted and verified games. From sports, slot games, live casinos to mini games.', open: true },
    { q: 'Are the games provided on the site fair?', a: '100% is a legally registered company, and game results are absolutely fair, just, and based on facts.', open: true },
    { q: 'Is my personal information safe?', a: 'All personal data is encrypted in transit and at rest. We never share your information with third parties without consent.' },
  ]},
  { title: 'Account Management', faqs: [
    { q: 'How do I change my password?',    a: 'Go to Security Center from your account menu, enter your current password and your new password twice, then confirm.' },
    { q: 'I lost my password, how can I get it reissued?', a: 'Click "Forgot?" on the login window, enter your username and registered email, and we will send password reset instructions.' },
  ]},
];

const tab      = ref('FAQ');
const exFilter = ref('All');
const exQuery  = ref('');

const openMap = reactive((() => {
  const m = {};
  FAQ_GROUPS.forEach((g, gi) => g.faqs.forEach((f, fi) => { m[`${gi}-${fi}`] = !!f.open; }));
  return m;
})());

function toggle(k) { openMap[k] = !openMap[k]; }

const exTypes = computed(() => ['All', ...new Set(EXCLUSION.map(e => e.type))]);
const exList  = computed(() =>
  EXCLUSION.filter(e =>
    (exFilter.value === 'All' || e.type === exFilter.value) &&
    e.name.toLowerCase().includes(exQuery.value.toLowerCase())
  )
);
</script>
