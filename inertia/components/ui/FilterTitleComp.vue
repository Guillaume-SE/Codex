<script setup lang="ts">
defineProps<{
  title: string
  isActive: boolean | undefined
}>()
</script>

<template>
  <span class="filter-title">
    {{ title }}
    <span v-if="isActive" class="filter-marker" title="Filtre actif">•</span>
  </span>
</template>

<style scoped>
.filter-title {
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.filter-marker {
  color: #34d399;
  font-size: 1.5rem;
  line-height: 1;
}
</style>
