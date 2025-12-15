<script setup lang="ts">
import NotificationIcon from '~/components/icons/NotificationIcon.vue'

defineProps<{
  showDot: boolean
}>()
</script>

<template>
  <button class="btn btn-circle btn-ghost">
    <div class="indicator">
      <NotificationIcon />
      <span v-if="showDot" class="indicator-item status status-error"></span>
    </div>
  </button>
</template>
