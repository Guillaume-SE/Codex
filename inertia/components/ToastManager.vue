<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import { onUnmounted } from 'vue'
import { toast, Toaster } from 'vue-sonner'

const unsubscribe = router.on('success', (event) => {
  const successMessage = event.detail.page.props.success
  const errorMessage = event.detail.page.props.error

  if (successMessage) {
    toast.success(successMessage as string)
  }
  if (errorMessage) {
    toast.error(errorMessage as string)
  }
})

onUnmounted(() => {
  unsubscribe()
})
</script>

<template>
  <Toaster rich-colors position="bottom-right" closeButton />
</template>
