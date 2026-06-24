import { defineStore } from 'pinia';

export interface MenuItem {
  key: string;
  label: string;
}

export const useMemberStore = defineStore('member', {
  state: () => ({
    active: 'overview',
    menu: [
      { key: 'overview', label: 'Account Overview' },
      { key: 'deposit', label: 'Deposit' },
      { key: 'withdrawal', label: 'Withdrawal' },
      { key: 'records', label: 'Transaction Records' },
      { key: 'profile', label: 'Personal Info' },
      { key: 'security', label: 'Security Center' },
    ] as MenuItem[],
  }),
  getters: {
    activeLabel(state): string {
      return state.menu.find((m) => m.key === state.active)?.label ?? '';
    },
  },
  actions: {
    setActive(key: string) {
      this.active = key;
    },
  },
});
