<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import type { MediaCategories, MediaCategoriesFr } from '#types/MediaCategories'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { onMounted } from 'vue'
import AppHead from '~/components/AppHead.vue'
import MediaCard from '~/components/MediaCard.vue'
import MediaFilters from '~/components/MediaFilters.vue'
import Pagination from '~/components/Pagination.vue'
import SearchBar from '~/components/SearchBar.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import SelectComp from '~/components/ui/SelectComp.vue'
import AppLayout from '~/layouts/AppLayout.vue'

const props = defineProps<{
  title: string
  mediaList: InferPageProps<MediaController, 'showByCategory'>['mediaList']
  mediaCategory: MediaCategories
  mediaCategoryFr: MediaCategoriesFr
  mediaSortOptions: InferPageProps<MediaController, 'showByCategory'>['mediaSortOptions']
  mediaStatusesList: InferPageProps<MediaController, 'showByCategory'>['mediaStatusesList']
  mediaTypesList: InferPageProps<MediaController, 'showByCategory'>['mediaTypesList']
  mediaGenresList: InferPageProps<MediaController, 'showByCategory'>['mediaGenresList']
  gamePlatformsList: InferPageProps<MediaController, 'showByCategory'>['gamePlatformsList']
}>()

interface IFilters {
  search: string
  sortBy: string
  status: number[]
  types: number[]
  genres: number[]
  platforms: number[]
  duration: string | undefined
  favorite: boolean
}

// argument passed to conserve values when navigate between pages
const filters = useForm<IFilters>('filterResults', {
  search: '',
  sortBy: props.mediaSortOptions[0].value,
  status: [],
  types: [],
  genres: [],
  platforms: [],
  duration: '',
  favorite: false,
})

// paginate with filters included
function fetchNewPageData(url: string | null) {
  filters.get(`${url}`, { preserveState: true })
}

function resetFormValues() {
  filters.defaults({
    sortBy: props.mediaSortOptions[0].value,
    status: [],
    types: [],
    genres: [],
    platforms: [],
    duration: '',
    favorite: false,
  })
  if (props.mediaCategory !== 'movie') {
    filters.defaults('duration', undefined)
  }
  filters.reset()
}

onMounted(() => {
  if (props.mediaCategory !== 'movie') {
    filters.duration = undefined
  }
})
</script>

<template>
  <AppHead :title="title" />
  <AppLayout>
    <h2>{{ mediaCategoryFr }}</h2>
    <div class="media-list-container">
      <div>
        <form
          method="GET"
          @submit.prevent="filters.get(`/category/${props.mediaCategory}`, { preserveState: true })"
        >
          <div>
            <!-- search -->
            <SearchBar
              v-model="filters.search"
              :placeholder="`Rechercher un${mediaCategoryFr === 'série' ? 'e' : ''} ${mediaCategoryFr}`"
            />
          </div>

          <div>
            <h3>Trier</h3>
            <span>Trier les résultats par</span>
            <SelectComp v-model="filters.sortBy" :options="mediaSortOptions" />
            <h3>Filtrer</h3>
            <!-- reset -->
            <ButtonComp type="submit" @click="resetFormValues">
              Réinitialiser les filtres
            </ButtonComp>
            <!-- filters -->
            <MediaFilters
              v-model:status="filters.status"
              v-model:types="filters.types"
              v-model:genres="filters.genres"
              v-model:platforms="filters.platforms"
              v-model:duration="filters.duration"
              v-model:favorite="filters.favorite"
              :statuses-list="mediaStatusesList"
              :types-list="mediaTypesList"
              :genres-list="mediaGenresList"
              :platforms-list="gamePlatformsList"
              :media-category="mediaCategory"
            />

            <ButtonComp type="submit">Appliquer</ButtonComp>
          </div>
        </form>
      </div>

      <!-- cards -->
      <div v-if="mediaList.data.length > 0" class="media-card-container">
        <span>{{ mediaList.meta.total }} résultats</span>
        <MediaCard
          v-for="media in mediaList.data"
          :key="media.id"
          :media="media"
          :mediaCategory="mediaCategory"
          :mediaCategoryFr="mediaCategoryFr"
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
  </AppLayout>
</template>
