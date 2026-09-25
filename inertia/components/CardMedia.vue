<script setup lang="ts">
import { MediaCategory } from '#types/media'
import { Link } from '@adonisjs/inertia/vue'
import { computed } from 'vue'
import RatingBox from '~/components/ui/RatingBox.vue'

interface Props {
  apiId: number | string
  title: string
  category: MediaCategory
  coverUrl?: string | null
  releaseDate?: string | null
  episodeCount?: number | string | null
  rating?: number | string | null
}

const {
  apiId,
  title,
  category,
  coverUrl = null,
  releaseDate = null,
  episodeCount = null,
  rating = null,
} = defineProps<Props>()

// format into "2024 • 12 Eps", "2024", "12 Eps", or "TBA"
const metaText = computed(() => {
  const parts: string[] = []

  if (releaseDate) {
    parts.push(String(releaseDate))
  }

  if (episodeCount !== null && episodeCount !== undefined && episodeCount !== '') {
    const formattedEps =
      typeof episodeCount === 'number' ? `${episodeCount} Eps` : String(episodeCount)
    parts.push(formattedEps)
  }

  return parts.length > 0 ? parts.join(' • ') : 'TBA'
})
</script>

<template>
  <div class="group flex flex-col">
    <!-- Poster Container -->
    <Link
      route="media.show"
      :params="{ category, apiId }"
      class="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-base-300"
      tabindex="-1"
    >
      <img
        v-if="coverUrl"
        :src="coverUrl"
        :alt="`Cover for ${title}`"
        loading="lazy"
        class="h-full w-full object-cover"
      />
      <div
        v-else
        class="flex h-full w-full select-none items-center justify-center p-2 text-center text-xs font-medium text-base-content/40"
      >
        No Image
      </div>
    </Link>

    <!-- Info Section -->
    <div class="mt-2 flex flex-col px-0.5">
      <Link route="media.show" :params="{ category, apiId }" class="group-hover:text-primary">
        <h3 class="truncate text-sm font-semibold leading-tight text-base-content" :title="title">
          {{ title }}
        </h3>
      </Link>

      <div
        class="mt-1 flex items-center justify-between gap-1 text-[11px] text-base-content/60 select-none"
      >
        <span class="truncate" :title="metaText">
          {{ metaText }}
        </span>

        <RatingBox :rating="rating" class="shrink-0" />
      </div>
    </div>
  </div>
</template>
