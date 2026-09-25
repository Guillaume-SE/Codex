<script setup lang="ts">
import { Link } from '@adonisjs/inertia/vue'
import { Data } from '@generated/data'
import AppHead from '~/components/AppHead.vue'
import BaseCarousel from '~/components/BaseCarousel.vue'
import CardCast from '~/components/CardCast.vue'
import CardMedia from '~/components/CardMedia.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import RightChevronIcon from '~/components/ui/icons/RightChevronIcon.vue'
import RatingBox from '~/components/ui/RatingBox.vue'

defineProps<{
  media: Data.PresentedMediaDetail
  userProgress: Data.UserMedia | null
}>()
</script>

<template>
  <AppHead :title="media.title" />

  <main class="min-h-screen bg-base-100 pb-16">
    <div class="container mx-auto px-4 pt-8 space-y-10">
      <!-- Hero Section -->
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <!-- Poster -->
        <div
          class="w-56 sm:w-72 shrink-0 rounded-box overflow-hidden bg-base-200 border border-base-300"
        >
          <img
            v-if="media.posterUrl"
            :src="media.posterUrl"
            :alt="media.title"
            class="w-full h-auto object-cover"
          />
          <div
            v-else
            class="aspect-2/3 flex items-center justify-center text-sm text-base-content/50"
          >
            No Image
          </div>
        </div>

        <!-- Main Info Header -->
        <div class="flex-1 space-y-5">
          <!-- Main Title & Localized Subtitles -->
          <div class="space-y-1">
            <h1 class="text-3xl sm:text-4xl font-heading font-extrabold text-base-content">
              {{ media.title }}
            </h1>

            <div
              v-if="media.originalTitle || media.frenchTitle"
              class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-base-content/70 pt-0.5"
            >
              <span v-if="media.frenchTitle">
                <span class="text-base-content/50 font-medium">FR:</span>
                <span class="font-semibold text-base-content/80 ml-1">{{ media.frenchTitle }}</span>
              </span>
              <span v-if="media.originalTitle">
                <span class="text-base-content/50 font-medium">Original:</span>
                <span class="font-semibold text-base-content/80 ml-1">{{
                  media.originalTitle
                }}</span>
              </span>
            </div>
          </div>

          <!-- Genres -->
          <div v-if="media.genres?.length" class="space-y-2">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="genre in media.genres"
                :key="genre"
                class="badge badge-sm bg-base-200 border-base-300"
              >
                {{ genre }}
              </span>
            </div>
          </div>

          <!-- Overview -->
          <p class="text-sm text-base-content/80 max-w-3xl leading-relaxed">
            {{ media.overview ?? 'No overview available.' }}
          </p>

          <!-- Key Crew -->
          <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm pt-1">
            <template v-if="media.crew?.length">
              <div v-for="member in media.crew" :key="member.id" class="flex items-center gap-1.5">
                <span class="text-base-content/60 font-medium">{{ member.job }}:</span>
                <span class="font-semibold">{{ member.name }}</span>
              </div>
            </template>
            <div v-else class="text-xs text-base-content/50">Crew: N/A</div>
          </div>

          <!-- Rating Card -->
          <div class="flex flex-wrap items-center gap-6">
            <div
              class="flex items-center gap-3 bg-base-200 border border-base-300 rounded-box px-4 py-2"
            >
              <div class="text-xl font-black flex items-center gap-1">
                <RatingBox :rating="media.rating" />
                <span class="text-xs text-base-content/50 font-normal">/ 10</span>
              </div>
              <div class="divider divider-horizontal my-0 mx-0"></div>
              <div class="text-xs leading-tight">
                <div class="font-bold text-base-content">Score</div>
                <div class="text-base-content/60 uppercase">{{ media.provider }}</div>
              </div>
            </div>

            <BaseButton v-if="media.trailerKey" variant="soft" color="neutral" size="md">
              ▶ Trailer
            </BaseButton>
          </div>

          <!-- Actions & Progression Card -->
          <div class="flex flex-wrap items-center gap-4 pt-2">
            <div
              class="card bg-base-200/70 border border-base-300 p-4 w-full sm:w-80 space-y-3 rounded-box"
            >
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold">Your Progression</span>
                <span class="badge badge-primary badge-sm">
                  {{ userProgress?.status?.name ?? 'Not Tracked' }}
                </span>
              </div>
              <BaseButton color="primary" size="sm" block>
                {{ userProgress ? 'Update Status' : 'Add to List' }}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Content + Details Side Panel -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
        <!-- Right Side Panel: Media Details -->
        <div class="lg:col-span-1">
          <div class="bg-base-200/80 border border-base-300 rounded-box p-5 space-y-4 sticky top-6">
            <h2 class="text-lg font-bold border-b border-base-300 pb-2">Details</h2>

            <div class="divide-y divide-base-300 text-xs">
              <div class="py-2.5 flex justify-between gap-4">
                <span class="font-bold text-base-content/50 tracking-wider">Format</span>
                <span class="font-medium text-right capitalize">{{ media.category }}</span>
              </div>

              <div class="py-2.5 flex justify-between gap-4">
                <span class="font-bold text-base-content/50 tracking-wider">Date de sortie</span>
                <span class="font-medium text-right">{{ media.releaseDate }}</span>
              </div>

              <div class="py-2.5 flex justify-between gap-4">
                <span class="font-bold text-base-content/50 tracking-wider">Statut</span>
                <span class="font-medium text-right">{{ media.status }}</span>
              </div>

              <div v-if="media.runtime" class="py-2.5 flex justify-between gap-4">
                <span class="font-bold text-base-content/50 tracking-wider shrink-0">Durée</span>
                <span class="font-medium text-right">{{ media.runtime }}</span>
              </div>

              <div class="py-2.5 flex justify-between gap-4">
                <span class="font-bold text-base-content/50 tracking-wider">Studios</span>
                <span class="font-medium text-right">{{ media.productionCompanies }}</span>
              </div>

              <div class="py-2.5 flex justify-between gap-4">
                <span class="font-bold text-base-content/50 tracking-wider">Country</span>
                <span class="font-medium text-right">{{ media.originCountry }}</span>
              </div>

              <div class="py-2.5 flex justify-between gap-4">
                <span class="font-bold text-base-content/50 tracking-wider">Langue d'origine</span>
                <span class="font-medium text-right">{{ media.spokenLanguages }}</span>
              </div>

              <div v-if="media.budget" class="py-2.5 flex justify-between gap-4">
                <span class="font-bold text-base-content/50 tracking-wider shrink-0">Budget</span>
                <span class="font-medium text-right">{{ media.budget }}</span>
              </div>

              <div v-if="media.revenue" class="py-2.5 flex justify-between gap-4">
                <span class="font-bold text-base-content/50 tracking-wider shrink-0">Recette</span>
                <span class="font-medium text-right">{{ media.revenue }}</span>
              </div>

              <div class="py-2.5 flex justify-between gap-4">
                <span class="font-bold text-base-content/50 tracking-wider">Provider</span>
                <span class="font-medium text-right uppercase">{{ media.provider }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3 space-y-8">
          <!-- Cast Carousel -->
          <BaseCarousel v-if="media.cast?.length" title="Cast" :items="media.cast">
            <template #item="{ item }">
              <CardCast :name="item.name" :character="item.character" :image="item.profileUrl" />
            </template>

            <!-- "See Full Cast" Tile -->
            <template v-if="media.provider === 'tmdb'" #append>
              <a
                :href="`https://www.themoviedb.org/${media.category === 'series' ? 'tv' : 'movie'}/${media.apiId}/cast`"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-full w-32 flex-col items-center justify-center gap-2 rounded-2xl border border-base-300/60 bg-base-200/40 p-3 text-center transition-colors hover:bg-base-200/80"
              >
                <div
                  class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <RightChevronIcon class="size-5" />
                </div>
                <span class="text-xs font-semibold text-base-content/80">See full cast</span>
              </a>
            </template>
          </BaseCarousel>

          <!-- Seasons Carousel -->
          <BaseCarousel v-if="media.seasons?.length" title="Saisons" :items="media.seasons">
            <template #item="{ item: season }">
              <CardMedia
                :apiId="season.id"
                category="series"
                :title="season.name"
                :cover-url="season.posterUrl"
                :episode-count="season.episodeCount"
                :release-date="season.airYear"
                :rating="season.rating"
                class="w-32"
              />
            </template>
          </BaseCarousel>

          <!-- Movie Collection Carousel -->
          <BaseCarousel
            v-if="media.belongsToCollection?.parts?.length"
            :title="`Part of ${media.belongsToCollection.name}`"
            :items="media.belongsToCollection.parts"
          >
            <template #item="{ item: movie }">
              <CardMedia
                :apiId="movie.apiId"
                category="movie"
                :title="movie.title"
                :cover-url="movie.posterUrl"
                :release-date="movie.releaseYear"
                :rating="movie.rating"
                class="w-32"
              />
            </template>
          </BaseCarousel>

          <!-- Recommendations Carousel -->
          <BaseCarousel
            v-if="media.recommendations?.length"
            title="Dans le même genre"
            :items="media.recommendations"
          >
            <template #item="{ item: media }">
              <CardMedia
                :apiId="media.apiId"
                :category="media.category"
                :title="media.title"
                :cover-url="media.posterUrl"
                :release-date="media.releaseYear"
                :rating="media.rating"
                class="w-32"
              />
            </template>
          </BaseCarousel>

          <!-- Embedded Trailer Section -->
          <div v-if="media.trailerKey" class="space-y-3 pt-4 border-t border-base-300">
            <h2 class="text-lg font-bold">Trailer</h2>
            <div
              class="aspect-video w-full rounded-box overflow-hidden border border-base-300 bg-base-200"
            >
              <iframe
                :src="`https://www.youtube-nocookie.com/embed/${media.trailerKey}`"
                :title="`Trailer for ${media.title}`"
                class="w-full h-full"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
