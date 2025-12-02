<script setup lang="ts">
import StatusDotComp from '~/components/ui/StatusDotComp.vue'

defineProps<{
  title: string
  isActive?: boolean
}>()
</script>

<template>
  <span class="gap-0.5 font-semibold">
    {{ title }}
    <StatusDotComp v-if="isActive" color-class="bg-info" animation="bounce" />
  </span>
</template>
