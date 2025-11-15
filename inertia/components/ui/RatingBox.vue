<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  rating: number | null | string
}>()

const numericRating = computed(() => {
  if (props.rating === null || props.rating === '') {
    return null
  }

  const num = Number(props.rating)

  return isNaN(num) ? null : num
})

const ratingColor = computed(() => {
  const val = numericRating.value

  if (val === null) {
    return 'rating-default'
  }

  if (val >= 0 && val <= 4) {
    return 'rating-bad'
  } else if (val >= 5 && val <= 7) {
    return 'rating-mid'
  } else if (val >= 8 && val <= 10) {
    return 'rating-good'
  }

  return 'rating-default'
})
</script>

<template>
  <div
    :class="[
      'bg-neutral flex h-7.5 w-7.5 items-center justify-center rounded-full font-medium',
      ratingColor,
    ]"
  >
    <span class="text-neutral-content text-lg">{{ numericRating ?? '-' }}</span>
  </div>
</template>
