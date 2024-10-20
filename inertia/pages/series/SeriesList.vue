<script setup lang="ts">
import type { ISeriesMediaFormatted } from '#interfaces/media_formatted_interface'
import MediaCard from '~/components/MediaCard.vue'

defineProps<{
  seriesList: ISeriesMediaFormatted[]
}>()
</script>

<template>
  <div class="cards-container">
    <MediaCard v-for="series in seriesList" :key="series.id" :media="series" :mediaType="'série'" />
  </div>
</template>
