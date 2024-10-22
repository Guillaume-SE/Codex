<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <main>
    <header>
      <nav class="navbar">
        <Link href="/">Accueil</Link>
        <Link href="/games">Jeux</Link>
        <Link href="/movies">Films</Link>
        <Link href="/series">Séries</Link>
        <Link href="/anime">Anime</Link>
        <Link href="/books">Livres</Link>
        <div>Connexion</div>
      </nav>
    </header>
    <div>
      <slot />
    </div>
  </main>
</template>
