<script setup lang="ts">
import type GamePlatformsController from '#controllers/game_platforms_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { computed, ref, useTemplateRef } from 'vue'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import ModalComp from '~/components/ui/ModalComp.vue'
import AppLayout from '~/layouts/AppLayout.vue'

interface IForm {
  platformId: number | null
  name: string | null
}

type SubmitTask = 'create' | 'edit' | 'delete'

const props = defineProps<{
  platformList: InferPageProps<GamePlatformsController, 'showManage'>['platformList']
}>()

const form = useForm<IForm>({
  platformId: null,
  name: null,
})

const platformName = ref<string | null>('')
const createModalRef = useTemplateRef<HTMLDialogElement>('createModalRef')
const updateModalRef = useTemplateRef<HTMLDialogElement>('updateModalRef')
const deleteModalRef = useTemplateRef<HTMLDialogElement>('deleteModalRef')

function submitManagePlatform(task: SubmitTask) {
  const platformId = form.platformId
  if (task === 'create') {
    form.post(`/platform`)
  }
  if (task === 'edit') {
    form.put(`/platform/${platformId}`)
  }
  if (task === 'delete') {
    form.delete(`/platform/${platformId}`)
  }
  form.reset()
  closeModal()
}

const openModal = (id: number | null, name: string | null, task: SubmitTask) => {
  form.platformId = id
  platformName.value = name
  if (task === 'edit') {
    form.name = name
    updateModalRef.value?.showModal()
    return
  }
  if (task === 'delete') {
    deleteModalRef.value?.showModal()
    return
  }
  createModalRef.value?.showModal()
}
const closeModal = () => {
  form.platformId = null
  form.name = null
  createModalRef.value?.close()
  updateModalRef.value?.close()
  deleteModalRef.value?.close()
}

const platformListIsNotEmpty = computed(() => {
  return props.platformList.length > 0 ? true : false
})
</script>

<template>
  <AppHead title="Gestion des plateformes" />
  <AppLayout>
    <div>
      <h3>Gestion des plateformes</h3>
    </div>
    <div>
      <ButtonComp @click="openModal(null, null, 'create')">Ajouter</ButtonComp>
    </div>
    <div class="dashboard-list">
      <span>Plateformes déjà ajoutées</span>
      <div v-if="platformListIsNotEmpty">
        <div v-for="platform in platformList" class="platform-list-item">
          <div>
            <span>{{ platform.name }}</span>
          </div>
          <div>
            <ButtonComp @click="openModal(platform.id, platform.name, 'edit')">Modifier</ButtonComp>
          </div>
          <div>
            <ButtonComp @click="openModal(platform.id, platform.name, 'delete')"
              >Supprimer</ButtonComp
            >
          </div>
        </div>
      </div>
      <div v-else>Aucune plateforme ajoutée</div>

      <!-- create modal -->
      <ModalComp ref="createModalRef" @close-modal="closeModal">
        <template #header>
          <div>
            <span>Nouvel ajout</span>
          </div>
        </template>
        <template #content>
          <div>
            <span>Ajouter une nouvelle plateforme</span>
          </div>
          <div>
            <LabelComp text="Nom:" textPosition="up">
              <InputComp v-model="form.name" type="text" />
            </LabelComp>
          </div>
        </template>
        <template #action>
          <ButtonComp @click="closeModal">Retour</ButtonComp>
          <ButtonComp @click="submitManagePlatform('create')">Confirmer</ButtonComp>
        </template>
      </ModalComp>
      <!-- update modal -->
      <ModalComp ref="updateModalRef" @close-modal="closeModal">
        <template #header>
          <div>
            <span>Modification</span>
          </div>
        </template>
        <template #content>
          <div>
            <span>Modifier le nom de la plateforme</span>
          </div>
          <div>
            <LabelComp text="Nom actuel:" textPosition="up">
              <InputComp v-model="form.name" type="text" :value="platformName" />
            </LabelComp>
          </div>
        </template>
        <template #action>
          <ButtonComp @click="closeModal">Retour</ButtonComp>
          <ButtonComp @click="submitManagePlatform('edit')">Confirmer</ButtonComp>
        </template>
      </ModalComp>
      <!-- delete modal -->
      <ModalComp ref="deleteModalRef" @close-modal="closeModal">
        <template #header>
          <div>
            <span>Supprimer une plateforme</span>
          </div>
        </template>
        <template #content>
          <div>
            <span>Cette suppression pourrait impacter les jeux déjà enregistrés.</span>
          </div>
          <div>
            <span>Confirmer la suppression de: {{ platformName }} ? </span>
          </div>
        </template>
        <template #action>
          <ButtonComp @click="closeModal">Retour</ButtonComp>
          <ButtonComp @click="submitManagePlatform('delete')">Confirmer</ButtonComp>
        </template>
      </ModalComp>
    </div>
  </AppLayout>
</template>

<style scoped>
.platform-list-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
