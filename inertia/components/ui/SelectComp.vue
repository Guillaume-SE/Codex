<script setup lang="ts">
const model = defineModel()

defineProps<{
  options: {
    text: string
    value: string | number
    description?: string
  }[]
}>()
</script>

<template>
  <select v-model="model">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
      <span v-if="option.description">
        {{ option.description }}
      </span>
    </option>
  </select>
</template>
