<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { usePage } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import AppHead from '~/components/AppHead.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import BaseCheckbox from '~/components/ui/BaseCheckbox.vue'
import BaseInput from '~/components/ui/BaseInput.vue'
import BaseLabel from '~/components/ui/BaseLabel.vue'
import VisibilityIcon from '~/components/ui/icons/VisibilityIcon.vue'
import VisibilityOffIcon from '~/components/ui/icons/VisibilityOffIcon.vue'

const page = usePage<Data.SharedProps>()
const error = computed(() => page.props.flash.error)
const showPassword = ref(false)
</script>

<template>
  <AppHead title="Se connecter" />

  <div class="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
    <div class="card w-full max-w-md bg-base-100 border border-base-content/10 shadow-sm">
      <div class="card-body gap-5 p-6 sm:p-8">
        <h1 class="text-2xl sm:text-3xl font-bold font-heading">Connexion</h1>

        <div v-if="error" class="alert alert-error text-sm py-2.5 rounded-lg">
          <span>{{ error }}</span>
        </div>

        <Form v-slot="{ processing, errors, clearErrors }" route="session.store" class="space-y-4">
          <!-- Username -->
          <div class="w-full">
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
          </div>

          <!-- Password -->
          <div class="w-full">
            <BaseLabel htmlFor="password" text="Mot de passe">
              <template #alt>
                <Link route="account_recovery.create" class="text-xs text-primary hover:underline">
                  Mot de passe oublié ?
                </Link>
              </template>
            </BaseLabel>

            <BaseInput
              id="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
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
          </div>

          <!-- Remember me -->
          <div class="flex items-center pt-1">
            <BaseCheckbox id="remember" name="remember" label="Rester connecté" />
          </div>

          <BaseButton type="submit" block class="mt-2" color="primary" :loading="processing">
            Se connecter
          </BaseButton>
        </Form>

        <div class="border-t border-base-content/10 pt-4 text-center text-sm text-base-content/70">
          Pas encore de compte ?
          <Link route="register.create" class="font-semibold text-primary hover:underline ml-1">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>
