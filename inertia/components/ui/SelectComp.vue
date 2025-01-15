<script setup lang="ts">
const model = defineModel()

defineProps<{
  options: {
    text: string
    value: string | number
  }[]
  disabledValue?: boolean
  disabledText?: string
}>()
</script>

<template>
  <select v-model="model">
    <option v-if="disabledValue" disabled value="">{{ disabledText }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>
