<script setup lang="ts">
import type DashboardController from '#controllers/dashboard_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/vue3'
import RatingBox from '~/components/RatingBox.vue'
import StatusProgressBadge from '~/components/StatusProgressBadge.vue'
import ImageNotAvailableIcon from '~/components/icons/ImageNotAvailableIcon.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'

const props = defineProps<{
  media: InferPageProps<DashboardController, 'showDashboard'>['mediaList']['data'][0]
}>()

const emit = defineEmits(['delete-item'])

function requestDeletion() {
  emit('delete-item', { id: props.media.id, name: props.media.name })
}
</script>

<template>
  <div class="dashboard-list-item">
    <div class="dashboard-item-name-container">
      <div v-if="props.media.cover" class="dashboard-list_img">
        <Link :href="`/media/${props.media.id}/cover`">
          <img
            class="img-preview"
            loading="lazy"
            :src="`/storage/${props.media.cover.smallUrl}`"
            :srcset="`/storage/${props.media.cover.smallUrl}, /storage/${props.media.cover.mediumUrl} 2x`"
            :alt="`cover de ${props.media.name}`"
          />
        </Link>
      </div>
      <div v-else class="dashboard-list_img">
        <Link :href="`/media/${props.media.id}/cover`">
          <div class="no-cover-preview">
            <ImageNotAvailableIcon />
          </div>
        </Link>
      </div>
      <Link :href="`/media/manage/${props.media.id}`">
        <p class="dashboard-item-name">{{ props.media.name }}</p>
      </Link>
    </div>

    <div>
      <Link :href="`/media/${props.media.id}/review`">
        <RatingBox :rating="props.media.review?.rating ? props.media.review.rating : null" />
      </Link>
    </div>

    <StatusProgressBadge :status="props.media.status" />

    <div>
      <ButtonComp @click="requestDeletion">Supprimer</ButtonComp>
    </div>
  </div>
</template>

<style scoped>
.dashboard-list-item {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.dashboard-list_img {
  width: 30px;
  height: 45px;
  object-fit: cover;
  flex-shrink: 0;
}
.img-preview,
.no-cover-preview {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
.no-cover-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}
.dashboard-item-name-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
.dashboard-item-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
