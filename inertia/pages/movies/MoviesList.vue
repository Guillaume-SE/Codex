<script setup lang="ts">
import type { IMovieMediaFormatted } from '#interfaces/media_formatted_interface'
import MediaCard from '~/components/MediaCard.vue'

defineProps<{
  moviesList: IMovieMediaFormatted[]
}>()
</script>

<template>
  <div class="cards-container">
    <MediaCard v-for="movie in moviesList" :key="movie.id" :media="movie" :mediaType="'film'" />
  </div>
</template>
