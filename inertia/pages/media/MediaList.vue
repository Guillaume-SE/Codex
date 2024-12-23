<script setup lang="ts">
import MediaController from '#controllers/media_controller'
import type { MediaCategories, MediaCategoriesFr } from '#types/MediaCategories'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { onMounted } from 'vue'
import AppHead from '~/components/AppHead.vue'
import MediaCard from '~/components/MediaCard.vue'
import MediaFilters from '~/components/MediaFilters.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import AppLayout from '~/layouts/AppLayout.vue'

const props = defineProps<{
  title: string
  mediaList: InferPageProps<MediaController, 'showByCategory'>['mediaList']
  mediaCategory: MediaCategories
  mediaCategoryFr: MediaCategoriesFr
  mediaStatusesList: InferPageProps<MediaController, 'showByCategory'>['mediaStatusesList']
  mediaTypesList: InferPageProps<MediaController, 'showByCategory'>['mediaTypesList']
  mediaGenresList: InferPageProps<MediaController, 'showByCategory'>['mediaGenresList']
  gamePlatformsList: InferPageProps<MediaController, 'showByCategory'>['gamePlatformsList']
}>()

interface IFilters {
  search: string
  status: number[]
  types: number[]
  genres: number[]
  platforms: number[]
  duration: string | undefined
}

// argument passed to conserve values when navigate between pages
const filters = useForm<IFilters>('filterResults', {
  search: '',
  status: [],
  types: [],
  genres: [],
  platforms: [],
  duration: '',
})

function fetchNewPageData(url: string | null) {
  filters.get(`${url}`, { preserveState: true })
}

interface IHandlePaginationOptions {
  toFirstPage?: boolean
  toPreviousPage?: boolean
  toNextPage?: boolean
  toLastPage?: boolean
}

function handlePaginationClick(navigationOptions: IHandlePaginationOptions) {
  const currentPageIsNotFirstPage =
    props.mediaList.meta.currentPage > props.mediaList.meta.firstPage
  const currentPageIsNotLastPage = props.mediaList.meta.currentPage < props.mediaList.meta.lastPage

  if (currentPageIsNotFirstPage) {
    if (navigationOptions.toFirstPage) {
      return fetchNewPageData(props.mediaList.meta.firstPageUrl)
    } else if (navigationOptions.toPreviousPage) {
      return fetchNewPageData(props.mediaList.meta.previousPageUrl)
    }
  }
  if (currentPageIsNotLastPage) {
    if (navigationOptions.toLastPage) {
      return fetchNewPageData(props.mediaList.meta.lastPageUrl)
    } else if (navigationOptions.toNextPage) {
      return fetchNewPageData(props.mediaList.meta.nextPageUrl)
    }
  }
}

function resetFormValues() {
  filters.defaults({
    status: [],
    types: [],
    genres: [],
    platforms: [],
    duration: '',
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
    <div class="media-list-container">
      <div>
        <form
          method="GET"
          @submit.prevent="filters.get(`/media/${props.mediaCategory}`, { preserveState: true })"
        >
          <div>
            <!-- search -->
            <LabelComp text="Recherche" textPosition="up">
              <InputComp
                v-model="filters.search"
                type="search"
                :placeholder="`Rechercher un${mediaCategoryFr === 'série' ? 'e' : ''} ${mediaCategoryFr}`"
              />
            </LabelComp>
            <button type="submit">Rechercher</button>
          </div>

          <!-- filters -->
          <div>
            <h3>Filtrer</h3>
            <button type="submit" @click="resetFormValues">Réinitialiser les filtres</button>
            <MediaFilters
              v-model:status="filters.status"
              v-model:types="filters.types"
              v-model:genres="filters.genres"
              v-model:platforms="filters.platforms"
              v-model:duration="filters.duration"
              :statuses-list="mediaStatusesList"
              :types-list="mediaTypesList"
              :genres-list="mediaGenresList"
              :platforms-list="gamePlatformsList"
              :media-category="mediaCategory"
            />

            <button type="submit">Appliquer</button>
          </div>
        </form>
      </div>

      <!-- cards -->
      <div v-if="mediaList.data.length > 0" class="media-card-container">
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
      <nav>
        <button
          :disabled="props.mediaList.meta.currentPage === props.mediaList.meta.firstPage"
          @click="handlePaginationClick({ toFirstPage: true })"
        >
          <<
        </button>
        <button
          :disabled="props.mediaList.meta.currentPage === props.mediaList.meta.firstPage"
          @click="handlePaginationClick({ toPreviousPage: true })"
        >
          <
        </button>
        <span>{{ props.mediaList.meta.currentPage }} / {{ props.mediaList.meta.lastPage }}</span>
        <button
          :disabled="props.mediaList.meta.currentPage === props.mediaList.meta.lastPage"
          @click="handlePaginationClick({ toNextPage: true })"
        >
          >
        </button>
        <button
          :disabled="props.mediaList.meta.currentPage === props.mediaList.meta.lastPage"
          @click="handlePaginationClick({ toLastPage: true })"
        >
          >>
        </button>
      </nav>
    </div>
  </AppLayout>
</template>
