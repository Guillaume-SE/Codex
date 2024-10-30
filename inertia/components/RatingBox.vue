<script setup lang="ts">
import { computed } from 'vue'
import { useRatingColorClass } from '~/composables/useRatingColorClass'

const props = defineProps<{
  rating: number | null | undefined
}>()

const ratingColor = computed(() => useRatingColorClass(props.rating))
</script>

<template>
  <div :class="['rating-number-container', ratingColor]">
    <span class="rating-number">{{ rating ? rating : '/' }}</span>
  </div>
</template>
