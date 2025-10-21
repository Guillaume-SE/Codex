<script setup lang="ts">
import RangeSliderComp from '~/components/ui/RangeSliderComp.vue'
import { MAX_MOVIE_DURATION } from '~/composables/usePaginatedMediaFilters'

const durationModel = defineModel<string>('duration')
const sliderLabels = ['1h', '1h30', '2h', '2h30', '3h', '3h30', '4h', '4h30', '5h']

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <span>Durée maximale</span>
  <div class="w-full max-w-xs">
    <RangeSliderComp
      v-model="durationModel"
      min="60"
      :max="MAX_MOVIE_DURATION"
      step="30"
      :labels="sliderLabels"
    />
  </div>
</template>
