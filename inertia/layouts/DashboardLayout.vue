<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <main>
    <header>
      <nav class="navbar">
        <Link href="/dashboard">Général</Link>
        <Link href="/platform/manage">Plateformes</Link>
        <Link href="/genre/manage">Genres</Link>
        <Link href="/type/manage">Types</Link>
        <Link href="/category/manage">Catégories</Link>
      </nav>
    </header>
    <div>
      <slot />
    </div>
  </main>
</template>
