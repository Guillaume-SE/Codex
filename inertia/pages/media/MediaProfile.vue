<script setup lang="ts">
import type {
  IAnimeMediaFormatted,
  IBookMediaFormatted,
  IGameMediaFormatted,
  IMovieMediaFormatted,
  ISeriesMediaFormatted,
} from '#interfaces/media_formatted_interface'
import { computed } from 'vue'
import AppHead from '~/components/AppHead.vue'
import ImageNotAvailableIcon from '~/components/icons/ImageNotAvailableIcon.vue'
import StatusProgressIcon from '~/components/icons/StatusProgressIcon.vue'
import RatingBadge from '~/components/RatingBadge.vue'
import { useFormattedDuration } from '~/composables/useFormattedDuration'

const props = defineProps<{
  media:
    | IGameMediaFormatted
    | IMovieMediaFormatted
    | ISeriesMediaFormatted
    | IAnimeMediaFormatted
    | IBookMediaFormatted
}>()

const isGameMedia = (media: Object): media is IGameMediaFormatted => 'gameInfos' in media
const isMovieMedia = (media: Object): media is IMovieMediaFormatted => 'movieInfos' in media
const isSeriesMedia = (media: Object): media is ISeriesMediaFormatted => 'seriesInfos' in media
const isAnimeMedia = (media: Object): media is IAnimeMediaFormatted => 'animeInfos' in media
const isBookMedia = (media: Object): media is IBookMediaFormatted => 'bookInfos' in media

const formattedDuration = computed(() =>
  isMovieMedia(props.media) ? useFormattedDuration(props.media.movieInfos.duration) : null
)
</script>

<template>
  <AppHead :title="media.name" />
  <div class="media-profile-container">
    <!-- name -->
    <div class="media-profile-title-container">
      <h2>{{ media.name }}</h2>
      <div class="status-progress-container">
        <StatusProgressIcon />
        <span>
          {{ media.status }}
        </span>
      </div>
    </div>
    <!-- cover -->
    <div v-if="media.cover">
      <img
        class="img-large"
        loading="lazy"
        :src="`/storage/${media.cover.mediumUrl}`"
        :srcset="`/storage/${media.cover.mediumUrl}, /storage/${media.cover.largeUrl} 2x`"
        :alt="`affiche du ${media.name}`"
      />
    </div>
    <div v-else class="no-cover-large">
      <ImageNotAvailableIcon />
    </div>
    <div>
      <!-- all genres -->
      <ul>
        <li v-for="genre in media.genres">
          {{ genre }}
        </li>
      </ul>
      <!-- synopsis -->
      <h3>Synopsis</h3>
      <p>
        {{ media.synopsis ? media.synopsis : 'N/A' }}
      </p>
    </div>
    <div>
      <h3>Détails</h3>
      <div>
        <!-- alt name -->
        <p v-if="media.alternativeName">Nom alternatif: {{ media.alternativeName }}</p>
        <!-- released -->
        <p>Date de sortie: {{ media.released ? media.released : 'N/A' }}</p>
        <!-- contributors -->
        <p v-for="(values, key) in media.contributors" :key="key">
          {{ key }}: {{ values.join(', ') }}
        </p>
        <!-- games infos -->
        <p v-if="isGameMedia(media)">
          Joué sur: {{ media.gameInfos.platform ? media.gameInfos.platform : 'N/A' }}
        </p>
        <!-- movies infos -->
        <p v-if="isMovieMedia(media)">
          Durée: {{ media.movieInfos.duration ? formattedDuration : 'N/A' }}
        </p>
        <!-- series infos -->
        <p v-if="isSeriesMedia(media)">
          Nombre d'épisodes:
          {{ media.seriesInfos.seasonLength ? media.seriesInfos.seasonLength : 'N/A' }}
        </p>
        <!-- anime infos -->
        <p v-if="isAnimeMedia(media)">
          Nombre d'épisodes:
          {{ media.animeInfos.seasonLength ? media.animeInfos.seasonLength : 'N/A' }}
        </p>
        <!-- books infos -->
        <p v-if="isBookMedia(media)">
          Pages:
          {{ media.bookInfos.pages ? media.bookInfos.pages : 'N/A' }}
        </p>
      </div>
    </div>
    <div class="review-container">
      <div class="review-heading">
        <h3 class="review-title">Avis</h3>
        <RatingBadge :rating="media.review?.rating" />
      </div>
      <div v-if="media.review && media.review.opinion">
        <p>
          {{ media.review.opinion }}
        </p>
      </div>
    </div>
  </div>
</template>
