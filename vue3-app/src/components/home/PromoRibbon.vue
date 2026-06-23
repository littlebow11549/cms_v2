<template>
  <div class="promo-ribbon">
    <div class="track">
      <span v-for="(item, i) in doubled" :key="i" class="item">
        <span class="dot">✦</span>{{ item }}
      </span>
    </div>
  </div>
</template>

<script setup>
const items = [
  'Max Payout Guarantee', 'Massive Blockchain Prizes', 'Huge Rewards',
  'Largest Community',    'Fastest Transactions',      'Provably Fair',
  'Instant Crypto Payouts', '24/7 Live Support',
];
const doubled = [...items, ...items];
</script>
