<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import ToastNotification from '~/components/ui/ToastNotification.vue'

defineProps<{
  success?: string
}>()
</script>

<template>
  <main>
    <header>
      <nav class="navbar">
        <Link href="/">Accueil</Link>
        <Link href="/categories">Catégories</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/categories/game">Jeux</Link>
        <Link href="/categories/movie">Films</Link>
        <Link href="/categories/series">Séries</Link>
        <Link href="/categories/anime">Anime</Link>
        <Link href="/categories/book">Livres</Link>
      </nav>
    </header>

    <div class="dashboard-container">
      <h3>Dashboard</h3>
      <div class="dashboard-content">
        <nav class="dashboard-navbar">
          <Link class="border" href="/dashboard">Général</Link>
          <Link href="/platform/manage">Plateformes</Link>
          <Link href="/genre/manage">Genres</Link>
          <Link href="/type/manage">Types</Link>
          <Link href="/category/manage">Catégories</Link>
        </nav>
        <div class="dashboard-content-container">
          <slot />
        </div>
      </div>
    </div>
    <ToastNotification v-if="success" :message="success" />
  </main>
</template>

<style scoped>
.dashboard-container {
  width: 80%;
  margin: 30px auto;
}
.dashboard-content {
  display: flex;
}
.dashboard-content-container {
  min-width: 800px;
}
.dashboard-navbar {
  display: flex;
  flex-direction: column;
}
.border {
  border: solid 1px black;
}
</style>
