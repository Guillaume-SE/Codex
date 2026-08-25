<script setup lang="ts">
import type { DaisyColor, DaisySize } from '#types/daisyui'
import { computed, watchEffect } from 'vue'

const model = defineModel<boolean>()

const props = withDefaults(
  defineProps<{
    label?: string
    color?: DaisyColor
    size?: DaisySize
    error?: boolean | string
    checked?: boolean
  }>(),
  {
    color: 'primary',
    size: 'sm',
    error: false,
    checked: false,
  }
)

defineOptions({ inheritAttrs: false })

watchEffect(() => {
  if (props.checked !== undefined) {
    model.value = props.checked
  }
})

const colorClasses: Record<DaisyColor, string> = {
  primary: 'checkbox-primary',
  secondary: 'checkbox-secondary',
  accent: 'checkbox-accent',
  neutral: 'checkbox-neutral',
  info: 'checkbox-info',
  success: 'checkbox-success',
  warning: 'checkbox-warning',
  error: 'checkbox-error',
}

const sizeClasses: Record<DaisySize, string> = {
  xs: 'checkbox-xs',
  sm: 'checkbox-sm',
  md: 'checkbox-md',
  lg: 'checkbox-lg',
  xl: 'checkbox-xl',
}

const checkboxClasses = computed(() => [
  'checkbox',
  props.size && sizeClasses[props.size],
  props.error ? 'checkbox-error' : props.color && colorClasses[props.color],
])
</script>

<template>
  <label class="inline-flex items-center gap-2 cursor-pointer select-none">
    <input v-model="model" type="checkbox" :class="checkboxClasses" v-bind="$attrs" />
    <span v-if="label || $slots.default" class="text-sm" @click.stop>
      <!-- when label wanted need complexity like a Link -->
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
