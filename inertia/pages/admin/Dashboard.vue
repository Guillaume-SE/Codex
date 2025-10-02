<script setup lang="ts">
import type DashboardController from '#controllers/dashboard_controller'
import type { IMediaPresented } from '#interfaces/media_presented_interface'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link, useForm } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import ActionDialogComp from '~/components/ActionDialogComp.vue'
import AppHead from '~/components/AppHead.vue'
import DashboardAction from '~/components/dashboard/DashboardAction.vue'
import DashboardContainer from '~/components/dashboard/DashboardContainer.vue'
import DashboardMediaListItem from '~/components/dashboard/DashboardMediaListItem.vue'
import CoverManageDialog from '~/components/media/CoverManageDialog.vue'
import Pagination from '~/components/Pagination.vue'
import { ActionDialogConfig, useActionDialog } from '~/composables/useActionDialog'
import { usePaginatedFilters } from '~/composables/usePaginatedFilters'

const props = defineProps<{
  mediaList: InferPageProps<DashboardController, 'showDashboard'>['mediaList']
  errors?: Record<string, string[]>
}>()

interface IForm {
  mediaId: number | null
}

interface IMediaItem {
  id: number
  name: string
}

const deleteForm = useForm<IForm>({
  mediaId: null,
})

const deleteMediaApiUrl = ref('')
const coverModalRef = ref<InstanceType<typeof CoverManageDialog> | null>(null)

const { filters, submitFilters, fetchNewPageData } = usePaginatedFilters('/admin/dashboard')

const deleteDialogConfig: ActionDialogConfig<IForm, IMediaItem> = {
  resourceApiUrl: deleteMediaApiUrl,
  resourceNameConfig: { singular: 'media', indefinite: 'un', definite: 'le' },
  form: deleteForm,
}

const {
  actionDialogRef: deleteDialogRef,
  currentTask: currentDeleteTask,
  selectedItemName: selectedMediaName,
  dialogTitle: deleteDialogTitle,
  dialogActionText: deleteDialogActionText,
  openModal: openDeleteModal,
  closeModal: closeDeleteModal,
  submitForm: submitDeleteForm,
} = useActionDialog(deleteDialogConfig, 'deleteDialogRef')

function handleDeleteMedia(media: { id: number; name: string }) {
  deleteMediaApiUrl.value = '/admin/media'
  openDeleteModal('delete', media)
}
function handleManageCover(media: IMediaPresented) {
  coverModalRef.value?.open(media)
}

const isMediaListEmpty = computed(() => {
  return !props.mediaList?.data || props.mediaList.data.length === 0
})
</script>

<template>
  <AppHead title="Dashboard" />
  <DashboardContainer>
    <form action="GET" @submit.prevent="submitFilters">
      <DashboardAction
        v-model:search="filters.search"
        :type="'search'"
        :title="'Gestion des media'"
      >
        <Link href="/admin/media/create">Ajouter un media</Link>
      </DashboardAction>
    </form>

    <div class="dashboard-list-item-header">
      <span>Nom</span>
      <span>Note</span>
      <span>Statut</span>
    </div>

    <DashboardMediaListItem
      v-if="!isMediaListEmpty"
      v-for="media in mediaList.data"
      :key="media.id"
      :media="media"
      @manage-cover="handleManageCover"
      @delete-item="handleDeleteMedia"
    />
    <div v-else>
      <p>Aucun média ajouté pour le moment.</p>
    </div>

    <!-- pagination -->
    <Pagination
      :page="{
        currentPage: props.mediaList.meta.currentPage,
        firstPage: props.mediaList.meta.firstPage,
        lastPage: props.mediaList.meta.lastPage,
      }"
      :url="{
        firstPageUrl: props.mediaList.meta.firstPageUrl,
        lastPageUrl: props.mediaList.meta.lastPageUrl,
        nextPageUrl: props.mediaList.meta.nextPageUrl,
        previousPageUrl: props.mediaList.meta.previousPageUrl,
      }"
      @update:current-page="fetchNewPageData"
    />
  </DashboardContainer>

  <!-- delete modal -->
  <ActionDialogComp
    ref="deleteDialogRef"
    :title="deleteDialogTitle"
    :form="deleteForm"
    :action-text="deleteDialogActionText"
    @submit="submitDeleteForm"
    @close="closeDeleteModal"
  >
    <template #form-content>
      <div v-if="currentDeleteTask === 'delete'">
        <span>
          Confirmer la suppression de <strong>{{ selectedMediaName }}</strong> ?
        </span>
      </div>
    </template>
  </ActionDialogComp>

  <CoverManageDialog ref="coverModalRef" />
</template>

<style scoped>
.dashboard-list-item-header {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  gap: 15px;
  padding: 10px;
  border-bottom: 2px solid #333;
  font-weight: bold;
}
.img-thumbnail {
  max-width: 100px;
  height: auto;
  border-radius: 4px;
  margin: 10px 0;
  display: block;
}
.file-input {
  margin-top: 10px;
}
</style>
