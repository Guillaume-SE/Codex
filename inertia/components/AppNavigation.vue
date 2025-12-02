<script setup lang="ts">
import type User from '#models/user'
import { Link, usePage } from '@inertiajs/vue3'
import UserMenu from '~/components//UserMenu.vue'
import NotificationAction from '~/components/ui/NotificationAction.vue'
import ThemeController from '~/components/ui/ThemeController.vue'

defineProps<{
  user?: User
}>()

const page = usePage()

const isLinkActive = (path: string) => {
  return page.url.startsWith(path)
}
</script>

<template>
  <nav class="navbar bg-base-200 w-full items-baseline">
    <div class="navbar-start">
      <div class="flex-none md:hidden">
        <label for="app-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-6 w-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <Link class="btn btn-lg btn-ghost font-bold" href="/"> Codex </Link>
    </div>

    <div class="navbar-center hidden md:flex">
      <ul class="menu menu-horizontal px-1 font-bold">
        <li>
          <Link
            href="/categories/game"
            :class="{ 'menu-active': isLinkActive('/categories/game') }"
          >
            Jeux
          </Link>
        </li>
        <li>
          <Link
            href="/categories/movie"
            :class="{ 'menu-active': isLinkActive('/categories/movie') }"
          >
            Films
          </Link>
        </li>
        <li>
          <Link
            href="/categories/anime"
            :class="{ 'menu-active': isLinkActive('/categories/anime') }"
          >
            Anime
          </Link>
        </li>
        <li>
          <Link
            href="/categories/series"
            :class="{ 'menu-active': isLinkActive('/categories/series') }"
          >
            Séries
          </Link>
        </li>
        <li>
          <Link
            href="/categories/book"
            :class="{ 'menu-active': isLinkActive('/categories/book') }"
          >
            Livres
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
