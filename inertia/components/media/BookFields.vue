<script setup lang="ts">
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'

defineProps<{
  form: any
  bookPublishers: any[]
}>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <span>Edité par</span>
  <div v-for="publisher in bookPublishers">
    <LabelComp labelFor="publisher" :text="publisher.name" />
    <InputComp v-model="form.publisherId" type="radio" :value="publisher.id" id="publisher" />
  </div>
  <FormErrorComp v-if="form.errors.publisherId" :message="form.errors.publisherId" />
</template>
