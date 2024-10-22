<script setup lang="ts">
import type { IMovieMediaFormatted } from '#interfaces/media_formatted_interface'
import MediaList from '~/components/MediaList.vue'

defineProps<{
  moviesList: IMovieMediaFormatted[]
}>()
</script>

<template>
  <MediaList title="Liste des films" :mediaList="moviesList" mediaType="film" />
</template>
