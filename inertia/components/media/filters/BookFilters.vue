<script setup lang="ts">
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { useCapitalizeFirstLetter } from '~/composables/useCapitalizeFirstLetter'

defineProps<{
  publishersList: any[]
}>()

const publishersModel = defineModel<number[]>('publishers')

defineOptions({
  inheritAttrs: false,
})

const capitalizeFirstLetter = useCapitalizeFirstLetter
</script>

<template>
  <div>
    <span>Editeurs</span>
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
  </div>
</template>
