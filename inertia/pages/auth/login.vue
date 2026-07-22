<script setup lang="ts">
import { Form } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

const page = usePage<Data.SharedProps>()
const error = computed(() => page.props.flash.error)
</script>

<template>
  <div class="form-container">
    <div>
      <h1>Login</h1>
      <p>Enter your details below to login to your account</p>
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div>
      <Form v-slot="{ processing, errors }" route="session.store">
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
          <label for="password">Password</label>
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
          <input id="remember" type="checkbox" name="remember" />
          <label for="remember">Rester connecté</label>
        </div>

        <div>
          <button type="submit" class="button" :disabled="processing">Login</button>
        </div>
      </Form>
    </div>
  </div>
</template>
