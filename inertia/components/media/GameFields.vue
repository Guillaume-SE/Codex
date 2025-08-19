<script setup lang="ts">
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'

defineProps<{
  form: any
  gamePlatforms: any[]
}>()

defineOptions({
  // to avoid receive props from an another categories fields comp
  inheritAttrs: false,
})
</script>

<template>
  <span>Joué sur</span>
  <div v-for="platform in gamePlatforms">
    <LabelComp :text="platform.name" textPosition="down">
      <InputComp v-model="form.platformId" type="radio" :value="platform.id" />
    </LabelComp>
  </div>
  <FormErrorComp v-if="form.errors.platformId" :message="form.errors.platformId" />
</template>
