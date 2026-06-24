<script setup lang="ts">
import { ref, computed } from 'vue';

const presets = [10000, 50000, 100000, 500000, 1000000];
const amount = ref<number | null>(null);
const touched = ref(false);
const done = ref(false);

const error = computed(() => {
  if (amount.value == null) return 'Please enter an amount';
  if (amount.value < 10000) return 'Minimum is ₩10,000';
  if (amount.value > 9000000) return 'Maximum is ₩9,000,000';
  return '';
});

function submit() {
  touched.value = true;
  if (!error.value) {
    done.value = true;
    setTimeout(() => (done.value = false), 2500);
  }
}
</script>

<template>
  <div class="bg-[#1a2128] border border-gray-800 rounded-lg p-6">
    <h2 class="text-white text-xl font-bold mb-6">Deposit</h2>

    <div class="grid grid-cols-5 gap-3 mb-5">
      <button
        v-for="p in presets"
        :key="p"
        class="py-3 rounded-lg font-semibold transition-colors text-sm"
        :class="amount === p ? '' : 'bg-[#0f1419] border border-gray-700 text-white hover:border-gray-500'"
        :style="amount === p ? 'background:#313E40;color:#AAE5D3' : ''"
        @click="amount = p"
      >
        {{ p.toLocaleString() }}
      </button>
    </div>

    <label class="block text-gray-400 text-sm mb-2">Amount (₩)</label>
    <InputNumber
      v-model="amount"
      class="w-full"
      :invalid="touched && !!error"
      placeholder="Enter amount"
      :min="0"
    />
    <small v-if="touched && error" class="text-red-400 block mt-1">{{ error }}</small>

    <Button label="Submit Deposit" class="mt-5" @click="submit" />
    <p v-if="done" class="text-[#98E7D2] text-sm mt-3">✓ Deposit request submitted.</p>
  </div>
</template>
