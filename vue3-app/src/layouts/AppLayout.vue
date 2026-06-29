<template>
  <div
    class="shell"
    :class="{
      collapsed:    sidebarCollapsed,
      'mobile-open': mobileSidebarOpen
    }"
  >
    <!-- 手機遮罩 -->
    <div class="sidebar-backdrop" @click="emit('close-sidebar')" />

    <!-- 側邊欄 slot -->
    <aside class="shell-sidebar">
      <slot name="sidebar" />
    </aside>

    <!-- 主體區域 -->
    <div class="shell-main">

      <!-- 頂部列 slot -->
      <header class="shell-header">
        <slot name="header" />
      </header>

      <!-- 頁面內容 slot -->
      <main class="shell-content">
        <div class="container" style="padding-bottom: 24px">
          <slot />
        </div>
      </main>

      <!-- 頁尾 slot（可選） -->
      <slot name="footer" />

    </div>

    <!-- 手機底部導覽列 slot -->
    <nav class="shell-mobile-nav">
      <slot name="mobile-nav" />
    </nav>
  </div>
</template>

<script setup>
defineProps({
  sidebarCollapsed:  { type: Boolean, default: false },
  mobileSidebarOpen: { type: Boolean, default: false }
});

const emit = defineEmits(['close-sidebar']);
</script>
