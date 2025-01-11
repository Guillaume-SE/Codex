<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import AppLayout from '~/layouts/AppLayout.vue'
</script>

<template>
  <AppHead title="Dashboard" />
  <AppLayout>
    <div>
      <h3>Media</h3>
      <Link href="/media/create">Ajouter un media</Link>
    </div>
  </AppLayout>
</template>
