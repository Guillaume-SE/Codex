<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3'
import { ref } from 'vue'
import { navLinks } from '~/composables/useNavigationLink'

const drawerCheckbox = ref<HTMLInputElement | null>(null)
const page = usePage()

function closeDrawer() {
  if (drawerCheckbox.value) {
    drawerCheckbox.value.checked = false
  }
}

const isLinkActive = (path: string) => {
  return page.url.startsWith(path)
}
</script>

<template>
  <div class="drawer">
    <input id="app-drawer" ref="drawerCheckbox" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content bg-base-200 flex min-h-screen flex-col">
      <slot />
    </div>
    <div class="drawer-side z-[100]">
      <label for="app-drawer" aria-label="close sidebar" class="drawer-overlay"></label>

      <div class="bg-base-200 min-h-full w-80 p-4">
        <div class="mb-20 flex items-center justify-between">
          <div class="text-xl font-bold">
            <Link href="/" @click="closeDrawer">Codex</Link>
          </div>
          <label
            for="app-drawer"
            aria-label="close-sidebar"
            class="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </label>
        </div>

        <ul class="menu flex w-full flex-col items-center p-0">
          <li v-for="link in navLinks" :key="link.href" @click="closeDrawer" class="w-full">
            <Link
              :href="link.href"
              :class="{ 'menu-active': isLinkActive(link.href) }"
              class="w-full justify-center"
            >
              {{ link.label }}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
