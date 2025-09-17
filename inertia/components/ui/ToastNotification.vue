<script setup lang="ts">
import { computed, PropType } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<'success' | 'error'>,
    default: 'success',
  },
})

const typeClasses = computed(() => {
  return {
    'is-success': props.type === 'success',
    'is-error': props.type === 'error',
  }
})
</script>

<template>
  <div :class="[typeClasses, 'toast-container']">
    <span class="toast-message">{{ message }}</span>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid;
  z-index: 1000;
}

.toast-message {
  font-weight: 500;
}

.is-success {
  background-color: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}

.is-error {
  background-color: #fef2f2;
  border-color: #fecaca;
  color: #991b1b;
}
</style>
