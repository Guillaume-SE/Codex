<script setup lang="ts">
import type { DaisyColor, DaisyShape, DaisySize, DaisyVariant } from '#types/daisyui'
import { Link } from '@adonisjs/inertia/vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    is?: string | object
    href?: string
    route?: string
    type?: 'button' | 'submit' | 'reset'
    color?: DaisyColor
    size?: DaisySize
    variant?: DaisyVariant
    shape?: DaisyShape
    block?: boolean
    wide?: boolean
    loading?: boolean
    active?: boolean
    disabled?: boolean
  }>(),
  {
    type: 'button',
    color: 'primary',
    size: 'md',
    block: false,
    wide: false,
    loading: false,
    active: false,
    disabled: false,
  }
)

const tag = computed(() => {
  if (props.is) return props.is
  if (props.href || props.route) return Link
  return 'button'
})
</script>

<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    :href="href"
    :route="route"
    :disabled="disabled || loading"
    :class="[
      'btn',
      color && `btn-${color}`,
      size && `btn-${size}`,
      variant && `btn-${variant}`,
      shape && `btn-${shape}`,
      {
        'btn-block': block,
        'btn-wide': wide,
        'btn-active': active,
        'btn-disabled': disabled || loading,
      },
    ]"
  >
    <span v-if="loading" class="loading loading-spinner loading-xs" aria-hidden="true" />
    <slot v-else name="prefix" />

    <slot />

    <slot v-if="!loading" name="suffix" />
  </component>
</template>
