<script setup lang="ts">
import InputComp from '~/components/ui/InputComp.vue'

const model = defineModel<string>()

defineProps<{
  min?: string
  max?: string
  step?: string
  labels: string[]
}>()
</script>

<template>
  <InputComp v-model="model" type="range" :min="min" :max="max" :step="step" />

  <div class="mt-2 flex justify-between px-2.5 text-xs">
    <span v-for="_ in labels" :key="_">|</span>
  </div>

  <div class="mt-2 flex justify-between px-2.5 text-xs">
    <span v-for="label in labels" :key="label">{{ label }}</span>
  </div>
</template>
