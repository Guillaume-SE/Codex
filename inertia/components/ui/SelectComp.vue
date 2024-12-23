<script setup lang="ts">
const model = defineModel()

defineProps<{
  options: {
    label: string
    value: string | number
    description?: string
  }[]
}>()
</script>

<template>
  <select v-model="model">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
      <span v-if="option.description">
        {{ option.description }}
      </span>
    </option>
  </select>
</template>
