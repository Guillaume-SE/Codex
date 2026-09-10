<script setup lang="ts">
import type { MediaCategory } from '#types/media'
import { Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { computed, ref } from 'vue'
import AppHead from '~/components/AppHead.vue'

const props = defineProps<{
  movies: Data.PresentedMedia[]
  series: Data.PresentedMedia[]
  // anime?: Data.PresentedMedia[]
  // books?: Data.PresentedMedia[]
  // games?: Data.PresentedMedia[]
}>()

// --- Display Mode State ('grid' vs 'carousel') ---
const viewMode = ref<'carousel' | 'grid'>('carousel')

// --- Category Setup ---
const activeCategory = ref<MediaCategory>('movie')

const categorySections = computed(() => [
  { key: 'movie' as MediaCategory, label: 'Movies', items: props.movies },
  { key: 'series' as MediaCategory, label: 'Series', items: props.series },
  // { key: 'anime' as MediaCategory, label: 'Anime', items: props.anime ?? [] },
  // { key: 'book' as MediaCategory, label: 'Books', items: props.books ?? [] },
  // { key: 'game' as MediaCategory, label: 'Games', items: props.games ?? [] },
])

// Filtered array for the Single Category Grid view
const activeGridList = computed(() => {
  const current = categorySections.value.find((c) => c.key === activeCategory.value)
  return current?.items ?? []
})
</script>

<template>
  <AppHead title="Accueil" />

  <main class="container mx-auto p-4 space-y-8">
    <!-- View Switcher (Compare Display Styles) -->
    <div class="flex items-center justify-between border-b border-base-200 pb-4">
      <h1 class="text-2xl font-bold">Discover</h1>
      <div class="join bg-base-200 p-1 rounded-btn">
        <button
          class="btn btn-xs sm:btn-sm join-item"
          :class="{ 'btn-primary': viewMode === 'carousel' }"
          @click="viewMode = 'carousel'"
        >
          Row / Carousel View
        </button>
        <button
          class="btn btn-xs sm:btn-sm join-item"
          :class="{ 'btn-primary': viewMode === 'grid' }"
          @click="viewMode = 'grid'"
        >
          Tabbed Grid View
        </button>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- DISPLAY OPTION 1: ROWS / CAROUSELS FOR EACH CATEGORY                      -->
    <!-- ========================================================================= -->
    <div v-if="viewMode === 'carousel'" class="space-y-10">
      <section v-for="category in categorySections" :key="category.key" class="space-y-3">
        <!-- Category Header & Sub-Tabs -->
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-base-200 pb-2"
        >
          <h2 class="text-xl font-bold tracking-wide">{{ category.label }}</h2>

          <!-- Sub-tabs: Recently Released vs Popular (Placeholder) -->
          <div role="tablist" class="tabs tabs-xs sm:tabs-sm tabs-boxed w-fit">
            <button role="tab" class="tab tab-active">Recently Released</button>
            <button role="tab" class="tab opacity-50 cursor-not-allowed" title="Coming soon">
              Popular
            </button>
          </div>
        </div>

        <!-- Horizontal Scroll Row (Carousel using Native Scroll) -->
        <div class="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-thin">
          <div
            v-for="item in category.items"
            :key="item.apiId"
            class="flex-none w-36 sm:w-44 snap-start card bg-base-100 shadow-sm border border-base-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <Link
              route="media.show"
              :params="{ category: item.category, apiId: item.apiId }"
              class="flex-none w-36 sm:w-44 card bg-base-100 shadow-sm border border-base-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <!-- Poster & Rating -->
              <figure class="aspect-2/3 bg-base-200 relative">
                <img
                  v-if="item.posterUrl"
                  :src="item.posterUrl"
                  :alt="item.title"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  v-else
                  class="flex items-center justify-center h-full text-xs text-base-content/50"
                >
                  No Image
                </div>

                <div
                  v-if="item.rating"
                  class="badge badge-sm badge-warning font-semibold absolute top-2 right-2"
                >
                  ★ {{ item.rating }}
                </div>
              </figure>

              <!-- Card Info -->
              <div class="card-body p-2 sm:p-3">
                <h3 class="card-title text-xs sm:text-sm line-clamp-1" :title="item.title">
                  {{ item.title }}
                </h3>
                <span v-if="item.releaseDate" class="text-xs text-base-content/60">
                  {{ item.releaseDate }}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>

    <!-- ========================================================================= -->
    <!-- DISPLAY OPTION 2: TABBED GRID (Single category focus)                    -->
    <!-- ========================================================================= -->
    <div v-else class="space-y-6">
      <!-- Category Tabs -->
      <div role="tablist" class="tabs tabs-boxed w-fit">
        <button
          v-for="cat in categorySections"
          :key="cat.key"
          role="tab"
          class="tab"
          :class="{ 'tab-active': activeCategory === cat.key }"
          @click="activeCategory = cat.key"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Media Grid -->
      <div
        v-if="activeGridList.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <div
          v-for="item in activeGridList"
          :key="item.apiId"
          class="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow overflow-hidden"
        >
          <Link
            route="media.show"
            :params="{ category: item.category, apiId: item.apiId }"
            class="flex-none w-36 sm:w-44 card bg-base-100 shadow-sm border border-base-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <figure class="aspect-2/3 bg-base-200 relative">
              <img
                v-if="item.posterUrl"
                :src="item.posterUrl"
                :alt="item.title"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                v-else
                class="flex items-center justify-center h-full text-xs text-base-content/50"
              >
                No Image
              </div>

              <div
                v-if="item.rating"
                class="badge badge-sm badge-warning font-semibold absolute top-2 right-2"
              >
                ★ {{ item.rating.toFixed(1) }}
              </div>
            </figure>

            <div class="card-body p-3">
              <h3 class="card-title text-sm line-clamp-1" :title="item.title">
                {{ item.title }}
              </h3>
              <span v-if="item.releaseDate" class="text-xs text-base-content/60">
                {{ item.releaseDate.split('-')[0] }}
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div v-else class="text-center py-12 text-base-content/50">
        No media found for this category.
      </div>
    </div>
  </main>
</template>
