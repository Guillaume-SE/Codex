<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { router, useForm } from '@inertiajs/vue3'
import type { Component } from 'vue'
import { computed, onMounted, ref, watch } from 'vue'
import AppHead from '~/components/AppHead.vue'
import AnimeFields from '~/components/media/AnimeFields.vue'
import BookFields from '~/components/media/BookFields.vue'
import GameFields from '~/components/media/GameFields.vue'
import MovieFields from '~/components/media/MovieFields.vue'
import SeriesFields from '~/components/media/SeriesFields.vue'
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
  released: string | null
  synopsis: string | null
  genreId: number[]
  platformId: string | null
  duration: string | null
  seriesSeasonLength: string | null
  animeSeasonLength: string | null
  publisherId: string | null
}

type MediaProp = InferPageProps<MediaController, 'showManage'>['media']

const props = defineProps<{
  statuses: InferPageProps<MediaController, 'showManage'>['statuses']
  categories: InferPageProps<MediaController, 'showManage'>['categories']
  categoryAssociations: InferPageProps<MediaController, 'showManage'>['categoryAssociations']
  gamePlatforms: InferPageProps<MediaController, 'showManage'>['gamePlatforms']
  bookPublishers: InferPageProps<MediaController, 'showManage'>['bookPublishers']
  media?: InferPageProps<MediaController, 'showManage'>['media']
  errors: Record<string, string[]>
}>()

const categoryFieldComponents: Record<string, Component> = {
  game: GameFields,
  movie: MovieFields,
  series: SeriesFields,
  anime: AnimeFields,
  book: BookFields,
}

const fieldSteps: Record<keyof IForm, number> = {
  // Step 1
  categoryId: 1,
  typeId: 1,
  // Step 2
  name: 2,
  released: 2,
  synopsis: 2,
  genreId: 2,
  // Step 3
  platformId: 3,
  duration: 3,
  seriesSeasonLength: 3,
  animeSeasonLength: 3,
  publisherId: 3,
  statusId: 3,
}

const formatDate = useFormattedDate
const formatCategoryName = useFormatCategoryNameInFr

onMounted(() => {
  // to avoid disabled button issue with F5
  isMounted.value = true
})

const isMounted = ref(false)
const currentStep = ref(1)
const isUpdateMode = computed(() => !!props.media)
const currentCategory = computed(() => {
  return props.categories.find((category) => category.id === form.categoryId)
})
const filteredTypesList = computed(() => {
  if (!form.categoryId) return []
  return props.categoryAssociations[form.categoryId]?.types || []
})
const filteredGenresList = computed(() => {
  if (!form.categoryId) return []
  return props.categoryAssociations[form.categoryId]?.genres || []
})
const isStep1Invalid = computed(() => {
  return !form.categoryId || !form.typeId
})

function getInitialFormData(media?: MediaProp) {
  if (!media) {
    // Default values for CREATE mode
    return {
      statusId: '',
      categoryId: '',
      typeId: '',
      name: '',
      released: null,
      synopsis: '',
      genreId: [],
      platformId: null,
      duration: null,
      seriesSeasonLength: null,
      animeSeasonLength: null,
      publisherId: null,
    }
  }
  return {
    statusId: media.statusId,
    categoryId: media.categoryId,
    typeId: media.typeId,
    name: media.name,
    released: media.released ? formatDate(media.released) : null,
    synopsis: media.synopsis,
    genreId: media.genres.map((g: { id: number }) => g.id),
    platformId: media.gameInfo?.platformId,
    duration: media.movieInfo?.duration,
    seriesSeasonLength: media.seriesInfo?.seriesSeasonLength,
    animeSeasonLength: media.animeInfo?.animeSeasonLength,
    publisherId: media.bookInfo?.publisherId,
  }
}

const form = useForm<IForm>(getInitialFormData(props.media))

watch(
  () => props.errors,
  (newErrors) => {
    form.clearErrors()
    // transform and set the new errors
    const formattedErrors = Object.fromEntries(
      Object.entries(newErrors).map(([key, value]) => [key, value[0]])
    )
    form.setError(formattedErrors as any)
  },
  {
    deep: true,
  }
)

function nextStep() {
  currentStep.value++
}
function prevStep() {
  currentStep.value--
}

function handleFormError(errors: Record<string, string>) {
  const firstErrorStep = Math.min(
    ...Object.keys(errors).map((field) => fieldSteps[field as keyof IForm] || Infinity)
  )
  if (firstErrorStep !== Infinity) {
    currentStep.value = firstErrorStep
  }
}

function handleUpdate() {
  if (!props.media?.id) return

  const payload: Partial<IForm> = {
    statusId: form.statusId,
    categoryId: form.categoryId,
    typeId: form.typeId,
    name: form.name,
    released: form.released,
    synopsis: form.synopsis,
    genreId: form.genreId,
  }

  switch (currentCategory.value?.name) {
    case 'game':
      payload.platformId = form.platformId
      break
    case 'movie':
      payload.duration = form.duration
      break
    case 'series':
      payload.seriesSeasonLength = form.seriesSeasonLength
      break
    case 'anime':
      payload.animeSeasonLength = form.animeSeasonLength
      break
    case 'book':
      payload.publisherId = form.publisherId
      break
  }

  router.put(`/admin/media/${props.media.id}`, payload, {
    onStart: () => (form.processing = true),
    onFinish: () => (form.processing = false),
    onError: handleFormError,
  })
}

function handleCreate() {
  form.post('/admin/media', {
    onError: handleFormError,
  })
}

function submit() {
  if (isUpdateMode.value) {
    handleUpdate()
  } else {
    handleCreate()
  }
}
</script>

<template>
  <AppHead title="Gestion de media" />
  <div>
    <h3 v-if="isUpdateMode">Mise à jour de {{ props.media?.name }}</h3>
    <h3 v-else>Ajout d'un nouveau media</h3>

    <div class="step-indicator">
      <ul class="step-container">
        <li class="step" :class="{ active: currentStep >= 1 }">1. Catégorie</li>
        <li class="step" :class="{ active: currentStep >= 2 }">2. Détails</li>
        <li class="step" :class="{ active: currentStep >= 3 }">3. Spécificités</li>
      </ul>
    </div>

    <form @submit.prevent="submit">
      <fieldset :disabled="!isMounted">
        <!-- category -->
        <div v-if="currentStep === 1">
          <div v-if="isUpdateMode">
            <span>Catégorie</span>
            <div>
              <span>{{ formatCategoryName(props.media?.category.name) }}</span>
            </div>
          </div>
          <div v-else>
            <span>Catégorie (requis)</span>
            <div v-for="category in categories">
              <LabelComp :text="formatCategoryName(category.name)" textPosition="down">
                <InputComp
                  v-model="form.categoryId"
                  type="radio"
                  :value="category.id"
                  @input="form.clearErrors('categoryId')"
                />
              </LabelComp>
            </div>
            <FormErrorComp v-if="form.errors.categoryId" :message="form.errors.categoryId" />
          </div>
          <!-- type -->
          <div>
            <span>Type (requis)</span>
            <div v-if="filteredTypesList.length === 0">
              <span>En attente d'un choix de catégorie</span>
            </div>
            <div v-for="type in filteredTypesList">
              <LabelComp :text="type.text" textPosition="down">
                <InputComp
                  v-model="form.typeId"
                  type="radio"
                  :value="type.value"
                  @input="form.clearErrors('typeId')"
                />
              </LabelComp>
            </div>
            <FormErrorComp v-if="form.errors.typeId" :message="form.errors.typeId" />
          </div>

          <div class="form-navigation">
            <ButtonComp type="button" @click="nextStep" :disabled="isStep1Invalid">
              Suivant
            </ButtonComp>
          </div>
        </div>

        <div v-if="currentStep === 2">
          <!-- name -->
          <div>
            <LabelComp text="Nom de l'œuvre (requis):" text-position="up">
              <InputComp v-model="form.name" type="text" @input="form.clearErrors('name')" />
            </LabelComp>
            <FormErrorComp v-if="form.errors.name" :message="form.errors.name" />
          </div>
          <!-- released date -->
          <div>
            <LabelComp text="Date de sortie:" text-position="up">
              <InputComp v-model="form.released" type="date" />
            </LabelComp>
            <FormErrorComp v-if="form.errors.released" :message="form.errors.released" />
          </div>
          <!-- synopsis -->
          <div>
            <LabelComp text="Synopsis:" text-position="up" for="synopsis">
              <textarea v-model="form.synopsis" id="synopsis"></textarea>
            </LabelComp>
            <FormErrorComp v-if="form.errors.synopsis" :message="form.errors.synopsis" />
          </div>
          <!-- genres -->
          <div>
            <span>Genres</span>
            <div v-if="filteredGenresList.length === 0">
              <span>En attente d'un choix de catégorie</span>
            </div>
            <div v-for="genre in filteredGenresList">
              <LabelComp :text="genre.text" textPosition="down">
                <InputComp v-model="form.genreId" type="checkbox" :value="genre.value" />
              </LabelComp>
            </div>
            <FormErrorComp v-if="form.errors.genreId" :message="form.errors.genreId" />
          </div>

          <div class="form-navigation">
            <ButtonComp type="button" @click="prevStep">Précédent</ButtonComp>
            <ButtonComp type="button" @click="nextStep">Suivant</ButtonComp>
          </div>
        </div>

        <div v-if="currentStep === 3">
          <div v-if="currentCategory">
            <component
              :is="categoryFieldComponents[currentCategory.name]"
              :form="form"
              :gamePlatforms="gamePlatforms"
              :bookPublishers="bookPublishers"
            />
          </div>
          <!-- status -->
          <div>
            <span>Progression (requis)</span>
            <div v-for="status in statuses">
              <LabelComp :text="status.name" textPosition="down">
                <InputComp
                  v-model="form.statusId"
                  type="radio"
                  :value="status.id"
                  @input="form.clearErrors('statusId')"
                />
              </LabelComp>
            </div>
            <FormErrorComp v-if="form.errors.statusId" :message="form.errors.statusId" />
          </div>

          <div class="form-navigation">
            <ButtonComp type="button" @click="prevStep">Précédent</ButtonComp>
            <ButtonComp type="submit" :disabled="form.processing">Enregistrer</ButtonComp>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style scoped>
.step-container {
  display: flex;
  justify-content: space-between;
  width: 80%;
}
.step-indicator {
  margin-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.75rem;
}
.step {
  color: grey;
  font-weight: normal;
  padding: 0 0.5rem;
}
.step.active {
  color: #4f46e5;
  font-weight: bold;
}
</style>
