<script setup lang="ts">
import type { MediaCategories } from '#enums/MediaCategories'
import type {
  IAnimeMediaFormatted,
  IBookMediaFormatted,
  IGameMediaFormatted,
  IMovieMediaFormatted,
  ISeriesMediaFormatted,
} from '#interfaces/media_formatted_interface'
import { Link } from '@inertiajs/vue3'
import { computed } from 'vue'
import RatingBox from '~/components/RatingBox.vue'
import StatusProgressBadge from '~/components/StatusProgressBadge.vue'
import { useFormattedDuration } from '~/composables/useFormattedDuration'

const props = defineProps<{
  media:
    | IGameMediaFormatted
    | IMovieMediaFormatted
    | ISeriesMediaFormatted
    | IAnimeMediaFormatted
    | IBookMediaFormatted
  mediaType: string
  mediaCategory: MediaCategories
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
  <div class="media-card">
    <Link :href="`/media/${mediaCategory}/${media.id}`">
      <div v-if="media.cover">
        <img
          class="img-medium"
          loading="lazy"
          :src="`/storage/${media.cover.smallUrl}`"
          :srcset="`/storage/${media.cover.smallUrl}, /storage/${media.cover.mediumUrl} 2x`"
          :alt="`jaquette du ${mediaType} ${media.name}`"
        />
      </div>
      <div v-else>
        <img :src="'/public/images/default-cover.jpg'" alt="Image indisponible" />
      </div>
      <h4>
        {{ media.name }}
      </h4>
    </Link>
    <StatusProgressBadge :status="media.status" />
    <RatingBox :rating="media.review?.rating" />
    <div>
      <img
        v-if="media.review?.isFavorite"
        class="icon-favorite"
        :src="'/public/images/icons/favorite-icon-relief.svg'"
        alt="coup de cœur"
        title="Coup de cœur"
      />
    </div>
  </div>
</template>
