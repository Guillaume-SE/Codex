<script setup lang="ts">
import { computed } from 'vue'
import RatingBox from '~/components/RatingBox.vue'
import { useRatingLabel } from '~/composables/useRatingLabel'

const props = defineProps<{
  rating: number | null | undefined
}>()

const ratingLabel = computed(() => useRatingLabel(props.rating))
</script>

<template>
  <div class="rating-container">
    <RatingBox :rating="rating" />
    <span class="rating-label">{{ ratingLabel }}</span>
  </div>
</template>
