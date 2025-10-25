<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { ref, watch } from 'vue'
import ActionModal from '~/components/ActionModal.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'

const props = defineProps<{
  defaultCoverUrl: string
}>()

const form = useForm({ cover: null as File | null })
const previewUrl = ref<string | null>(null)
const isOverlayVisible = ref(false)
const isModalOpen = ref(false)

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    form.cover = file
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
    }
    previewUrl.value = URL.createObjectURL(file)
  } else {
    form.cover = null
    previewUrl.value = null
  }
}

function submitNewDefaultCover() {
  form.post('/admin/media/cover/default', {
    onSuccess: () => closeModal(),
    onFinish: () => form.reset('cover'),
  })
}

function openModal() {
  form.reset()
  previewUrl.value = null
  isOverlayVisible.value = false
  isModalOpen.value = true
}
function closeModal() {
  isModalOpen.value = false
  isOverlayVisible.value = false
}

function toggleOverlay() {
  isOverlayVisible.value = !isOverlayVisible.value
}

watch(isModalOpen, (isOpen) => {
  if (!isOpen) {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
    }
    previewUrl.value = null
    form.reset()
    form.clearErrors()
    isOverlayVisible.value = false
  }
})

defineExpose({ open: openModal })
</script>

<template>
  <ActionModal
    v-model:show="isModalOpen"
    title="Modifier la cover par défaut"
    action-text="Modifier"
    :is-action-disabled="form.processing || !previewUrl"
    @submit="submitNewDefaultCover"
  >
    <template #form-content>
      <div class="cover-comparison">
        <div class="cover-preview-box">
          <span>Actuelle</span>
          <div class="cover-container size-small new-preview-container">
            <img class="cover-image" :src="props.defaultCoverUrl" alt="Cover par défaut actuelle" />
            <div v-if="isOverlayVisible" class="preview-overlay">
              <span>Aucune cover</span>
            </div>
          </div>
        </div>

        <div class="cover-preview-box">
          <span>Nouvelle</span>
          <div class="cover-container size-small new-preview-container">
            <img
              v-if="previewUrl"
              class="cover-image"
              :src="previewUrl"
              alt="Aperçu de la nouvelle cover"
            />
            <span v-else>En attente du fichier</span>

            <div v-if="previewUrl && isOverlayVisible" class="preview-overlay">
              <span>Aucune cover</span>
            </div>
          </div>
        </div>
      </div>

      <div class="toggle-container">
        <ButtonComp @click="toggleOverlay" class="toggle-button">
          {{ isOverlayVisible ? 'Masquer' : 'Afficher' }} l'overlay
        </ButtonComp>
      </div>

      <div>
        <label for="cover-upload">Choisir un nouveau fichier :</label>
        <input
          id="cover-upload"
          type="file"
          accept="image/png, image/jpeg, image/webp"
          @input="handleFileSelect"
        />
        <progress v-if="form.progress" :value="form.progress.percentage" max="100" />
        <div v-if="form.errors.cover" class="form-error">{{ form.errors.cover }}</div>
      </div>
    </template>
  </ActionModal>
</template>

<style scoped>
.cover-container {
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  margin: 5px auto;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.size-small {
  width: 150px;
  height: 225px;
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

.new-preview-container {
  position: relative;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
}
.toggle-container {
  text-align: center;
  margin-bottom: 20px;
}

.toggle-button {
  margin-top: 10px;
}
</style>
