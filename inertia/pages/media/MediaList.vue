<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import type User from '#models/user'
import type { MediaCategories } from '#types/MediaCategories'
import { InferPageProps } from '@adonisjs/inertia/types'
import { computed, toRef } from 'vue'
import AppHead from '~/components/AppHead.vue'
import FilterIcon from '~/components/icons/FilterIcon.vue'
import FilterDrawer from '~/components/media/filters/FilterDrawer.vue'
import MediaCard from '~/components/media/MediaCard.vue'
import MediaFilters from '~/components/media/MediaFilters.vue'
import Pagination from '~/components/Pagination.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
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

  <FilterDrawer>
    <div class="container mx-auto space-y-6 px-2 py-4">
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold capitalize">{{ categoryFr }}</h2>
        <span class="badge badge-neutral badge-lg">{{ mediaList.meta.total }} résultats</span>
      </div>

      <div class="bg-base-100 rounded-xl p-4 shadow-sm">
        <form method="GET" @submit.prevent="submitFilters" class="flex flex-col gap-4">
          <div class="flex flex-col gap-4 md:flex-row md:items-end">
            <div class="w-full md:flex-1">
              <label class="label py-0 pb-1">
                <span class="label-text text-base-content/70 text-xs font-bold"> Recherche </span>
              </label>
              <SearchBar
                v-model="filters.search"
                placeholder="Rechercher un nom..."
                @submit="submitFilters"
                class="w-full"
              />
            </div>

            <div class="flex flex-wrap items-end gap-4">
              <div class="min-w-[140px]">
                <label class="label py-0 pb-1">
                  <span class="label-text text-base-content/70 text-xs font-bold">Trier par</span>
                </label>
                <SelectComp v-model="filters.sortBy" :options="mediaSortOptions" />
              </div>

              <div>
                <label for="filter-drawer" class="btn btn-neutral w-full gap-2 md:w-auto">
                  <FilterIcon />
                  Filtres
                </label>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 md:pt-2">
            <InputComp
              v-model="filters.favorite"
              id="favorite-toggle"
              type="checkbox"
              variant="toggle"
              class="toggle-primary"
            />
            <LabelComp
              labelFor="favorite-toggle"
              text="Uniquement les coups de cœur"
              class="cursor-pointer"
            />
          </div>
        </form>
      </div>

      <div
        v-if="mediaListIsNotEmpty"
        class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3"
      >
        <MediaCard
          v-for="media in mediaList.data"
          :key="media.id"
          :media="media"
          :mediaCategory="mediaCategory"
          :user="user"
        />
      </div>

      <div v-else class="py-10 text-center">
        <p>Aucun résultat</p>
      </div>

      <div class="mt-8 flex justify-center">
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
    </div>

    <template #sidebar>
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
        class="flex flex-col gap-4"
      />
    </template>
    <template #footer-action>
      <div class="flex items-center gap-4">
        <button
          type="button"
          class="btn btn-outline border-base-content/50 text-base-content hover:border-error hover:text-error hover:bg-base-100"
          @click="resetFilters"
        >
          Réinitialiser
        </button>

        <label for="filter-drawer" class="btn btn-primary flex-1" @click="submitFilters">
          Voir les résultats
        </label>
      </div>
    </template>
  </FilterDrawer>
</template>
