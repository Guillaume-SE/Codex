<script setup lang="ts">
import type MediaTypesController from '#controllers/media_types_controller'
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
  typeId: number | null
  name: string | null
}

type SubmitTask = 'create' | 'edit' | 'delete'

const props = defineProps<{
  typeList: InferPageProps<MediaTypesController, 'showManage'>['typeList']
}>()

const form = useForm<IForm>({
  typeId: null,
  name: null,
})

const typeName = ref<string | null>('')
const createModalRef = useTemplateRef<HTMLDialogElement>('createModalRef')
const updateModalRef = useTemplateRef<HTMLDialogElement>('updateModalRef')
const deleteModalRef = useTemplateRef<HTMLDialogElement>('deleteModalRef')

function submitManageType(task: SubmitTask) {
  const typeId = form.typeId
  if (task === 'create') {
    form.post(`/type`)
  }
  if (task === 'edit') {
    form.put(`/type/${typeId}`)
  }
  if (task === 'delete') {
    form.delete(`/type/${typeId}`)
  }
  form.reset()
  closeModal()
}

const openModal = (id: number | null, name: string | null, task: SubmitTask) => {
  form.typeId = id
  typeName.value = name
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
  form.typeId = null
  form.name = null
  createModalRef.value?.close()
  updateModalRef.value?.close()
  deleteModalRef.value?.close()
}

const typeListIsNotEmpty = computed(() => {
  return props.typeList.length > 0 ? true : false
})
</script>

<template>
  <AppHead title="Gestion des types" />
  <AppLayout>
    <div>
      <h3>Gestion des types</h3>
    </div>
    <div>
      <ButtonComp @click="openModal(null, null, 'create')">Ajouter</ButtonComp>
    </div>
    <div class="dashboard-list">
      <span>Types déjà ajoutés</span>
      <div v-if="typeListIsNotEmpty">
        <div v-for="type in typeList" class="type-list-item">
          <div>
            <span>{{ type.name }}</span>
          </div>
          <div>
            <ButtonComp @click="openModal(type.id, type.name, 'edit')">Modifier</ButtonComp>
          </div>
          <div>
            <ButtonComp @click="openModal(type.id, type.name, 'delete')">Supprimer</ButtonComp>
          </div>
        </div>
      </div>
      <div v-else>Aucun type ajouté</div>

      <!-- create modal -->
      <ModalComp ref="createModalRef" @close-modal="closeModal">
        <template #header>
          <div>
            <span>Nouvel ajout</span>
          </div>
        </template>
        <template #content>
          <div>
            <span>Ajouter un nouveau type</span>
          </div>
          <div>
            <LabelComp text="Nom:" textPosition="up">
              <InputComp v-model="form.name" type="text" />
            </LabelComp>
          </div>
        </template>
        <template #action>
          <ButtonComp @click="closeModal">Retour</ButtonComp>
          <ButtonComp @click="submitManageType('create')">Confirmer</ButtonComp>
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
            <span>Modifier le nom du type</span>
          </div>
          <div>
            <LabelComp text="Nom actuel:" textPosition="up">
              <InputComp v-model="form.name" type="text" :value="typeName" />
            </LabelComp>
          </div>
        </template>
        <template #action>
          <ButtonComp @click="closeModal">Retour</ButtonComp>
          <ButtonComp @click="submitManageType('edit')">Confirmer</ButtonComp>
        </template>
      </ModalComp>
      <!-- delete modal -->
      <ModalComp ref="deleteModalRef" @close-modal="closeModal">
        <template #header>
          <div>
            <span>Supprimer un type</span>
          </div>
        </template>
        <template #content>
          <div>
            <span>Confirmer la suppression de: {{ typeName }} ? </span>
          </div>
        </template>
        <template #action>
          <ButtonComp @click="closeModal">Retour</ButtonComp>
          <ButtonComp @click="submitManageType('delete')">Confirmer</ButtonComp>
        </template>
      </ModalComp>
    </div>
  </AppLayout>
</template>

<style scoped>
.type-list-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
