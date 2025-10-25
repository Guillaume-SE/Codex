<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits(['update:show'])
const modalRef = ref<HTMLDialogElement | null>(null)

watch(
  () => props.show,
  (shouldShow) => {
    if (shouldShow) {
      modalRef.value?.showModal()
    } else {
      modalRef.value?.close()
    }
  }
)

function onClose() {
  emit('update:show', false)
}
</script>

<template>
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle" @close="onClose">
    <div class="modal-box">
      <!-- close with cross -->
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">✕</button>
      </form>
      <slot name="header"></slot>

      <slot name="content"></slot>

      <div>
        <slot name="action"></slot>
        <div class="modal-action">
          <form method="dialog">
            <!-- any button in this form will close the modal -->
            <button class="btn">Fermer</button>
          </form>
        </div>
      </div>
    </div>
    <!-- close when click outside, no style needed -->
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
