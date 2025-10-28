<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  message: string[] | string
}>()

const displayMessage = computed(() => {
  if (Array.isArray(props.message) && props.message.length > 0) {
    return props.message[0]
  }
  if (typeof props.message === 'string') {
    return props.message
  }
  return null
})
</script>

<template>
  <span v-if="displayMessage" class="text-error font-bold">
    {{ displayMessage }}
  </span>
</template>
