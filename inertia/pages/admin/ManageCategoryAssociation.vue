<script setup lang="ts">
import type MediaCategoriesController from '#controllers/media_categories_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { onMounted, ref, watch } from 'vue'
import AppHead from '~/components/AppHead.vue'
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

const selectedCategory = ref<string>('')
const selectedTypes = ref<number[]>([])
const selectedGenres = ref<number[]>([])

onMounted(() => {
  selectedCategory.value = props.categoriesList[0].id
})

watch(selectedCategory, (newId) => {
  selectedTypes.value = props.categoriesTypesGenresPaired[newId]?.types || []
  selectedGenres.value = props.categoriesTypesGenresPaired[newId]?.genres || []
})

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
        {{ selectedTypes }}
        <div v-for="type in typesList">
          <LabelComp :text="capitalizeFirstLetter(type.name)" textPosition="down">
            <InputComp v-model="selectedTypes" type="checkbox" :value="type.id" />
          </LabelComp>
        </div>
        <!-- genres list -->
        <div>
          <span>Liste des types</span>
        </div>
        {{ selectedGenres }}
        <div v-for="genre in genresList">
          <LabelComp :text="capitalizeFirstLetter(genre.name)" textPosition="down">
            <InputComp v-model="selectedGenres" type="checkbox" :value="genre.id" />
          </LabelComp>
        </div>
      </div>
    </DashboardLayout>
  </AppLayout>
</template>
