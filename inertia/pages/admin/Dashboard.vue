<script setup lang="ts">
import type DashboardController from '#controllers/dashboard_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link, useForm } from '@inertiajs/vue3'
import { nextTick, ref, useTemplateRef } from 'vue'
import ActionDialogComp from '~/components/ActionDialogComp.vue'
import AppHead from '~/components/AppHead.vue'
import DashboardAction from '~/components/DashboardAction.vue'
import ImageNotAvailableIcon from '~/components/icons/ImageNotAvailableIcon.vue'
import Pagination from '~/components/Pagination.vue'
import RatingBox from '~/components/RatingBox.vue'
import StatusProgressBadge from '~/components/StatusProgressBadge.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import { useActionText, type IResourceNameConfig } from '~/composables/useActionText'
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
interface IFilters {
  search: string
}

type SubmitTask = 'create' | 'edit' | 'delete'

const form = useForm<IForm>({
  mediaId: null,
})
const filters = useForm<IFilters>('filterResults', {
  search: '',
})

const mediaName = ref<string>('')
const actionDialogRef = useTemplateRef<InstanceType<typeof ActionDialogComp>>('actionDialogRef')
const currentTask = ref<SubmitTask | null>(null)

const mediaConfig: IResourceNameConfig = {
  singular: 'media',
  indefinite: 'un',
  definite: 'le',
}
const { title: dialogTitle, actionText: dialogActionText } = useActionText(currentTask, mediaConfig)

function submitForm() {
  const mediaId = form.mediaId
  form.delete(`media/${mediaId}`, {
    onSuccess: () => {
      form.reset()
    },
  })
  closeModal()
}
function submitFilters() {
  filters.get('/dashboard', { preserveState: true })
}

const openModal = (task: SubmitTask, id: number, name: string) => {
  currentTask.value = task
  form.mediaId = id
  mediaName.value = name
  nextTick(() => {
    actionDialogRef.value?.showModal()
  })
}
const closeModal = () => {
  form.mediaId = null
  actionDialogRef.value?.close()
}

// paginate with filters included
function fetchNewPageData(url: string | null) {
  filters.get(`${url}`, { preserveState: true })
}
</script>

<template>
  <AppHead title="Dashboard" />
  <div class="dashboard-content-container">
    <form action="GET" @submit.prevent="submitFilters">
      <DashboardAction
        v-model:search="filters.search"
        :type="'search'"
        :title="'Gestion des media'"
      >
        <Link href="/media/manage">Ajouter un media</Link>
      </DashboardAction>
    </form>
    <div class="dashboard-list-item">
      <span>Nom</span>
      <span>Note</span>
      <span>Statut</span>
    </div>

    <div v-for="media in mediaList.data" class="dashboard-list-item">
      <!-- cover -->
      <div class="dashboard-item-name-container">
        <div v-if="media.cover" class="dashboard-list_img">
          <Link :href="`/media/${media.id}/cover`">
            <img
              class="img-preview"
              loading="lazy"
              :src="`/storage/${media.cover.smallUrl}`"
              :srcset="`/storage/${media.cover.smallUrl}, /storage/${media.cover.mediumUrl} 2x`"
              :alt="`cover de ${media.name}`"
            />
          </Link>
        </div>
        <div v-else class="dashboard-list_img">
          <Link :href="`/media/${media.id}/cover`">
            <div class="no-cover-preview">
              <ImageNotAvailableIcon />
            </div>
          </Link>
        </div>
        <!-- name -->
        <Link :href="`/media/manage/${media.id}`">
          <p class="dashboard-item-name">{{ media.name }}</p>
        </Link>
      </div>
      <!-- review rating -->
      <div>
        <Link :href="`/media/${media.id}/review`">
          <RatingBox :rating="media.review?.rating ? media.review.rating : null" />
        </Link>
      </div>
      <!-- status progress -->
      <StatusProgressBadge :status="media.status" />
      <div>
        <ButtonComp @click="openModal('delete', media.id, media.name)">Supprimer</ButtonComp>
      </div>
    </div>
    <!-- pagination -->
    <div>
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
    </div>

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
        <div v-if="currentTask === 'create' || currentTask === 'edit'">
          <div>
            <!-- <LabelComp text="Nom" textPosition="up"> -->
            <!-- <InputComp v-model="form.name" type="text" /> -->
            <!-- </LabelComp> -->
          </div>
          <!-- <FormErrorComp v-if="form.errors.name" :message="form.errors.name" /> -->
        </div>

        <div v-if="currentTask === 'delete'">
          <span>
            Confirmer la suppression de <strong>{{ mediaName }}</strong> ?
          </span>
        </div>
      </template>
    </ActionDialogComp>
  </div>
</template>

<style scoped>
.dashboard-content-container {
  min-width: 800px;
}
.dashboard-list-item {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.dashboard-list_img {
  width: 30px;
  height: 45px;
  object-fit: cover;
}
.dashboard-item-name-container {
  display: flex;
  align-items: center;
}
.dashboard-item-name {
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
