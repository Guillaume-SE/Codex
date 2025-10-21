<script setup lang="ts">
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'

defineProps<{
  platformsList: any[]
}>()

const platformsModel = defineModel<number[]>('platforms')

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <span>Plateformes</span>
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
