<script setup lang="ts">
import { ref } from 'vue';

const showLogin = ref(false);
const username = ref('');
const password = ref('');

function doLogin() {
  showLogin.value = false;
  username.value = '';
  password.value = '';
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-[#0a0e1a] border-b border-gray-800">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <span class="text-xl font-extrabold text-white">WIN<span class="text-[#98E7D2]">100%</span></span>
      <div class="flex items-center gap-3">
        <NuxtLink to="/member" class="text-gray-300 hover:text-white text-sm font-medium">Member Center</NuxtLink>
        <Button label="Login" severity="secondary" size="small" @click="showLogin = true" />
        <Button label="Register" size="small" @click="showLogin = true" />
      </div>
    </div>
  </header>

  <AppModal v-model:visible="showLogin" title="Welcome to WIN100%">
    <div class="flex flex-col gap-3 pt-2">
      <InputText v-model="username" placeholder="Username" />
      <Password v-model="password" placeholder="Password" :feedback="false" toggle-mask :input-style="{ width: '100%' }" />
    </div>
    <template #footer>
      <Button label="Login" class="w-full" @click="doLogin" />
    </template>
  </AppModal>
</template>
