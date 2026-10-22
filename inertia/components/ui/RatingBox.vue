<script setup lang="ts">
import { computed } from 'vue'
import StarIcon from '~/components/ui/icons/StarIcon.vue'

const props = defineProps<{
  rating?: number | string | null
}>()

const parsedRating = computed<number | null>(() => {
  if (props.rating == null || props.rating === '') return null

  const num = Number(props.rating)
  if (isNaN(num) || num < 0) return null

  // rounds 4.969 -> 5, 6.834 -> 6.8
  return Math.round(num * 10) / 10
})

const formattedRating = computed(() => {
  if (parsedRating.value === null) {
    return '-'
  }
  return parsedRating.value.toString()
})

const ratingColor = computed(() => {
  const score = parsedRating.value

  if (score === null) return 'text-base-content/40'
  if (score >= 7) return 'text-success'
  if (score >= 5) return 'text-warning'
  return 'text-error'
})
</script>

<template>
  <div class="flex items-center gap-1 text-xs font-semibold">
    <StarIcon :class="ratingColor" class="size-4" />
    <span>{{ formattedRating }}</span>
  </div>
</template>
