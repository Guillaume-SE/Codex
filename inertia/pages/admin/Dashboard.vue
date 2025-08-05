<script setup lang="ts">
import type DashboardController from '#controllers/dashboard_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link, useForm } from '@inertiajs/vue3'
import { ref, useTemplateRef } from 'vue'
import AppHead from '~/components/AppHead.vue'
import ImageNotAvailableIcon from '~/components/icons/ImageNotAvailableIcon.vue'
import Pagination from '~/components/Pagination.vue'
import RatingBox from '~/components/RatingBox.vue'
import SearchBar from '~/components/SearchBar.vue'
import StatusProgressBadge from '~/components/StatusProgressBadge.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import ModalComp from '~/components/ui/ModalComp.vue'
import AppLayout from '~/layouts/AppLayout.vue'
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
  <AppLayout>
    <div>
      <Link href="/media/manage">Ajouter un media</Link>
    </div>

    <DashboardLayout>
      <div class="dashboard-list">
        <form action="GET" @submit.prevent="submitFilters">
          <div>
            <!-- search -->
            <SearchBar v-model="filters.search" />
          </div>
        </form>
        <div v-for="media in mediaList.data" class="dashboard-list-item">
          <div>
            <input type="checkbox" :value="media.id" />
          </div>
          <!-- cover -->
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
          <div>
            <Link :href="`/media/manage/${media.id}`">
              <p>{{ media.name }}</p>
            </Link>
          </div>
          <!-- review rating -->
          <div>
            <Link :href="`/media/${media.id}/review`">
              <RatingBox :rating="media.review?.rating ? media.review.rating : null" />
            </Link>
          </div>
          <!-- status progress -->
          <div>
            <StatusProgressBadge
              :status="media.status"
              :class="'status-progress-text-small status-progress-container-small'"
            />
          </div>
          <div>
            <div>
              <ButtonComp @click="openModal(media.id, media.name)">Supprimer</ButtonComp>
            </div>
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
    </DashboardLayout>
  </AppLayout>
</template>
