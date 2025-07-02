<script setup lang="ts">
import type {
  IAnimeMediaPresented,
  IBaseMediaPresented,
  IBookMediaPresented,
  IGameMediaPresented,
  IMovieMediaPresented,
  ISeriesMediaPresented,
} from '#interfaces/media_presented_interface'
import type { MediaCategories } from '#types/MediaCategories'
import { Link } from '@inertiajs/vue3'
import RatingBox from '~/components/RatingBox.vue'
import StatusProgressBadge from '~/components/StatusProgressBadge.vue'
import ImageNotAvailableIcon from '~/components/icons/ImageNotAvailableIcon.vue'

defineProps<{
  media:
    | IBaseMediaPresented
    | IGameMediaPresented
    | IMovieMediaPresented
    | ISeriesMediaPresented
    | IAnimeMediaPresented
    | IBookMediaPresented
  mediaCategory: MediaCategories
}>()
</script>

<template>
  <div class="media-card">
    <Link :href="`/categories/${mediaCategory}/${media.id}`">
      <div v-if="media.cover">
        <img
          class="img-medium"
          loading="lazy"
          :src="`/storage/${media.cover.smallUrl}`"
          :srcset="`/storage/${media.cover.smallUrl}, /storage/${media.cover.mediumUrl} 2x`"
          :alt="`cover de ${media.name}`"
        />
      </div>
      <div v-else class="no-cover-small">
        <ImageNotAvailableIcon />
      </div>
      <p class="media-card-title">
        {{ media.name }}
      </p>
    </Link>
    <div class="media-card-info-container">
      <StatusProgressBadge :status="media.status" />
      <RatingBox :rating="media.review?.rating ? media.review.rating : null" />
    </div>
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
