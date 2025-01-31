<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { computed, ref, watch } from 'vue'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import SelectComp from '~/components/ui/SelectComp.vue'
import AppLayout from '~/layouts/AppLayout.vue'

const props = defineProps<{
  statuses: InferPageProps<MediaController, 'showCreate'>['statuses']
  categories: InferPageProps<MediaController, 'showCreate'>['categories']
  categoryRelatedTypes: InferPageProps<MediaController, 'showCreate'>['categoryRelatedTypes']
  categoryRelatedGenres: InferPageProps<MediaController, 'showCreate'>['categoryRelatedGenres']
  tags: InferPageProps<MediaController, 'showCreate'>['tags']
  gamePlatforms: InferPageProps<MediaController, 'showCreate'>['gamePlatforms']
}>()

interface IForm {
  statusId: string
  categoryId: string
  typeId: string
  name: string
  alternativeName: string | null
  released: string | null
  synopsis: string | null
  tagId: string
  genreId: string[]
  platformId: string | null
  duration: string | null
  seriesSeasonLength: string | null
  animeSeasonLength: string | null
  pages: string | null
}

const newForm = useForm<IForm>({
  statusId: '',
  categoryId: '',
  typeId: '',
  name: '',
  alternativeName: null,
  released: null,
  synopsis: '',
  tagId: '1',
  genreId: [],
  platformId: null,
  duration: null,
  seriesSeasonLength: null,
  animeSeasonLength: null,
  pages: null,
})

const filteredTypesList = ref(props.categoryRelatedTypes[newForm.categoryId])
const filteredGenresList = ref(props.categoryRelatedGenres[newForm.categoryId])

watch(
  () => newForm.categoryId,
  (newCategoryId) => {
    filteredTypesList.value = props.categoryRelatedTypes[newCategoryId] || []
    filteredGenresList.value = props.categoryRelatedGenres[newCategoryId] || []
    resetFormValues()
  }
)

const resetFormValues = () => {
  newForm.typeId = ''
  newForm.genreId = []
  newForm.platformId = ''
  newForm.duration = ''
  newForm.seriesSeasonLength = ''
  newForm.animeSeasonLength = ''
  newForm.pages = ''
}

const currentCategory = computed(() => {
  const category = props.categories.find((category) => category.id === newForm.categoryId)
  return category
})
const isNoCategorySelected = computed(() => {
  return newForm.categoryId === '' ? true : false
})
</script>

<template>
  <AppHead title="Ajouter un media" />
  <AppLayout>
    <div>
      <form method="POST" @submit.prevent="newForm.post('/media')">
        <!-- status -->
        <div>
          <span>Progression (requis):</span>
          <div v-for="status in statuses">
            <LabelComp :text="status.name" textPosition="down">
              <InputComp v-model="newForm.statusId" type="radio" :value="status.id" />
            </LabelComp>
          </div>
        </div>
        <!-- category -->
        <div>
          <span>Catégorie (requis):</span>
          <div v-for="category in categories">
            <LabelComp :text="category.name" textPosition="down">
              <InputComp v-model="newForm.categoryId" type="radio" :value="category.id" />
            </LabelComp>
          </div>
        </div>
        <!-- type -->
        <div>
          <span>Type (requis):</span>
          <div v-if="isNoCategorySelected">
            <span>En attente d'un choix de catégorie</span>
          </div>
          <div v-for="type in filteredTypesList">
            <LabelComp :text="type.text" textPosition="down">
              <InputComp v-model="newForm.typeId" type="radio" :value="type.value" />
            </LabelComp>
          </div>
        </div>
        <!-- name -->
        <div>
          <LabelComp text="Nom du media (requis):" text-position="up">
            <InputComp
              v-model="newForm.name"
              type="text"
              placeholder="The Dark Knight: le Chevalier noir"
            />
          </LabelComp>
        </div>
        <!-- alternative name -->
        <div>
          <LabelComp text="Nom alternatif:" text-position="up">
            <InputComp
              v-model="newForm.alternativeName"
              type="text"
              placeholder="The Dark Knight"
            />
          </LabelComp>
        </div>
        <!-- released date -->
        <div>
          <LabelComp text="Date de sortie:" text-position="up">
            <InputComp v-model="newForm.released" type="date" />
          </LabelComp>
        </div>
        <!-- synopsis -->
        <div>
          <LabelComp text="Synopsis:" text-position="up" for="synopsis">
            <textarea
              v-model="newForm.synopsis"
              placeholder="Batman aborde une phase décisive de sa guerre contre le crime à Gotham City..."
              id="synopsis"
            ></textarea>
          </LabelComp>
        </div>
        <!-- recommandation tag -->
        <div>
          <span>Tag de recommandation (requis):</span>
          <div v-for="tag in tags">
            <LabelComp :text="tag.name" textPosition="down">
              <InputComp v-model="newForm.tagId" type="radio" :value="tag.id" />
            </LabelComp>
          </div>
        </div>
        <!-- genres -->
        <div>
          <span>Genres:</span>
          <div v-if="isNoCategorySelected">
            <span>En attente d'un choix de catégorie</span>
          </div>
          <div v-for="genre in filteredGenresList">
            <LabelComp :text="genre.text" textPosition="down">
              <InputComp v-model="newForm.genreId" type="checkbox" :value="genre.value" />
            </LabelComp>
          </div>
        </div>
        <div v-if="currentCategory">
          <!-- game platform -->
          <div v-if="currentCategory.name === 'game'">
            <span>Joué sur:</span>
            <div v-for="platform in gamePlatforms">
              <LabelComp :text="platform.name" textPosition="down">
                <InputComp v-model="newForm.platformId" type="radio" :value="platform.id" />
              </LabelComp>
            </div>
          </div>
          <!-- movie duration -->
          <div v-if="currentCategory.name === 'movie'">
            <LabelComp text="Durée du film en minutes" textPosition="up">
              <InputComp v-model="newForm.duration" type="text" placeholder="60,90,120..." />
            </LabelComp>
          </div>
          <!-- series season length -->
          <div v-if="currentCategory.name === 'series'">
            <LabelComp text="Nombres d'épisodes" textPosition="up">
              <InputComp v-model="newForm.seriesSeasonLength" type="number" min="1" />
            </LabelComp>
          </div>
          <!-- anime season length -->
          <div v-if="currentCategory.name === 'anime'">
            <LabelComp text="Nombres d'épisodes" textPosition="up">
              <InputComp v-model="newForm.animeSeasonLength" type="number" min="1" />
            </LabelComp>
          </div>
          <!-- books pages -->
          <div v-if="currentCategory.name === 'book'">
            <LabelComp text="Nombres de pages" textPosition="up">
              <InputComp v-model="newForm.pages" type="number" min="1" />
            </LabelComp>
          </div>
        </div>
        <ButtonComp type="submit"></ButtonComp>
      </form>
    </div>
  </AppLayout>
</template>
