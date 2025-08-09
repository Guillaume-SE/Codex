<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div>
    <span class="form-text-error">{{ message }}</span>
  </div>
</template>

<style scoped>
.form-text-error {
  color: #fa2d36;
  font-weight: 500;
}
</style>
