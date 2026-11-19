<script setup lang="ts">
import { Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { defineProps } from 'vue'
import AppHead from '~/components/AppHead.vue'
import LanguageAction from '~/components/LanguageAction.vue'
import LeftChevronIcon from '~/components/ui/icons/LeftChevronIcon.vue'
import RatingBox from '~/components/ui/RatingBox.vue'

const { season, userProgress } = defineProps<{
  season: Data.PresentedSeasonDetail
  userProgress: Data.UserMedia | null
}>()
</script>

<template>
  <AppHead :title="season.name" />

  <div class="min-h-screen bg-base-100 pb-16">
    <div class="container mx-auto px-4 pt-6 space-y-8">
      <!-- Back link -->
      <Link
        route="media.show"
        :params="{ category: 'series', apiId: season.seriesApiId }"
        class="inline-flex items-center gap-1.5 text-sm font-medium opacity-75"
      >
        <LeftChevronIcon class="size-4" />
        Retour à la série
      </Link>

      <!-- Season Header -->
      <div class="flex flex-col sm:flex-row gap-6 items-start">
        <div
          class="w-40 sm:w-52 shrink-0 rounded-box overflow-hidden bg-base-200 border border-base-300"
        >
          <img
            v-if="season.posterUrl"
            :src="season.posterUrl"
            :alt="season.name"
            class="w-full h-auto object-cover"
          />
          <div v-else class="aspect-2/3 flex items-center justify-center text-xs opacity-50">
            No Image
          </div>
        </div>

        <div class="space-y-3 flex-1 w-full">
          <div class="flex items-start justify-between gap-4">
            <div class="flex flex-wrap items-center gap-3">
              <h1 class="text-2xl sm:text-3xl font-heading font-extrabold">
                {{ season.name }}
              </h1>
              <span v-if="season.airYear" class="badge badge-neutral badge-sm">
                {{ season.airYear }}
              </span>
              <span v-if="userProgress?.status" class="badge badge-primary badge-sm">
                {{ userProgress.status.name }}
              </span>
            </div>

            <LanguageAction class="shrink-0" />
          </div>

          <div v-if="season.rating" class="flex items-center gap-1.5 text-sm font-bold">
            <RatingBox :rating="season.rating" />
            <span class="text-xs opacity-50 font-normal">/ 10</span>
          </div>

          <p class="text-sm opacity-80 max-w-3xl leading-relaxed">
            {{ season.overview ?? 'Aucun synopsis disponible.' }}
          </p>
        </div>
      </div>

      <!-- Episodes List -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold">Épisodes ({{ season.episodes.length }})</h2>

        <div class="space-y-3">
          <article
            v-for="episode in season.episodes"
            :key="episode.id"
            class="flex flex-col sm:flex-row gap-4 bg-base-200/70 border border-base-300 rounded-box p-3"
          >
            <!-- Episode Image -->
            <div
              class="w-full sm:w-48 aspect-video shrink-0 rounded-lg overflow-hidden bg-base-300"
            >
              <img
                v-if="episode.imageUrl"
                :src="episode.imageUrl"
                :alt="episode.title"
                loading="lazy"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-xs opacity-50">
                No Image
              </div>
            </div>

            <!-- Episode Info -->
            <div class="flex-1 min-w-0 space-y-1.5">
              <h3 class="font-bold text-sm sm:text-base">
                <span class="opacity-50 mr-1.5">{{ episode.episodeNumber }}.</span>
                {{ episode.title }}
              </h3>

              <div
                v-if="episode.airDate || episode.runtime"
                class="flex items-center gap-1.5 text-xs opacity-60"
              >
                <span v-if="episode.airDate">{{ episode.airDate }}</span>
                <span v-if="episode.airDate && episode.runtime">•</span>
                <span v-if="episode.runtime">{{ episode.runtime }}</span>
              </div>

              <p class="text-xs sm:text-sm opacity-80 leading-relaxed line-clamp-3">
                {{ episode.overview ?? 'Aucun résumé disponible.' }}
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>
