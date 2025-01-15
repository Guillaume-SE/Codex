<script setup lang="ts">
const model = defineModel()

defineProps<{
  type: string
  placeholder?: string
  id?: string
  value?: string | number | object
}>()
</script>

<template>
  <template v-if="type === 'checkbox'">
    <input v-model="model" type="checkbox" :id="id" :value="value || ''" />
  </template>

  <template v-else-if="type === 'search'">
    <input v-model="model" type="search" :placeholder="placeholder || ''" />
  </template>

  <template v-else-if="type === 'radio'">
    <input v-model="model" type="radio" :value="value || ''" />
  </template>

  <template v-else-if="type === 'date'">
    <input v-model="model" type="date" />
  </template>

  <template v-else>
    <input v-model="model" type="text" :placeholder="placeholder || ''" />
  </template>
</template>
