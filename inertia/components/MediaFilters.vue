<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import SelectComp from '~/components/ui/SelectComp.vue'
import { useCapitalizeFirstLetter } from '~/composables/useCapitalizeFirstLetter'
import ButtonComp from './ui/ButtonComp.vue'

defineProps<{
  statusesList: InferPageProps<MediaController, 'showByCategory'>['mediaStatusesList']
  typesList: InferPageProps<MediaController, 'showByCategory'>['mediaTypesList']
  genresList: InferPageProps<MediaController, 'showByCategory'>['mediaGenresList']
  platformsList: InferPageProps<MediaController, 'showByCategory'>['gamePlatformsList']
  mediaCategory: string
}>()

const statusModel = defineModel<number[]>('status')
const typesModel = defineModel<number[]>('types')
const genresModel = defineModel<number[]>('genres')
const platformsModel = defineModel<number[]>('platforms')
const durationModel = defineModel<string | undefined>('duration')
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
</script>

<template>
  <ButtonComp type="submit" @click="resetFormValues"> Réinitialiser les filtres </ButtonComp>
  <!-- status -->
  <div>
    <span>Progression</span>
    <ul>
      <li v-for="status in statusesList" :key="status.id">
        <LabelComp :text="capitalizeFirstLetter(status.name)" textPosition="down">
          <InputComp v-model="statusModel" type="checkbox" :value="status.id" />
        </LabelComp>
      </li>
    </ul>
  </div>
  <!-- types -->
  <div>
    <span>Types</span>
    <ul>
      <li v-for="type in typesList" :key="type.id">
        <LabelComp :text="capitalizeFirstLetter(type.name)" textPosition="down">
          <InputComp v-model="typesModel" type="checkbox" :value="type.id" />
        </LabelComp>
      </li>
    </ul>
  </div>
  <!-- genres -->
  <div>
    <span>Genres</span>
    <ul>
      <li v-for="genre in genresList" :key="genre.id">
        <LabelComp :text="capitalizeFirstLetter(genre.name)" textPosition="down">
          <InputComp v-model="genresModel" type="checkbox" :value="genre.id" />
        </LabelComp>
      </li>
    </ul>
  </div>
  <!-- platforms -->
  <div v-if="mediaCategory === 'game'">
    <span>Plateformes</span>
    <ul>
      <li v-for="platform in platformsList" :key="platform.id">
        <LabelComp :text="capitalizeFirstLetter(platform.name)" textPosition="down">
          <InputComp v-model="platformsModel" type="checkbox" :value="platform.id" />
        </LabelComp>
      </li>
    </ul>
  </div>
  <!-- duration -->
  <div v-if="mediaCategory === 'movie'">
    <span>Durée maximale</span>
    <SelectComp v-model="durationModel" :options="movieDurationOptions" />
  </div>
  <!-- data display -->
  <div>
    <span>Affichage</span>
    <LabelComp text="Tous les résultats" textPosition="down">
      <InputComp v-model="favoriteModel" type="radio" value="false" />
    </LabelComp>

    <LabelComp text="Favoris uniquement" textPosition="down">
      <InputComp v-model="favoriteModel" type="radio" value="true" />
    </LabelComp>
  </div>
  <ButtonComp type="submit">Appliquer</ButtonComp>
</template>
