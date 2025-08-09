<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import SearchBar from '~/components/SearchBar.vue'

const model = defineModel<string>('search')

defineProps<{
  type: 'search' | 'select'
  title: string
}>()
</script>

<template>
  <template v-if="type === 'search'">
    <div class="dashboard-title-container">
      <div>
        <h3>{{ title }}</h3>
      </div>
      <div class="dashboard-action">
        <SearchBar v-model="model" placeholder="Rechercher" />
        <slot />
      </div>
    </div>
  </template>
</template>

<style scoped>
.dashboard-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dashboard-action {
  display: flex;
  justify-content: end;
}
</style>
