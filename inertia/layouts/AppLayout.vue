<script setup lang="ts">
import type User from '#models/user'
import AppDrawer from '~/components/AppDrawer.vue'
import AppNavigation from '~/components/AppNavigation.vue'
import ToastManager from '~/components/ToastManager.vue'

defineProps<{
  success?: string
  error?: string
  user?: User
}>()
</script>

<template>
  <AppDrawer>
    <header>
      <AppNavigation :user="user" />
    </header>
    <main
      class="bg-muted/40 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10"
    >
      <slot />
    </main>
    <footer></footer>
    <ToastManager />
  </AppDrawer>
</template>
