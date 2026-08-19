<script setup lang="ts">
import { Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import NotificationAction from '~/components/NotificationAction.vue'
import ThemeController from '~/components/ThemeController.vue'
import MenuBarsIcon from '~/components/ui/icons/MenuBarsIcon.vue'
import UserMenu from '~/components/UserMenu.vue'
import { navLinks } from '~/composables/useNavigationLink'

const page = usePage<Data.SharedProps>()

const menuItems = computed(() => {
  return navLinks.map((link) => ({
    label: link.label,
    params: { category: link.category },
    isActive: page.url.includes(`/categories/${link.category}`),
  }))
})
</script>

<template>
  <nav class="navbar min-h-16 px-0">
    <div class="navbar-start gap-2">
      <label for="app-drawer" aria-label="open-sidebar" class="btn btn-square btn-ghost md:hidden">
        <MenuBarsIcon class="size-6 stroke-current" />
      </label>

      <Link route="home" class="text-2xl font-bold tracking-tighter">
        Codex<span class="text-primary">.</span>
      </Link>
    </div>

    <div class="navbar-center hidden md:flex">
      <ul class="flex gap-6 font-bold">
        <li v-for="link in menuItems" :key="link.params.category">
          <Link
            route="home"
            :route-params="link.params"
            :class="[
              'border-b-2 pb-1 transition-colors duration-200',
              link.isActive
                ? 'border-primary text-primary'
                : 'border-transparent text-base-content hover:text-primary',
            ]"
          >
            {{ link.label }}
          </Link>
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <div class="flex items-center gap-2 sm:gap-3">
        <ThemeController />

        <NotificationAction v-if="!!page.props.user" :show-dot="!!page.props.user" />

        <UserMenu />
      </div>
    </div>
  </nav>
</template>
