<script setup lang="ts">
import type { IMediaPresented } from '#interfaces/media_presented_interface'
import { useForm } from '@inertiajs/vue3'
import { ref, watch } from 'vue'
import ActionModal from '~/components/ActionModal.vue'
import MediaCover from '~/components/media/MediaCover.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import { ActionDialogConfig, useActionDialog } from '~/composables/useActionDialog'

const apiUrl = ref('')
const coverForm = useForm({ cover: null as File | null })
const coverPreviewUrl = ref<string | null>(null)

const coverDialogConfig: ActionDialogConfig<{ cover: File | null }, IMediaPresented> = {
  resourceApiUrl: apiUrl,
  resourceNameConfig: { singular: 'cover', indefinite: 'une', definite: 'la' },
  form: coverForm,
  customSubmitHandlers: {
    // edit: handleUpdateCover,
    delete: handleDeleteCover,
  },
}
const {
  isModalOpen,
  currentTask,
  selectedItem,
  dialogTitle,
  dialogActionText,
  openModal,
  closeModal,
  submitForm,
} = useActionDialog(coverDialogConfig)

function handleCoverSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    coverForm.cover = file
    coverPreviewUrl.value = URL.createObjectURL(file)
  } else {
    coverForm.cover = null
    coverPreviewUrl.value = null
  }
}

function handleDeleteCover() {
  coverForm.delete(apiUrl.value, {
    onSuccess: () => closeModal(),
  })
}

function open(media: IMediaPresented) {
  apiUrl.value = `/admin/media/${media.id}/cover`
  openModal('create', media)
}

watch(currentTask, (newTask) => {
  if (newTask === null && coverPreviewUrl.value) {
    URL.revokeObjectURL(coverPreviewUrl.value)
    coverPreviewUrl.value = null
  }
})

// Expose the 'open' method to the parent component
defineExpose({ open })
</script>

<template>
  <ActionModal
    v-model:show="isModalOpen"
    :title="dialogTitle"
    :action-text="dialogActionText"
    :is-action-disabled="coverForm.processing"
    @submit="submitForm"
    @close="closeModal"
  >
    <template #form-content>
      <div v-if="currentTask === 'create'">
        <h4>
          Cover pour <strong>{{ selectedItem?.name }}</strong>
        </h4>

        <ButtonComp v-if="selectedItem?.cover" @click="currentTask = 'delete'">
          Supprimer la cover
        </ButtonComp>

        <div class="cover-comparison">
          <div v-if="selectedItem" class="cover-preview-box">
            <span>Actuelle</span>
            <MediaCover
              :cover="selectedItem.cover"
              alt="cover actuelle"
              :default-cover-url="selectedItem.defaultCover"
            />
          </div>
          <div class="cover-preview-box">
            <span>Nouvelle</span>
            <img
              v-if="coverPreviewUrl"
              :src="coverPreviewUrl"
              class="img-thumbnail"
              alt="Aperçu de la nouvelle cover"
            />
            <p v-else class="img-thumbnail placeholder">En attente du fichier</p>
          </div>
        </div>
        <label for="cover-upload">Choisir un nouveau fichier :</label>
        <input
          id="cover-upload"
          type="file"
          accept="image/png, image/jpeg, image/webp"
          @input="handleCoverSelect"
        />
        <progress v-if="coverForm.progress" :value="coverForm.progress.percentage" max="100" />
        <div v-if="coverForm.errors.cover" class="form-error">{{ coverForm.errors.cover }}</div>
      </div>
      <div v-if="currentTask === 'delete'">
        <p>
          Confirmer la suppression de la cover pour <strong>{{ selectedItem?.name }}</strong> ?
        </p>
        <p>Cette action est irréversible.</p>
      </div>
    </template>
  </ActionModal>
</template>

<style scoped>
.cover-comparison {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
}

.cover-preview-box {
  flex-basis: 220px;
  flex-shrink: 0;
  text-align: center;
}

.cover-preview-box span {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #ccc;
}

/* target the child MediaCover component using :deep() */
:deep(.cover-container),
:deep(.cover-placeholder),
.img-thumbnail {
  width: 220px;
  height: 330px;
  border-radius: 8px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: #ccc;
  overflow: hidden;
}

.img-thumbnail {
  object-fit: cover;
}

.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-style: italic;
}
</style>
