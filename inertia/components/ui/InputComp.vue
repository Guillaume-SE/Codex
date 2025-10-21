<script setup lang="ts">
import { computed } from 'vue'

const model = defineModel()

const props = defineProps<{
  type: string
  variant?: 'toggle'
}>()

defineOptions({
  inheritAttrs: false,
})

const inputClasses = computed(() => {
  if (props.type === 'checkbox') {
    return props.variant === 'toggle' ? 'toggle' : 'checkbox'
  }

  if (props.type === 'radio') {
    return 'radio'
  }

  if (props.type === 'range') {
    return 'range'
  }
  return 'input'
})
</script>

<template>
  <input v-model="model" :type="type" :class="[inputClasses]" v-bind="$attrs" />
</template>
