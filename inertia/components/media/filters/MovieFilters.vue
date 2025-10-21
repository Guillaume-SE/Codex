<script setup lang="ts">
import FilterTitleComp from '~/components/ui/FilterTitleComp.vue'
import RangeSliderComp from '~/components/ui/RangeSliderComp.vue'
import { MAX_MOVIE_DURATION } from '~/composables/usePaginatedMediaFilters'

defineProps<{
  isActive: boolean | undefined
}>()

defineOptions({
  inheritAttrs: false,
})

const durationModel = defineModel<string>('duration')
const sliderLabels = ['1h', '1h30', '2h', '2h30', '3h', '3h30', '4h', '4h30', '5h']
</script>

<template>
  <FilterTitleComp title="Durée maximale" :is-active="isActive" />
  <div class="w-full max-w-xs">
    <RangeSliderComp
      v-model="durationModel"
      min="60"
      :max="MAX_MOVIE_DURATION"
      step="30"
      :labels="sliderLabels"
      size="xs"
    />
  </div>
</template>
