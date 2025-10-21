<script setup lang="ts">
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'

defineProps<{
  form: any
}>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <LabelComp labelFor="animeSeasonLength" text="Nombres d'épisodes" />
  <InputComp v-model="form.animeSeasonLength" type="number" min="1" id="animeSeasonLength" />
  <FormErrorComp v-if="form.errors.animeSeasonLength" :message="form.errors.animeSeasonLength" />
</template>
