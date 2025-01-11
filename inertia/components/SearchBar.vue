<script setup lang="ts">
import ButtonComp from './ui/ButtonComp.vue'
import InputComp from './ui/InputComp.vue'
import LabelComp from './ui/LabelComp.vue'

const model = defineModel<string>()

defineProps<{
  placeholder?: string
}>()
</script>

<template>
  <div>
    <LabelComp text="Recherche" text-position="up">
      <InputComp v-model="model" type="search" :placeholder="placeholder" />
    </LabelComp>
    <ButtonComp type="submit">Rechercher</ButtonComp>
  </div>
</template>
