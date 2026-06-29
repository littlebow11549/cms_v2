<template>
  <div class="cat-tabs">
    <button
      v-for="tab in tabs" :key="tab.name"
      class="cat-tab"
      :class="{ active: active === tab.name }"
      @click="emit('update:active', tab.name)"
    >
      <span class="cat-tab-icon">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path v-if="tab.icon === 'home'"
            d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8Z"
            stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round" />
          <path v-else-if="tab.icon === 'fire'"
            d="M12 2c1 4 5 5 5 10a5 5 0 1 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9Z"
            fill="currentColor" />
          <g v-else-if="tab.icon === 'rocket'"
            stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round" stroke-linecap="round">
            <path d="M14 4c4 0 6 2 6 6-2 0-3.5 1-5 2.5L10 17l-3-3 4.5-5C13 7.5 14 6 14 4Z" />
            <path d="m9 15-3 6 6-3" />
            <circle cx="15" cy="9" r="1.4" fill="currentColor" stroke="none" />
          </g>
          <g v-else-if="tab.icon === 'slot'"
            stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round">
            <rect x="4" y="6" width="16" height="12" rx="2" />
            <path d="M8 10v4M12 10v4M16 10v4" />
          </g>
          <g v-else-if="tab.icon === 'ball'"
            stroke="currentColor" stroke-width="1.7" fill="none">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 4v16M4 12h16M6.5 6.5l11 11M17.5 6.5l-11 11" />
          </g>
          <g v-else-if="tab.icon === 'tv'"
            fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round">
            <rect x="3" y="4" width="18" height="13" rx="2" fill="currentColor" fill-opacity=".15" />
            <path d="M8 21h8M12 17v4" />
          </g>
          <g v-else-if="tab.icon === 'fish'"
            stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round">
            <path d="M3 12c3-4 8-5 12-4l4-2v12l-4-2c-4 1-9 0-12-4Z" />
            <circle cx="16" cy="11" r="0.8" fill="currentColor" stroke="none" />
          </g>
          <g v-else-if="tab.icon === 'gift'"
            stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round">
            <rect x="3" y="9" width="18" height="5" rx="1" />
            <path d="M5 14v7h14v-7M12 9v12M9 9a2 2 0 1 1 3-2 2 2 0 1 1 3 2" />
          </g>
        </svg>
      </span>
      {{ tab.name }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  active: { type: String, default: 'Lobby' },
});
const emit = defineEmits(['update:active']);

const tabs = [
  { name: 'Lobby',      icon: 'home'   },
  { name: 'Hot Games',  icon: 'fire'   },
  { name: 'Mini Games', icon: 'rocket' },
  { name: 'Slots',      icon: 'slot'   },
  { name: 'Sports',     icon: 'ball'   },
  { name: 'Live',       icon: 'tv'     },
  { name: 'Fish',       icon: 'fish'   },
  { name: 'Promotion',  icon: 'gift'   },
];
</script>
