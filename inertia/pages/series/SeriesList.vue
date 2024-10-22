<script setup lang="ts">
import type { ISeriesMediaFormatted } from '#interfaces/media_formatted_interface'
import AppHead from '~/components/AppHead.vue'
import MediaCard from '~/components/MediaCard.vue'

defineProps<{
  seriesList: ISeriesMediaFormatted[]
}>()
</script>

<template>
  <AppHead title="Liste des séries" />
  <div v-if="seriesList.length > 0" class="media-card-container">
    <MediaCard v-for="series in seriesList" :key="series.id" :media="series" :mediaType="'série'" />
  </div>
  <!-- No media found section -->
  <div v-else>
    <p>Aucun résulat à afficher</p>
  </div>
</template>
