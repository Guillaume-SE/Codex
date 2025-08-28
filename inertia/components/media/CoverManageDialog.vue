<script setup lang="ts">
import type { IMediaPresented } from '#interfaces/media_presented_interface'
import { useForm } from '@inertiajs/vue3'
import { ref, watch } from 'vue'
import ActionDialogComp from '~/components/ActionDialogComp.vue'
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
    delete: handleDeleteCover,
  },
}
const {
  actionDialogRef,
  currentTask,
  selectedItem,
  dialogTitle,
  dialogActionText,
  openModal,
  closeModal,
  submitForm,
} = useActionDialog(coverDialogConfig, 'coverDialogRef')

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
  const task = media.cover ? 'edit' : 'create'
  openModal(task, media)
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
  <ActionDialogComp
    ref="coverDialogRef"
    :title="dialogTitle"
    :form="coverForm"
    :action-text="dialogActionText"
    @submit="submitForm"
    @close="closeModal"
  >
    <template #form-content>
      <div v-if="currentTask === 'create' || currentTask === 'edit'">
        <h4>
          Cover pour <strong>{{ selectedItem?.name }}</strong>
        </h4>

        <ButtonComp v-if="selectedItem?.cover" @click="currentTask = 'delete'">
          Supprimer la cover
        </ButtonComp>

        <div class="cover-comparison">
          <div class="cover-preview-box">
            <span>Actuelle</span>
            <img
              v-if="selectedItem?.cover"
              :src="`/storage/${selectedItem.cover.smallUrl}`"
              class="img-thumbnail"
              alt="Cover actuelle"
            />
            <p v-else>Aucune</p>
          </div>
          <div class="cover-preview-box">
            <span>Nouvelle</span>
            <img
              v-if="coverPreviewUrl"
              :src="coverPreviewUrl"
              class="img-thumbnail"
              alt="Aperçu de la nouvelle cover"
            />
            <p v-else>Aucune</p>
          </div>
        </div>
        <label for="cover-upload">Choisir un nouveau fichier :</label>
        <input
          id="cover-upload"
          type="file"
          accept="image/png, image/jpeg, image/webp"
          @input="handleCoverSelect"
          class="file-input"
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
  </ActionDialogComp>
</template>

<style scoped>
.cover-comparison {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.cover-preview-box {
  flex: 1;
  text-align: center;
}
.img-thumbnail {
  max-width: 100px;
  height: auto;
  border-radius: 4px;
  display: block;
  margin: 5px auto;
}
.file-input {
  margin-top: 10px;
}
</style>
