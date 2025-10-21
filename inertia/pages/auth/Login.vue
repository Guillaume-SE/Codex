<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'

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
  <div>
    <h1>Connexion</h1>

    <form @submit.prevent="submit">
      <div>
        <FormErrorComp
          v-if="errors?.E_INVALID_CREDENTIALS"
          :message="errors.E_INVALID_CREDENTIALS"
        />
        <FormErrorComp v-if="errors?.E_TOO_MANY_REQUESTS" :message="errors.E_TOO_MANY_REQUESTS" />
      </div>

      <div>
        <LabelComp labelFor="uid" text="Identifiant" />
        <InputComp
          v-model="form.uid"
          type="text"
          placeholder="Entrez votre email ou pseudo"
          id="uid"
        />
      </div>
      <div>
        <LabelComp labelFor="password" text="Mot de passe" />
        <InputComp v-model="form.password" type="password" id="password" />
      </div>
      <div>
        <div>
          <InputComp v-model="form.remember" type="checkbox" :value="form.remember" id="remember" />
          <LabelComp labelFor="remember" text="Rester connecté" />
        </div>

        <Link href="/">Mot de passe oublié ?</Link>
      </div>
      <ButtonComp type="submit" :disabled="form.processing">
        <div>
          <span v-if="form.processing" class="loading loading-spinner loading-xs"></span>
          <span v-else>Connexion</span>
        </div>
      </ButtonComp>
    </form>
  </div>
</template>
