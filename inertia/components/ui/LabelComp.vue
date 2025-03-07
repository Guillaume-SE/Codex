<script setup lang="ts">
defineProps<{
  textPosition: 'up' | 'down'
  text?: string
}>()
</script>

<template>
  <template v-if="textPosition === 'up'">
    <label>
      {{ text }}
      <slot />
    </label>
  </template>

  <template v-else>
    <label>
      <slot />
      {{ text }}
    </label>
  </template>
</template>
