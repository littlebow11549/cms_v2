import { defineStore } from 'pinia';

export interface Product {
  id: number;
  name: string;
  provider: string;
  accent: string;
}
export interface Category {
  key: string;
  label: string;
  products: Product[];
}

function make(prefix: string, provider: string, accent: string): Product[] {
  return Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `${prefix} ${i + 1}`,
    provider,
    accent,
  }));
}

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    active: 'hot',
    categories: [
      { key: 'hot', label: 'Hot Games', products: make('Hot Game', 'Pragmatic', '#98E7D2') },
      { key: 'slots', label: 'Slots', products: make('Slot', 'NetEnt', '#B9DE5A') },
      { key: 'live', label: 'Live Casino', products: make('Live Table', 'Evolution', '#A78BFA') },
      { key: 'sports', label: 'Sports', products: make('Match', 'SABA', '#F59E0B') },
    ] as Category[],
  }),
  getters: {
    activeCategory(state): Category {
      return state.categories.find((c) => c.key === state.active) ?? state.categories[0]!;
    },
  },
  actions: {
    setActive(key: string) {
      this.active = key;
    },
  },
});
