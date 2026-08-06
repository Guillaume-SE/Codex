<script setup lang="ts">
import { Form } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

const page = usePage<Data.SharedProps>()
const error = computed(() => page.props.flash.error)

const formatRecoveryCode = (event: Event) => {
  const input = event.target as HTMLInputElement

  // remove all non-alphanumeric characters
  const raw = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()

  // max 16 alphanumeric characters (4 blocks of 4)
  const trimmed = raw.slice(0, 16)

  // split into chunks of 4 and join with hyphens
  const formatted = trimmed.match(/.{1,4}/g)?.join('-') || ''

  input.value = formatted
}
</script>

<template>
  <div class="form-container">
    <div>
      <h1>Réinitialiser mon mot de passe</h1>
      <p>Enter your details below to reset your password</p>
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div>
      <Form v-slot="{ processing, errors }" route="account_recovery.store">
        <div>
          <label for="username">Nom utilisateur</label>
          <input
            id="username"
            type="text"
            name="username"
            autocomplete="username"
            :data-invalid="errors.username ? 'true' : undefined"
          />
          <div v-if="errors.username">{{ errors.username }}</div>
        </div>

        <div>
          <label for="recoveryCode">Code de récupération</label>
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
            @input="formatRecoveryCode"
            :data-invalid="errors.recoveryCode ? 'true' : undefined"
          />
          <div v-if="errors.recoveryCode">{{ errors.recoveryCode }}</div>
        </div>

        <div>
          <label for="password">Nouveau mot de passe</label>
          <input
            id="password"
            type="password"
            name="password"
            autocomplete="new-password"
            :data-invalid="errors.password ? 'true' : undefined"
          />
          <div v-if="errors.password">{{ errors.password }}</div>
        </div>

        <div>
          <button type="submit" class="button" :disabled="processing">Confirmer</button>
        </div>
      </Form>
    </div>
  </div>
</template>
