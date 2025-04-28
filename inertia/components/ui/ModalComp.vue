<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import { useClickOutsideDialog } from '~/composables/useClickOutsideDialog'

defineProps({
  show: Boolean,
})

const emit = defineEmits(['close-modal'])
const modalRef = useTemplateRef<HTMLDialogElement>('modalRef')
const target = useTemplateRef<HTMLDialogElement>('target')

// Expose the modalRef (the native <dialog> element) to the parent
defineExpose({
  showModal: () => modalRef.value?.showModal(),
  close: () => modalRef.value?.close(),
})

useClickOutsideDialog(modalRef, () => {
  emit('close-modal')
})

// onClickOutside(target, () => emit('close-modal'))
</script>

<template>
  <dialog ref="modalRef" class="modal">
    <div ref="target">
      <ButtonComp @click.stop="emit('close-modal')" class="close-button">&times;</ButtonComp>
      <slot name="header"></slot>
      <slot name="content"></slot>
      <slot name="action"></slot>
    </div>
  </dialog>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
.close-button {
  position: absolute;
  top: 0px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
}
.close-button:hover {
  color: red;
}
dialog::backdrop {
  background-color: hsl(250, 100%, 50%, 0.25);
}
</style>
