<script setup lang="ts">
import type User from '#models/user'
import AppDrawer from '~/components/AppDrawer.vue'
import AppFooter from '~/components/AppFooter.vue'
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
    <header class="bg-base-200/80 sticky top-0 z-50 backdrop-blur-md">
      <AppNavigation :user="user" />
    </header>
    <main class="bg-base-200 flex flex-1 flex-col">
      <slot />
    </main>

    <footer class="bg-neutral text-neutral-content mt-auto">
      <AppFooter />
    </footer>

    <ToastManager />
  </AppDrawer>
</template>
