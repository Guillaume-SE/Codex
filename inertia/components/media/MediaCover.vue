<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  cover: { smallCoverUrl: string; largeCoverUrl: string } | undefined
  alt: string
  defaultCover: { small: string; large: string }
  size?: 'small' | 'large'
}>()

const imageStatus = ref('loading')
const backupImageStatus = ref('loading')
const sizeClass = computed(() => (props.size ? `size-${props.size}` : 'size-small'))
</script>

<template>
  <div
    v-if="cover && imageStatus !== 'error'"
    class="cover-container"
    :class="[sizeClass, { 'is-loading': imageStatus === 'loading' }]"
  >
    <img
      class="cover-image"
      :class="{ 'is-loaded': imageStatus === 'loaded' }"
      loading="lazy"
      :src="cover.smallCoverUrl"
      :srcset="`${cover.smallCoverUrl}, ${cover.largeCoverUrl} 2x`"
      :alt="alt"
      @load="imageStatus = 'loaded'"
      @error="imageStatus = 'error'"
    />
  </div>

  <div
    v-else
    class="cover-placeholder"
    :class="[sizeClass, { 'is-loading': backupImageStatus === 'loading' }]"
  >
    <img
      class="cover-image"
      :class="{ 'is-loaded': backupImageStatus === 'loaded' }"
      loading="lazy"
      :src="defaultCover.small"
      :srcset="`${defaultCover.small}, ${defaultCover.large} 2x`"
      alt="Image de remplacement"
      @load="backupImageStatus = 'loaded'"
      @error="backupImageStatus = 'error'"
    />
    <div class="overlay-text">
      {{ imageStatus === 'error' ? 'Image indisponible' : 'Aucune cover' }}
    </div>
  </div>
</template>

<style scoped>
.cover-container,
.cover-placeholder {
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  margin-bottom: 8px;
  background-color: #333;
}

.size-small {
  width: 150px;
  height: 225px;
}

.size-large {
  width: 220px;
  height: 330px;
}

.cover-container.is-loading,
.cover-placeholder.is-loading {
  background-image: linear-gradient(to right, #333 0%, #444 50%, #333 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  color: transparent;
}

.cover-image::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: #333;
  z-index: 2;
}

.cover-image.is-loaded {
  opacity: 1;
}

.cover-image.is-loaded::before {
  display: none;
}

.overlay-text {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  /* background-color: rgba(255, 255, 255, 0.8); */
  z-index: 2;
  color: white;
  /* color: black; */
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
}
</style>
