<script setup lang="ts">
import type { ColorVariant } from '#types/ColorVariant'
import { Link } from '@inertiajs/vue3'
import { computed } from 'vue'
import Loader from '~/components/ui/Loader.vue'

export type ButtonVariant = ColorVariant | 'ghost' | 'link'

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

const isLink = computed(() => !!props.href)
const componentTag = computed(() => (isLink.value ? Link : 'button'))

const buttonClasses = computed(() => {
  return [
    'btn',
    `btn-${props.variant}`,
    props.size ? `btn-${props.size}` : '',
    { 'btn-outline': props.outline },
    {
      'opacity-30 pointer-events-none': props.disabled || props.loading,
    },
  ]
})

// prevent click navigation if disabled since Link as his own way to work
function handleLinkClick(event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault()
  }
}
</script>

<template>
  <component
    :is="componentTag"
    v-bind="$attrs"
    :href="isLink ? href : undefined"
    :type="isLink ? undefined : type"
    :disabled="isLink ? undefined : disabled"
    :class="[buttonClasses, $attrs.class]"
    :aria-disabled="disabled || loading"
    @click="handleLinkClick"
  >
    <Loader v-if="loading" />
    <slot />
  </component>
</template>
