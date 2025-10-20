<script setup lang="ts">
import SelectComp from '~/components/ui/SelectComp.vue'

defineProps<{
  movieDurationOptions: any[]
}>()

const durationModel = defineModel<string | number | undefined>('duration')

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div>
    <span>Durée maximale</span>
    <SelectComp v-model="durationModel" :options="movieDurationOptions" />
  </div>
</template>
