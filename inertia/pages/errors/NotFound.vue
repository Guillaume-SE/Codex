<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import AppLayout from '~/layouts/AppLayout.vue'
</script>

<template>
  <AppHead title="404 Not Found" />
  <AppLayout>
    <div>
      <h3>Oups une 404 !</h3>
      <p>La page que vous avez recherché est malheureusement introuvable !</p>
      <p>Soit elle a été supprimée, soit le lien comporte une erreur.</p>
      <p>Si c'est une recherche spécifique, vérifiez son orthographe.</p>
      <Link href="/">Retour à l'accueil</Link>
    </div>
  </AppLayout>
</template>
