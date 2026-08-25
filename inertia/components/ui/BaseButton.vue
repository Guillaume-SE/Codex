<script setup lang="ts">
import type { DaisyColor, DaisyShape, DaisySize, DaisyVariant } from '#types/daisyui'
import { Link } from '@adonisjs/inertia/vue'
import { computed, markRaw } from 'vue'

const props = withDefaults(
  defineProps<{
    is?: string | object
    href?: string
    route?: string
    routeParams?: Record<string, any>
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
    size: 'md',
    block: false,
    wide: false,
    loading: false,
    active: false,
    disabled: false,
  }
)

const colorClasses: Record<DaisyColor, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  neutral: 'btn-neutral',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
}

const sizeClasses: Record<DaisySize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl',
}

const variantClasses: Record<DaisyVariant, string> = {
  outline: 'btn-outline',
  dash: 'btn-dash',
  soft: 'btn-soft',
  ghost: 'btn-ghost',
  link: 'btn-link',
}

const shapeClasses: Record<DaisyShape, string> = {
  square: 'btn-square',
  circle: 'btn-circle',
}

// markRaw prevents Vue from deeply tracking the component definition, which improves performance and prevents warnings
const tag = computed(() => {
  if (props.is) return typeof props.is === 'object' ? markRaw(props.is) : props.is
  if (props.href || props.route) return markRaw(Link)
  return 'button'
})

const dynamicProps = computed(() => {
  const attrs: Record<string, any> = {}

  if (tag.value === 'button') {
    attrs.type = props.type
    if (props.disabled || props.loading) attrs.disabled = true
  } else {
    // It is a Link component. Only pass href OR route, never both.
    if (props.href) {
      attrs.href = props.href
    } else if (props.route) {
      attrs.route = props.route
      if (props.routeParams) attrs['route-params'] = props.routeParams
    }
  }

  return attrs
})

const buttonClasses = computed(() => [
  'btn',
  props.color && colorClasses[props.color],
  props.size && sizeClasses[props.size],
  props.variant && variantClasses[props.variant],
  props.shape && shapeClasses[props.shape],
  {
    'btn-block': props.block,
    'btn-wide': props.wide,
    'btn-active': props.active,
    'btn-disabled': props.disabled || props.loading,
  },
])
</script>

<template>
  <component :is="tag" v-bind="dynamicProps" :class="buttonClasses">
    <span v-if="loading" class="loading loading-spinner loading-xs" aria-hidden="true" />
    <slot v-else name="prefix" />

    <slot />

    <slot v-if="!loading" name="suffix" />
  </component>
</template>
