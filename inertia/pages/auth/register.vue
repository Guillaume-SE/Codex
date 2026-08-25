<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import { ref } from 'vue'
import AppHead from '~/components/AppHead.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import BaseCheckbox from '~/components/ui/BaseCheckbox.vue'
import BaseInput from '~/components/ui/BaseInput.vue'
import BaseLabel from '~/components/ui/BaseLabel.vue'
import VisibilityIcon from '~/components/ui/icons/VisibilityIcon.vue'
import VisibilityOffIcon from '~/components/ui/icons/VisibilityOffIcon.vue'

const showPassword = ref(false)
</script>

<template>
  <AppHead title="Créer un compte" />

  <div class="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
    <div class="card w-full max-w-md bg-base-100 border border-base-content/10 shadow-sm">
      <div class="card-body gap-5 p-6 sm:p-8">
        <h1 class="text-2xl sm:text-3xl font-bold font-heading">Créer un compte</h1>

        <Form v-slot="{ processing, errors, clearErrors }" route="register.store" class="space-y-4">
          <!-- Username -->
          <div class="flex flex-col gap-1">
            <BaseLabel htmlFor="username" text="Nom d'utilisateur" />
            <BaseInput
              id="username"
              name="username"
              autocomplete="username"
              :error="errors.username"
              @input="clearErrors('username')"
            />
            <p v-if="errors.username" class="text-error text-xs font-medium mt-1">
              {{ errors.username }}
            </p>
            <p v-else class="text-xs text-base-content/60">
              Entre 2 et 30 caractères. Chiffres, - et _ autorisés.
            </p>
          </div>

          <!-- Password -->
          <div class="w-full">
            <BaseLabel htmlFor="password" text="Mot de passe" />
            <BaseInput
              id="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              :error="errors.password"
              @input="clearErrors('password')"
            >
              <template #suffix>
                <button
                  type="button"
                  class="btn btn-ghost btn-xs btn-circle text-base-content/60 hover:text-base-content"
                  @click="showPassword = !showPassword"
                >
                  <VisibilityOffIcon v-if="showPassword" class="size-5" />
                  <VisibilityIcon v-else class="size-5" />
                </button>
              </template>
            </BaseInput>
            <p v-if="errors.password" class="text-error text-xs font-medium mt-1">
              {{ errors.password }}
            </p>
            <p v-else class="text-xs text-base-content/60">Minimum 8 caractères.</p>
          </div>

          <!-- Remember me -->
          <div class="flex items-center pt-1">
            <BaseCheckbox id="remember" name="remember" label="Rester connecté" checked />
          </div>

          <BaseButton type="submit" block class="mt-2" color="primary" :loading="processing">
            Créer mon compte
          </BaseButton>

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
