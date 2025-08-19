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
  <LabelComp text="Nombres de pages" textPosition="up">
    <div>
      <InputComp v-model="form.pages" type="number" min="1" />
    </div>
  </LabelComp>
  <FormErrorComp v-if="form.errors.pages" :message="form.errors.pages" />
</template>
