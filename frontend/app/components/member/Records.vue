<script setup lang="ts">
import { ref, computed } from 'vue';

interface Row { id: number; type: string; amount: string; date: string; status: 'Approved' | 'Pending' | 'Rejected'; }

const rows: Row[] = [
  { id: 1, type: 'Deposit', amount: '₩500,000', date: '2025-08-12 15:48', status: 'Approved' },
  { id: 2, type: 'Withdrawal', amount: '₩200,000', date: '2025-08-12 14:30', status: 'Pending' },
  { id: 3, type: 'Deposit', amount: '₩1,000,000', date: '2025-08-11 18:20', status: 'Approved' },
  { id: 4, type: 'Bet Settlement', amount: '₩50,000', date: '2025-08-11 12:15', status: 'Rejected' },
  { id: 5, type: 'Deposit', amount: '₩300,000', date: '2025-08-10 09:02', status: 'Approved' },
];

const filter = ref<'All' | 'Approved' | 'Pending' | 'Rejected'>('All');
const filtered = computed(() => (filter.value === 'All' ? rows : rows.filter((r) => r.status === filter.value)));

const tagClass = (s: string) =>
  s === 'Approved' ? 'bg-green-900 text-green-400'
  : s === 'Pending' ? 'bg-amber-900/40 text-amber-400'
  : 'bg-red-900/40 text-red-400';
</script>

<template>
  <div class="bg-[#1a2128] border border-gray-800 rounded-lg p-6">
    <div class="flex items-center justify-between mb-4 gap-3 flex-wrap">
      <h2 class="text-white text-xl font-bold">Transaction Records</h2>
      <select v-model="filter" class="bg-[#0f1419] border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2">
        <option v-for="o in ['All', 'Approved', 'Pending', 'Rejected']" :key="o" :value="o">Status: {{ o }}</option>
      </select>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-gray-400 text-left border-b border-gray-800">
            <th class="py-3 pr-4 font-semibold">Type</th>
            <th class="py-3 pr-4 font-semibold">Amount</th>
            <th class="py-3 pr-4 font-semibold whitespace-nowrap">Date</th>
            <th class="py-3 font-semibold text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in filtered" :key="r.id" class="border-b border-gray-800/60">
            <td class="py-3 pr-4 text-white">{{ r.type }}</td>
            <td class="py-3 pr-4 text-gray-300">{{ r.amount }}</td>
            <td class="py-3 pr-4 text-gray-400 whitespace-nowrap">{{ r.date }}</td>
            <td class="py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="tagClass(r.status)">{{ r.status }}</span>
            </td>
          </tr>
          <tr v-if="!filtered.length">
            <td colspan="4" class="py-8 text-center text-gray-500">No records.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
