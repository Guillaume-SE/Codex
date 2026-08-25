<script setup lang="ts">
defineProps<{
  htmlFor?: string
  text?: string
  required?: boolean
  optional?: boolean
}>()
</script>

<template>
  <div class="flex items-center justify-between w-full mb-1">
    <label
      v-if="htmlFor || text || $slots.default"
      :for="htmlFor"
      class="label-text font-medium flex items-center gap-1.5 cursor-pointer select-none"
    >
      <slot>{{ text }}</slot>

      <span v-if="required" class="text-error text-xs font-normal" aria-hidden="true"> * </span>

      <span v-if="optional" class="text-xs text-base-content/50 font-normal"> (optionnel) </span>
    </label>

    <!-- Alternative Action / Link Slot -->
    <div v-if="$slots.alt" class="text-xs">
      <slot name="alt" />
    </div>
  </div>
</template>
