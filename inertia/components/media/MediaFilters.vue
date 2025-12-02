<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { computed, onMounted, ref, type Component } from 'vue'
import BookFilters from '~/components/media/filters/BookFilters.vue'
import GameFilters from '~/components/media/filters/GameFilters.vue'
import MovieFilters from '~/components/media/filters/MovieFilters.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import FilterTitleComp from '~/components/ui/FilterTitleComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { useCapitalizeFirstLetter } from '~/composables/useCapitalizeFirstLetter'
import { MAX_MOVIE_DURATION } from '~/composables/usePaginatedMediaFilters'

defineProps<{
  statusesList: InferPageProps<MediaController, 'showByCategory'>['mediaStatusesList']
  typesList: InferPageProps<MediaController, 'showByCategory'>['mediaTypesList']
  genresList: InferPageProps<MediaController, 'showByCategory'>['mediaGenresList']
  platformsList: InferPageProps<MediaController, 'showByCategory'>['gamePlatformsList']
  publishersList: InferPageProps<MediaController, 'showByCategory'>['bookPublishersList']
  mediaCategory: string
}>()

const statusModel = defineModel<number[]>('status')
const typesModel = defineModel<number[]>('types')
const genresModel = defineModel<number[]>('genres')
const platformsModel = defineModel<number[]>('platforms')
const durationModel = defineModel<string>('duration')
const publishersModel = defineModel<number[]>('publishers')
const favoriteModel = defineModel<boolean>('favorite')

const emit = defineEmits(['update:resetFormValues'])

function resetFormValues() {
  return emit('update:resetFormValues')
}

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const isStatusActive = computed(
  () => isMounted.value && statusModel.value && statusModel.value.length > 0
)
const isTypesActive = computed(
  () => isMounted.value && typesModel.value && typesModel.value.length > 0
)
const isGenresActive = computed(
  () => isMounted.value && genresModel.value && genresModel.value.length > 0
)
const isFavoriteActive = computed(() => isMounted.value && favoriteModel.value === true)

const isCategoryFilterActive = computed(() => {
  if (!isMounted.value) return false

  const platformsActive = platformsModel.value && platformsModel.value.length > 0
  const publishersActive = publishersModel.value && publishersModel.value.length > 0
  const durationActive = durationModel.value && durationModel.value !== MAX_MOVIE_DURATION

  return platformsActive || publishersActive || durationActive
})

const capitalizeFirstLetter = useCapitalizeFirstLetter

const categoryFilterComponents: Record<string, Component> = {
  game: GameFilters,
  movie: MovieFilters,
  book: BookFilters,
}
</script>

<template>
  <ButtonComp type="button" @click="resetFormValues"> Réinitialiser les filtres </ButtonComp>
  <!-- status -->
  <div>
    <FilterTitleComp title="Progression" :is-active="isStatusActive" />
    <ul>
      <li v-for="status in statusesList" :key="status.id">
        <InputComp
          v-model="statusModel"
          type="checkbox"
          :value="status.id"
          :id="`status-${status.id}`"
        />
        <LabelComp :labelFor="`status-${status.id}`" :text="capitalizeFirstLetter(status.name)" />
      </li>
    </ul>
  </div>
  <!-- types -->
  <div>
    <FilterTitleComp title="Type" :is-active="isTypesActive" />
    <ul>
      <li v-for="type in typesList" :key="type.id">
        <InputComp v-model="typesModel" type="checkbox" :value="type.id" :id="`type-${type.id}`" />
        <LabelComp :labelFor="`type-${type.id}`" :text="capitalizeFirstLetter(type.name)" />
      </li>
    </ul>
  </div>
  <!-- genres -->
  <div>
    <FilterTitleComp title="Genre" :is-active="isGenresActive" />
    <ul>
      <li v-for="genre in genresList" :key="genre.id">
        <InputComp
          v-model="genresModel"
          type="checkbox"
          :value="genre.id"
          :id="`genre-${genre.id}`"
        />
        <LabelComp :labelFor="`genre-${genre.id}`" :text="capitalizeFirstLetter(genre.name)" />
      </li>
    </ul>
  </div>
  <!-- category related filters -->
  <div>
    <component
      :is="categoryFilterComponents[mediaCategory]"
      :is-active="isCategoryFilterActive"
      :platforms-list="platformsList"
      :publishers-list="publishersList"
      v-model:platforms="platformsModel"
      v-model:duration="durationModel"
      v-model:publishers="publishersModel"
    />
  </div>
  <!-- data display -->
  <div>
    <FilterTitleComp title="Affichage" :is-active="isFavoriteActive" />
    <LabelComp labelFor="favorite" text="Uniquement favoris" />
    <InputComp v-model="favoriteModel" id="favorite" type="checkbox" variant="toggle" />
  </div>
  <ButtonComp type="submit">Appliquer</ButtonComp>
</template>
