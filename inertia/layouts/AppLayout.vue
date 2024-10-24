<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <main>
    <header>
      <nav class="navbar">
        <Link href="/">Accueil</Link>
        <Link href="/media/game">Jeux</Link>
        <Link href="/media/movie">Films</Link>
        <Link href="/media/series">Séries</Link>
        <Link href="/media/anime">Anime</Link>
        <Link href="/media/book">Livres</Link>
        <div>Connexion</div>
      </nav>
    </header>
    <div>
      <slot />
    </div>
  </main>
</template>
