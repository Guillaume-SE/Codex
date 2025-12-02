<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3'
import { ref } from 'vue'

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
    <div class="drawer-content flex flex-col">
      <!-- Navbar, header, footer etc -->
      <slot />
    </div>
    <div class="drawer-side">
      <label for="app-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
        <div class="mx-2 mb-10 px-2 text-xl font-bold" @click="closeDrawer">
          <Link href="/">Codex</Link>
        </div>
        <!-- Sidebar content here -->
        <li @click="closeDrawer">
          <Link
            href="/categories/game"
            :class="{ 'menu-active': isLinkActive('/categories/game') }"
          >
            Jeux
          </Link>
        </li>
        <li @click="closeDrawer">
          <Link
            href="/categories/movie"
            :class="{ 'menu-active': isLinkActive('/categories/movie') }"
          >
            Films
          </Link>
        </li>
        <li @click="closeDrawer">
          <Link
            href="/categories/anime"
            :class="{ 'menu-active': isLinkActive('/categories/anime') }"
          >
            Anime
          </Link>
        </li>
        <li @click="closeDrawer">
          <Link
            href="/categories/series"
            :class="{ 'menu-active': isLinkActive('/categories/series') }"
          >
            Séries
          </Link>
        </li>
        <li @click="closeDrawer">
          <Link
            href="/categories/book"
            :class="{ 'menu-active': isLinkActive('/categories/book') }"
          >
            Livres
          </Link>
        </li>
      </ul>
    </div>
  </div>
</template>
