<script setup lang="ts">
import type { IAnimeMediaFormatted } from '#interfaces/media_formatted_interface'
import MediaCard from '~/components/MediaCard.vue'

defineProps<{
  animeList: IAnimeMediaFormatted[]
}>()
</script>

<template>
  <div class="cards-container">
    <MediaCard v-for="anime in animeList" :key="anime.id" :media="anime" :mediaType="'anime'" />
  </div>
</template>
