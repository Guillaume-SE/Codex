<script setup lang="ts">
import type TagsController from '#controllers/tags_controller'
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
  tagId: number | null
  name: string | null
}

type SubmitTask = 'create' | 'edit' | 'delete'

const props = defineProps<{
  tagList: InferPageProps<TagsController, 'showManage'>['tagList']
}>()

const form = useForm<IForm>({
  tagId: null,
  name: null,
})

const tagName = ref<string | null>('')
const createModalRef = useTemplateRef<HTMLDialogElement>('createModalRef')
const updateModalRef = useTemplateRef<HTMLDialogElement>('updateModalRef')
const deleteModalRef = useTemplateRef<HTMLDialogElement>('deleteModalRef')

function submitManageTag(task: SubmitTask) {
  const tagId = form.tagId
  if (task === 'create') {
    form.post(`/tag`)
  }
  if (task === 'edit') {
    form.put(`/tag/${tagId}`)
  }
  if (task === 'delete') {
    form.delete(`/tag/${tagId}`)
  }
  form.reset()
  closeModal()
}

const openModal = (id: number | null, name: string | null, task: SubmitTask) => {
  form.tagId = id
  tagName.value = name
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
  form.tagId = null
  form.name = null
  createModalRef.value?.close()
  updateModalRef.value?.close()
  deleteModalRef.value?.close()
}

const tagListIsNotEmpty = computed(() => {
  return props.tagList.length > 0 ? true : false
})
</script>

<template>
  <AppHead title="Gestion des tags" />
  <AppLayout>
    <div>
      <h3>Gestion des tags</h3>
    </div>
    <div>
      <ButtonComp @click="openModal(null, null, 'create')">Ajouter</ButtonComp>
    </div>
    <div class="dashboard-list">
      <span>Tags déjà ajoutés</span>
      <div v-if="tagListIsNotEmpty">
        <div v-for="tag in tagList" class="tag-list-item">
          <div>
            <span>{{ tag.name }}</span>
          </div>
          <div>
            <ButtonComp @click="openModal(tag.id, tag.name, 'edit')">Modifier</ButtonComp>
          </div>
          <div>
            <ButtonComp @click="openModal(tag.id, tag.name, 'delete')">Supprimer</ButtonComp>
          </div>
        </div>
      </div>
      <div v-else>Aucun tag ajouté</div>

      <!-- create modal -->
      <ModalComp ref="createModalRef" @close-modal="closeModal">
        <template #header>
          <div>
            <span>Nouvel ajout</span>
          </div>
        </template>
        <template #content>
          <div>
            <span>Ajouter un nouveau tag</span>
          </div>
          <div>
            <LabelComp text="Nom:" textPosition="up">
              <InputComp v-model="form.name" type="text" />
            </LabelComp>
          </div>
        </template>
        <template #action>
          <ButtonComp @click="closeModal">Retour</ButtonComp>
          <ButtonComp @click="submitManageTag('create')">Confirmer</ButtonComp>
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
            <span>Modifier le nom du tag</span>
          </div>
          <div>
            <LabelComp text="Nom actuel:" textPosition="up">
              <InputComp v-model="form.name" type="text" :value="tagName" />
            </LabelComp>
          </div>
        </template>
        <template #action>
          <ButtonComp @click="closeModal">Retour</ButtonComp>
          <ButtonComp @click="submitManageTag('edit')">Confirmer</ButtonComp>
        </template>
      </ModalComp>
      <!-- delete modal -->
      <ModalComp ref="deleteModalRef" @close-modal="closeModal">
        <template #header>
          <div>
            <span>Supprimer un tag</span>
          </div>
        </template>
        <template #content>
          <div>
            <span>Cette suppression retirera certains média des recommandations.</span>
          </div>
          <div>
            <span>Confirmer la suppression de: {{ tagName }} ? </span>
          </div>
        </template>
        <template #action>
          <ButtonComp @click="closeModal">Retour</ButtonComp>
          <ButtonComp @click="submitManageTag('delete')">Confirmer</ButtonComp>
        </template>
      </ModalComp>
    </div>
  </AppLayout>
</template>

<style scoped>
.tag-list-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
