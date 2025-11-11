<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="bg-base-100 border-base-300 collapse border">
    <input type="checkbox" />
    <div class="collapse-title font-semibold">{{ label }}</div>
    <div class="collapse-content text-sm">
      <slot />
    </div>
  </div>
</template>
