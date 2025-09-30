<script setup lang="ts">
import { watchEffect } from 'vue'
import { toast, Toaster } from 'vue-sonner'

const props = defineProps<{
  success?: string
  error?: string
}>()

watchEffect(
  () => {
    if (props.success) {
      toast.success(props.success)
    }
    if (props.error) {
      toast.error(props.error)
    }
  },
  { flush: 'post' }
)
</script>

<template>
  <Toaster rich-colors position="bottom-right" closeButton />
</template>

<style>
@import 'vue-sonner/style.css';
</style>
