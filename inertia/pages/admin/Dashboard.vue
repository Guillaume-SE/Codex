<script setup lang="ts">
import type DashboardController from '#controllers/dashboard_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link, useForm } from '@inertiajs/vue3'
import { ref, useTemplateRef } from 'vue'
import AppHead from '~/components/AppHead.vue'
import ImageNotAvailableIcon from '~/components/icons/ImageNotAvailableIcon.vue'
import RatingBox from '~/components/RatingBox.vue'
import StatusProgressBadge from '~/components/StatusProgressBadge.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import ModalComp from '~/components/ui/ModalComp.vue'
import AppLayout from '~/layouts/AppLayout.vue'

defineProps<{
  mediaList: InferPageProps<DashboardController, 'showDashboard'>['mediaList']
}>()

interface IForm {
  mediaId: number | null
}

const form = useForm<IForm>({
  mediaId: null,
})

// const showModal = ref<boolean>(false)
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

const openModal = (id: number, title: string) => {
  form.mediaId = id
  mediaTitle.value = title
  modalRef.value?.showModal()
}
const closeModal = () => {
  form.mediaId = null
  modalRef.value?.close()
}
</script>

<template>
  <AppHead title="Dashboard" />
  <AppLayout>
    <div>
      <h3>Media</h3>
      <Link href="/media/manage">Ajouter un media</Link>
    </div>

    <div class="dashboard-list">
      <div v-for="media in mediaList" class="dashboard-list-item">
        <div>
          <input type="checkbox" :value="media.id" />
        </div>
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

        <div>
          <Link :href="`/media/manage/${media.id}`">
            <p>{{ media.name }}</p>
          </Link>
        </div>
        <div>
          <Link :href="`/media/${media.id}/review`">
            <RatingBox :rating="media.review?.rating ? media.review.rating : null" />
          </Link>
        </div>
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
  </AppLayout>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
