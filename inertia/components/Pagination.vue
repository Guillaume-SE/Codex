<script setup lang="ts">
import ButtonComp from '~/components/ui/ButtonComp.vue'

const emit = defineEmits(['update:currentPage'])

const props = defineProps<{
  page: {
    currentPage: number
    firstPage: number
    lastPage: number
  }
  url: {
    firstPageUrl: string
    lastPageUrl: string
    previousPageUrl: string | null
    nextPageUrl: string | null
  }
}>()
</script>

<template>
  <nav>
    <ButtonComp
      :disabled="!props.url.previousPageUrl"
      @click="emit('update:currentPage', props.url.firstPageUrl)"
    >
      <span>|&lt;</span>
    </ButtonComp>

    <ButtonComp
      :disabled="!props.url.previousPageUrl"
      @click="emit('update:currentPage', props.url.previousPageUrl!)"
    >
      <span>&lt;</span>
    </ButtonComp>

    <span>{{ props.page.currentPage }} / {{ props.page.lastPage }}</span>

    <ButtonComp
      :disabled="!props.url.nextPageUrl"
      @click="emit('update:currentPage', props.url.nextPageUrl!)"
    >
      <span>&gt;</span>
    </ButtonComp>

    <ButtonComp
      :disabled="!props.url.nextPageUrl"
      @click="emit('update:currentPage', props.url.lastPageUrl)"
    >
      <span>&gt;|</span>
    </ButtonComp>
  </nav>
</template>
