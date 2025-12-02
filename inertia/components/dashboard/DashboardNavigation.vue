<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <nav class="mr-5 flex shrink-0 flex-col pr-5">
    <Link href="/admin/dashboard">Général</Link>
    <Link href="/admin/platforms/manage">Plateformes</Link>
    <Link href="/admin/genres/manage">Genres</Link>
    <Link href="/admin/types/manage">Types</Link>
    <Link href="/admin/publishers/manage">Editeurs</Link>
    <Link href="/admin/categories/manage">Catégories</Link>
    <Link href="/admin/media/covers">Covers</Link>
  </nav>
</template>
