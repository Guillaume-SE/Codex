<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <nav class="dashboard-navbar">
    <Link href="/admin/dashboard">Général</Link>
    <Link href="/admin/platforms/manage">Plateformes</Link>
    <Link href="/admin/genres/manage">Genres</Link>
    <Link href="/admin/types/manage">Types</Link>
    <Link href="/admin/publishers/manage">Editeurs</Link>
    <Link href="/admin/categories/manage">Catégories</Link>
    <Link href="/admin/media/covers">Covers</Link>
  </nav>
</template>

<style scoped>
.dashboard-navbar {
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #eee;
  flex-shrink: 0;
}
</style>
