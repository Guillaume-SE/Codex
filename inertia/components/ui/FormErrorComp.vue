<script setup lang="ts">
defineProps<{
  message: string[]
}>()
</script>

<template>
  <div v-for="error in message">
    <span class="form-text-error">{{ error }}</span>
  </div>
</template>

<style scoped>
.form-text-error {
  color: #fa2d36;
  font-weight: 500;
}
</style>
