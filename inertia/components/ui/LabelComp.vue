<script setup lang="ts">
defineProps<{
  text: string
  labelFor: string
}>()
</script>

<template>
  <label :for="labelFor">
    <span>{{ text }}</span>
  </label>
</template>
