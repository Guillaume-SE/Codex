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
  <div v-if="displayMessage" class="form-text-error">
    <span>{{ displayMessage }}</span>
  </div>
</template>

<style scoped>
.form-text-error {
  color: #fa2d36;
  font-weight: 500;
}
</style>
