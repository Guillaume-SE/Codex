<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { usePage } from '@inertiajs/vue3'
import { computed, ref, watch } from 'vue'
import CloseIcon from '~/components/ui/icons/CloseIcon.vue'
import LogoutIcon from '~/components/ui/icons/LogoutIcon.vue'
import SettingIcon from '~/components/ui/icons/SettingIcon.vue'
import UserIcon from '~/components/ui/icons/UserIcon.vue'
import { navLinks } from '~/composables/useNavigationLink'

const page = usePage<Data.SharedProps>()
const isDrawerOpen = ref(false)
const user = computed(() => page.props.user)

watch(
  () => page.url,
  () => {
    isDrawerOpen.value = false
  }
)

const menuItems = computed(() => {
  return navLinks.map((link) => ({
    ...link,
    isActive: page.url.startsWith(link.activePattern),
  }))
})
</script>

<template>
  <div class="drawer">
    <input id="app-drawer" v-model="isDrawerOpen" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex min-h-screen flex-col bg-base-200">
      <slot />
    </div>

    <div class="drawer-side z-50">
      <label for="app-drawer" class="drawer-overlay" aria-label="close-sidebar"></label>

      <div class="flex h-full w-72 flex-col justify-between bg-base-200 p-6">
        <!-- Logo + Navigation -->
        <div>
          <div class="mb-8 flex items-center justify-between">
            <Link
              route="home"
              class="text-2xl font-bold tracking-tighter"
              @click="isDrawerOpen = false"
            >
              Codex<span class="text-primary">.</span>
            </Link>
            <label
              for="app-drawer"
              class="btn btn-circle btn-ghost btn-sm"
              aria-label="close-sidebar"
            >
              <CloseIcon class="size-5" />
            </label>
          </div>

          <ul class="menu w-full gap-1 p-0">
            <li v-for="link in menuItems" :key="link.route">
              <Link
                :route="link.route"
                :route-params="link.routeParams"
                class="py-3 font-semibold"
                :class="link.isActive ? 'bg-primary text-primary-content' : 'active:bg-base-300'"
              >
                {{ link.label }}
              </Link>
            </li>
          </ul>
        </div>

        <!-- User Profile or Guest Actions -->
        <div class="border-t border-base-content/10 pt-4">
          <!-- Logged in user -->
          <div v-if="user" class="space-y-3">
            <!-- Avatar + Username + Settings Button -->
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-3 min-w-0">
                <div class="avatar shrink-0">
                  <div class="w-10 rounded-full ring-1 ring-base-content/10">
                    <img
                      :src="'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'"
                      alt="Avatar"
                    />
                  </div>
                </div>
                <span class="truncate text-sm font-bold">{{ user.username }}</span>
              </div>

              <Link
                route="home"
                class="btn btn-circle btn-ghost btn-sm"
                aria-label="Paramètres"
                @click="isDrawerOpen = false"
              >
                <SettingIcon class="size-6" />
              </Link>
            </div>

            <!-- Primary Actions -->
            <div class="flex gap-2">
              <Link
                route="home"
                class="btn btn-sm btn-outline flex-1"
                @click="isDrawerOpen = false"
              >
                Mon profil
              </Link>

              <Form route="session.destroy" class="contents">
                <button
                  type="submit"
                  class="btn btn-square btn-error btn-outline btn-sm"
                  aria-label="Déconnexion"
                  @click="isDrawerOpen = false"
                >
                  <LogoutIcon class="size-4" />
                </button>
              </Form>
            </div>
          </div>

          <!-- Guest Actions -->
          <div v-else>
            <Link
              route="session.create"
              class="btn btn-primary w-full gap-2"
              @click="isDrawerOpen = false"
            >
              <UserIcon class="size-5" />
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
