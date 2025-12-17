<script setup lang="ts">
import { computed } from 'vue'
import CollapseBox from '~/components/ui/CollapseBox.vue'
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

const isPlatformActive = computed(() => {
  return publishersModel.value && publishersModel.value.length > 0
})

const capitalizeFirstLetter = useCapitalizeFirstLetter
</script>

<template>
  <CollapseBox label="Editeur" :is-active="isPlatformActive">
    <ul class="space-y-2">
      <li v-for="publisher in publishersList" :key="publisher.id" class="flex items-center gap-3">
        <InputComp
          v-model="publishersModel"
          type="checkbox"
          :value="publisher.id"
          :id="`publisher-${publisher.id}`"
          class="checkbox checkbox-sm checked:checkbox-primary"
        />
        <LabelComp
          :labelFor="`publisher-${publisher.id}`"
          :text="capitalizeFirstLetter(publisher.name)"
          class="cursor-pointer"
        />
      </li>
    </ul>
  </CollapseBox>
</template>
