<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import type { Component } from 'vue'
import BookFilters from '~/components/media/filters/BookFilters.vue'
import GameFilters from '~/components/media/filters/GameFilters.vue'
import MovieFilters from '~/components/media/filters/MovieFilters.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { useCapitalizeFirstLetter } from '~/composables/useCapitalizeFirstLetter'

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
const durationModel = defineModel<string | number | undefined>('duration')
const publishersModel = defineModel<number[]>('publishers')
const favoriteModel = defineModel<boolean>('favorite')

const emit = defineEmits(['update:resetFormValues'])

function resetFormValues() {
  return emit('update:resetFormValues')
}

const capitalizeFirstLetter = useCapitalizeFirstLetter

const movieDurationOptions = [
  { text: 'Toute durée', value: '' },
  { text: '1h00', value: 60 },
  { text: '1h30', value: 90 },
  { text: '2h00', value: 120 },
  { text: '2h30', value: 160 },
  { text: '3h00', value: 180 },
  { text: '3h30', value: 210 },
  { text: '4h00', value: 240 },
  { text: '4h30', value: 270 },
]

const categoryFilterComponents: Record<string, Component> = {
  game: GameFilters,
  movie: MovieFilters,
  book: BookFilters,
}
</script>

<template>
  <ButtonComp type="submit" @click="resetFormValues"> Réinitialiser les filtres </ButtonComp>
  <!-- status -->
  <div>
    <span>Progression</span>
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
    <span>Types</span>
    <ul>
      <li v-for="type in typesList" :key="type.id">
        <InputComp v-model="typesModel" type="checkbox" :value="type.id" :id="`type-${type.id}`" />
        <LabelComp :labelFor="`type-${type.id}`" :text="capitalizeFirstLetter(type.name)" />
      </li>
    </ul>
  </div>
  <!-- genres -->
  <div>
    <span>Genres</span>
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
  <component
    :is="categoryFilterComponents[mediaCategory]"
    :platforms-list="platformsList"
    :movie-duration-options="movieDurationOptions"
    :publishers-list="publishersList"
    v-model:platforms="platformsModel"
    v-model:duration="durationModel"
    v-model:publishers="publishersModel"
  />
  <!-- data display -->
  <div>
    <span>Affichage</span>
    <LabelComp labelFor="favorite" text="Uniquement favoris" />
    <InputComp
      v-model="favoriteModel"
      id="favorite"
      type="checkbox"
      variant="toggle"
      class="border-slate-500 bg-slate-400 checked:border-green-500 checked:bg-green-400 checked:text-green-800"
    />
  </div>
  <ButtonComp type="submit"> Appliquer </ButtonComp>
</template>
