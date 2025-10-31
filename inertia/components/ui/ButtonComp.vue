<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { computed } from 'vue'
import Loader from '~/components/ui/Loader.vue'

export type ButtonVariant = 'primary' | 'secondary' | 'neutral' | 'ghost' | 'link' | 'error'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit'
    href?: string
    disabled?: boolean
    loading?: boolean
    variant?: ButtonVariant
    size?: 'xs' | 'sm' | 'lg' | 'xl'
    outline?: boolean
  }>(),
  {
    type: 'button',
    disabled: false,
    variant: 'neutral',
  }
)

defineOptions({
  inheritAttrs: false,
})

const buttonClasses = computed(() => {
  const variantMap = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    neutral: 'btn-neutral',
    ghost: 'btn-ghost',
    link: 'btn-link',
    error: 'btn-error',
  }

  return [
    'btn',
    props.variant ? variantMap[props.variant] : '',
    props.size ? `btn-${props.size}` : '',
    { 'btn-outline': props.outline },
    { 'btn-disabled': props.disabled || props.loading },
  ]
})

// usefull since Link as his own way to work
function handleLinkClick(event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault()
  }
}
</script>

<template>
  <Link
    v-if="href"
    v-bind="$attrs"
    :href="href"
    :class="[buttonClasses, $attrs.class]"
    :aria-disabled="disabled || loading"
    @click="handleLinkClick"
  >
    <Loader v-if="loading" />
    <slot />
  </Link>

  <button
    v-else
    v-bind="$attrs"
    :type="type"
    :class="[buttonClasses, $attrs.class]"
    :disabled="disabled || loading"
  >
    <Loader v-if="loading" />
    <slot />
  </button>
</template>
