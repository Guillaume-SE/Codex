<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { computed, onMounted, ref, watch } from 'vue'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { useFormattedDate } from '~/composables/useFormattedDate'
import AppLayout from '~/layouts/AppLayout.vue'

const props = defineProps<{
  statuses: InferPageProps<MediaController, 'showManage'>['statuses']
  categories: InferPageProps<MediaController, 'showManage'>['categories']
  categoryRelatedTypes: InferPageProps<MediaController, 'showManage'>['categoryRelatedTypes']
  categoryRelatedGenres: InferPageProps<MediaController, 'showManage'>['categoryRelatedGenres']
  tags: InferPageProps<MediaController, 'showManage'>['tags']
  gamePlatforms: InferPageProps<MediaController, 'showManage'>['gamePlatforms']
  media: InferPageProps<MediaController, 'showManage'>['media']
  // errors: Object
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
  genreId: number[]
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

const isForUpdate = ref(false)
const filteredTypesList = ref(props.categoryRelatedTypes[newForm.categoryId])
const filteredGenresList = ref(props.categoryRelatedGenres[newForm.categoryId])

onMounted(() => {
  if (props.media) {
    isForUpdate.value = true
    newForm.statusId = props.media.statusId
    newForm.categoryId = props.media.categoryId
    newForm.name = props.media.name
    newForm.alternativeName = props.media.alternativeName
    newForm.released = props.media.released ? formatDate(props.media.released) : null
    newForm.synopsis = props.media.synopsis
    newForm.tagId = props.media.tagId
  }
})

watch(
  () => newForm.categoryId,
  (newCategoryId) => {
    filteredTypesList.value = props.categoryRelatedTypes[newCategoryId] || []
    filteredGenresList.value = props.categoryRelatedGenres[newCategoryId] || []
    resetFormValues()

    if (props.media) {
      newForm.typeId = props.media.typeId
      newForm.genreId = props.media.genres.map((genre: { id: number; name: string }) => {
        return genre.id
      })
      newForm.platformId = props.media.gameInfo?.platformId
      newForm.duration = props.media.movieInfo?.duration
      newForm.seriesSeasonLength = props.media.seriesInfo?.seriesSeasonLength
      newForm.animeSeasonLength = props.media.animeInfo?.animeSeasonLength
      newForm.pages = props.media.bookInfo?.pages
    }
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

function submit() {
  if (isForUpdate.value === true) {
    return newForm.put(`/media/${props.media!.id}`)
  }
  return newForm.post('/media')
}

const formatDate = useFormattedDate
const currentCategory = computed(() => {
  const category = props.categories.find((category) => category.id === newForm.categoryId)
  return category
})
const isNoCategorySelected = computed(() => {
  return newForm.categoryId === '' ? true : false
})
</script>

<template>
  <AppHead title="Gestion de media" />
  <AppLayout>
    {{ props.media }}
    <div>
      <h3 v-if="props.media">Mise à jour de {{ props.media.name }}</h3>
      <h3 v-else>Ajout d'un nouveau media</h3>

      <form @submit.prevent="submit">
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
        <div v-if="props.media">
          <span>Catégorie:</span>
          <div>
            <LabelComp :text="props.media.category.name" textPosition="down">
              <InputComp
                v-model="newForm.categoryId"
                type="radio"
                :value="props.media.category.id"
              />
            </LabelComp>
          </div>
        </div>
        <div v-else>
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
          <LabelComp text="Nom de l'œuvre (requis):" text-position="up">
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
            <LabelComp text="Durée du film en minutes(ex: 60, 90...):" textPosition="up">
              <div>
                <InputComp v-model="newForm.duration" type="number" min="1" />
              </div>
            </LabelComp>
          </div>
          <!-- series season length -->
          <div v-if="currentCategory.name === 'series'">
            <LabelComp text="Nombres d'épisodes" textPosition="up">
              <div>
                <InputComp v-model="newForm.seriesSeasonLength" type="number" min="1" />
              </div>
            </LabelComp>
          </div>
          <!-- anime season length -->
          <div v-if="currentCategory.name === 'anime'">
            <LabelComp text="Nombres d'épisodes" textPosition="up">
              <div>
                <InputComp v-model="newForm.animeSeasonLength" type="number" min="1" />
              </div>
            </LabelComp>
          </div>
          <!-- books pages -->
          <div v-if="currentCategory.name === 'book'">
            <LabelComp text="Nombres de pages" textPosition="up">
              <div>
                <InputComp v-model="newForm.pages" type="number" min="1" />
              </div>
            </LabelComp>
          </div>
        </div>
        <!-- <div v-if="newForm.errors">{{ newForm.errors }}</div> -->
        <div>
          <ButtonComp type="submit" :disabled="newForm.processing"></ButtonComp>
        </div>
      </form>
    </div>
  </AppLayout>
</template>
