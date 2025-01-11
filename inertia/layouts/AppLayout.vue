<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <main>
    <header>
      <nav class="navbar">
        <Link href="/">Accueil</Link>
        <Link href="/categories">Catégories</Link>
        <Link href="/dashboard">Dashboard</Link>
      </nav>
    </header>
    <div>
      <slot />
    </div>
  </main>
</template>
