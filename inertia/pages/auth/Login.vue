<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
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
    <h3>Login</h3>
    <div>
      <form @submit.prevent="submit">
        <div v-if="errors?.E_INVALID_CREDENTIALS">
          <span>{{ errors.E_INVALID_CREDENTIALS }}</span>
        </div>
        <div v-if="errors?.E_TOO_MANY_REQUESTS">
          <span>{{ errors.E_TOO_MANY_REQUESTS }}</span>
        </div>

        <div>
          <LabelComp text="Identifiant" textPosition="up">
            <InputComp v-model="form.uid" type="text" placeholder="Entrez votre email ou pseudo" />
          </LabelComp>
        </div>
        <div>
          <LabelComp text="Mot de passe" textPosition="up">
            <InputComp v-model="form.password" type="password" />
          </LabelComp>
        </div>
        <div>
          <LabelComp text="Rester connecté" textPosition="down">
            <InputComp v-model="form.remember" type="checkbox" :value="form.remember" />
          </LabelComp>
          <Link href="/">Mot de passe oublié</Link>
        </div>
        <ButtonComp type="submit" :disabled="form.processing">Connexion</ButtonComp>
      </form>
    </div>
  </div>
</template>
