<script setup lang="ts">
defineProps<{ visible: boolean; title?: string }>();
const emit = defineEmits<{ 'update:visible': [boolean] }>();
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    :header="title"
    :style="{ width: '420px' }"
    :dismissable-mask="true"
    @update:visible="emit('update:visible', $event)"
  >
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </Dialog>
</template>
