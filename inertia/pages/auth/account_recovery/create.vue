<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { usePage } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import LeftChevronIcon from '~/components/ui/icons/LeftChevronIcon.vue'
import VisibilityIcon from '~/components/ui/icons/VisibilityIcon.vue'
import VisibilityOffIcon from '~/components/ui/icons/VisibilityOffIcon.vue'

const page = usePage<Data.SharedProps>()
const error = computed(() => page.props.flash?.error)
const showPassword = ref(false)

const formatRecoveryCode = (event: Event) => {
  const input = event.target as HTMLInputElement

  // force uppercase letters and removes non-alphanumeric characters
  const raw = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
  const trimmed = raw.slice(0, 16)
  const formatted = trimmed.match(/.{1,4}/g)?.join('-') || ''

  input.value = formatted
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
    <div class="card w-full max-w-md bg-base-100 border border-base-content/10 shadow-sm">
      <div class="card-body gap-5 p-6 sm:p-8">
        <h1 class="text-2xl font-bold tracking-tight">Réinitialiser le mot de passe</h1>

        <div v-if="error" class="alert alert-error text-sm py-2.5 rounded-lg">
          <span>{{ error }}</span>
        </div>

        <Form
          v-slot="{ processing, errors, clearErrors }"
          route="account_recovery.store"
          class="space-y-4"
        >
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
          </div>

          <!-- Recovery Code -->
          <div class="flex flex-col gap-1">
            <label for="recoveryCode" class="text-sm font-medium">Code de récupération</label>
            <input
              id="recoveryCode"
              type="text"
              name="recoveryCode"
              maxlength="19"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              autocorrect="off"
              autocapitalize="characters"
              autocomplete="off"
              spellcheck="false"
              class="input input-bordered w-full font-mono uppercase tracking-wider placeholder:tracking-normal placeholder:font-sans"
              :data-invalid="errors.recoveryCode ? 'true' : undefined"
              @input="
                (e) => {
                  formatRecoveryCode(e)
                  clearErrors('recoveryCode')
                }
              "
            />
            <p v-if="errors.recoveryCode" class="text-error text-xs font-medium">
              {{ errors.recoveryCode }}
            </p>
          </div>

          <!-- New Password -->
          <div class="flex flex-col gap-1">
            <label for="password" class="text-sm font-medium">Nouveau mot de passe</label>
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
          </div>

          <button type="submit" class="btn btn-primary w-full mt-2" :disabled="processing">
            <span v-if="processing" class="loading loading-spinner loading-xs"></span>
            <span>Confirmer</span>
          </button>
        </Form>

        <!-- Lost Code Fallback Note -->
        <p class="text-center text-xs text-base-content/60">
          Code perdu ? Si vous possédiez une sauvegarde exportée, vous pouvez créer un nouveau
          compte et y réimporter votre bibliothèque.
        </p>

        <div class="border-t border-base-content/10 pt-4 text-center text-sm text-base-content/70">
          <Link
            route="session.create"
            class="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
          >
            <LeftChevronIcon class="size-4" />
            <span>Retour à la connexion</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>
