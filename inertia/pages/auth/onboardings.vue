<script setup lang="ts">
import { Form } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { usePage } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import AppHead from '~/components/AppHead.vue'

const { recoveryCode } = defineProps<{
  recoveryCode: string
  isRecovery?: boolean
}>()

const page = usePage<Data.SharedProps>()
const user = computed(() => page.props.user!)

const isSaved = ref(false)
const copiedKey = ref<'username' | 'code' | null>(null)
let timeoutId: ReturnType<typeof setTimeout> | null = null

const copyToClipboard = async (text: string, key: 'username' | 'code') => {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = key

    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      copiedKey.value = null
    }, 2000)
  } catch (err) {
    console.error('Erreur lors de la copie :', err)
  }
}
</script>

<template>
  <AppHead title="Bienvenue sur Codex" />

  <div class="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
    <div class="card w-full max-w-md border border-base-content/10 bg-base-100 shadow-sm">
      <div class="card-body gap-5 p-6 sm:p-8">
        <div class="space-y-1">
          <p class="font-heading text-2xl font-bold sm:text-3xl">
            {{ isRecovery ? 'Compte récupéré' : 'Bienvenue' }}
            <span class="text-primary">!</span>
          </p>
          <h1 class="text-base font-medium text-base-content/70">
            {{ isRecovery ? 'Voici votre nouveau code de secours' : 'Sauvegardez vos accès' }}
          </h1>
        </div>

        <div class="space-y-3">
          <!-- Username -->
          <div class="flex flex-col gap-1">
            <span class="text-xs font-semibold text-base-content/60">Nom d'utilisateur</span>
            <div
              class="flex items-center justify-between rounded-lg border border-base-content/10 bg-base-200/50 p-3"
            >
              <span class="select-all text-sm font-bold">{{ user.username }}</span>
              <button
                type="button"
                class="btn btn-ghost btn-xs text-xs"
                @click="copyToClipboard(user.username, 'username')"
              >
                {{ copiedKey === 'username' ? 'Copié !' : 'Copier' }}
              </button>
            </div>
          </div>

          <!-- Recovery Code -->
          <div class="flex flex-col gap-1">
            <span class="text-xs font-semibold text-base-content/60">Code de récupération</span>
            <div
              class="flex items-center justify-between rounded-lg border border-base-content/10 bg-base-200/50 p-3"
            >
              <span class="select-all font-mono text-sm font-bold tracking-wider uppercase">
                {{ recoveryCode }}
              </span>
              <button
                type="button"
                class="btn btn-ghost btn-xs text-xs"
                @click="copyToClipboard(recoveryCode, 'code')"
              >
                {{ copiedKey === 'code' ? 'Copié !' : 'Copier' }}
              </button>
            </div>
          </div>
        </div>

        <!--Warning Box -->
        <div class="rounded-lg border border-primary/20 bg-primary/5 p-3.5 text-xs space-y-1">
          <p>Ces identifiants sont le <strong>seul moyen</strong> de récupérer votre compte.</p>
          <p class="text-base-content/70">
            Conservez-les en lieu sûr, le code ne sera plus jamais affiché.
          </p>
        </div>

        <!-- Confirmation -->
        <Form v-slot="{ processing }" route="onboardings.destroy" class="space-y-4 pt-1">
          <label for="confirm-saved" class="flex items-center gap-2 cursor-pointer select-none">
            <input
              id="confirm-saved"
              v-model="isSaved"
              type="checkbox"
              class="checkbox checkbox-sm checkbox-primary"
            />
            <span class="text-sm">J'ai bien enregistré mes identifiants.</span>
          </label>

          <button type="submit" class="btn btn-primary w-full" :disabled="!isSaved || processing">
            <span v-if="processing" class="loading loading-spinner loading-xs"></span>
            <span>Accéder à l'application</span>
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>
