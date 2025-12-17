<script setup lang="ts">
import StatusDotComp from '~/components/ui/StatusDotComp.vue'

withDefaults(
  defineProps<{
    label: string
    isActive?: boolean
    startOpen?: boolean
  }>(),
  {
    isActive: false,
    startOpen: false,
  }
)
</script>

<template>
  <div
    class="collapse-arrow bg-base-100 border-base-200 rounded-box collapse border"
    :class="{ 'border-primary/50': isActive }"
  >
    <input type="checkbox" :checked="startOpen" />

    <div class="collapse-title flex items-center gap-2 font-semibold">
      <span :class="{ 'text-primary': isActive }">
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
