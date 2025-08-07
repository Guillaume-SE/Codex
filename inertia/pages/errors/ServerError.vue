<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
defineProps<{ error: any }>()
</script>

<template>
  <AppHead title="Page introuvable" />
  <div>
    <div class="title">Server Error</div>
    <span>{{ error.message }}</span>
    <Link href="/">Retour à l'accueil</Link>
  </div>
</template>
