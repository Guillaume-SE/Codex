<script setup lang="ts">
import type DashboardController from '#controllers/dashboard_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import ImageNotAvailableIcon from '~/components/icons/ImageNotAvailableIcon.vue'
import RatingBox from '~/components/RatingBox.vue'
import StatusProgressBadge from '~/components/StatusProgressBadge.vue'
import AppLayout from '~/layouts/AppLayout.vue'

defineProps<{
  mediaList: InferPageProps<DashboardController, 'showDashboard'>['mediaList']
}>()
</script>

<template>
  <AppHead title="Dashboard" />
  <AppLayout>
    <div>
      <h3>Media</h3>
      <Link href="/media/create">Ajouter un media</Link>
    </div>

    <div class="dashboard-list">
      <div v-for="media in mediaList" class="dashboard-list-item">
        <div v-if="media.cover" class="dashboard-list_img">
          <Link :href="`/media/${media.id}/cover`">
            <img
              class="img-preview"
              loading="lazy"
              :src="`/storage/${media.cover.smallUrl}`"
              :srcset="`/storage/${media.cover.smallUrl}, /storage/${media.cover.mediumUrl} 2x`"
              :alt="`cover de ${media.name}`"
            />
          </Link>
        </div>
        <div v-else class="dashboard-list_img">
          <Link :href="`/media/${media.id}/cover`">
            <div class="no-cover-preview">
              <ImageNotAvailableIcon />
            </div>
          </Link>
        </div>

        <div>
          <p>{{ media.name }}</p>
        </div>
        <div>
          <Link :href="`/media/${media.id}/review`">
            <RatingBox :rating="media.review?.rating ? media.review.rating : null" />
          </Link>
        </div>
        <div>
          <StatusProgressBadge
            :status="media.status"
            :class="'status-progress-text-small status-progress-container-small'"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>
