<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { usePage } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import AppHead from '~/components/AppHead.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import BaseInput from '~/components/ui/BaseInput.vue'
import BaseLabel from '~/components/ui/BaseLabel.vue'
import LeftChevronIcon from '~/components/ui/icons/LeftChevronIcon.vue'
import VisibilityIcon from '~/components/ui/icons/VisibilityIcon.vue'
import VisibilityOffIcon from '~/components/ui/icons/VisibilityOffIcon.vue'

const page = usePage<Data.SharedProps>()
const error = computed(() => page.props.flash?.error)
const showPassword = ref(false)
const recoveryCode = ref('')

const handleRecoveryCodeInput = (event: Event, clearErrors: (field: string) => void) => {
  const target = event.target as HTMLInputElement

  const raw = target.value
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(0, 16)
  const formatted = raw.match(/.{1,4}/g)?.join('-') || ''

  recoveryCode.value = formatted
  target.value = formatted

  clearErrors('recoveryCode')
}
</script>

<template>
  <AppHead title="Réinitialiser le mot de passe" />

  <div class="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
    <div class="card w-full max-w-md bg-base-100 border border-base-content/10 shadow-sm">
      <div class="card-body gap-5 p-6 sm:p-8">
        <h1 class="text-2xl sm:text-3xl font-heading font-bold">Réinitialiser le mot de passe</h1>

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

          <!-- Recovery Code -->
          <div class="flex flex-col gap-1">
            <BaseLabel htmlFor="recoveryCode" text="Code de récupération" />
            <BaseInput
              v-model="recoveryCode"
              id="recoveryCode"
              name="recoveryCode"
              maxlength="19"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              autocorrect="off"
              autocapitalize="characters"
              autocomplete="off"
              spellcheck="false"
              class="font-mono uppercase tracking-wider placeholder:tracking-normal placeholder:font-sans"
              :error="errors.recoveryCode"
              @input="handleRecoveryCodeInput($event, clearErrors)"
            />
            <p v-if="errors.recoveryCode" class="text-error text-xs font-medium mt-1">
              {{ errors.recoveryCode }}
            </p>
          </div>

          <!-- New Password -->
          <div class="flex flex-col gap-1">
            <BaseLabel htmlFor="password" text="Nouveau mot de passe" />
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
            <p v-if="errors.password" class="text-error text-xs font-medium">
              {{ errors.password }}
            </p>
          </div>

          <BaseButton type="submit" color="primary" block class="mt-2" :loading="processing">
            Confirmer
          </BaseButton>
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
