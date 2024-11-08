<script setup lang="ts">
import type { MediaCategories, MediaCategoriesFr } from '#enums/MediaCategories'
import { IGenre } from '#interfaces/genre_interface'
import {
  IAnimeMediaFormatted,
  IBookMediaFormatted,
  IGameMediaFormatted,
  IMovieMediaFormatted,
  ISeriesMediaFormatted,
} from '#interfaces/media_formatted_interface'
import type { IMediaStatus } from '#interfaces/media_status_interface'
import { IMediaType } from '#interfaces/media_type_interface'
import { router } from '@inertiajs/vue3'
import { reactive } from 'vue'
import AppHead from '~/components/AppHead.vue'
import MediaCard from '~/components/MediaCard.vue'
import InputComp from '~/components/ui/InputComp.vue'
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
            <label>
              Recherche
              <input
                v-model="filters.search"
                type="search"
                :placeholder="`Rechercher un${mediaCategoryFr === 'série' ? 'e' : ''} ${mediaCategoryFr}...`"
              />
            </label>
            <button type="submit">Rechercher</button>
          </div>

          <div>
            <h3>Filtrer</h3>
            <div>
              <span>Progression</span>
              <div>
                <ul>
                  <li v-for="status in mediaStatusesList" :key="status.id">
                    <InputComp
                      v-model="filters.status"
                      type="checkbox"
                      :id="`status-${status.id}`"
                      :value="status.id"
                    />
                    <label :for="`status-${status.id}`">
                      {{ capitalizeFirstLetter(status.name) }}
                    </label>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <span>Types</span>
              <ul>
                <li v-for="type in mediaTypesList" :key="type.id">
                  <InputComp
                    v-model="filters.types"
                    type="checkbox"
                    :id="`type-${type.id}`"
                    :value="type.id"
                  />
                  <label :for="`type-${type.id}`"> {{ capitalizeFirstLetter(type.name) }} </label>
                </li>
              </ul>
            </div>

            <div>
              <span>Genres</span>
              <ul>
                <li v-for="genre in mediaGenresList" :key="genre.id">
                  <InputComp
                    v-model="filters.genres"
                    type="checkbox"
                    :id="`genre-${genre.id}`"
                    :value="genre.id"
                  />
                  <label :for="`genre-${genre.id}`">
                    {{ capitalizeFirstLetter(genre.name) }}
                  </label>
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
