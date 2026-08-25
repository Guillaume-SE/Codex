<script setup lang="ts">
const model = defineModel<string | number>()

const { type = 'text', error = false } = defineProps<{
  type?: string
  error?: boolean | string
}>()

defineOptions({ inheritAttrs: false })
</script>

<template>
  <label
    class="input w-full flex items-center gap-2 focus-within:outline-none"
    :class="{ 'input-error': error }"
  >
    <!-- Leading SVG / Icon Slot -->
    <slot name="prefix" />

    <input
      v-model="model"
      :type="type"
      class="grow bg-transparent focus:outline-none min-w-0"
      v-bind="$attrs"
    />

    <!-- Trailing SVG / Action Slot -->
    <slot name="suffix" />
  </label>
</template>
