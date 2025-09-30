<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import ToastManager from '~/components/ToastManager.vue'

defineProps<{
  success?: string
  error?: string
}>()
</script>

<template>
  <header>
    <nav class="navbar">
      <Link href="/">Accueil</Link>
      <Link href="/categories">Catégories</Link>
      <Link href="/admin/dashboard">Dashboard</Link>
      <Link href="/categories/game">Jeux</Link>
      <Link href="/categories/movie">Films</Link>
      <Link href="/categories/series">Séries</Link>
      <Link href="/categories/anime">Anime</Link>
      <Link href="/categories/book">Livres</Link>
    </nav>
  </header>
  <main>
    <slot />
  </main>
  <ToastManager :success="success" :error="error" />
</template>
