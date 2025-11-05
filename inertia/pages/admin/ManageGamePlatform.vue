<script setup lang="ts">
import type GamePlatformsController from '#controllers/game_platforms_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import ManageMediaTaxonomy from '~/components/dashboard/ManageMediaTaxonomy.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'

interface IForm {
  platformId: number | null
  name: string | null
}

defineProps<{
  platformList: InferPageProps<GamePlatformsController, 'showManage'>['platformList']
}>()

const form = useForm<IForm>({
  platformId: null,
  name: null,
})

const resourceNameConfig = {
  singular: 'plateforme',
  indefinite: 'une',
  definite: 'la',
}
</script>

<template>
  <AppHead title="Gestion des plateformes" />

  <ManageMediaTaxonomy
    title="Gestion des plateformes"
    :paginatedList="platformList"
    :form="form"
    resourceApiUrl="/admin/platforms"
    :resourceNameConfig="resourceNameConfig"
  >
    <template #list-item="{ item, openModal }">
      <div>
        <div>
          <span>{{ item.name }}</span>
        </div>
        <div>
          <span>{{ item.count }}</span>
        </div>
        <div>
          <ButtonComp @click="openModal('edit', item)">Modifier</ButtonComp>
        </div>
        <div>
          <ButtonComp @click="openModal('delete', item)">Supprimer</ButtonComp>
        </div>
      </div>
    </template>

    <template #form-content="{ currentTask, selectedItemName }">
      <div v-if="currentTask === 'create' || currentTask === 'edit'">
        <div>
          <LabelComp labelFor="name" text="Nom" />
          <InputComp v-model="form.name" type="text" id="name" @input="form.clearErrors('name')" />
        </div>
        <FormErrorComp v-if="form.errors.name" :message="form.errors.name" />
      </div>

      <div v-if="currentTask === 'delete'">
        <span
          >Confirmer la suppression de <strong>{{ selectedItemName }}</strong> ? Les jeux utilisant
          cette plateforme pourraient s'en retrouver impactés.</span
        >
      </div>
    </template>
  </ManageMediaTaxonomy>
</template>
