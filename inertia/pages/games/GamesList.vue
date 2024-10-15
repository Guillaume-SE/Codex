<script setup lang="ts">
import { IGameMediaFormatted } from '#interfaces/media_formatted_interface'
import MediaCard from '../components/MediaCard.vue'

defineProps<{
  gamesList: IGameMediaFormatted[]
}>()
</script>

<template>
  <div class="cards-container">
    <MediaCard
      v-for="game in gamesList"
      :key="game.id"
      :media="game"
      :mediaType="'jeu vidéo'"
      :mediaInfos="{ platform: game.gameInfos?.platform }"
    />
  </div>
</template>
