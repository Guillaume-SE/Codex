<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import UserIcon from '~/components/ui/icons/UserIcon.vue'

const page = usePage<Data.SharedProps>()
const user = computed(() => page.props.user)

function closeDropdown() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}
</script>

<template>
  <Link v-if="!user" route="session.create" class="btn btn-circle btn-ghost" aria-label="Connexion">
    <UserIcon class="size-7" />
  </Link>

  <div v-else class="dropdown dropdown-end">
    <div
      tabindex="0"
      role="button"
      class="btn btn-circle btn-ghost avatar"
      aria-label="Menu utilisateur"
    >
      <div class="w-8 rounded-full ring-1 ring-base-content/10">
        <img
          :src="'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'"
          alt="Avatar"
        />
      </div>
    </div>

    <ul
      tabindex="0"
      class="dropdown-content menu bg-base-100 border-base-content/10 z-50 mt-2 w-52 rounded-box border p-2"
      @click="closeDropdown"
    >
      <li>
        <Link route="home">Dashboard</Link>
      </li>
      <li>
        <Link route="home">Compte</Link>
      </li>

      <div class="my-1 border-t border-base-content/10"></div>

      <li class="text-error">
        <Form route="session.destroy" class="w-full">
          <button type="submit" class="w-full text-left">Déconnexion</button>
        </Form>
      </li>
    </ul>
  </div>
</template>
