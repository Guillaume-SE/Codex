<script setup lang="ts">
import type { IMediaPresented } from '#interfaces/media_presented_interface'
import { computed, type PropType } from 'vue'
import { useFormattedDuration } from '~/composables/useFormattedDuration'

const props = defineProps({
  media: {
    type: Object as PropType<IMediaPresented>,
    required: true,
  },
})

const formattedDuration = computed(() =>
  props.media.movieInfos ? useFormattedDuration(props.media.movieInfos.duration) : null
)
</script>

<template>
  <p v-if="media.gameInfos">Joué sur: {{ media.gameInfos.platform || 'N/A' }}</p>

  <p v-if="media.movieInfos">Durée: {{ formattedDuration || 'N/A' }}</p>

  <p v-if="media.seriesInfos">Nombre d'épisodes: {{ media.seriesInfos.seasonLength || 'N/A' }}</p>

  <p v-if="media.animeInfos">Nombre d'épisodes: {{ media.animeInfos.seasonLength || 'N/A' }}</p>

  <p v-if="media.bookInfos">Editeur: {{ media.bookInfos.publisher || 'N/A' }}</p>
</template>
