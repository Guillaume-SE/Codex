<script setup lang="ts">
import type { DaisyColor, DaisySize } from '#types/daisyui'
import { watchEffect } from 'vue'

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
</script>

<template>
  <label class="inline-flex items-center gap-2 cursor-pointer select-none">
    <input
      v-model="model"
      type="checkbox"
      :class="[
        'checkbox',
        size ? `checkbox-${size}` : '',
        error ? 'checkbox-error' : color ? `checkbox-${color}` : '',
      ]"
      v-bind="$attrs"
    />
    <span v-if="label || $slots.default" class="text-sm" @click.stop>
      <!-- when label wanted need complexity like a Link -->
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
