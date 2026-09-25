<script setup lang="ts">
import type { MediaCategory } from '#types/media'
import { Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { computed } from 'vue'
import AppHead from '~/components/AppHead.vue'
import BaseCarousel from '~/components/BaseCarousel.vue'
import CardMedia from '~/components/CardMedia.vue'
import RightChevronIcon from '~/components/ui/icons/RightChevronIcon.vue'
import RatingBox from '~/components/ui/RatingBox.vue'

const props = defineProps<{
  movies: Data.PresentedMedia[]
  series: Data.PresentedMedia[]
}>()

const categorySections = computed(() => [
  { key: 'movie' as MediaCategory, label: 'Movies', items: props.movies },
  { key: 'series' as MediaCategory, label: 'Series', items: props.series },
])
</script>

<template>
  <AppHead title="Accueil" />

  <main class="container mx-auto p-4 space-y-8">
    <div class="space-y-10">
      <section v-for="category in categorySections" :key="category.key">
        <BaseCarousel :items="category.items">
          <template #title>
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 class="text-xl font-bold tracking-wide">{{ category.label }}</h2>

              <div role="tablist" class="tabs tabs-xs sm:tabs-sm tabs-boxed w-fit">
                <button role="tab" class="tab tab-active">Recently Released</button>
                <button role="tab" class="tab opacity-50 cursor-not-allowed" title="Coming soon">
                  Popular
                </button>
              </div>
            </div>
          </template>

          <template #item="{ item }">
            <CardMedia
              :apiId="item.apiId"
              :category="item.category"
              :title="item.title"
              :cover-url="item.posterUrl"
              :release-date="item.releaseDate"
              :rating="item.rating"
              class="w-42"
            />
          </template>

          <template #append>
            <Link
              route="register.create"
              class="w-28 h-full bg-base-300 sm:bg-base-200 rounded-box p-2 border border-base-300 flex flex-col items-center justify-center text-center gap-2 sm:hover:bg-base-300/50 transition-colors group"
            >
              <div
                class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center"
              >
                <RightChevronIcon class="size-5" />
              </div>
              <span class="text-xs font-semibold text-base-content/80">
                Explore All {{ category.label }}
              </span>
            </Link>
          </template>
        </BaseCarousel>
      </section>
    </div>
  </main>
</template>
