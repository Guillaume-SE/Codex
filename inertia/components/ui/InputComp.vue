<script setup lang="ts">
const model = defineModel()

defineProps<{
  type: string
  placeholder?: string
  id?: string
  value?: string | number
}>()
</script>
<template>
  <template v-if="type === 'checkbox'">
    <input v-model="model" type="checkbox" :id="id" :value="value || ''" />
  </template>

  <template v-else>
    <input v-model="model" type="text" :placeholder="placeholder || ''" />
  </template>
</template>
