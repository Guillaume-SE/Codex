<script setup lang="ts">
import FilterTitleComp from '~/components/ui/FilterTitleComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'

defineProps<{
  platformsList: any[]
  isActive: boolean
}>()

const platformsModel = defineModel<number[]>('platforms')

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <FilterTitleComp title="Plateforme" :is-active="isActive" />
  <ul>
    <li v-for="platform in platformsList" :key="platform.id">
      <InputComp
        v-model="platformsModel"
        type="checkbox"
        :value="platform.id"
        :id="`platform-${platform.id}`"
      />
      <LabelComp :labelFor="`platform-${platform.id}`" :text="platform.name" />
    </li>
  </ul>
</template>
