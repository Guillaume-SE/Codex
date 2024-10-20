<script setup lang="ts">
import type { IBookMediaFormatted } from '#interfaces/media_formatted_interface'
import MediaCard from '~/components/MediaCard.vue'

defineProps<{
  booksList: IBookMediaFormatted[]
}>()
</script>

<template>
  <div class="cards-container">
    <MediaCard v-for="book in booksList" :key="book.id" :media="book" :mediaType="'livre'" />
  </div>
</template>
