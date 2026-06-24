<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const name = ref('meqomcao');
const email = ref('user@example.com');
const phone = ref('+1 234 567 8900');
const touched = ref(false);

const errors = computed(() => ({
  name: !name.value.trim() ? 'Name is required' : '',
  email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value) ? 'Invalid email' : '',
}));
const valid = computed(() => !errors.value.name && !errors.value.email);

function save() {
  touched.value = true;
  if (valid.value) {
    toast.add({ severity: 'success', summary: 'Saved', detail: 'Profile updated', life: 3000 });
  }
}
</script>

<template>
  <div class="bg-[#1a2128] border border-gray-800 rounded-lg p-6 max-w-lg">
    <h2 class="text-white text-xl font-bold mb-6">Personal Info</h2>
    <div class="flex flex-col gap-4">
      <div>
        <label class="block text-gray-400 text-sm mb-2">Name</label>
        <InputText v-model="name" class="w-full" :invalid="touched && !!errors.name" />
        <small v-if="touched && errors.name" class="text-red-400">{{ errors.name }}</small>
      </div>
      <div>
        <label class="block text-gray-400 text-sm mb-2">Email</label>
        <InputText v-model="email" class="w-full" :invalid="touched && !!errors.email" />
        <small v-if="touched && errors.email" class="text-red-400">{{ errors.email }}</small>
      </div>
      <div>
        <label class="block text-gray-400 text-sm mb-2">Phone</label>
        <InputText v-model="phone" class="w-full" />
      </div>
      <Button label="Save Changes" class="mt-2 self-start" @click="save" />
    </div>
  </div>
</template>
