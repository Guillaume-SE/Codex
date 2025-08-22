<script setup lang="ts">
import type DashboardController from '#controllers/dashboard_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link, useForm } from '@inertiajs/vue3'
import { computed, nextTick, ref, useTemplateRef } from 'vue'
import ActionDialogComp from '~/components/ActionDialogComp.vue'
import AppHead from '~/components/AppHead.vue'
import DashboardAction from '~/components/DashboardAction.vue'
import DashboardMediaListItem from '~/components/DashboardMediaListItem.vue'
import Pagination from '~/components/Pagination.vue'
import {
  useActionText,
  type ActionType,
  type IResourceNameConfig,
} from '~/composables/useActionText'
import { usePaginatedFilters } from '~/composables/usePaginatedFilters'
import DashboardLayout from '~/layouts/DashboardLayout.vue'

const props = defineProps<{
  mediaList: InferPageProps<DashboardController, 'showDashboard'>['mediaList']
  errors: Record<string, string[]>
}>()

defineOptions({
  layout: DashboardLayout,
})

interface IForm {
  mediaId: number | null
}

const form = useForm<IForm>({
  mediaId: null,
})

const { filters, submitFilters, fetchNewPageData } = usePaginatedFilters('/admin/dashboard')

const mediaName = ref<string>('')
const actionDialogRef = useTemplateRef<InstanceType<typeof ActionDialogComp>>('actionDialogRef')
const currentTask = ref<ActionType | null>(null)

const mediaConfig: IResourceNameConfig = {
  singular: 'media',
  indefinite: 'un',
  definite: 'le',
}
const { title: dialogTitle, actionText: dialogActionText } = useActionText(currentTask, mediaConfig)

function submitForm() {
  const mediaId = form.mediaId
  form.delete(`/admin/media/${mediaId}`, {
    onSuccess: () => {
      form.reset()
    },
  })
  closeModal()
}

function openModal(payload: { id: number; name: string }) {
  currentTask.value = 'delete'
  form.mediaId = payload.id
  mediaName.value = payload.name
  nextTick(() => {
    actionDialogRef.value?.showModal()
  })
}
const closeModal = () => {
  form.mediaId = null
  actionDialogRef.value?.close()
}

const isMediaListEmpty = computed(() => {
  return !props.mediaList?.data || props.mediaList.data.length === 0
})
</script>

<template>
  <AppHead title="Dashboard" />
  <form action="GET" @submit.prevent="submitFilters">
    <DashboardAction v-model:search="filters.search" :type="'search'" :title="'Gestion des media'">
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
    @delete-item="openModal"
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

  <!-- delete modal -->
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
      <div v-if="currentTask === 'delete'">
        <span>
          Confirmer la suppression de <strong>{{ mediaName }}</strong> ?
        </span>
      </div>
    </template>
  </ActionDialogComp>
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
</style>
