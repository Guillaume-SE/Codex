<script setup lang="ts">
import type MediaController from '#controllers/media_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { computed, onMounted, ref, type Component } from 'vue'
import BookFilters from '~/components/media/filters/BookFilters.vue'
import GameFilters from '~/components/media/filters/GameFilters.vue'
import MovieFilters from '~/components/media/filters/MovieFilters.vue'
import CollapseBox from '~/components/ui/CollapseBox.vue'
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
const durationModel = defineModel<string>('duration')
const publishersModel = defineModel<number[]>('publishers')

const emit = defineEmits(['update:resetFormValues'])

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const isStatusActive = computed(
  () => isMounted.value && statusModel.value && statusModel.value.length > 0
)
const isTypesActive = computed(
  () => isMounted.value && typesModel.value && typesModel.value.length > 0
)
const isGenresActive = computed(
  () => isMounted.value && genresModel.value && genresModel.value.length > 0
)

const capitalizeFirstLetter = useCapitalizeFirstLetter

const categoryFilterComponents: Record<string, Component> = {
  game: GameFilters,
  movie: MovieFilters,
  book: BookFilters,
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- status -->
    <CollapseBox label="Progression" :is-active="isStatusActive" start-open>
      <ul class="space-y-2">
        <li v-for="status in statusesList" :key="status.id" class="flex items-center gap-3">
          <InputComp
            v-model="statusModel"
            type="checkbox"
            :value="status.id"
            :id="`status-${status.id}`"
            class="checkbox checkbox-sm checked:checkbox-primary"
          />
          <LabelComp
            :labelFor="`status-${status.id}`"
            :text="capitalizeFirstLetter(status.name)"
            class="cursor-pointer"
          />
        </li>
      </ul>
    </CollapseBox>

    <!-- types -->
    <CollapseBox label="Type" :is-active="isTypesActive">
      <ul class="space-y-2">
        <li v-for="type in typesList" :key="type.id" class="flex items-center gap-3">
          <InputComp
            v-model="typesModel"
            type="checkbox"
            :value="type.id"
            :id="`type-${type.id}`"
            class="checkbox checkbox-sm checked:checkbox-primary"
          />
          <LabelComp
            :labelFor="`type-${type.id}`"
            :text="capitalizeFirstLetter(type.name)"
            class="cursor-pointer"
          />
        </li>
      </ul>
    </CollapseBox>

    <!-- genres -->
    <CollapseBox label="Genre" :is-active="isGenresActive">
      <ul class="space-y-2">
        <li v-for="genre in genresList" :key="genre.id" class="flex items-center gap-3">
          <InputComp
            v-model="genresModel"
            type="checkbox"
            :value="genre.id"
            :id="`genre-${genre.id}`"
            class="checkbox checkbox-sm checked:checkbox-primary"
          />
          <LabelComp
            :labelFor="`genre-${genre.id}`"
            :text="capitalizeFirstLetter(genre.name)"
            class="cursor-pointer"
          />
        </li>
      </ul>
    </CollapseBox>

    <!-- category related filters -->
    <div>
      <component
        :is="categoryFilterComponents[mediaCategory]"
        :platforms-list="platformsList"
        :publishers-list="publishersList"
        v-model:platforms="platformsModel"
        v-model:duration="durationModel"
        v-model:publishers="publishersModel"
      />
    </div>
  </div>
</template>
