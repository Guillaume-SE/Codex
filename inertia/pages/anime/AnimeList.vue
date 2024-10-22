<script setup lang="ts">
import type { IAnimeMediaFormatted } from '#interfaces/media_formatted_interface'
import MediaList from '~/components/MediaList.vue'

defineProps<{
  animeList: IAnimeMediaFormatted[]
}>()
</script>

<template>
  <MediaList title="Liste des anime" :mediaList="animeList" mediaType="anime" />
</template>
