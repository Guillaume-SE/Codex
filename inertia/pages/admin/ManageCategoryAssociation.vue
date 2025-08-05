<script setup lang="ts">
import type MediaCategoriesController from '#controllers/media_categories_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { onMounted, ref, watch } from 'vue'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { useCapitalizeFirstLetter } from '~/composables/useCapitalizeFirstLetter'
import { useFormatCategoryNameInFr } from '~/composables/useFormatCategoryNameInFr'
import AppLayout from '~/layouts/AppLayout.vue'
import DashboardLayout from '~/layouts/DashboardLayout.vue'

const props = defineProps<{
  categoriesList: InferPageProps<MediaCategoriesController, 'showManage'>['categoriesList']
  typesList: InferPageProps<MediaCategoriesController, 'showManage'>['typesList']
  genresList: InferPageProps<MediaCategoriesController, 'showManage'>['genresList']
  categoriesTypesGenresPaired: InferPageProps<
    MediaCategoriesController,
    'showManage'
  >['categoriesTypesGenresPaired']
}>()

interface IForm {
  genres: number[]
  types: number[]
}

const selectedCategory = ref<string>('')

onMounted(() => {
  selectedCategory.value = props.categoriesList[0].id
})

watch(selectedCategory, (newId) => {
  form.genres = props.categoriesTypesGenresPaired[newId]?.genres || []
  form.types = props.categoriesTypesGenresPaired[newId]?.types || []
})

const form = useForm<IForm>({
  genres: [],
  types: [],
})

function submit() {
  return form.post(`/category/${selectedCategory.value}/associate`)
}

const capitalizeFirstLetter = useCapitalizeFirstLetter
const formatCategoryName = useFormatCategoryNameInFr
</script>

<template>
  <AppHead title="Gestion des catégories" />
  <AppLayout>
    <DashboardLayout>
      <select v-model="selectedCategory">
        <option v-for="category in categoriesList" :value="category.id">
          {{ formatCategoryName(category.name) }}
        </option>
      </select>

      <div>
        <!-- type list -->
        <div>
          <span>Liste des types</span>
        </div>
        <div v-for="type in typesList">
          <LabelComp :text="capitalizeFirstLetter(type.name)" textPosition="down">
            <InputComp v-model="form.types" type="checkbox" :value="type.id" />
          </LabelComp>
        </div>
        <!-- genres list -->
        <div>
          <span>Liste des genres</span>
        </div>
        <div v-for="genre in genresList">
          <LabelComp :text="capitalizeFirstLetter(genre.name)" textPosition="down">
            <InputComp v-model="form.genres" type="checkbox" :value="genre.id" />
          </LabelComp>
        </div>
      </div>
      <div>
        <ButtonComp @click="submit">Valider</ButtonComp>
      </div>
    </DashboardLayout>
  </AppLayout>
</template>
