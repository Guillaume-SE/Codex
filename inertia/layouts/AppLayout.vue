<script setup lang="ts">
import AppNavigation from '~/components/AppNavigation.vue'
import ToastManager from '~/components/ToastManager.vue'

defineProps<{
  success?: string
  error?: string
}>()
</script>

<template>
  <header>
    <AppNavigation />
  </header>
  <main>
    <slot />
  </main>
  <ToastManager />
</template>
