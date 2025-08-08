<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { computed, onMounted, ref, watch } from 'vue'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { useFormatCategoryNameInFr } from '~/composables/useFormatCategoryNameInFr'
import { useFormattedDate } from '~/composables/useFormattedDate'

interface IForm {
  statusId: string
  categoryId: string
  typeId: string
  name: string
  alternativeName: string | null
  released: string | null
  synopsis: string | null
  genreId: number[]
  platformId: string | null
  duration: string | null
  seriesSeasonLength: string | null
  animeSeasonLength: string | null
  pages: string | null
}

const props = defineProps<{
  statuses: InferPageProps<MediaController, 'showManage'>['statuses']
  categories: InferPageProps<MediaController, 'showManage'>['categories']
  categoryAssociations: InferPageProps<MediaController, 'showManage'>['categoryAssociations']
  gamePlatforms: InferPageProps<MediaController, 'showManage'>['gamePlatforms']
  media?: InferPageProps<MediaController, 'showManage'>['media']
  errors: Record<string, string[]>
}>()

const form = useForm<IForm>({
  statusId: '',
  categoryId: '',
  typeId: '',
  name: '',
  alternativeName: null,
  released: null,
  synopsis: '',
  genreId: [],
  platformId: null,
  duration: null,
  seriesSeasonLength: null,
  animeSeasonLength: null,
  pages: null,
})

const isForUpdate = ref<boolean>(false)
const filteredTypesList = ref(props.categoryAssociations[form.categoryId]?.types || [])
const filteredGenresList = ref(props.categoryAssociations[form.categoryId]?.genres || [])

onMounted(() => {
  if (props.media) {
    isForUpdate.value = true
    form.statusId = props.media.statusId
    form.categoryId = props.media.categoryId
    form.name = props.media.name
    form.alternativeName = props.media.alternativeName
    form.released = props.media.released ? formatDate(props.media.released) : null
    form.synopsis = props.media.synopsis
  }
})

watch(
  () => form.categoryId,
  (newCategoryId) => {
    const selectedCategoryData = props.categoryAssociations[newCategoryId] || {
      types: [],
      genres: [],
    }
    filteredTypesList.value = selectedCategoryData.types
    filteredGenresList.value = selectedCategoryData.genres
    resetFormValues()

    if (props.media) {
      form.typeId = props.media.typeId
      form.genreId = props.media.genres.map((genre: { id: number; name: string }) => {
        return genre.id
      })
      form.platformId = props.media.gameInfo?.platformId
      form.duration = props.media.movieInfo?.duration
      form.seriesSeasonLength = props.media.seriesInfo?.seriesSeasonLength
      form.animeSeasonLength = props.media.animeInfo?.animeSeasonLength
      form.pages = props.media.bookInfo?.pages
    }
  }
)

const resetFormValues = () => {
  form.typeId = ''
  form.genreId = []
  form.platformId = ''
  form.duration = ''
  form.seriesSeasonLength = ''
  form.animeSeasonLength = ''
  form.pages = ''
}

function submit() {
  if (isForUpdate.value === true) {
    return form.put(`/media/${props.media!.id}`)
  }
  return form.post('/media')
}

const formatDate = useFormattedDate
const currentCategory = computed(() => {
  const category = props.categories.find((category) => category.id === form.categoryId)
  return category
})
const isNoCategorySelected = computed(() => {
  return form.categoryId === '' ? true : false
})

const formatCategoryName = useFormatCategoryNameInFr
</script>

<template>
  <AppHead title="Gestion de media" />
  <div>
    <h3 v-if="props.media">Mise à jour de {{ props.media.name }}</h3>
    <h3 v-else>Ajout d'un nouveau media</h3>

    <form @submit.prevent="submit">
      <!-- category -->
      <div v-if="props.media">
        <span>Catégorie:</span>
        <div>
          <LabelComp :text="formatCategoryName(props.media.category.name)" textPosition="down">
            <InputComp v-model="form.categoryId" type="radio" :value="props.media.category.id" />
          </LabelComp>
        </div>
      </div>
      <div v-else>
        <span>Catégorie (requis):</span>
        <div v-for="category in categories">
          <LabelComp :text="formatCategoryName(category.name)" textPosition="down">
            <InputComp v-model="form.categoryId" type="radio" :value="category.id" />
          </LabelComp>
        </div>
        <FormErrorComp v-if="errors.categoryId" :message="errors.categoryId" />
      </div>
      <!-- type -->
      <div>
        <span>Type (requis):</span>
        <div v-if="isNoCategorySelected">
          <span>En attente d'un choix de catégorie</span>
        </div>
        <div v-for="type in filteredTypesList">
          <LabelComp :text="type.text" textPosition="down">
            <InputComp v-model="form.typeId" type="radio" :value="type.value" />
          </LabelComp>
        </div>
        <FormErrorComp v-if="errors.typeId" :message="errors.typeId" />
      </div>
      <!-- name -->
      <div>
        <LabelComp text="Nom de l'œuvre (requis):" text-position="up">
          <InputComp
            v-model="form.name"
            type="text"
            placeholder="The Dark Knight: le Chevalier noir"
          />
        </LabelComp>
        <FormErrorComp v-if="errors.name" :message="errors.name" />
      </div>
      <!-- alternative name -->
      <div>
        <LabelComp text="Nom alternatif:" text-position="up">
          <InputComp v-model="form.alternativeName" type="text" placeholder="The Dark Knight" />
        </LabelComp>
        <FormErrorComp v-if="errors.alternativeName" :message="errors.alternativeName" />
      </div>
      <!-- released date -->
      <div>
        <LabelComp text="Date de sortie:" text-position="up">
          <InputComp v-model="form.released" type="date" />
        </LabelComp>
        <FormErrorComp v-if="errors.released" :message="errors.released" />
      </div>
      <!-- synopsis -->
      <div>
        <LabelComp text="Synopsis:" text-position="up" for="synopsis">
          <textarea
            v-model="form.synopsis"
            placeholder="Batman aborde une phase décisive de sa guerre contre le crime à Gotham City..."
            id="synopsis"
          ></textarea>
        </LabelComp>
        <FormErrorComp v-if="errors.synopsis" :message="errors.synopsis" />
      </div>
      <!-- genres -->
      <div>
        <span>Genres:</span>
        <div v-if="isNoCategorySelected">
          <span>En attente d'un choix de catégorie</span>
        </div>
        <div v-for="genre in filteredGenresList">
          <LabelComp :text="genre.text" textPosition="down">
            <InputComp v-model="form.genreId" type="checkbox" :value="genre.value" />
          </LabelComp>
        </div>
        <FormErrorComp v-if="errors.genreId" :message="errors.genreId" />
      </div>
      <div v-if="currentCategory">
        <!-- game platform -->
        <div v-if="currentCategory.name === 'game'">
          <span>Joué sur:</span>
          <div v-for="platform in gamePlatforms">
            <LabelComp :text="platform.name" textPosition="down">
              <InputComp v-model="form.platformId" type="radio" :value="platform.id" />
            </LabelComp>
          </div>
          <FormErrorComp v-if="errors.platformId" :message="errors.platformId" />
        </div>
        <!-- movie duration -->
        <div v-if="currentCategory.name === 'movie'">
          <LabelComp text="Durée du film (en minutes):" textPosition="up">
            <div>
              <InputComp v-model="form.duration" type="number" min="1" />
            </div>
          </LabelComp>
          <FormErrorComp v-if="errors.duration" :message="errors.duration" />
        </div>
        <!-- series season length -->
        <div v-if="currentCategory.name === 'series'">
          <LabelComp text="Nombres d'épisodes" textPosition="up">
            <div>
              <InputComp v-model="form.seriesSeasonLength" type="number" min="1" />
            </div>
          </LabelComp>
          <FormErrorComp v-if="errors.seriesSeasonLength" :message="errors.seriesSeasonLength" />
        </div>
        <!-- anime season length -->
        <div v-if="currentCategory.name === 'anime'">
          <LabelComp text="Nombres d'épisodes" textPosition="up">
            <div>
              <InputComp v-model="form.animeSeasonLength" type="number" min="1" />
            </div>
          </LabelComp>
          <FormErrorComp v-if="errors.animeSeasonLength" :message="errors.animeSeasonLength" />
        </div>
        <!-- books pages -->
        <div v-if="currentCategory.name === 'book'">
          <LabelComp text="Nombres de pages" textPosition="up">
            <div>
              <InputComp v-model="form.pages" type="number" min="1" />
            </div>
          </LabelComp>
          <FormErrorComp v-if="errors.pages" :message="errors.pages" />
        </div>
      </div>
      <!-- status -->
      <div>
        <span>Progression (requis):</span>
        <div v-for="status in statuses">
          <LabelComp :text="status.name" textPosition="down">
            <InputComp v-model="form.statusId" type="radio" :value="status.id" />
          </LabelComp>
        </div>
        <FormErrorComp v-if="errors.statusId" :message="errors.statusId" />
      </div>
      <div>
        <ButtonComp type="submit" :disabled="form.processing"></ButtonComp>
      </div>
    </form>
  </div>
</template>
