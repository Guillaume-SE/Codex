<script setup lang="ts">
import type { IBookMediaFormatted } from '#interfaces/media_formatted_interface'
import MediaList from '~/components/MediaList.vue'

defineProps<{
  booksList: IBookMediaFormatted[]
}>()
</script>

<template>
  <MediaList title="Liste des livres" :mediaList="booksList" mediaType="livre" />
</template>
