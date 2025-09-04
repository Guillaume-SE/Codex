<script setup lang="ts">
import type { IMediaPresented } from '#interfaces/media_presented_interface'
import { computed } from 'vue'
import AppHead from '~/components/AppHead.vue'
import MediaCover from '~/components/media/MediaCover.vue'
import MediaSpecificDetails from '~/components/media/MediaSpecificDetails.vue'
import RatingBox from '~/components/RatingBox.vue'
import StatusProgressBadge from '~/components/StatusProgressBadge.vue'
import { useFormattedDateToLocale } from '~/composables/useFormattedDate'

const props = defineProps<{
  media: IMediaPresented
}>()

const hasReviewRating = computed(() =>
  props.media.review?.rating ? props.media.review.rating : null
)
const formattedDate = useFormattedDateToLocale
</script>

<template>
  <AppHead :title="media.name" />
  <div class="media-profile-container">
    <!-- name -->
    <div class="media-profile-title-container">
      <h2 class="media-profile-name">{{ media.name }}</h2>
      <StatusProgressBadge :status="media.status" />
    </div>
    <!-- cover -->
    <MediaCover
      :cover="media.cover"
      :alt="`cover de ${media.name}`"
      :default-cover-url="media.defaultCover"
      size="large"
    />
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
        <!-- released -->
        <p>Date de sortie: {{ formattedDate(media.released) || 'N/A' }}</p>
        <MediaSpecificDetails :media="media" />
      </div>
    </div>
    <div>
      <h3>Avis</h3>
      <RatingBox :rating="hasReviewRating" />
      <div v-if="media.review">
        <div>Mis à jour le {{ formattedDate(media.review!.lastUpdate, true) }}</div>
      </div>
    </div>
  </div>
</template>
