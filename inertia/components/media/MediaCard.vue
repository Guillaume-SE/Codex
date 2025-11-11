<script setup lang="ts">
import type { IMediaPresented } from '#interfaces/media_presented_interface'
import type User from '#models/user'
import type { MediaCategories } from '#types/MediaCategories'
import { Link } from '@inertiajs/vue3'
import { computed } from 'vue'
import MediaCover from '~/components/media/MediaCover.vue'
import FavoriteBadge from '~/components/ui/FavoriteBadge.vue'
import RatingBox from '~/components/ui/RatingBox.vue'
import StatusProgressBadge from '~/components/ui/StatusProgressBadge.vue'

const props = defineProps<{
  media: IMediaPresented
  mediaCategory: MediaCategories
  user?: User
}>()

const favoriteBadgeStatus = computed(() => {
  const isFavorite = props.media.review?.isFavorite
  const isLoggedIn = !!props.user

  if (isFavorite) {
    return 'filled'
  }

  if (isLoggedIn) {
    return 'outline'
  }

  // hide the badge
  return null
})
</script>

<template>
  <div class="media-card">
    <Link :href="`/categories/${mediaCategory}/${media.id}`">
      <MediaCover
        :cover="media.cover"
        :alt="`cover de ${media.name}`"
        :default-cover-url="media.defaultCover"
      />
      <p class="truncate">
        {{ media.name }}
      </p>
    </Link>
    <div class="media-card-info-container">
      <StatusProgressBadge :status="media.status" />

      <div class="flex items-center gap-2">
        <FavoriteBadge v-if="favoriteBadgeStatus" :variant="favoriteBadgeStatus" />
        <RatingBox :rating="media.review?.rating ? media.review.rating : null" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.media-card {
  width: 150px;
  min-height: 290px;
  margin: 10px;
  /* position: relative; */
}

/* .icon-favorite {
  position: absolute;
  top: -2px;
  right: 2px;
  z-index: 3;
} */
.media-card-info-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
