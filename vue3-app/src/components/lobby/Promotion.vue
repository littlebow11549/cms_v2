<template>
  <section class="lobby-section" data-screen-label="Promotion">
    <div class="section-head">
      <h2 class="section-title">Promotions<span class="count">{{ offers.length }}</span></h2>
      <a href="#" class="see-all">All promotions →</a>
    </div>

    <div class="promo-grid">
      <article
        v-for="(o, i) in offers" :key="i"
        class="promo-card"
        style="--promo-hue: var(--accent)"
      >
        <span class="promo-card-tag">{{ o.tag }}</span>
        <div class="promo-card-art" aria-hidden="true"></div>
        <h3 class="promo-card-title">{{ o.title }}</h3>
        <p class="promo-card-sub">{{ o.sub }}</p>
        <button class="promo-card-cta">{{ o.cta }} →</button>
      </article>
    </div>
  </section>
</template>

<script setup>
const offers = [
  { tag: 'WELCOME',  title: '100% First Deposit',  sub: 'Match up to 10,000 USDT on your first top-up.',                       cta: 'View', hue: 200 },
  { tag: 'DAILY',    title: '15% Daily Reload',     sub: 'Every day, every deposit — instant cashback to balance.',             cta: 'View', hue: 280 },
  { tag: 'REFERRAL', title: 'Refer & Earn 25%',     sub: 'Lifetime commission from every friend you bring.',                   cta: 'View', hue: 340 },
  { tag: 'VIP',      title: 'Up to 20% Cashback',   sub: 'Weekly cashback scales with your VIP tier — no max cap.',            cta: 'View', hue: 50  },
];
</script>
