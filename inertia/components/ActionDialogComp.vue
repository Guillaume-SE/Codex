<script setup lang="ts">
import { useTemplateRef } from 'vue'
import ModalComp from '~/components/ui/ModalComp.vue'
import ButtonComp from './ui/ButtonComp.vue'

defineProps<{
  title: string
  form: object
  actionText: string
  isActionDisabled?: boolean
}>()

const modalRef = useTemplateRef<InstanceType<typeof ModalComp>>('modalRef')

const emit = defineEmits(['submit', 'close'])

defineExpose({
  showModal: () => modalRef.value?.showModal(),
  close: () => modalRef.value?.close(),
})
</script>

<template>
  <ModalComp ref="modalRef" @close-modal="emit('close')">
    <template #header>
      <h3 class="modal-title">{{ title }}</h3>
    </template>
    <template #content>
      <form @submit.prevent="emit('submit')">
        <slot name="form-content"></slot>

        <div class="modal-actions">
          <ButtonComp type="button" @click="emit('close')">Retour</ButtonComp>
          <ButtonComp type="submit" :disabled="isActionDisabled">{{ actionText }}</ButtonComp>
        </div>
      </form>
    </template>
  </ModalComp>
</template>

<style scoped>
.modal-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
</style>
