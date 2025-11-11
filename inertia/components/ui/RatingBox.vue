<script setup lang="ts">
import { computed } from 'vue'
import { useRatingColorClass } from '~/composables/useRatingColorClass'

const props = defineProps<{
  rating: number | null | string
}>()

const numericRating = computed(() => {
  return props.rating === null ? null : Number(props.rating)
})
const ratingColor = computed(() => useRatingColorClass(numericRating.value))
</script>

<template>
  <div
    :class="[
      'sheen-effect bg-neutral flex h-8 w-8 items-center justify-center rounded-full font-medium',
      ratingColor,
    ]"
  >
    <span class="text-neutral-content text-lg">{{ numericRating ?? '-' }}</span>
  </div>
</template>
