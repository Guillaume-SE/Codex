<script setup lang="ts">
import { computed, useSlots } from 'vue'

const model = defineModel()
const slots = useSlots()

const props = defineProps<{
  options?: {
    text: string
    value: string | number
  }[]

  placeholder?: string
  placeholderValue?: string | number | null
  size?: 'xs' | 'sm' | 'md' | 'lg'
}>()

defineOptions({
  inheritAttrs: false,
})

const selectClasses = computed(() => ['select', props.size ? `select-${props.size}` : 'xs'])
</script>

<template>
  <select v-model="model" :class="selectClasses" v-bind="$attrs">
    <option v-if="placeholder" disabled :value="placeholderValue ?? null">
      {{ placeholder }}
    </option>

    <template v-if="options && !slots.default">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </template>

    <slot v-else />
  </select>
</template>
