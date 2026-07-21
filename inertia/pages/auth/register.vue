<script setup lang="ts">
import { Form } from '@adonisjs/inertia/vue'
</script>

<template>
  <div class="form-container">
    <div>
      <h1>Register</h1>
      <p>Enter your details below to create your account</p>
    </div>

    <div>
      <Form v-slot="{ processing, errors }" route="register.store">
        <div>
          <label for="fullName">Username</label>
          <input
            id="username"
            type="text"
            name="username"
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
            autocomplete="new-password"
            :data-invalid="errors.password ? 'true' : undefined"
          />
          <div v-if="errors.password">{{ errors.password }}</div>
        </div>

        <div>
          <button type="submit" class="button" :disabled="processing">Sign up</button>
        </div>
      </Form>
    </div>
  </div>
</template>
