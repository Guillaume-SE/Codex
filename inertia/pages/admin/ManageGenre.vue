<script setup lang="ts">
import type GenresController from '#controllers/genres_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { computed, ref, useTemplateRef } from 'vue'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import ModalComp from '~/components/ui/ModalComp.vue'
import AppLayout from '~/layouts/AppLayout.vue'
import DashboardLayout from '~/layouts/DashboardLayout.vue'

interface IForm {
  genreId: number | null
  name: string | null
}

type SubmitTask = 'create' | 'edit' | 'delete'

const props = defineProps<{
  genreList: InferPageProps<GenresController, 'showManage'>['genreList']
}>()

const form = useForm<IForm>({
  genreId: null,
  name: null,
})

const genreName = ref<string | null>('')
const createModalRef = useTemplateRef<HTMLDialogElement>('createModalRef')
const updateModalRef = useTemplateRef<HTMLDialogElement>('updateModalRef')
const deleteModalRef = useTemplateRef<HTMLDialogElement>('deleteModalRef')

function submitManageGenre(task: SubmitTask) {
  const genreId = form.genreId
  if (task === 'create') {
    form.post(`/genre`)
  }
  if (task === 'edit') {
    form.put(`/genre/${genreId}`)
  }
  if (task === 'delete') {
    form.delete(`/genre/${genreId}`)
  }
  form.reset()
  closeModal()
}

const openModal = (id: number | null, name: string | null, task: SubmitTask) => {
  form.genreId = id
  genreName.value = name
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
  form.genreId = null
  form.name = null
  createModalRef.value?.close()
  updateModalRef.value?.close()
  deleteModalRef.value?.close()
}

const genreListIsNotEmpty = computed(() => {
  return props.genreList.length > 0 ? true : false
})
</script>

<template>
  <AppHead title="Gestion des genres" />
  <AppLayout>
    <DashboardLayout>
      <div>
        <h3>Gestion des genres</h3>
      </div>
      <div>
        <ButtonComp @click="openModal(null, null, 'create')">Ajouter</ButtonComp>
      </div>
      <div class="dashboard-list">
        <div v-if="genreListIsNotEmpty">
          <div v-for="genre in genreList" class="genre-list-item">
            <div>
              <span>{{ genre.name }}</span>
            </div>
            <div>
              <ButtonComp @click="openModal(genre.id, genre.name, 'edit')">Modifier</ButtonComp>
            </div>
            <div>
              <ButtonComp @click="openModal(genre.id, genre.name, 'delete')">Supprimer</ButtonComp>
            </div>
          </div>
        </div>
        <div v-else>Aucun genre ajoutée</div>

        <!-- create modal -->
        <ModalComp ref="createModalRef" @close-modal="closeModal">
          <template #header>
            <div>
              <span>Nouvel ajout</span>
            </div>
          </template>
          <template #content>
            <div>
              <span>Ajouter un nouveau genre</span>
            </div>
            <div>
              <LabelComp text="Nom:" textPosition="up">
                <InputComp v-model="form.name" type="text" />
              </LabelComp>
            </div>
          </template>
          <template #action>
            <ButtonComp @click="closeModal">Retour</ButtonComp>
            <ButtonComp @click="submitManageGenre('create')">Confirmer</ButtonComp>
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
              <span>Modifier le nom du genre</span>
            </div>
            <div>
              <LabelComp text="Nom actuel:" textPosition="up">
                <InputComp v-model="form.name" type="text" :value="genreName" />
              </LabelComp>
            </div>
          </template>
          <template #action>
            <ButtonComp @click="closeModal">Retour</ButtonComp>
            <ButtonComp @click="submitManageGenre('edit')">Confirmer</ButtonComp>
          </template>
        </ModalComp>
        <!-- delete modal -->
        <ModalComp ref="deleteModalRef" @close-modal="closeModal">
          <template #header>
            <div>
              <span>Supprimer un genre</span>
            </div>
          </template>
          <template #content>
            <div>
              <span
                >En cas d'erreur, il sera nécessaire de réattribuer le genre un par un à chaque
                média.
              </span>
            </div>
            <div>
              <span>Confirmer la suppression de: {{ genreName }} ? </span>
            </div>
          </template>
          <template #action>
            <ButtonComp @click="closeModal">Retour</ButtonComp>
            <ButtonComp @click="submitManageGenre('delete')">Confirmer</ButtonComp>
          </template>
        </ModalComp>
      </div>
    </DashboardLayout>
  </AppLayout>
</template>

<style scoped>
.genre-list-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
