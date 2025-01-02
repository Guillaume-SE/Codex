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

interface IHandlePaginationOptions {
  toFirstPage?: boolean
  toPreviousPage?: boolean
  toNextPage?: boolean
  toLastPage?: boolean
}

function handlePaginationClick(paginationOptions: IHandlePaginationOptions) {
  const currentPageIsNotFirstPage = props.page.currentPage > props.page.firstPage
  const currentPageIsNotLastPage = props.page.currentPage < props.page.lastPage

  if (currentPageIsNotFirstPage) {
    if (paginationOptions.toFirstPage) {
      return emit('update:currentPage', props.url.firstPageUrl)
    } else if (paginationOptions.toPreviousPage) {
      return emit('update:currentPage', props.url.previousPageUrl)
    }
  }
  if (currentPageIsNotLastPage) {
    if (paginationOptions.toLastPage) {
      return emit('update:currentPage', props.url.lastPageUrl)
    } else if (paginationOptions.toNextPage) {
      return emit('update:currentPage', props.url.nextPageUrl)
    }
  }
}
</script>

<template>
  <nav>
    <ButtonComp
      :disabled="props.page.currentPage === props.page.firstPage"
      @click="handlePaginationClick({ toFirstPage: true })"
    >
      <span><<</span>
    </ButtonComp>

    <ButtonComp
      :disabled="props.page.currentPage === props.page.firstPage"
      @click="handlePaginationClick({ toPreviousPage: true })"
    >
      <span><</span>
    </ButtonComp>

    <span>{{ props.page.currentPage }} / {{ props.page.lastPage }}</span>

    <ButtonComp
      :disabled="props.page.currentPage === props.page.lastPage"
      @click="handlePaginationClick({ toNextPage: true })"
    >
      <span>></span>
    </ButtonComp>

    <ButtonComp
      :disabled="props.page.currentPage === props.page.lastPage"
      @click="handlePaginationClick({ toLastPage: true })"
    >
      <span>>></span>
    </ButtonComp>
  </nav>
</template>
