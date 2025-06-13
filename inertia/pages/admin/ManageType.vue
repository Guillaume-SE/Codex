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

const props = defineProps<{
  typeList: InferPageProps<MediaTypesController, 'showManage'>['typeList']
}>()

interface IForm {
  newTypeId: string | number
  name: string | null
}

interface ITypeList {
  id: number | null
  name: string | null
  count: number | null
}

type SubmitTask = 'create' | 'edit' | 'replace' | 'delete'

const form = useForm<IForm>({
  newTypeId: '',
  name: null,
})

const typeId = ref<number | null>()
const typeName = ref<string | null>('')
const filteredTypeList = ref(props.typeList)
const createModalRef = useTemplateRef<HTMLDialogElement>('createModalRef')
const updateModalRef = useTemplateRef<HTMLDialogElement>('updateModalRef')
const deleteModalRef = useTemplateRef<HTMLDialogElement>('deleteModalRef')
const replaceModalRef = useTemplateRef<HTMLDialogElement>('replaceModalRef')

function submitManageType(task: SubmitTask) {
  if (task === 'create') {
    form.post(`/type`)
  }
  if (task === 'edit') {
    form.put(`/type/${typeId.value}`)
  }
  if (task === 'replace') {
    form.put(`/type/replace/${typeId.value}`)
  }
  if (task === 'delete') {
    form.delete(`/type/${typeId.value}`)
  }
  form.reset()
  closeModal()
}

const openModal = (options: ITypeList, task: SubmitTask) => {
  typeId.value = options.id
  typeName.value = options.name
  form.name = options.name
  if (task === 'edit') {
    updateModalRef.value?.showModal()
    return
  }
  if (task === 'delete') {
    deleteModalRef.value?.showModal()
    return
  }
  if (task === 'replace') {
    form.newTypeId = ''
    filteredTypeList.value = props.typeList.filter((type) => type.id !== options.id)
    replaceModalRef.value?.showModal()
    return
  }
  createModalRef.value?.showModal()
}
const closeModal = () => {
  typeId.value = null
  form.name = null
  createModalRef.value?.close()
  updateModalRef.value?.close()
  deleteModalRef.value?.close()
  replaceModalRef.value?.close()
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
      <ButtonComp @click="openModal({ id: null, name: null, count: null }, 'create')"
        >Ajouter</ButtonComp
      >
    </div>
    <div class="dashboard-list">
      <div v-if="typeListIsNotEmpty">
        <div v-for="type in typeList" class="type-list-item">
          <div>
            <span>{{ type.name }}</span>
          </div>
          <div>
            <span>{{ type.count }}</span>
          </div>
          <div>
            <ButtonComp
              @click="openModal({ id: type.id, name: type.name, count: type.count }, 'edit')"
              >Modifier</ButtonComp
            >
          </div>
          <div v-if="type.count > 0">
            <ButtonComp
              @click="openModal({ id: type.id, name: type.name, count: type.count }, 'replace')"
              >Supprimer</ButtonComp
            >
          </div>
          <div v-else>
            <ButtonComp
              @click="openModal({ id: type.id, name: type.name, count: type.count }, 'delete')"
              >Supprimer</ButtonComp
            >
          </div>
        </div>
      </div>
      <div v-else>Aucun type ajouté</div>

      <!--
      create modal
      -->
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
          <ButtonComp @click="submitManageType('create')">Valider</ButtonComp>
        </template>
      </ModalComp>
      <!--
      update modal
      -->
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
          <ButtonComp @click="submitManageType('edit')">Valider</ButtonComp>
        </template>
      </ModalComp>
      <!--
      delete modal
      -->
      <ModalComp ref="deleteModalRef" @close-modal="closeModal">
        <template #header>
          <div>
            <span>Suppression</span>
          </div>
        </template>
        <template #content>
          <div>
            <span>Supprimer le type:</span>
            <span>{{ typeName }}</span>
          </div>
        </template>
        <template #action>
          <ButtonComp @click="closeModal">Retour</ButtonComp>
          <ButtonComp @click="submitManageType('delete')">Valider</ButtonComp>
        </template>
      </ModalComp>
      <!--
      replace modal
       -->
      <ModalComp ref="replaceModalRef" @close-modal="closeModal">
        <template #header>
          <div>Remplacement</div>
        </template>
        <template #content>
          <div>
            <span>Au moins un media utilise le type {{ typeName }}</span>
            <span>Remplacer ce type par</span>
            <div>
              <select v-model="form.newTypeId">
                <option disabled value="">Choisir un type</option>
                <option v-for="type in filteredTypeList" :value="type.id">
                  {{ type.name }}
                </option>
              </select>
            </div>
          </div>
        </template>
        <template #action>
          <ButtonComp @click="closeModal">Retour</ButtonComp>
          <ButtonComp @click="submitManageType('replace')">Valider</ButtonComp>
        </template>
      </ModalComp>
    </div>
  </AppLayout>
</template>

<style scoped>
.type-list-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
