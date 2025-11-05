<script setup lang="ts" generic="T extends { id: any; name: string | null }, U extends object">
import { InferPageProps } from '@adonisjs/inertia/types'
import { type InertiaForm } from '@inertiajs/vue3'
import { computed, watch } from 'vue'
import ActionModal from '~/components/ActionModal.vue'
import DashboardAction from '~/components/dashboard/DashboardAction.vue'
import DashboardContainer from '~/components/dashboard/DashboardContainer.vue'
import Pagination from '~/components/Pagination.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import { useActionDialog, type ActionDialogConfig } from '~/composables/useActionDialog'
import type { ActionType, IResourceNameConfig } from '~/composables/useActionText'
import { usePaginatedTaxonomyFilters } from '~/composables/usePaginatedTaxonomyFilters'

const props = defineProps<{
  title: string
  paginatedList: InferPageProps<any, any>['paginatedList']
  form: InertiaForm<U>
  resourceApiUrl: string
  resourceNameConfig: IResourceNameConfig
  customSubmitHandlers?: Partial<Record<ActionType, (closeModal: () => void) => void>>
  isActionDisabled?: boolean
}>()

const emit = defineEmits(['modal-closed'])

const { filters, submitFilters, fetchNewPageData } = usePaginatedTaxonomyFilters(
  props.resourceApiUrl + '/manage'
)

const dialogConfig: ActionDialogConfig<U, T> = {
  resourceApiUrl: props.resourceApiUrl,
  resourceNameConfig: props.resourceNameConfig,
  form: props.form,
  // let ManageType override if needed
  customSubmitHandlers: props.customSubmitHandlers || {},
}

const {
  isModalOpen,
  currentTask,
  selectedItemName,
  dialogTitle,
  dialogActionText,
  dialogVariant,
  openModal,
  submitForm,
} = useActionDialog<U, T>(dialogConfig)

watch(isModalOpen, (isOpen) => {
  if (!isOpen) {
    emit('modal-closed')
  }
})

const listIsNotEmpty = computed(() => props.paginatedList.data.length > 0)
</script>

<template>
  <DashboardContainer>
    <form action="GET" @submit.prevent="submitFilters">
      <DashboardAction v-model:search="filters.search" :type="'search'" :title="title">
        <ButtonComp @click="openModal('create')">Ajouter +</ButtonComp>
      </DashboardAction>
    </form>

    <div class="dashboard-list-item-header">
      <span>Nom</span>
      <span>Utilisation</span>
    </div>

    <div class="dashboard-list">
      <div v-if="listIsNotEmpty">
        <div v-for="item in paginatedList.data" :key="item.id" class="item-row">
          <slot name="list-item" :item="item" :openModal="openModal" />
        </div>
      </div>
      <div v-else>Aucun résultat</div>
    </div>

    <Pagination
      :page="{
        currentPage: props.paginatedList.meta.currentPage,
        firstPage: props.paginatedList.meta.firstPage,
        lastPage: props.paginatedList.meta.lastPage,
      }"
      :url="{
        firstPageUrl: props.paginatedList.meta.firstPageUrl,
        lastPageUrl: props.paginatedList.meta.lastPageUrl,
        nextPageUrl: props.paginatedList.meta.nextPageUrl,
        previousPageUrl: props.paginatedList.meta.previousPageUrl,
      }"
      @update:current-page="fetchNewPageData"
    />
  </DashboardContainer>

  <ActionModal
    v-model:show="isModalOpen"
    :title="dialogTitle"
    :action-text="dialogActionText"
    :is-action-disabled="isActionDisabled"
    :is-loading="form.processing"
    :variant="dialogVariant"
    @submit="submitForm"
  >
    <template #form-content>
      <slot
        name="form-content"
        :currentTask="currentTask"
        :selectedItemName="selectedItemName"
        :form="form"
      />
    </template>
  </ActionModal>
</template>

<style scoped>
.dashboard-list-item-header {
  display: grid;
  gap: 15px;
  padding: 10px;
  border-bottom: 2px solid #333;
  font-weight: bold;
  grid-template-columns: 2fr 1fr 1fr 1fr;
}
/* Use :deep() to style the rows injected by the parent */
:deep(.item-row > div) {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
