<script setup lang="ts">
import type { IMediaPresented } from '#interfaces/media_presented_interface'
import type { MediaCategories } from '#types/MediaCategories'
import { Link } from '@inertiajs/vue3'
import RatingBox from '~/components/RatingBox.vue'
import StatusProgressBadge from '~/components/StatusProgressBadge.vue'
import FavoriteIconFilled from '~/components/icons/FavoriteIconFilled.vue'
import MediaCover from '~/components/media/MediaCover.vue'

defineProps<{
  media: IMediaPresented
  mediaCategory: MediaCategories
}>()
</script>

<template>
  <div class="media-card">
    <Link :href="`/categories/${mediaCategory}/${media.id}`">
      <MediaCover
        :cover="media.cover"
        :alt="`cover de ${media.name}`"
        :default-cover-url="media.defaultCover"
      />
      <p class="media-card-title">
        {{ media.name }}
      </p>
    </Link>
    <div class="media-card-info-container">
      <StatusProgressBadge :status="media.status" />
      <RatingBox :rating="media.review?.rating ? media.review.rating : null" />
    </div>
    <div v-if="media.review?.isFavorite">
      <FavoriteIconFilled class="icon-favorite" size="25" />
    </div>
  </div>
</template>

<style scoped>
.media-card {
  width: 150px;
  min-height: 290px;
  margin: 10px;
  position: relative;
}

.media-card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.icon-favorite {
  position: absolute;
  top: -10px;
  right: -2px;
  z-index: 3;
}
.media-card-info-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
