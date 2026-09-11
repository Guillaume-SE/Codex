<script setup lang="ts">
import { Link } from '@adonisjs/inertia/vue'
import { Data } from '@generated/data'
import AppHead from '~/components/AppHead.vue'

defineProps<{
  media: Data.PresentedMediaDetail
  userProgress: Data.UserMedia | null
}>()

const formatCurrency = (amount?: number) => {
  if (!amount) return undefined
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}
</script>

<template>
  <AppHead :title="media.title" />

  <main class="min-h-screen bg-base-100 pb-16">
    <div class="container mx-auto px-4 mt-10 relative z-10 space-y-8">
      <div class="flex flex-col md:flex-row gap-6 items-start">
        <!-- Poster -->
        <div
          class="w-48 sm:w-64 rounded-box shadow-xl overflow-hidden bg-base-200 shrink-0 border border-base-300"
        >
          <img
            v-if="media.posterUrl"
            :src="media.posterUrl"
            :alt="media.title"
            class="w-full h-auto"
          />
          <div
            v-else
            class="aspect-2/3 flex items-center justify-center text-sm text-base-content/50"
          >
            No Image
          </div>
        </div>

        <!-- Info Header -->
        <div class="flex-1 space-y-4 pt-4 md:pt-4">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="badge badge-outline capitalize">{{ media.category }}</span>
            <span v-if="media.status" class="badge badge-neutral">{{ media.status }}</span>
            <span
              v-for="country in media.originCountry"
              :key="country"
              class="badge badge-ghost uppercase"
            >
              {{ country }}
            </span>
          </div>

          <!-- Main Title & Localized Titles -->
          <div class="space-y-1">
            <h1 class="text-3xl sm:text-4xl font-extrabold">{{ media.title }}</h1>

            <div
              v-if="media.originalTitle || media.frenchTitle"
              class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-base-content/70 pt-0.5"
            >
              <span v-if="media.originalTitle">
                <span class="text-base-content/50 font-medium">Original:</span>
                <span class="font-semibold text-base-content/80 ml-1">{{
                  media.originalTitle
                }}</span>
              </span>

              <span v-if="media.frenchTitle">
                <span class="text-base-content/50 font-medium">FR:</span>
                <span class="font-semibold text-base-content/80 ml-1">{{ media.frenchTitle }}</span>
              </span>
            </div>
          </div>

          <!-- Key Stats -->
          <div class="flex flex-wrap items-center gap-4 text-sm text-base-content/70">
            <span v-if="media.releaseDate">📅 {{ media.releaseDate }}</span>
            <span v-if="media.rating">★ {{ media.rating.toFixed(1) }} / 10</span>
            <span v-if="media.runtime">⏱️ {{ media.runtime }} min</span>
            <span v-if="media.numberOfSeasons">
              📺 {{ media.numberOfSeasons }} Seasons ({{ media.numberOfEpisodes }} eps)
            </span>
          </div>

          <!-- Spoken Languages & Genres -->
          <div class="space-y-2">
            <div class="flex flex-wrap gap-2">
              <span v-for="genre in media.genres" :key="genre" class="badge badge-sm bg-base-200">
                {{ genre }}
              </span>
            </div>
            <div v-if="media.spokenLanguages?.length" class="text-xs text-base-content/60">
              Languages: {{ media.spokenLanguages.join(', ') }}
            </div>
          </div>

          <!-- Overview -->
          <p v-if="media.overview" class="text-base-content/80 max-w-2xl leading-relaxed">
            {{ media.overview }}
          </p>

          <!-- Key Crew (Directors / Writers / Creators) -->
          <div v-if="media.crew?.length" class="flex flex-wrap gap-x-6 gap-y-2 text-sm pt-1">
            <div v-for="member in media.crew" :key="member.id" class="flex items-center gap-1.5">
              <span class="text-base-content/60 font-medium">{{ member.job }}:</span>
              <span class="font-semibold">{{ member.name }}</span>
            </div>
          </div>

          <!-- Budget & Revenue (Movies) -->
          <div v-if="media.budget || media.revenue" class="flex gap-6 text-sm pt-2">
            <div v-if="media.budget">
              <span class="text-base-content/60 block text-xs">Budget</span>
              <span class="font-medium">{{ formatCurrency(media.budget) }}</span>
            </div>
            <div v-if="media.revenue">
              <span class="text-base-content/60 block text-xs">Revenue</span>
              <span class="font-medium">{{ formatCurrency(media.revenue) }}</span>
            </div>
          </div>

          <!-- Collection Banner -->
          <div
            v-if="media.belongsToCollection"
            class="mt-6 p-4 rounded-box bg-base-200 border border-base-300 max-w-md flex items-center gap-4"
          >
            <div>
              <span class="text-xs uppercase tracking-wide text-base-content/50 block"
                >Part of</span
              >
              <span class="font-bold text-sm">{{ media.belongsToCollection.name }}</span>
            </div>
          </div>

          <!-- Progression Tracking Bar -->
          <div class="card bg-base-200 p-4 border border-base-300 max-w-md mt-6 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-semibold text-sm">Your Progression</span>
              <span class="badge badge-primary">{{
                userProgress?.status?.name ?? 'Not Tracked'
              }}</span>
            </div>
            <div class="flex gap-2 pt-2">
              <button class="btn btn-sm btn-primary flex-1">
                {{ userProgress ? 'Update Status' : 'Add to List' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Production Companies -->
      <div v-if="media.productionCompanies?.length" class="space-y-3 pt-6 border-t border-base-300">
        <h2 class="text-lg font-bold">Production Companies</h2>
        <div class="flex flex-wrap gap-4 items-center">
          <div
            v-for="company in media.productionCompanies"
            :key="company.id"
            class="flex items-center gap-3 bg-base-200 px-4 py-2 rounded-lg border border-base-300"
          >
            <span class="text-xs font-semibold">{{ company.name }}</span>
          </div>
        </div>
      </div>

      <!-- Cast Section -->
      <div v-if="media.cast?.length" class="space-y-4 pt-6 border-t border-base-300">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">Cast</h2>
          <a
            v-if="media.provider === 'tmdb'"
            :href="`https://www.themoviedb.org/${media.category === 'series' ? 'tv' : 'movie'}/${media.apiId}/cast`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs text-primary hover:underline font-medium"
          >
            Full cast on TMDB →
          </a>
        </div>

        <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-thin items-stretch">
          <div
            v-for="person in media.cast"
            :key="person.id"
            class="w-28 shrink-0 bg-base-200 rounded-box p-2 text-center border border-base-300 flex flex-col items-center"
          >
            <div class="w-20 h-20 mx-auto rounded-full overflow-hidden bg-base-300 mb-2 shrink-0">
              <img
                v-if="person.profileUrl"
                :src="person.profileUrl"
                :alt="person.name"
                class="w-full h-full object-cover"
              />
            </div>
            <p class="font-bold text-xs truncate w-full">{{ person.name }}</p>
            <p class="text-[10px] text-base-content/60 truncate w-full">{{ person.character }}</p>
          </div>

          <!-- See More Cast Tile -->
          <a
            v-if="media.provider === 'tmdb'"
            :href="`https://www.themoviedb.org/${media.category === 'series' ? 'tv' : 'movie'}/${media.apiId}/cast`"
            target="_blank"
            rel="noopener noreferrer"
            class="w-28 shrink-0 bg-base-200 hover:bg-base-300 transition-colors rounded-box p-2 border border-base-300 flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <div
              class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold group-hover:scale-110 transition-transform"
            >
              →
            </div>
            <span
              class="text-xs font-semibold text-base-content/80 group-hover:text-primary transition-colors"
            >
              See full cast
            </span>
          </a>
        </div>
      </div>

      <!-- Recommendations Section -->
      <div v-if="media.recommendations?.length" class="space-y-4 pt-6 border-t border-base-300">
        <h2 class="text-xl font-bold">You Might Also Like</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          <Link
            v-for="item in media.recommendations"
            :key="item.apiId"
            route="media.show"
            :params="{ category: item.category, apiId: item.apiId }"
            class="group space-y-2"
          >
            <div
              class="aspect-2/3 rounded-box overflow-hidden bg-base-200 border border-base-300 group-hover:border-primary transition-colors"
            >
              <img
                v-if="item.posterUrl"
                :src="item.posterUrl"
                :alt="item.title"
                class="w-full h-full object-cover"
              />
            </div>
            <p
              class="font-semibold text-xs line-clamp-1 group-hover:text-primary transition-colors"
            >
              {{ item.title }}
            </p>
          </Link>
        </div>
      </div>

      <!-- Trailer Section -->
      <div v-if="media.trailerKey" class="space-y-3 pt-6 border-t border-base-300">
        <h2 class="text-lg font-bold">Trailer</h2>
        <div
          class="aspect-video w-full max-w-3xl rounded-box overflow-hidden shadow-lg border border-base-300"
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
  </main>
</template>
