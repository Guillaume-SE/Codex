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
  <div :class="['rating-number-container', ratingColor]">
    <span class="rating-number">{{ rating ?? '/' }}</span>
  </div>
</template>
