<script setup lang="ts">
import ButtonComp from './ui/ButtonComp.vue'
import InputComp from './ui/InputComp.vue'

const model = defineModel<string>()

defineProps<{
  placeholder?: string
}>()
</script>

<template>
  <div>
    <InputComp v-model="model" type="search" :placeholder="placeholder" />
    <ButtonComp type="submit">Rechercher</ButtonComp>
  </div>
</template>
