<script setup lang="ts">
import type { MediaCategories } from '#enums/MediaCategories'
import {
  IAnimeMediaFormatted,
  IBookMediaFormatted,
  IGameMediaFormatted,
  IMovieMediaFormatted,
  ISeriesMediaFormatted,
} from '#interfaces/media_formatted_interface'
import AppHead from '~/components/AppHead.vue'
import MediaCard from '~/components/MediaCard.vue'

defineProps<{
  title: string
  mediaList:
    | IGameMediaFormatted[]
    | IMovieMediaFormatted[]
    | ISeriesMediaFormatted[]
    | IAnimeMediaFormatted[]
    | IBookMediaFormatted[]
  mediaType: string
  mediaCategory: MediaCategories
}>()
</script>

<template>
  <AppHead :title="title" />
  <div v-if="mediaList.length > 0" class="media-card-container">
    <MediaCard
      v-for="media in mediaList"
      :key="media.id"
      :media="media"
      :mediaType="mediaType"
      :mediaCategory="mediaCategory"
    />
  </div>
  <div v-else>
    <p>Aucun résultat à afficher</p>
  </div>
</template>
