<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import MediaCard from '~/components/MediaCard.vue'
import AppLayout from '~/layouts/AppLayout.vue'

defineProps<{
  categoriesOverview: InferPageProps<MediaController, 'showCategories'>['categoriesOverview']
}>()
</script>

<template>
  <AppHead title="Toutes les catégories" />
  <AppLayout>
    <div>
      <h3>Catégories</h3>
      <p>L'ensemble des catégories disponible sur le site.</p>
      <div v-for="category in categoriesOverview">
        <div>
          <h3>{{ category.label }}</h3>
          <Link :href="`/category/${category.category}`"> Voir tout </Link>
        </div>
        <div class="recommandations-carousel">
          <MediaCard
            v-for="media in category.lastAddedList"
            :key="media.id"
            :media="media"
            :mediaCategory="media.category"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>
