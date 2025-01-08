<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppHead from '~/components/AppHead.vue';
// import AppLayout from '~/layouts/AppLayout.vue';
import AppLayout from '~/layouts/AppLayout.vue'
</script>

<template>
  <AppHead title="Toutes les catégories" />
  <AppLayout>
    <h2>Catégories.</h2>
    <p>Toutes les catégories disponibles sur le site avec un aperçu des derniers ajouts</p>
    <Link href="/category/game">Jeux</Link>
    <Link href="/category/movie">Films</Link>
    <Link href="/category/series">Séries</Link>
    <Link href="/category/anime">Anime</Link>
    <Link href="/category/book">Livres</Link>
  </AppLayout>
</template>
