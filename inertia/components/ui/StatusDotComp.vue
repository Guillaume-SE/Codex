<script setup lang="ts">
import type { UsageStatus } from '#types/UsageStatus'
import { computed } from 'vue'

const props = defineProps<{
  status?: UsageStatus
  colorClass?: string
  animation?: 'bounce' | 'ping'
}>()

const dotColor = computed(() => {
  if (props.colorClass) {
    return props.colorClass
  }

  if (props.status) {
    switch (props.status) {
      case 'ok':
        return 'bg-success'
      case 'warning':
        return 'bg-warning'
      case 'danger':
        return 'bg-error'
      default:
        return 'bg-neutral-content'
    }
  }

  return 'bg-neutral-content'
})

const dotBouncing = computed(() => {
  return props.animation === 'bounce' ? 'animate-bounce' : ''
})
</script>

<template>
  <div v-if="animation === 'ping'" class="inline-grid place-items-center *:[grid-area:1/1]">
    <div class="status animate-ping" :class="dotColor"></div>
    <div class="status" :class="dotColor"></div>
  </div>

  <div v-else class="status" :class="[dotColor, dotBouncing]"></div>
</template>
