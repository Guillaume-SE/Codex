<script setup lang="ts">
import type { IGameMediaFormatted } from '#interfaces/media_formatted_interface'
import MediaList from '~/components/MediaList.vue'

defineProps<{
  gamesList: IGameMediaFormatted[]
}>()
</script>

<template>
  <MediaList title="Liste des jeux" :mediaList="gamesList" mediaType="jeu" />
</template>
