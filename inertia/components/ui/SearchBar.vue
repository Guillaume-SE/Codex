<script setup lang="ts">
import ButtonComp from '~/components/ui/ButtonComp.vue'
import InputComp from '~/components/ui/InputComp.vue'

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
