<template>
  <section class="lobby-section" data-screen-label="Sports">
    <div class="section-head">
      <h2 class="section-title">Sportsbook<span class="count">{{ matches.length }}</span></h2>
      <a href="#" class="see-all">All matches →</a>
    </div>

    <div class="cv-tabs">
      <button
        v-for="tb in tabs" :key="tb"
        class="cv-tab"
        :class="{ active: filter === tb }"
        @click="filter = tb"
      >{{ tb }}</button>
    </div>

    <div class="sports-grid">
      <article
        v-for="(m, i) in matches" :key="i"
        class="sport-card"
        :class="{ live: m.live }"
      >
        <div class="sport-head">
          <span class="sport-league">{{ m.league }}</span>
          <span v-if="m.live" class="sport-live"><span class="dot"></span>LIVE {{ m.min }}</span>
          <span v-else class="sport-time">{{ m.start }}</span>
        </div>

        <div class="sport-teams">
          <div class="sport-team">
            <div class="sport-team-logo" style="--logo-hue:200">{{ m.home.slice(0, 2).toUpperCase() }}</div>
            <span>{{ m.home }}</span>
          </div>
          <div v-if="m.live" class="sport-score">{{ m.score }}</div>
          <div class="sport-team">
            <span>{{ m.away }}</span>
            <div class="sport-team-logo" style="--logo-hue:340">{{ m.away.slice(0, 2).toUpperCase() }}</div>
          </div>
        </div>

        <div class="sport-odds">
          <button class="sport-odd"><span>1</span><strong>{{ m.odds[0] }}</strong></button>
          <button class="sport-odd" :disabled="m.odds[1] === '—'"><span>X</span><strong>{{ m.odds[1] }}</strong></button>
          <button class="sport-odd"><span>2</span><strong>{{ m.odds[2] }}</strong></button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const allMatches = [
  { league: 'Champions League', home: 'Real Madrid', away: 'Bayern',   start: 'Today · 20:00',    odds: ['1.85','3.40','4.20'], live: true,  score: '1 - 0', min: "34'", provider: 'Saba' },
  { league: 'Premier League',   home: 'Arsenal',     away: 'Man City', start: 'Today · 22:30',    odds: ['2.95','3.20','2.40'],                                             provider: 'Bti'  },
  { league: 'NBA',              home: 'Lakers',      away: 'Celtics',  start: 'Tomorrow · 03:30', odds: ['1.65','—',  '2.25'],                                             provider: 'Saba' },
  { league: 'La Liga',          home: 'Barcelona',   away: 'Atletico', start: 'Sat · 21:00',      odds: ['1.55','4.10','5.60'],                                             provider: 'Bti'  },
  { league: 'Serie A',          home: 'Inter',       away: 'Juventus', start: 'Sun · 19:45',      odds: ['2.10','3.30','3.60'],                                             provider: 'Saba' },
  { league: 'NFL',              home: 'Chiefs',      away: 'Eagles',   start: 'Sun · 23:00',      odds: ['1.90','—',  '1.95'],                                             provider: 'Bti'  },
];

const tabs   = ['All', 'Saba', 'Bti'];
const filter = ref('All');

const matches = computed(() =>
  filter.value === 'All' ? allMatches : allMatches.filter(m => m.provider === filter.value)
);
</script>
