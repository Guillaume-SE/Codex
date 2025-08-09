<script setup lang="ts">
import type GamePlatformsController from '#controllers/game_platforms_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { computed, nextTick, ref, useTemplateRef } from 'vue'
import ActionDialogComp from '~/components/ActionDialogComp.vue'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { useActionText, type IResourceNameConfig } from '~/composables/useActionText'
import DashboardLayout from '~/layouts/DashboardLayout.vue'

interface IForm {
  platformId: number | null
  name: string | null
}

interface IPlatformList {
  id: number | null
  name: string | null
}

type SubmitTask = 'create' | 'edit' | 'delete'

const props = defineProps<{
  platformList: InferPageProps<GamePlatformsController, 'showManage'>['platformList']
  errors: Record<string, string[]>
}>()

defineOptions({ layout: DashboardLayout })

const form = useForm<IForm>({
  platformId: null,
  name: null,
})

const actionDialogRef = useTemplateRef<InstanceType<typeof ActionDialogComp>>('actionDialogRef')

const currentTask = ref<SubmitTask | null>(null)
const activePlatform = ref<IPlatformList | null>(null)

const platformConfig: IResourceNameConfig = {
  singular: 'plateforme',
  indefinite: 'une',
  definite: 'la',
}

const { title: dialogTitle, actionText: dialogActionText } = useActionText(
  currentTask,
  platformConfig
)

const openModal = (task: SubmitTask, platform: IPlatformList = { id: null, name: null }) => {
  currentTask.value = task
  activePlatform.value = platform

  // Pre-fill the form for editing
  form.name = task === 'edit' ? platform.name : null
  form.platformId = platform.id

  nextTick(() => {
    actionDialogRef.value?.showModal()
  })
}

const closeModal = () => {
  actionDialogRef.value?.close()
  form.reset()
  form.clearErrors()
  currentTask.value = null
  activePlatform.value = null
}

function submitForm() {
  const task = currentTask.value
  const platformId = activePlatform.value?.id

  const options = {
    onSuccess: () => closeModal(),
    preserveState: true,
  }

  if (task === 'create') {
    form.post(`/platform`, options)
  }
  if (task === 'edit') {
    form.put(`/platform/${platformId}`, options)
  }
  if (task === 'delete') {
    form.delete(`/platform/${platformId}`, options)
  }
}

const platformListIsNotEmpty = computed(() => props.platformList.length > 0)
</script>

<template>
  <AppHead title="Gestion des plateformes" />
  <div>
    <h3>Gestion des plateformes</h3>
  </div>
  <div>
    <ButtonComp @click="openModal('create')">Ajouter</ButtonComp>
  </div>
  <div class="dashboard-list">
    <div v-if="platformListIsNotEmpty">
      <div v-for="platform in platformList" :key="platform.id" class="platform-list-item">
        <div>
          <span>{{ platform.name }}</span>
        </div>
        <div>
          <span>{{ platform.count }}</span>
        </div>
        <div>
          <ButtonComp @click="openModal('edit', platform)">Modifier</ButtonComp>
        </div>
        <div>
          <ButtonComp @click="openModal('delete', platform)">Supprimer</ButtonComp>
        </div>
      </div>
    </div>
    <div v-else>Aucune plateforme ajoutée</div>

    <ActionDialogComp
      v-if="currentTask"
      ref="actionDialogRef"
      :title="dialogTitle"
      :form="form"
      :action-text="dialogActionText"
      @submit="submitForm"
      @close="closeModal"
    >
      <template #form-content>
        <div v-if="currentTask === 'create' || currentTask === 'edit'">
          <div>
            <LabelComp text="Nom" textPosition="up">
              <InputComp v-model="form.name" type="text" />
            </LabelComp>
          </div>
          <FormErrorComp v-if="form.errors.name" :message="form.errors.name" />
        </div>

        <div v-if="currentTask === 'delete'">
          <span
            >Confirmer la suppression de <strong>{{ activePlatform?.name }}</strong> ? Les jeux
            utilisant cette plateforme pourraient s'en retrouver impactés.</span
          >
        </div>
      </template>
    </ActionDialogComp>
  </div>
</template>

<style scoped>
.platform-list-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
