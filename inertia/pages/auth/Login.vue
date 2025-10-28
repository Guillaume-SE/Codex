<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import Loader from '~/components/ui/Loader.vue'

defineProps<{
  errors?: Record<string, string>
}>()

const form = useForm({
  uid: '',
  password: '',
  remember: false,
})

function submit() {
  form.post('/login')
}
</script>

<template>
  <AppHead title="Connexion" />
  <div class="flex flex-1 items-center justify-center p-4">
    <div class="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
      <div class="card-body p-6 sm:p-8">
        <h3 class="flex justify-center text-2xl font-bold">Connexion</h3>

        <form @submit.prevent="submit">
          <div>
            <FormErrorComp
              v-if="errors?.E_INVALID_CREDENTIALS"
              :message="errors.E_INVALID_CREDENTIALS"
            />
            <FormErrorComp
              v-if="errors?.E_TOO_MANY_REQUESTS"
              :message="errors.E_TOO_MANY_REQUESTS"
            />
          </div>

          <fieldset class="flex flex-col gap-4">
            <LabelComp labelFor="uid" text="Identifiant" class="font-semibold" />
            <InputComp
              v-model="form.uid"
              type="text"
              placeholder="Entrez votre email ou pseudo"
              id="uid"
              required
              class="w-full"
            />
            <FormErrorComp v-if="form.errors.uid" :message="form.errors.uid" />

            <LabelComp labelFor="password" text="Mot de passe" class="font-semibold" />
            <InputComp
              v-model="form.password"
              type="password"
              id="password"
              placeholder="Mot de passe"
              required
              class="w-full"
            />
            <FormErrorComp v-if="form.errors.password" :message="form.errors.password" />

            <div class="xs:flex-row xs:items-center xs:justify-between flex flex-col gap-3 text-sm">
              <div>
                <InputComp
                  v-model="form.remember"
                  type="checkbox"
                  :value="form.remember"
                  id="remember"
                  class="checkbox"
                />
                <LabelComp labelFor="remember" text="Rester connecté" class="ml-1" />
              </div>

              <Link class="link link-hover" href="/">Mot de passe oublié ?</Link>
            </div>

            <ButtonComp type="submit" :disabled="form.processing" variant="neutral" class="w-full">
              <Loader v-if="form.processing" />
              Connexion
            </ButtonComp>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
