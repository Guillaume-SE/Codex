<script setup lang="ts">
import { computed } from 'vue'
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

const showPreviousPageNumber = computed(() => {
  return props.page.currentPage > props.page.firstPage + 1
})

const showNextPageNumber = computed(() => {
  return props.page.currentPage < props.page.lastPage - 1
})

// Show the "..." before the previous page
const showPreviousEllipsis = computed(() => {
  return props.page.currentPage > props.page.firstPage + 2
})

// Show the "..." after the next page
const showNextEllipsis = computed(() => {
  return props.page.currentPage < props.page.lastPage - 2
})
</script>

<template>
  <div class="flex items-center gap-1">
    <ButtonComp
      :class="{
        'btn-primary': page.currentPage === page.firstPage,
        'hover:bg-base-content hover:text-base-100': page.currentPage !== page.firstPage,
      }"
      :disabled="!url.previousPageUrl && page.currentPage !== page.firstPage"
      @click="emit('update:currentPage', url.firstPageUrl)"
    >
      {{ page.firstPage }}
    </ButtonComp>

    <ButtonComp v-if="showPreviousEllipsis" variant="ghost" :disabled="true"> ... </ButtonComp>

    <ButtonComp
      v-if="showPreviousPageNumber"
      class="hover:bg-base-content hover:text-base-100"
      @click="emit('update:currentPage', url.previousPageUrl!)"
    >
      {{ page.currentPage - 1 }}
    </ButtonComp>

    <ButtonComp
      v-if="page.currentPage !== page.firstPage && page.currentPage !== page.lastPage"
      class="btn-primary"
    >
      {{ page.currentPage }}
    </ButtonComp>

    <ButtonComp
      v-if="showNextPageNumber"
      class="hover:bg-base-content hover:text-base-100"
      @click="emit('update:currentPage', url.nextPageUrl!)"
    >
      {{ page.currentPage + 1 }}
    </ButtonComp>

    <ButtonComp v-if="showNextEllipsis" variant="ghost" :disabled="true"> ... </ButtonComp>

    <ButtonComp
      v-if="page.firstPage !== page.lastPage"
      :class="{
        'btn-primary': page.currentPage === page.lastPage,
        'hover:bg-base-content hover:text-base-100': page.currentPage !== page.lastPage,
      }"
      :disabled="!url.nextPageUrl && page.currentPage !== page.lastPage"
      @click="emit('update:currentPage', url.lastPageUrl)"
    >
      {{ page.lastPage }}
    </ButtonComp>
  </div>
</template>
