<script setup lang="ts">
defineProps<{
  title: string
  isActive?: boolean
}>()
</script>

<template>
  <span class="gap-0.5 font-semibold">
    {{ title }}
    <div v-if="isActive" class="status status-info animate-bounce"></div>
  </span>
</template>
