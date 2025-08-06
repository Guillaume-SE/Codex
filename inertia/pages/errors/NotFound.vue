<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import AppLayout from '~/layouts/AppLayout.vue'
</script>

<template>
  <AppHead title="Page introuvable" />
  <AppLayout>
    <div>
      <h3>Oups une 404 !</h3>
      <p>La page recherchée est introuvable !</p>
      <Link href="/">Retour à l'accueil</Link>
    </div>
  </AppLayout>
</template>
