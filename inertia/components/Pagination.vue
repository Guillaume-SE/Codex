<script setup lang="ts">
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

function handlePaginationClick(navigationOptions: IHandlePaginationOptions) {
  const currentPageIsNotFirstPage = props.page.currentPage > props.page.firstPage
  const currentPageIsNotLastPage = props.page.currentPage < props.page.lastPage

  if (currentPageIsNotFirstPage) {
    if (navigationOptions.toFirstPage) {
      return emit('update:currentPage', props.url.firstPageUrl)
    } else if (navigationOptions.toPreviousPage) {
      return emit('update:currentPage', props.url.previousPageUrl)
    }
  }
  if (currentPageIsNotLastPage) {
    if (navigationOptions.toLastPage) {
      return emit('update:currentPage', props.url.lastPageUrl)
    } else if (navigationOptions.toNextPage) {
      return emit('update:currentPage', props.url.nextPageUrl)
    }
  }
}
</script>

<template>
  <nav>
    <button
      :disabled="props.page.currentPage === props.page.firstPage"
      @click="handlePaginationClick({ toFirstPage: true })"
    >
      <span><<</span>
    </button>

    <button
      :disabled="props.page.currentPage === props.page.firstPage"
      @click="handlePaginationClick({ toPreviousPage: true })"
    >
      <span><</span>
    </button>

    <span>{{ props.page.currentPage }} / {{ props.page.lastPage }}</span>

    <button
      :disabled="props.page.currentPage === props.page.lastPage"
      @click="handlePaginationClick({ toNextPage: true })"
    >
      <span>></span>
    </button>

    <button
      :disabled="props.page.currentPage === props.page.lastPage"
      @click="handlePaginationClick({ toLastPage: true })"
    >
      <span>>></span>
    </button>
  </nav>
</template>
