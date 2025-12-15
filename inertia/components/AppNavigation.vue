<script setup lang="ts">
import type User from '#models/user'
import { Link, usePage } from '@inertiajs/vue3'
import UserMenu from '~/components//UserMenu.vue'
import MenuBars from '~/components/icons/MenuBars.vue'
import NotificationAction from '~/components/ui/NotificationAction.vue'
import ThemeController from '~/components/ui/ThemeController.vue'
import { navLinks } from '~/composables/useNavigationLink'

defineProps<{
  user?: User
}>()

const page = usePage()

const isLinkActive = (path: string) => {
  return page.url.startsWith(path)
}
</script>

<template>
  <nav class="navbar w-full items-baseline">
    <div class="navbar-start">
      <div class="flex-none md:hidden">
        <label for="app-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
          <MenuBars />
        </label>
      </div>
      <Link class="btn btn-lg btn-ghost font-bold" href="/">Codex</Link>
    </div>

    <div class="navbar-center hidden md:flex">
      <ul class="menu menu-horizontal px-1 font-bold">
        <li v-for="link in navLinks" :key="link.href">
          <Link :href="link.href" :class="{ 'menu-active': isLinkActive(link.href) }">
            {{ link.label }}
          </Link>
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <div class="flex-none">
        <ThemeController />

        <NotificationAction :show-dot="!!user" />

        <UserMenu :user="user" />
      </div>
    </div>
  </nav>
</template>
