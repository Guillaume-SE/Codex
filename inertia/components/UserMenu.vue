<script setup lang="ts">
import type User from '#models/user'
import { Link } from '@inertiajs/vue3'

defineProps<{
  user?: User
}>()

function handleCloseDropdown() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}
</script>

<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn avatar btn-circle btn-ghost">
      <div class="lg:w9 w-8 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
      </div>
    </div>
    <ul
      tabindex="-1"
      class="dropdown-content menu menu-sm rounded-box bg-base-100 z-1 mt-3 w-52 p-2 font-bold shadow"
    >
      <div v-if="user">
        <li @click="handleCloseDropdown"><Link href="/admin/dashboard">Dashboard</Link></li>
        <li @click="handleCloseDropdown"><Link href="/">Compte</Link></li>
        <!-- blank for style purpose -->
        <li></li>
        <li class="text-error" @click="handleCloseDropdown">
          <Link method="post" href="/logout" as="button">Déconnexion</Link>
        </li>
      </div>
      <div v-else>
        <li @click="handleCloseDropdown"><Link href="/login">Connexion</Link></li>
      </div>
    </ul>
  </div>
</template>
