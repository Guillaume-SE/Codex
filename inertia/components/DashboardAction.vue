<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import SearchBar from '~/components/SearchBar.vue'

const model = defineModel<string>('search')

defineProps<{
  type: 'search' | 'select'
}>()
</script>

<template>
  <template v-if="type === 'search'">
    <div class="dashboard-action">
      <SearchBar v-model="model" placeholder="Rechercher" />
      <slot />
    </div>
  </template>
</template>

<style scoped>
.dashboard-action {
  display: flex;
  justify-content: end;
}
</style>
