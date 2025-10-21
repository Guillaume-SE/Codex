<script setup lang="ts">
import { computed } from 'vue'
import InputComp from '~/components/ui/InputComp.vue'

const model = defineModel<string>()

const props = defineProps<{
  min?: string
  max?: string
  step?: string
  labels: string[]
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>()

const sizeClass = computed(() => {
  return props.size ? `range-${props.size}` : 'xs'
})
</script>

<template>
  <InputComp v-model="model" type="range" :min="min" :max="max" :step="step" :class="sizeClass" />

  <div class="mt-2 flex justify-between px-2.5 text-xs">
    <span v-for="_ in labels" :key="_">|</span>
  </div>

  <div class="mt-2 flex justify-between px-2.5 text-xs">
    <span v-for="label in labels" :key="label">{{ label }}</span>
  </div>
</template>
