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
    ...link,
    isActive: page.url.startsWith(link.activePattern),
  }))
})
</script>

<template>
  <nav class="navbar px-0 h-16">
    <div class="navbar-start gap-2">
      <label for="app-drawer" aria-label="open-sidebar" class="btn btn-square btn-ghost md:hidden">
        <MenuBarsIcon class="size-6 stroke-current" />
      </label>

      <Link route="home" class="text-2xl font-bold tracking-tight">
        Codex<span class="text-primary">.</span>
      </Link>
    </div>

    <div class="navbar-center hidden md:flex">
      <ul class="flex gap-6 font-semibold">
        <li v-for="link in menuItems" :key="link.route">
          <Link
            :route="link.route"
            :route-params="link.routeParams"
            class="border-b-2 pb-1 transition-colors duration-150"
            :class="
              link.isActive
                ? 'border-primary text-primary'
                : 'border-transparent hover:text-primary'
            "
          >
            {{ link.label }}
          </Link>
        </li>
      </ul>
    </div>

    <div class="navbar-end gap-2 sm:gap-3">
      <ThemeController />
      <NotificationAction v-if="page.props.user" :show-dot="true" />
      <UserMenu />
    </div>
  </nav>
</template>
