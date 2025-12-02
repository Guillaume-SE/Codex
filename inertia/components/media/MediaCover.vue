<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{
  cover: { smallCoverUrl: string; largeCoverUrl: string } | undefined
  alt: string
  defaultCoverUrl: string
}>()

const isLoaded = ref(false)
const hasError = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)

function onImageLoad() {
  isLoaded.value = true
}

function onImageError() {
  hasError.value = true
  isLoaded.value = true
}

// to avoid loading bg to stay forever when F5 with images in cache
onMounted(() => {
  if (imgRef.value?.complete) {
    onImageLoad()
  }
})
</script>

<template>
  <div
    class="relative aspect-[2/3] w-full overflow-hidden rounded-xl"
    :class="isLoaded ? 'bg-transparent' : 'bg-neutral'"
  >
    <img
      v-if="cover && !hasError"
      ref="imgRef"
      class="block h-full w-full scale-[1.01] object-cover transition-opacity duration-500 ease-in-out"
      :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      loading="lazy"
      :src="cover.smallCoverUrl"
      :srcset="`${cover.smallCoverUrl} 220w, ${cover.largeCoverUrl} 440w`"
      sizes="(max-width: 640px) 50vw, 300px"
      :alt="alt"
      @load="onImageLoad"
      @error="onImageError"
    />

    <img
      v-else
      class="block h-full w-full scale-[1.01] object-cover"
      :src="defaultCoverUrl"
      alt="Image de remplacement"
    />
    <div
      v-if="!cover || hasError"
      class="absolute inset-0 z-2 flex items-center justify-center bg-black/80 p-2 text-center"
    >
      <span class="text-neutral-content text-lg font-semibold">
        {{ hasError ? 'Indisponible' : 'Aucune cover' }}
      </span>
    </div>
  </div>
</template>
