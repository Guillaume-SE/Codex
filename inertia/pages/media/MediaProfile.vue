<script setup lang="ts">
import MediaController from '#controllers/media_controller'
import type {
  IAnimeMediaPresented,
  IBookMediaPresented,
  IGameMediaPresented,
  IMovieMediaPresented,
  ISeriesMediaPresented,
} from '#interfaces/media_presented_interface'
import { InferPageProps } from '@adonisjs/inertia/types'
import { computed } from 'vue'
import AppHead from '~/components/AppHead.vue'
import ImageNotAvailableIcon from '~/components/icons/ImageNotAvailableIcon.vue'
import MediaCard from '~/components/MediaCard.vue'
import RatingBadge from '~/components/RatingBadge.vue'
import StatusProgressBadge from '~/components/StatusProgressBadge.vue'
import { useFormattedDuration } from '~/composables/useFormattedDuration'
import AppLayout from '~/layouts/AppLayout.vue'

const props = defineProps<{
  media:
    | IGameMediaPresented
    | IMovieMediaPresented
    | ISeriesMediaPresented
    | IAnimeMediaPresented
    | IBookMediaPresented
  tagRelatedList: InferPageProps<MediaController, 'showOne'>['tagRelatedList']
}>()

const isGameMedia = (media: Object): media is IGameMediaPresented => 'gameInfos' in media
const isMovieMedia = (media: Object): media is IMovieMediaPresented => 'movieInfos' in media
const isSeriesMedia = (media: Object): media is ISeriesMediaPresented => 'seriesInfos' in media
const isAnimeMedia = (media: Object): media is IAnimeMediaPresented => 'animeInfos' in media
const isBookMedia = (media: Object): media is IBookMediaPresented => 'bookInfos' in media

const formattedDuration = computed(() =>
  isMovieMedia(props.media) ? useFormattedDuration(props.media.movieInfos.duration) : null
)
</script>

<template>
  <AppHead :title="media.name" />
  <AppLayout>
    <div class="media-profile-container">
      <!-- name -->
      <div class="media-profile-title-container">
        <h2 class="media-profile-name">{{ media.name }}</h2>
        <StatusProgressBadge :status="media.status" />
      </div>
      <!-- cover -->
      <div v-if="media.cover">
        <img
          class="img-large"
          loading="lazy"
          :src="`/storage/${media.cover.mediumUrl}`"
          :srcset="`/storage/${media.cover.mediumUrl}, /storage/${media.cover.largeUrl} 2x`"
          :alt="`cover de ${media.name}`"
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
          <p>Date de sortie: {{ media.released || 'N/A' }}</p>
          <!-- contributors -->
          <p v-for="(values, key) in media.contributors" :key="key">
            {{ key }}: {{ values.join(', ') }}
          </p>
          <!-- games infos -->
          <p v-if="isGameMedia(media)">Joué sur: {{ media.gameInfos.platform || 'N/A' }}</p>
          <!-- movies infos -->
          <p v-if="isMovieMedia(media)">Durée: {{ formattedDuration || 'N/A' }}</p>
          <!-- series infos -->
          <p v-if="isSeriesMedia(media)">
            Nombre d'épisodes:
            {{ media.seriesInfos.seasonLength || 'N/A' }}
          </p>
          <!-- anime infos -->
          <p v-if="isAnimeMedia(media)">
            Nombre d'épisodes:
            {{ media.animeInfos.seasonLength || 'N/A' }}
          </p>
          <!-- books infos -->
          <p v-if="isBookMedia(media)">
            Pages:
            {{ media.bookInfos.pages || 'N/A' }}
          </p>
        </div>
      </div>
      <div class="review-container">
        <div class="review-heading">
          <h3 class="review-title">Avis</h3>
          <RatingBadge :rating="media.review?.rating ? media.review.rating : null" />
        </div>
        <div v-if="media.review && media.review.opinion">
          <p>
            {{ media.review.opinion }}
          </p>
        </div>
      </div>
    </div>
    <div>
      <h3>Similaire</h3>
      <div v-if="tagRelatedList.length > 0">
        <MediaCard
          v-for="media in tagRelatedList"
          :key="media.id"
          :media="media"
          :mediaType="media.type"
          :mediaCategory="media.category"
        />
      </div>
      <div v-else>Aucun élément similaire pour le moment</div>
    </div>
  </AppLayout>
</template>
