<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import ToastNotification from '~/components/ui/ToastNotification.vue'

// const page = usePage()
// const message = computed(() => page.props.success)

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
    <slot />
    <ToastNotification v-if="success" :message="success" />
  </main>
</template>
