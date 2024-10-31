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
import RatingBox from '~/components/RatingBox.vue'
import StatusProgressBadge from '~/components/StatusProgressBadge.vue'

defineProps<{
  media:
    | IGameMediaFormatted
    | IMovieMediaFormatted
    | ISeriesMediaFormatted
    | IAnimeMediaFormatted
    | IBookMediaFormatted
  mediaType: string
  mediaCategory: MediaCategories
}>()
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
