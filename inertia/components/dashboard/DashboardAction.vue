<script setup lang="ts">
import SearchBar from '~/components/ui/SearchBar.vue'

const model = defineModel<string>('search')
const emit = defineEmits(['submit'])

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <h3>{{ title }}</h3>
    </div>

    <div class="flex justify-end">
      <SearchBar v-model="model" placeholder="Rechercher un nom" @submit="emit('submit')" />

      <slot />
    </div>
  </div>
</template>
