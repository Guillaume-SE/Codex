<script setup lang="ts">
import type DashboardController from '#controllers/dashboard_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link, useForm } from '@inertiajs/vue3'
import { ref, useTemplateRef } from 'vue'
import AppHead from '~/components/AppHead.vue'
import DashboardAction from '~/components/DashboardAction.vue'
import ImageNotAvailableIcon from '~/components/icons/ImageNotAvailableIcon.vue'
import Pagination from '~/components/Pagination.vue'
import RatingBox from '~/components/RatingBox.vue'
import StatusProgressBadge from '~/components/StatusProgressBadge.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import ModalComp from '~/components/ui/ModalComp.vue'
import DashboardLayout from '~/layouts/DashboardLayout.vue'

interface IForm {
  mediaId: number | null
}
interface IFilters {
  search: string
}

const props = defineProps<{
  mediaList: InferPageProps<DashboardController, 'showDashboard'>['mediaList']
}>()

defineOptions({
  layout: DashboardLayout,
})

const form = useForm<IForm>({
  mediaId: null,
})
const filters = useForm<IFilters>('filterResults', {
  search: '',
})

const mediaTitle = ref<string>('')
const modalRef = useTemplateRef<HTMLDialogElement>('modalRef')

function submitDeleteMedia() {
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

const openModal = (id: number, title: string) => {
  form.mediaId = id
  mediaTitle.value = title
  modalRef.value?.showModal()
}
const closeModal = () => {
  form.mediaId = null
  modalRef.value?.close()
}

// paginate with filters included
function fetchNewPageData(url: string | null) {
  filters.get(`${url}`, { preserveState: true })
}
</script>

<template>
  <AppHead title="Dashboard" />
  <div>
    <form action="GET" @submit.prevent="submitFilters">
      <div class="dashboard-title-container">
        <div>
          <h3>Gestion des plateformes</h3>
        </div>
        <DashboardAction v-model:search="filters.search" :type="'search'">
          <Link href="/media/manage">Ajouter un media</Link>
        </DashboardAction>
      </div>
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
        <ButtonComp @click="openModal(media.id, media.name)">Supprimer</ButtonComp>
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
    <ModalComp ref="modalRef" @close-modal="closeModal">
      <template #header>
        <div>
          <span> Confirmation </span>
        </div>
      </template>
      <template #content>
        <div>
          <span> Confirmer la suppression de {{ mediaTitle }} ? </span>
        </div>
      </template>
      <template #action>
        <ButtonComp @click="closeModal">Retour</ButtonComp>
        <ButtonComp @click="submitDeleteMedia">Confirmer</ButtonComp>
      </template>
    </ModalComp>
  </div>
</template>

<style scoped>
.dashboard-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dashboard-action {
  display: flex;
  justify-content: end;
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
