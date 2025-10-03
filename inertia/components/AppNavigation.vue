<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

const page = usePage()
const user = computed(() => page.props.user)
</script>

<template>
  <nav class="navbar">
    <Link href="/">Accueil</Link>
    <Link href="/categories">Catégories</Link>
    <Link href="/categories/game">Jeux</Link>
    <Link href="/categories/movie">Films</Link>
    <Link href="/categories/series">Séries</Link>
    <Link href="/categories/anime">Anime</Link>
    <Link href="/categories/book">Livres</Link>

    <template v-if="user">
      <Link href="/admin/dashboard">Dashboard</Link>
      <Link v-if="user" method="post" href="/logout" as="button">Logout</Link>
    </template>
    <template v-else>
      <Link href="/login">Login</Link>
    </template>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
