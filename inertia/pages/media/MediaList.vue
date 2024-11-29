<script setup lang="ts">
import MediaController from '#controllers/media_controller'
import type { MediaCategories, MediaCategoriesFr } from '#types/MediaCategories'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import MediaCard from '~/components/MediaCard.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { useCapitalizeFirstLetter } from '~/composables/useCapitalizeFirstLetter'
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
}

const filters = useForm<IFilters>({
  search: '',
  status: [],
  types: [],
  genres: [],
  platforms: [],
})

const capitalizeFirstLetter = useCapitalizeFirstLetter

function fetchNewPageData(url: string | null) {
  filters.get(`${url}`, { preserveState: true })
}

function handlePrevClick(toFirstPage: boolean) {
  if (props.mediaList.meta.currentPage > props.mediaList.meta.firstPage) {
    if (toFirstPage) {
      return fetchNewPageData(props.mediaList.meta.firstPageUrl)
    }
    return fetchNewPageData(props.mediaList.meta.previousPageUrl)
  }
}

function handleNextClick(toLastPage: boolean) {
  if (props.mediaList.meta.currentPage < props.mediaList.meta.lastPage) {
    if (toLastPage) {
      return fetchNewPageData(props.mediaList.meta.lastPageUrl)
    }
    return fetchNewPageData(props.mediaList.meta.nextPageUrl)
  }
}
</script>

<template>
  <AppHead :title="title" />
  <AppLayout>
    <div class="media-list-container">
      <!-- search -->
      <div>
        <form
          method="GET"
          @submit.prevent="filters.get(`/media/${props.mediaCategory}`, { preserveState: true })"
        >
          <div>
            <LabelComp text="Recherche" textPosition="up">
              <InputComp
                v-model="filters.search"
                type="search"
                :placeholder="`Rechercher un${mediaCategoryFr === 'série' ? 'e' : ''} ${mediaCategoryFr}...`"
              />
            </LabelComp>
            <button type="submit">Rechercher</button>
          </div>

          <div>
            <h3>Filtrer</h3>
            <div>
              <span>Progression</span>
              <div>
                <ul>
                  <li v-for="status in mediaStatusesList" :key="status.id">
                    <LabelComp :text="capitalizeFirstLetter(status.name)" textPosition="down">
                      <InputComp v-model="filters.status" type="checkbox" :value="status.id" />
                    </LabelComp>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <span>Types</span>
              <ul>
                <li v-for="type in mediaTypesList" :key="type.id">
                  <LabelComp :text="capitalizeFirstLetter(type.name)" textPosition="down">
                    <InputComp
                      v-model="filters.types"
                      type="checkbox"
                      :id="`type-${type.id}`"
                      :value="type.id"
                    />
                  </LabelComp>
                </li>
              </ul>
            </div>

            <div>
              <span>Genres</span>
              <ul>
                <li v-for="genre in mediaGenresList" :key="genre.id">
                  <LabelComp :text="capitalizeFirstLetter(genre.name)" textPosition="down">
                    <InputComp v-model="filters.genres" type="checkbox" :value="genre.id" />
                  </LabelComp>
                </li>
              </ul>
            </div>

            <div v-if="props.mediaCategory === 'game'">
              <span>Plateformes</span>
              <ul>
                <li v-for="plateforme in gamePlatformsList" :key="plateforme.id">
                  <LabelComp :text="capitalizeFirstLetter(plateforme.name)" textPosition="down">
                    <InputComp v-model="filters.platforms" type="checkbox" :value="plateforme.id" />
                  </LabelComp>
                </li>
              </ul>
            </div>

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
    <div>
      <nav>
        <button
          :disabled="props.mediaList.meta.currentPage === props.mediaList.meta.firstPage"
          @click="handlePrevClick(true)"
        >
          <<
        </button>
        <button
          :disabled="props.mediaList.meta.currentPage === props.mediaList.meta.firstPage"
          @click="handlePrevClick(false)"
        >
          <
        </button>
        <span>{{ props.mediaList.meta.currentPage }} / {{ props.mediaList.meta.lastPage }}</span>
        <button
          :disabled="props.mediaList.meta.currentPage === props.mediaList.meta.lastPage"
          @click="handleNextClick(false)"
        >
          >
        </button>
        <button
          :disabled="props.mediaList.meta.currentPage === props.mediaList.meta.lastPage"
          @click="handleNextClick(true)"
        >
          >>
        </button>
      </nav>
    </div>
  </AppLayout>
</template>
