<script setup lang="ts">
defineProps<{
  text: string
  labelFor: string
}>()
</script>

<template>
  <label :for="labelFor" class="label">
    <span>{{ text }}</span>
  </label>
</template>
