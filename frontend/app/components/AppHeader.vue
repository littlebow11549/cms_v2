<script setup lang="ts"></script>

<template>
  <header class="sticky top-0 z-40 bg-[#0a0e1a] border-b border-gray-800">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <span class="text-xl font-extrabold text-white">WIN<span class="text-[#98E7D2]">100%</span></span>
      <div class="flex items-center gap-3">
        <NuxtLink to="/member" class="text-gray-300 hover:text-white text-sm font-medium">Member Center</NuxtLink>
        <Button label="Login" severity="secondary" size="small" />
        <Button label="Register" size="small" />
      </div>
    </div>
  </header>
</template>
