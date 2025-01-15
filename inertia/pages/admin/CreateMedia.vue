<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { ref, watch } from 'vue'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import SelectComp from '~/components/ui/SelectComp.vue'
import AppLayout from '~/layouts/AppLayout.vue'

const props = defineProps<{
  statusesList: InferPageProps<MediaController, 'showCreate'>['statusesList']
  categoriesList: InferPageProps<MediaController, 'showCreate'>['categoriesList']
  categoryRelatedTypes: InferPageProps<MediaController, 'showCreate'>['categoryRelatedTypes']
  tagsList: InferPageProps<MediaController, 'showCreate'>['tagsList']
}>()

const newForm = useForm({
  statusId: '',
  categoryId: props.categoriesList[0].value,
  typeId: '',
  name: '',
  alternativeName: '',
  released: '',
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

watch(
  () => newForm.categoryId,
  (newCategoryId) => {
    filteredTypesList.value = props.categoryRelatedTypes[newCategoryId] || []
    newForm.typeId = ''
  }
)
</script>

<template>
  <AppHead title="Ajouter un media" />
  <AppLayout>
    <div>
      <form method="POST" @submit.prevent="newForm.post('/media')">
        <div>
          <LabelComp text="Statut (requis)" text-position="up">
            <SelectComp
              v-model="newForm.statusId"
              :options="statusesList"
              :disabled-value="true"
              disabled-text="Choisir un statut"
            ></SelectComp>
          </LabelComp>
        </div>
        <div>
          <LabelComp text="Catégorie (requis)" text-position="up">
            <SelectComp v-model="newForm.categoryId" :options="categoriesList"></SelectComp>
          </LabelComp>
        </div>
        <div>
          <LabelComp text="Type (requis)" text-position="up">
            <SelectComp
              v-model="newForm.typeId"
              :options="filteredTypesList"
              :disabled-value="true"
              disabled-text="Choisir un type"
            ></SelectComp>
          </LabelComp>
        </div>
        <div>
          <LabelComp text="Nom du media (requis)" text-position="up">
            <InputComp
              v-model="newForm.name"
              type="text"
              placeholder="The Dark Knight: le Chevalier noir"
            />
          </LabelComp>
        </div>
        <div>
          <LabelComp text="Nom alternatif" text-position="up">
            <InputComp
              v-model="newForm.alternativeName"
              type="text"
              placeholder="The Dark Knight"
            />
          </LabelComp>
        </div>
        <div>
          <LabelComp text="Date de sortie" text-position="up">
            <InputComp v-model="newForm.released" type="date" />
          </LabelComp>
        </div>
        <div>
          <LabelComp text="Synopsis" text-position="up" for="synopsis">
            <textarea
              v-model="newForm.synopsis"
              placeholder="Batman aborde une phase décisive de sa guerre contre le crime à Gotham City..."
              id="synopsis"
            ></textarea>
          </LabelComp>
        </div>
        <div>
          <LabelComp text="Tag de recommandation (requis)" text-position="up">
            <SelectComp v-model="newForm.tagId" :options="tagsList"></SelectComp>
          </LabelComp>
        </div>
        <ButtonComp type="submit"></ButtonComp>
      </form>
    </div>
  </AppLayout>
</template>
