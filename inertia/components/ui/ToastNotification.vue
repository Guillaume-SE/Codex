<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div class="toast-container">
    <span class="form-text-success">{{ message }}</span>
  </div>
</template>

<style scoped>
.toast-container {
  background-color: #f1fdf3;
}
.form-text-success {
  color: #008235;
  font-weight: 500;
}
</style>
