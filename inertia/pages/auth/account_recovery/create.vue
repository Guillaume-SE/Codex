<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

const page = usePage<Data.SharedProps>()
const error = computed(() => page.props.flash.error)
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
          <label for="username">Username</label>
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
            type="recoveryCode"
            name="recoveryCode"
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
            autocomplete="current-password"
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
