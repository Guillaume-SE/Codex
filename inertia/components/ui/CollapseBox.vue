<script setup lang="ts">
import { ColorVariant } from '#types/ColorVariant'
import { computed } from 'vue'
import StatusDotComp from '~/components/ui/StatusDotComp.vue'

const props = withDefaults(
  defineProps<{
    label: string
    isActive?: boolean
    startOpen?: boolean
    variant?: ColorVariant
    showBorder?: boolean
  }>(),
  {
    isActive: false,
    startOpen: false,
    variant: 'secondary',
    showBorder: false,
  }
)

const activeTextClass = computed(() => {
  if (props.variant === 'neutral') return 'text-base-content'
  return `text-${props.variant}`
})

const activeBorderClass = computed(() => {
  if (props.variant === 'neutral') return 'border-base-300'
  return `border-${props.variant}/50`
})
</script>

<template>
  <div
    class="collapse-arrow bg-base-100 rounded-box collapse transition-colors duration-300"
    :class="[
      showBorder ? 'border' : '',
      showBorder && isActive ? activeBorderClass : 'border-base-200',
    ]"
  >
    <input type="checkbox" :checked="startOpen" />

    <div class="collapse-title flex items-center gap-2 font-semibold">
      <span :class="[isActive ? activeTextClass : 'text-base-content']">
        {{ label }}
      </span>

      <div v-if="isActive" class="flex items-center">
        <StatusDotComp color-class="bg-primary" />
      </div>
    </div>

    <div class="collapse-content text-sm">
      <div class="pt-2">
        <slot />
      </div>
    </div>
  </div>
</template>
