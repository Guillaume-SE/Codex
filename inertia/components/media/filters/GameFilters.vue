<script setup lang="ts">
import { computed } from 'vue'
import CollapseBox from '~/components/ui/CollapseBox.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'

defineProps<{
  platformsList: any[]
}>()

const platformsModel = defineModel<number[]>('platforms')

defineOptions({
  inheritAttrs: false,
})

const isPlatformActive = computed(() => {
  return platformsModel.value && platformsModel.value.length > 0
})
</script>

<template>
  <CollapseBox label="Plateforme" :is-active="isPlatformActive">
    <ul class="space-y-2">
      <li v-for="platform in platformsList" :key="platform.id" class="flex items-center gap-3">
        <InputComp
          v-model="platformsModel"
          type="checkbox"
          :value="platform.id"
          :id="`platform-${platform.id}`"
          class="checkbox checkbox-sm checked:checkbox-primary"
        />
        <LabelComp
          :labelFor="`platform-${platform.id}`"
          :text="platform.name"
          class="cursor-pointer"
        />
      </li>
    </ul>
  </CollapseBox>
</template>
