<script setup lang="ts"></script>

<template>
  <div class="bg-[#1a2128] border border-gray-800 rounded-lg p-6">
    <h2 class="text-white text-xl font-bold mb-6">Account Overview</h2>
    <div class="flex items-center gap-4 mb-6">
      <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] flex items-center justify-center text-gray-900 text-2xl font-bold">M</div>
      <div>
        <div class="flex items-center gap-2">
          <span class="text-white text-lg font-semibold">meqomcao</span>
          <span class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">VIP1</span>
        </div>
        <p class="text-gray-400 text-sm">Member since August 2025</p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-[#0f1419] rounded-lg p-4">
        <p class="text-gray-400 text-sm mb-1">Current Balance</p>
        <p class="text-[#98E7D2] text-2xl font-bold">₩1,000,000,000</p>
      </div>
      <div class="bg-[#0f1419] rounded-lg p-4">
        <p class="text-gray-400 text-sm mb-1">Bonus</p>
        <p class="text-white text-2xl font-bold">₩0</p>
      </div>
    </div>
  </div>
</template>
