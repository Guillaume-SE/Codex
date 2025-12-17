<script setup lang="ts">
import { computed } from 'vue'
import CollapseBox from '~/components/ui/CollapseBox.vue'
import RangeSliderComp from '~/components/ui/RangeSliderComp.vue'
import { MAX_MOVIE_DURATION } from '~/composables/usePaginatedMediaFilters'

defineOptions({
  inheritAttrs: false,
})

const durationModel = defineModel<string>('duration')
const sliderLabels = ['1h', '1h30', '2h', '2h30', '3h', '3h30', '4h', '4h30', '5h']

const isDurationActive = computed(() => {
  if (!durationModel.value) return false

  return String(durationModel.value) !== String(MAX_MOVIE_DURATION)
})
</script>

<template>
  <CollapseBox label="Durée maximale" :is-active="isDurationActive">
    <div class="w-full max-w-xs">
      <RangeSliderComp
        v-model="durationModel"
        min="60"
        :max="MAX_MOVIE_DURATION"
        step="30"
        :labels="sliderLabels"
        size="xs"
        :class="{ 'range-primary': isDurationActive }"
      />
    </div>
  </CollapseBox>
</template>
