<script setup lang="ts">
import type MediaTypesController from '#controllers/media_types_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { router, useForm } from '@inertiajs/vue3'
import { computed, watch } from 'vue'
import ActionDialogComp from '~/components/ActionDialogComp.vue'
import AppHead from '~/components/AppHead.vue'
import DashboardAction from '~/components/DashboardAction.vue'
import Pagination from '~/components/Pagination.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { useActionDialog, type ActionDialogConfig } from '~/composables/useActionDialog'
import { usePaginatedFilters } from '~/composables/usePaginatedFilters'
import DashboardLayout from '~/layouts/DashboardLayout.vue'

interface IForm {
  typeId: number | null
  name: string | null
  replacementTypeId: number | null
}

interface ITypeList {
  id: number | null
  name: string | null
  count: number | null
}

const props = defineProps<{
  typeList: InferPageProps<MediaTypesController, 'showManage'>['typeList']
  errors: Record<string, string[]>
}>()

defineOptions({ layout: DashboardLayout })

const form = useForm<IForm>({
  typeId: null,
  name: null,
  replacementTypeId: null,
})

const { filters, submitFilters, fetchNewPageData } = usePaginatedFilters('/admin/types/manage')

watch(
  () => props.errors,
  (newErrors) => {
    form.clearErrors()

    const formattedErrors = Object.fromEntries(
      Object.entries(newErrors).map(([key, value]) => [key, value[0]])
    )
    form.setError(formattedErrors as any)
  },
  {
    deep: true,
  }
)

function customHandleReplace() {
  const typeIdToDelete = selectedItem.value?.id
  if (!typeIdToDelete) {
    return
  }

  form.put(`/admin/types/replace/${typeIdToDelete}`, {
    onSuccess: () => closeModal(),
  })
}

function customHandleUpdate() {
  const typeIdToUpdate = selectedItem.value?.id
  if (!typeIdToUpdate) return

  const payload = {
    name: form.name,
  }

  // to avoid back end to receive typeId null (potential conflict with params)
  router.put(`/admin/types/${typeIdToUpdate}`, payload, {
    onStart: () => (form.processing = true),
    onFinish: () => (form.processing = false),
    onSuccess: () => closeModal(),
    preserveState: true,
    preserveScroll: true,
  })
}

const typeConfig: ActionDialogConfig<IForm, ITypeList> = {
  resourceApiUrl: '/admin/types',
  resourceNameConfig: {
    singular: 'type',
    indefinite: 'un',
    definite: 'le',
  },
  form: form,
  customSubmitHandlers: { replace: customHandleReplace, edit: customHandleUpdate },
}

const {
  actionDialogRef,
  currentTask,
  selectedItem,
  selectedItemName,
  dialogTitle,
  dialogActionText,
  openModal,
  closeModal,
  submitForm,
} = useActionDialog<IForm, ITypeList>(typeConfig)

const typeListIsNotEmpty = computed(() => (props.typeList.data.length > 0 ? true : false))
const filteredTypeList = computed(() => {
  const idToExclude = selectedItem.value?.id
  if (!idToExclude) {
    return props.typeList.data
  }
  return props.typeList.data.filter((type) => type.id !== idToExclude)
})

const isUsedByMedia = computed(() => {
  if (!selectedItem.value || selectedItem.value.count === null) {
    return false
  }

  return selectedItem.value.count > 0
})

const isSubmitDisabled = computed(() => {
  // avoid submit when no option selected in replace case
  if (currentTask.value === 'replace' && isUsedByMedia.value) {
    return form.replacementTypeId === null
  }

  return false
})
</script>

<template>
  <AppHead title="Gestion des types" />
  <form action="GET" @submit.prevent="submitFilters">
    <DashboardAction v-model:search="filters.search" :type="'search'" :title="'Gestion des types'">
      <ButtonComp @click="openModal('create')">Ajouter</ButtonComp>
    </DashboardAction>
  </form>

  <div class="dashboard-list-item-header">
    <span>Nom</span>
    <span>Utilisation</span>
  </div>

  <div class="dashboard-list">
    <div v-if="typeListIsNotEmpty">
      <div v-for="type in typeList.data" :key="type.id" class="type-list-item">
        <div>
          <span>{{ type.name }}</span>
        </div>
        <div>
          <span>{{ type.count }}</span>
        </div>
        <div>
          <ButtonComp @click="openModal('edit', type)">Modifier</ButtonComp>
        </div>
        <div v-if="type.count > 0">
          <ButtonComp @click="openModal('replace', type)">Supprimer</ButtonComp>
        </div>
        <div v-else>
          <ButtonComp @click="openModal('delete', type)">Supprimer</ButtonComp>
        </div>
      </div>
    </div>
    <div v-else>Aucun résultat</div>

    <Pagination
      :page="{
        currentPage: props.typeList.meta.currentPage,
        firstPage: props.typeList.meta.firstPage,
        lastPage: props.typeList.meta.lastPage,
      }"
      :url="{
        firstPageUrl: props.typeList.meta.firstPageUrl,
        lastPageUrl: props.typeList.meta.lastPageUrl,
        nextPageUrl: props.typeList.meta.nextPageUrl,
        previousPageUrl: props.typeList.meta.previousPageUrl,
      }"
      @update:current-page="fetchNewPageData"
    />

    <ActionDialogComp
      v-if="currentTask"
      ref="actionDialogRef"
      :title="dialogTitle"
      :form="form"
      :action-text="dialogActionText"
      :is-action-disabled="isSubmitDisabled"
      @submit="submitForm"
      @close="closeModal"
    >
      <template #form-content>
        <div v-if="currentTask === 'create' || currentTask === 'edit'">
          <div>
            <LabelComp text="Nom" textPosition="up">
              <InputComp v-model="form.name" type="text" @input="form.clearErrors('name')" />
            </LabelComp>
          </div>
          <FormErrorComp v-if="form.errors.name" :message="form.errors.name" />
        </div>

        <div v-if="currentTask === 'delete' || currentTask === 'replace'">
          <div v-if="isUsedByMedia">
            <span>
              Le type <strong>{{ selectedItemName }}</strong> est utilisé. Veuillez choisir un type
              de remplacement avant de le supprimer.
            </span>
            <LabelComp text="Remplacer par :" text-position="up">
              <select v-model="form.replacementTypeId">
                <option disabled :value="null">Choisir un type</option>
                <option v-for="type in filteredTypeList" :value="type.id">
                  {{ type.name }}
                </option>
              </select>
            </LabelComp>
            <FormErrorComp
              v-if="form.errors.replacementTypeId"
              :message="form.errors.replacementTypeId"
            />
          </div>
          <div v-else>
            <span>
              Confirmer la suppression de <strong>{{ selectedItemName }}</strong> ?
            </span>
          </div>
        </div>
      </template>
    </ActionDialogComp>
  </div>
</template>

<style scoped>
.dashboard-list-item-header {
  grid-template-columns: 2fr 1fr 1fr 1fr;
}
.type-list-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
