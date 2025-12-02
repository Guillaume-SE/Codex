<script setup lang="ts">
import type { IMediaPresented } from '#interfaces/media_presented_interface'
import { computed } from 'vue'
import AppHead from '~/components/AppHead.vue'
import MediaCover from '~/components/media/MediaCover.vue'
import MediaSpecificDetails from '~/components/media/MediaSpecificDetails.vue'
import RatingBox from '~/components/ui/RatingBox.vue'
import StatusProgressBadge from '~/components/ui/StatusProgressBadge.vue'

const props = defineProps<{
  media: IMediaPresented
}>()

const hasReviewRating = computed(() =>
  props.media.review?.rating ? props.media.review.rating : null
)
</script>

<template>
  <AppHead :title="media.name" />
  <div>
    <!-- name -->
    <div>
      <h2>{{ media.name }}</h2>
      <StatusProgressBadge :status="media.status" />
    </div>
    <!-- cover -->
    <div class="w-64">
      <MediaCover
        :cover="media.cover"
        :alt="`cover de ${media.name}`"
        :default-cover-url="media.defaultCover"
      />
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
        <!-- released -->
        <p>Date de sortie: {{ media.released || 'N/A' }}</p>
        <MediaSpecificDetails :media="media" />
      </div>
      <div>
        <p>Ajouté {{ media.addedOn }}</p>
      </div>
    </div>
    <div>
      <h3>Avis</h3>
      <RatingBox :rating="hasReviewRating" />
      <div v-if="media.review">
        <div>Mis à jour {{ media.review!.lastUpdate }}</div>
      </div>
    </div>
  </div>
</template>
