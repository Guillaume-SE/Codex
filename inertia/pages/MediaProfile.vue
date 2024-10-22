<script setup lang="ts">
import type {
  IAnimeMediaFormatted,
  IBookMediaFormatted,
  IGameMediaFormatted,
  IMovieMediaFormatted,
  ISeriesMediaFormatted,
} from '#interfaces/media_formatted_interface'
import AppHead from '~/components/AppHead.vue'

const props = defineProps<{
  media:
    | IGameMediaFormatted
    | IMovieMediaFormatted
    | ISeriesMediaFormatted
    | IAnimeMediaFormatted
    | IBookMediaFormatted
}>()
</script>

<template>
  <AppHead :title="media.name" />
  <div class="media-profile-container">
    <div v-if="media.cover">
      <img
        class="img-large"
        loading="lazy"
        :src="`/storage/${media.cover.mediumUrl}`"
        :srcset="`/storage/${media.cover.mediumUrl}, /storage/${media.cover.largeUrl} 2x`"
        :alt="`affiche du ${media.name}`"
      />
    </div>
    <h1>{{ media.name }}</h1>
  </div>
</template>
