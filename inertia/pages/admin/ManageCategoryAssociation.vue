<script setup lang="ts">
import type MediaCategoriesController from '#controllers/media_categories_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { computed, ref, watch } from 'vue'
import AppHead from '~/components/AppHead.vue'
import DashboardContainer from '~/components/dashboard/DashboardContainer.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { useCapitalizeFirstLetter } from '~/composables/useCapitalizeFirstLetter'
import { useFormatCategoryNameInFr } from '~/composables/useFormatCategoryNameInFr'

const props = defineProps<{
  categories: InferPageProps<MediaCategoriesController, 'showManage'>['categories']
  typesList: InferPageProps<MediaCategoriesController, 'showManage'>['typesList']
  genresList: InferPageProps<MediaCategoriesController, 'showManage'>['genresList']
}>()

interface IForm {
  genres: number[]
  types: number[]
}

const selectedCategoryId = ref<string>(props.categories[0].id.toString())
const selectedCategory = computed(() => {
  return props.categories.find((c) => c.id === Number(selectedCategoryId.value))!
})

const form = useForm<IForm>({
  genres: selectedCategory.value.genreIds,
  types: selectedCategory.value.typeIds,
})

watch(selectedCategoryId, (newId) => {
  const newCategory = props.categories.find((c) => c.id === Number(newId))!
  form.types = newCategory.typeIds
  form.genres = newCategory.genreIds
})

function submit() {
  return form.post(`/admin/categories/${selectedCategoryId.value}/associate`)
}

const capitalizeFirstLetter = useCapitalizeFirstLetter
const formatCategoryName = useFormatCategoryNameInFr
</script>

<template>
  <AppHead title="Gestion des catégories" />
  <DashboardContainer>
    <select v-model="selectedCategoryId">
      <option v-for="category in categories" :value="category.id">
        {{ formatCategoryName(category.name) }}
      </option>
    </select>

    <div>
      <!-- type list -->
      <div>
        <span>Liste des types</span>
      </div>
      <div v-for="type in typesList">
        <InputComp v-model="form.types" type="checkbox" :value="type.id" :id="`type-${type.id}`" />
        <LabelComp :labelFor="`type-${type.id}`" :text="capitalizeFirstLetter(type.name)" />
      </div>
      <!-- genres list -->
      <div>
        <span>Liste des genres</span>
      </div>
      <div v-for="genre in genresList">
        <InputComp
          v-model="form.genres"
          type="checkbox"
          :value="genre.id"
          :id="`genre-${genre.id}`"
        />
        <LabelComp :labelFor="`genre-${genre.id}`" :text="capitalizeFirstLetter(genre.name)" />
      </div>
    </div>
    <div>
      <ButtonComp @click="submit">Valider</ButtonComp>
    </div>
  </DashboardContainer>
</template>
