import { reactive, watch } from 'vue';

const ACCENT_PALETTES = {
  '#1fd373': { a2: '#29e8a3', a3: '#b6f37c' },
  '#2473ff': { a2: '#38bdf8', a3: '#fbbf24' },
  '#7c5cff': { a2: '#22d3ee', a3: '#fbbf24' },
  '#22d3ee': { a2: '#2473ff', a3: '#fbbf24' },
  '#f472b6': { a2: '#38bdf8', a3: '#fde68a' },
  '#fb923c': { a2: '#f472b6', a3: '#facc15' },
};

export const TWEAK_DEFAULTS = {
  theme:            'dark',
  accent:           '#2473ff',
  density:          'comfy',
  aspect:            1.1,
  showPromos:        true,
  sidebarCollapsed:  false,
};

export function useTweaks(defaults = TWEAK_DEFAULTS) {
  const t = reactive({ ...defaults });

  function setTweak(key, val) {
    t[key] = val;
  }

  // 主題套用到 document
  watch(
    () => t.theme,
    (theme) => document.documentElement.setAttribute('data-theme', theme),
    { immediate: true }
  );

  // accent 色票套用到 CSS 變數
  watch(
    () => t.accent,
    (accent) => {
      const r = document.documentElement.style;
      r.setProperty('--accent', accent);
      const palette = ACCENT_PALETTES[accent] || ACCENT_PALETTES['#7c5cff'];
      r.setProperty('--accent-2', palette.a2);
      r.setProperty('--accent-3', palette.a3);
    },
    { immediate: true }
  );

  // card aspect ratio
  watch(
    () => t.aspect,
    (aspect) => document.documentElement.style.setProperty('--card-aspect', aspect),
    { immediate: true }
  );

  return { t, setTweak };
}
