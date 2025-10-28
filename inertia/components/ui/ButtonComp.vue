<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { computed } from 'vue'
import Loader from '~/components/ui/Loader.vue'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit'
    href?: string
    disabled?: boolean
    loading?: boolean
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link'
    size?: 'xs' | 'sm' | 'lg'
    outline?: boolean
  }>(),
  {
    type: 'button',
    disabled: false,
  }
)

defineOptions({
  inheritAttrs: false,
})

const buttonClasses = computed(() => {
  return [
    'btn',
    props.variant ? `btn-${props.variant}` : '',
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
