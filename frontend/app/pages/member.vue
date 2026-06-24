<script setup lang="ts">
import { computed } from 'vue';
import { useMemberStore } from '~/stores/member';
import MemberOverview from '~/components/member/Overview.vue';
import MemberDeposit from '~/components/member/Deposit.vue';
import MemberPlaceholder from '~/components/member/Placeholder.vue';

const member = useMemberStore();

const panel = computed(() => {
  if (member.active === 'overview') return MemberOverview;
  if (member.active === 'deposit') return MemberDeposit;
  return MemberPlaceholder;
});
</script>

<template>
  <div class="min-h-screen bg-[#0f1419]">
    <AppHeader />
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
      <MemberSidebar />
      <div class="flex-1 min-w-0">
        <component :is="panel" />
      </div>
    </div>
  </div>
</template>
