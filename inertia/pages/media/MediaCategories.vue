<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import MediaCard from '~/components/media/MediaCard.vue'

defineProps<{
  categoriesOverview: InferPageProps<MediaController, 'showCategories'>['categoriesOverview']
}>()
</script>

<template>
  <AppHead title="Toutes les catégories" />
  <div>
    <h3>Catégories</h3>
    <div v-for="category in categoriesOverview">
      <div>
        <h3>{{ category.label }}</h3>
        <Link :href="`/categories/${category.nameEng}`"> Voir tout </Link>
      </div>
      <div class="preview-carousel">
        <MediaCard
          v-for="media in category.lastAddedList"
          :key="media.id"
          :media="media"
          :mediaCategory="media.category"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-carousel {
  display: flex;
}
</style>
