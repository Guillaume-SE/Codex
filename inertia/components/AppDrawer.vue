<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { ref } from 'vue'

const drawerCheckbox = ref<HTMLInputElement | null>(null)

// 2. Create a function to close the drawer
function closeDrawer() {
  if (drawerCheckbox.value) {
    drawerCheckbox.value.checked = false
  }
}
</script>

<template>
  <div class="drawer">
    <input id="my-drawer-2" ref="drawerCheckbox" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar, header, footer etc -->
      <slot />
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
        <div class="mx-2 mb-10 px-2 text-xl font-bold" @click="closeDrawer">
          <Link href="/">Codex</Link>
        </div>
        <!-- Sidebar content here -->
        <li @click="closeDrawer"><Link href="/categories/game">Jeux</Link></li>
        <li @click="closeDrawer"><Link href="/categories/movie">Films</Link></li>
        <li @click="closeDrawer"><Link href="/categories/anime">Anime</Link></li>
        <li @click="closeDrawer"><Link href="/categories/series">Séries</Link></li>
        <li @click="closeDrawer"><Link href="/categories/book">Livres</Link></li>
      </ul>
    </div>
  </div>
</template>
