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

<style scoped>
.rating-number-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.1rem;
  height: 2.1rem;
  padding: 3px;
  border-radius: 50%;
  background-color: #0f172a;
}
.rating-number {
  font-weight: 500;
  font-size: 1.2rem;
  color: #fafafa;
}
.rating-default {
  outline: 3px solid rgba(203, 213, 225, 1);
  outline-offset: -6px;
}
.rating-good {
  outline: 3px solid rgba(0, 128, 0, 1);
  outline-offset: -6px;
}
.rating-mid {
  outline: 3px solid rgba(234, 179, 8, 1);
  outline-offset: -6px;
}
.rating-bad {
  outline: 3px solid rgba(248, 113, 113, 1);
  outline-offset: -6px;
}
</style>
