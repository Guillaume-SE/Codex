<script setup lang="ts">
import StatusProgressIcon from '~/components/icons/StatusProgressIcon.vue'

defineProps<{
  status: string
}>()
</script>

<template>
  <div class="status-progress-container">
    <StatusProgressIcon />
    <span>
      {{ status }}
    </span>
  </div>
</template>
