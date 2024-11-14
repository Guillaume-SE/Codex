<script setup lang="ts">
import type { IGenre } from '#interfaces/genre_interface'
import {
  IAnimeMediaFormatted,
  IBookMediaFormatted,
  IGameMediaFormatted,
  IMovieMediaFormatted,
  ISeriesMediaFormatted,
} from '#interfaces/media_formatted_interface'
import type { IMediaStatus } from '#interfaces/media_status_interface'
import { IMediaType } from '#interfaces/media_type_interface'
import type { MediaCategories, MediaCategoriesFr } from '#types/MediaCategories'
import { router } from '@inertiajs/vue3'
import { reactive } from 'vue'
import AppHead from '~/components/AppHead.vue'
import MediaCard from '~/components/MediaCard.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { useCapitalizeFirstLetter } from '~/composables/useCapitalizeFirstLetter'
import AppLayout from '~/layouts/AppLayout.vue'

defineProps<{
  title: string
  mediaList:
    | IGameMediaFormatted[]
    | IMovieMediaFormatted[]
    | ISeriesMediaFormatted[]
    | IAnimeMediaFormatted[]
    | IBookMediaFormatted[]
  mediaCategory: MediaCategories
  mediaCategoryFr: MediaCategoriesFr
  mediaStatusesList: IMediaStatus[]
  mediaTypesList: IMediaType[]
  mediaGenresList: IGenre[]
}>()

const filters = reactive({
  search: '',
  status: [],
  types: [],
  genres: [],
})

const capitalizeFirstLetter = useCapitalizeFirstLetter
</script>

<template>
  <AppHead :title="title" />
  <AppLayout>
    <div class="media-list-container">
      <!-- search -->
      <div>
        <form
          method="GET"
          type="search"
          @submit.prevent="router.get(`/media/${mediaCategory}`, filters, { preserveState: true })"
        >
          <div>
            <LabelComp text="Recherche" textPosition="up">
              <InputComp
                v-model="filters.search"
                type="search"
                :placeholder="`Rechercher un${mediaCategoryFr === 'série' ? 'e' : ''} ${mediaCategoryFr}...`"
              />
            </LabelComp>
            <button type="submit">Rechercher</button>
          </div>

          <div>
            <h3>Filtrer</h3>
            <div>
              <span>Progression</span>
              <div>
                <ul>
                  <li v-for="status in mediaStatusesList" :key="status.id">
                    <LabelComp :text="capitalizeFirstLetter(status.name)" textPosition="down">
                      <InputComp v-model="filters.status" type="checkbox" :value="status.id" />
                    </LabelComp>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <span>Types</span>
              <ul>
                <li v-for="type in mediaTypesList" :key="type.id">
                  <LabelComp :text="capitalizeFirstLetter(type.name)" textPosition="down">
                    <InputComp
                      v-model="filters.types"
                      type="checkbox"
                      :id="`type-${type.id}`"
                      :value="type.id"
                    />
                  </LabelComp>
                </li>
              </ul>
            </div>

            <div>
              <span>Genres</span>
              <ul>
                <li v-for="genre in mediaGenresList" :key="genre.id">
                  <LabelComp :text="capitalizeFirstLetter(genre.name)" textPosition="down">
                    <InputComp v-model="filters.genres" type="checkbox" :value="genre.id" />
                  </LabelComp>
                </li>
              </ul>
            </div>
            <button type="submit">Appliquer</button>
          </div>
        </form>
      </div>

      <!-- cards -->
      <div v-if="mediaList.length > 0" class="media-card-container">
        <MediaCard
          v-for="media in mediaList"
          :key="media.id"
          :media="media"
          :mediaCategory="mediaCategory"
          :mediaCategoryFr="mediaCategoryFr"
        />
      </div>
      <div v-else>
        <p>Aucun résultat</p>
      </div>
    </div>
  </AppLayout>
</template>
