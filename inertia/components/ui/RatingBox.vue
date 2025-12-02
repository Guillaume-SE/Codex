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

// const ratingColor = computed(() => {
//   const val = numericRating.value

//   if (val === null) {
//     return 'rating-default'
//   }

//   if (val >= 0 && val <= 4) {
//     return 'rating-bad'
//   } else if (val >= 5 && val <= 7) {
//     return 'rating-mid'
//   } else if (val >= 8 && val <= 10) {
//     return 'rating-good'
//   }

//   return 'rating-default'
// })
const ratingColor = computed(() => {
  const val = numericRating.value

  if (val === null) {
    return 'border-base-300'
  }

  if (val >= 0 && val <= 4) {
    return 'border-error'
  } else if (val >= 5 && val <= 7) {
    return 'border-warning'
  } else if (val >= 8 && val <= 10) {
    return 'border-success'
  }

  return 'border-base-300'
})
</script>

<template>
  <div
    class="bg-neutral flex h-6.5 w-6.5 items-center justify-center rounded-full border-2 font-medium"
    :class="ratingColor"
  >
    <span class="text-neutral-content text-xs font-bold">
      {{ numericRating ?? '-' }}
    </span>
  </div>
</template>
