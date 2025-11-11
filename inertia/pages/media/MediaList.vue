<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import type User from '#models/user'
import type { MediaCategories } from '#types/MediaCategories'
import { InferPageProps } from '@adonisjs/inertia/types'
import { computed, toRef } from 'vue'
import AppHead from '~/components/AppHead.vue'
import MediaCard from '~/components/media/MediaCard.vue'
import MediaFilters from '~/components/media/MediaFilters.vue'
import Pagination from '~/components/Pagination.vue'
import SearchBar from '~/components/ui/SearchBar.vue'
import SelectComp from '~/components/ui/SelectComp.vue'
import { useCategoryInfo } from '~/composables/useCategoryInfo'
import { usePaginatedMediaFilters } from '~/composables/usePaginatedMediaFilters'

const props = defineProps<{
  mediaList: InferPageProps<MediaController, 'showByCategory'>['mediaList']
  mediaCategory: MediaCategories
  mediaSortOptions: InferPageProps<MediaController, 'showByCategory'>['mediaSortOptions']
  mediaStatusesList: InferPageProps<MediaController, 'showByCategory'>['mediaStatusesList']
  mediaTypesList: InferPageProps<MediaController, 'showByCategory'>['mediaTypesList']
  mediaGenresList: InferPageProps<MediaController, 'showByCategory'>['mediaGenresList']
  gamePlatformsList: InferPageProps<MediaController, 'showByCategory'>['gamePlatformsList']
  bookPublishersList: InferPageProps<MediaController, 'showByCategory'>['bookPublishersList']
  user?: User
}>()

const categoryRef = toRef(props, 'mediaCategory')
const { title, categoryFr } = useCategoryInfo(categoryRef)
const { filters, submitFilters, fetchNewPageData, resetFilters } = usePaginatedMediaFilters(
  toRef(props, 'mediaCategory'),
  toRef(props, 'mediaSortOptions')
)

const mediaListIsNotEmpty = computed(() => {
  return props.mediaList.data.length > 0 ? true : false
})
</script>

<template>
  <AppHead :title="title" />
  <h2>{{ categoryFr }}</h2>
  <div class="flex">
    <div>
      <form method="GET" @submit.prevent="submitFilters">
        <div>
          <SearchBar
            v-model="filters.search"
            placeholder="Rechercher un nom"
            @submit="submitFilters"
          />
        </div>

        <div>
          <h3>Trier</h3>
          <span>Trier les résultats par</span>
          <SelectComp v-model="filters.sortBy" :options="mediaSortOptions" />
          <h3>Filtrer</h3>
          <!-- filters -->
          <MediaFilters
            v-model:status="filters.status"
            v-model:types="filters.types"
            v-model:genres="filters.genres"
            v-model:platforms="filters.platforms"
            v-model:duration="filters.duration"
            v-model:publishers="filters.publishers"
            v-model:favorite="filters.favorite"
            :statuses-list="mediaStatusesList"
            :types-list="mediaTypesList"
            :genres-list="mediaGenresList"
            :platforms-list="gamePlatformsList"
            :publishers-list="bookPublishersList"
            :media-category="mediaCategory"
            @update:reset-form-values="resetFilters"
          />
        </div>
      </form>
    </div>
    <!-- cards -->
    <div v-if="mediaListIsNotEmpty" class="flex flex-wrap">
      <MediaCard
        v-for="media in mediaList.data"
        :key="media.id"
        :media="media"
        :mediaCategory="mediaCategory"
        :user="user"
      />
    </div>
    <div v-else>
      <p>Aucun résultat</p>
    </div>
  </div>
  <!-- pagination -->
  <div>
    <Pagination
      :page="{
        currentPage: props.mediaList.meta.currentPage,
        firstPage: props.mediaList.meta.firstPage,
        lastPage: props.mediaList.meta.lastPage,
      }"
      :url="{
        firstPageUrl: props.mediaList.meta.firstPageUrl,
        lastPageUrl: props.mediaList.meta.lastPageUrl,
        nextPageUrl: props.mediaList.meta.nextPageUrl,
        previousPageUrl: props.mediaList.meta.previousPageUrl,
      }"
      @update:current-page="fetchNewPageData"
    />
  </div>
</template>
