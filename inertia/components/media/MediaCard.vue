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
  <div
    class="bg-base-100 mx-auto w-full max-w-[13rem] rounded-xl border border-transparent transition-all duration-300 ease-out hover:-translate-y-1"
  >
    <figure class="relative px-3 pt-3">
      <div
        class="bg-base-100 absolute top-3 left-2 z-20 flex origin-top-left transform rounded-full p-[2px]"
      >
        <StatusProgressBadge :status="media.status" />
      </div>

      <div
        v-if="favoriteBadgeStatus"
        class="bg-base-100 absolute top-3 right-2 z-20 origin-top-right transform rounded-full p-[3px]"
      >
        <FavoriteBadge :variant="favoriteBadgeStatus" />
      </div>

      <Link
        :href="`/categories/${mediaCategory}/${media.id}`"
        class="block h-full w-full"
        tabindex="-1"
      >
        <MediaCover
          :cover="media.cover"
          :alt="`cover de ${media.name}`"
          :default-cover-url="media.defaultCover"
          class="mt-2 mb-1 h-full"
        />
      </Link>

      <div
        class="bg-base-100 absolute right-2 -bottom-1 z-20 origin-bottom-right transform rounded-full p-[2px]"
      >
        <RatingBox :rating="media.review?.rating ?? null" />
      </div>
    </figure>

    <div class="p-3 pt-1 text-left">
      <Link :href="`/categories/${mediaCategory}/${media.id}`" class="w-full min-w-0">
        <h2 class="w-full text-xs font-bold" :title="media.name">
          <span class="block w-full truncate">
            {{ media.name }}
          </span>
        </h2>
      </Link>
    </div>
  </div>
</template>
