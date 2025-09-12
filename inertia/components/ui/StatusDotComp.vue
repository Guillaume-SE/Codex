<script setup lang="ts">
import { computed } from 'vue'

type Status = 'ok' | 'warning' | 'danger'

const props = defineProps<{
  color?: string
  status?: Status
  size: number | string
}>()

const statusColors: Record<Status, string> = {
  ok: '#48bb78',
  warning: '#f6e05e',
  danger: '#f56565',
}

const dotColor = computed(() => {
  // if a specific color is provided, use it
  if (props.color) {
    return props.color
  }
  // Otherwise, if a status is provided, look up its color in the map.
  if (props.status) {
    return statusColors[props.status]
  }
  return '#a0aec0'
})
</script>

<template>
  <span class="status-dot"></span>
</template>

<style scoped>
.status-dot {
  width: v-bind(size + 'px');
  height: v-bind(size + 'px');
  display: inline-block;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: v-bind(dotColor);
  transition: background-color 0.3s;
}
</style>
