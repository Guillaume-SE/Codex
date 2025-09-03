<script setup lang="ts">
import { router, useForm } from '@inertiajs/vue3'
import { nextTick, ref, useTemplateRef } from 'vue'
import ActionDialogComp from '~/components/ActionDialogComp.vue'

const form = useForm({ cover: null as File | null })
const previewUrl = ref<string | null>(null)
const actionDialogRef = useTemplateRef<InstanceType<typeof ActionDialogComp>>('actionDialogRef')
const currentTask = ref<'upload' | 'delete' | null>(null)

function submitNewDefaultCover() {
  form.post('/admin/media/cover/default', {
    onSuccess: () => {},
    onFinish: () => form.reset('cover'),
  })
}

function deleteDefaultCover() {
  router.delete('/admin/media/cover/default', {
    onSuccess: () => {
      closeModal()
    },
  })
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    form.cover = file
    previewUrl.value = URL.createObjectURL(file)
  } else {
    form.cover = null
    previewUrl.value = null
  }
}

function openModal() {
  currentTask.value = 'upload'
  form.reset()
  nextTick(() => {
    actionDialogRef.value?.showModal()
  })
}
function closeModal() {
  actionDialogRef.value?.close()
  form.reset()
  form.clearErrors()
  currentTask.value = null
}

defineExpose({ open: openModal })
</script>

<template>
  <ActionDialogComp
    @submit="submitNewDefaultCover"
    @close="closeModal"
    ref="actionDialogRef"
    title="Modifier la cover par défaut"
    :form="form"
    action-text="Modifier"
  >
    <template #form-content>
      <div class="cover-comparison"></div>

      <input type="file" @input="handleFileSelect" />

      <ButtonComp @click="deleteDefaultCover"> Supprimer la cover par défaut </ButtonComp>
    </template>
  </ActionDialogComp>
</template>

<style scoped>
.cover-container {
  width: 150px;
  height: 225px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background-color: #333;
  margin: 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-comparison {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.cover-preview-box {
  flex: 1;
  text-align: center;
}
</style>
