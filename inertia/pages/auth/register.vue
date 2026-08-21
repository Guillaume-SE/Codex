<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import { ref } from 'vue'
import AppHead from '~/components/AppHead.vue'
import VisibilityIcon from '~/components/ui/icons/VisibilityIcon.vue'
import VisibilityOffIcon from '~/components/ui/icons/VisibilityOffIcon.vue'

const showPassword = ref(false)
</script>

<template>
  <AppHead title="Créer un compte" />

  <div class="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
    <div class="card w-full max-w-md bg-base-100 border border-base-content/10 shadow-sm">
      <div class="card-body gap-5 p-6 sm:p-8">
        <h1 class="text-3xl font-bold font-heading tracking-tight">Créer un compte</h1>

        <Form v-slot="{ processing, errors, clearErrors }" route="register.store" class="space-y-4">
          <!-- Username -->
          <div class="flex flex-col gap-1">
            <label for="username" class="text-sm font-medium">Nom d'utilisateur</label>
            <input
              id="username"
              type="text"
              name="username"
              autocomplete="username"
              class="input input-bordered w-full"
              :data-invalid="errors.username ? 'true' : undefined"
              @input="clearErrors('username')"
            />
            <p v-if="errors.username" class="text-error text-xs font-medium">
              {{ errors.username }}
            </p>
            <p v-else class="text-xs text-base-content/60">
              Entre 2 et 30 caractères. Chiffres, - et _ autorisés.
            </p>
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-1">
            <label for="password" class="text-sm font-medium">Mot de passe</label>
            <div class="relative flex items-center">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                autocomplete="new-password"
                class="input input-bordered w-full pr-10"
                :data-invalid="errors.password ? 'true' : undefined"
                @input="clearErrors('password')"
              />

              <button
                type="button"
                class="btn btn-ghost btn-xs btn-circle absolute right-2 text-base-content/60 hover:text-base-content"
                :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
                @click="showPassword = !showPassword"
              >
                <VisibilityOffIcon v-if="showPassword" class="size-5" />
                <VisibilityIcon v-else class="size-5" />
              </button>
            </div>
            <p v-if="errors.password" class="text-error text-xs font-medium">
              {{ errors.password }}
            </p>
            <p v-else class="text-xs text-base-content/60">Minimum 8 caractères.</p>
          </div>

          <!-- Remember me -->
          <div class="flex items-center pt-1">
            <label for="remember" class="flex items-center gap-2 cursor-pointer">
              <input
                id="remember"
                type="checkbox"
                name="remember"
                checked
                class="checkbox checkbox-sm checkbox-primary"
              />
              <span class="text-sm">Rester connecté</span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary w-full mt-2" :disabled="processing">
            <span v-if="processing" class="loading loading-spinner loading-xs"></span>
            <span>Créer mon compte</span>
          </button>

          <!-- Privacy & Cookie Disclaimer -->
          <p class="text-xs text-center text-base-content/60 pt-1">
            Vos données restent privées. Seuls des cookies essentiels au fonctionnement du site sont
            utilisés.
            <Link route="home" class="underline hover:text-base-content ml-0.5">
              En savoir plus
            </Link>
          </p>
        </Form>

        <div class="border-t border-base-content/10 pt-4 text-center text-sm text-base-content/70">
          Déjà un compte ?
          <Link route="session.create" class="font-semibold text-primary hover:underline ml-1">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>
