<script setup lang="ts">
import SearchBar from '~/components/ui/SearchBar.vue'

const model = defineModel<string>('search')

defineProps<{
  type: 'search' | 'select'
  title: string
}>()
</script>

<template>
  <div class="dashboard-title-container">
    <div>
      <h3>{{ title }}</h3>
    </div>

    <div class="dashboard-action">
      <SearchBar v-if="type === 'search'" v-model="model" placeholder="Rechercher" />

      <slot />
    </div>
  </div>
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
