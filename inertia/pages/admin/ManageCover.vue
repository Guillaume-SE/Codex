<script setup lang="ts">
import type CoverController from '#controllers/covers_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { ref, useTemplateRef } from 'vue'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import ModalComp from '~/components/ui/ModalComp.vue'

const props = defineProps<{
  media: InferPageProps<CoverController, 'showManage'>['media']
}>()

const showDeleteCover = ref<boolean>(false)
const uploadInput = ref<HTMLInputElement>()
const modalRef = useTemplateRef<HTMLDialogElement>('modalRef')

const form = useForm({
  cover: null as File | null | undefined,
})

// function onUpload() {
//   form.cover = uploadInput.value?.files?.[0] ?? null
// }

function submitDeleteCover() {
  form.delete(`/admin/media/${props.media.id}/cover`)
}

const openModal = () => {
  modalRef.value?.showModal()
}
const closeModal = () => {
  modalRef.value?.close()
}

const uploadDialog = ref(false)
// const uploadForm = useForm({ image: null as File | null | undefined })
const uploadedImage = ref<File | null>(null)
const croppedImage = ref('')

function onUpload() {
  uploadedImage.value = uploadInput.value?.files?.[0] ?? null
  if (uploadedImage.value !== null) {
    const reader = new FileReader()
    reader.readAsDataURL(uploadedImage.value)
    reader.onload = () => {
      // Update the picture source of the `img` prop
      croppedImage.value = String(reader.result)
      // Show the modal
      openModal()
      // Clear selected files of input element
      if (uploadInput.value) {
        uploadInput.value.value = ''
      }
    }
  }
}
async function submitPostCover() {
  form.cover = await cropper?.getFile()
  ;(form.post(`/admin/media/${props.media.id}/cover`),
    {
      onSuccess: () => {
        uploadDialog.value = false
        form.reset()
      },
    })
}
// Reset the default cropping area
function resetCrop() {
  if (!cropper) return
  cropper.reset()
}
// Clear the entire crop box
// function clear() {
//   if (!cropper) return
//   cropper.clear()
// }
</script>

<template>
  <AppHead title="Gestion de cover" />
  <div>
    <h3>Gestion de cover</h3>
    <div v-if="media.cover">
      <div>
        <p>Modifier la cover pour {{ media.name }}</p>
      </div>
      <div>
        <img
          class="img-medium"
          loading="lazy"
          :src="`/storage/${media.cover.smallUrl}`"
          :srcset="`/storage/${media.cover.smallUrl}, /storage/${media.cover.mediumUrl} 2x`"
          :alt="`cover de ${media.name}`"
        />
      </div>
      <!-- delete cover form -->
      <form @submit.prevent="submitDeleteCover">
        <div>
          <div v-if="!showDeleteCover">
            <ButtonComp @click="showDeleteCover = true">Supprimer</ButtonComp>
          </div>
          <div v-else>
            <p>Supprimer cette cover ?</p>
            <ButtonComp @click="showDeleteCover = false">Annuler</ButtonComp>
            <ButtonComp type="submit">Confirmer</ButtonComp>
          </div>
        </div>
      </form>
    </div>
    <div v-else>
      <p>Ajouter une cover pour {{ media.name }}</p>
    </div>

    <div>
      <p>Dimensions minimales: 300x450</p>
      <p>Poids max: 2mb</p>

      <form @submit.prevent="submitPostCover">
        <input type="file" accept=".png, .jpg, .jpeg, .webp" ref="uploadInput" @change="onUpload" />
        <progress v-if="form.progress" :value="form.progress.percentage" max="100">
          {{ form.progress.percentage }}%
        </progress>
      </form>
      <ModalComp ref="modalRef" @close-modal="closeModal">
        <template #header>
          <div>
            <span> Modal de crop </span>
          </div>
          <div>
            <ButtonComp @click="resetCrop">Reset</ButtonComp>
          </div>
        </template>
        <template #content>
          <VuePictureCropper
            :box-style="{ width: '100%', height: '100%' }"
            :img="croppedImage"
            :options="{
              aspectRatio: 2 / 3,
              dragMode: 'none',
              viewMode: 1,
              autoCropArea: 1,
            }"
          />
        </template>
        <template #action>
          <ButtonComp @click="closeModal">Retour</ButtonComp>
          <ButtonComp :pending="form.processing" @click="submitPostCover">Upload</ButtonComp>
        </template>
      </ModalComp>
    </div>
  </div>
</template>
