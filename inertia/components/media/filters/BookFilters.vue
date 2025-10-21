<script setup lang="ts">
import FilterTitleComp from '~/components/ui/FilterTitleComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { useCapitalizeFirstLetter } from '~/composables/useCapitalizeFirstLetter'

defineProps<{
  publishersList: any[]
  isActive: boolean | undefined
}>()

const publishersModel = defineModel<number[]>('publishers')

defineOptions({
  inheritAttrs: false,
})

const capitalizeFirstLetter = useCapitalizeFirstLetter
</script>

<template>
  <FilterTitleComp title="Editeur" :is-active="isActive" />
  <ul>
    <li v-for="publisher in publishersList" :key="publisher.id">
      <InputComp
        v-model="publishersModel"
        type="checkbox"
        :value="publisher.id"
        :id="`publisher-${publisher.id}`"
      />
      <LabelComp
        :labelFor="`publisher-${publisher.id}`"
        :text="capitalizeFirstLetter(publisher.name)"
      />
    </li>
  </ul>
</template>
