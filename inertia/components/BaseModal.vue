<script setup lang="ts">
import { defineModel, defineProps, ref, watch, withDefaults } from 'vue'
import CloseIcon from '~/components/ui/icons/CloseIcon.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    boxClass?: string
    showCloseButton?: boolean
  }>(),
  {
    title: '',
    boxClass: 'max-w-2xl',
    showCloseButton: true,
  }
)

const isOpen = defineModel<boolean>({ default: false })

const modalRef = ref<HTMLDialogElement | null>(null)

// Sync native <dialog> state with reactive v-model state
watch(
  isOpen,
  (val) => {
    if (!modalRef.value) return
    if (val && !modalRef.value.open) {
      modalRef.value.showModal()
    } else if (!val && modalRef.value.open) {
      modalRef.value.close()
    }
  },
  { flush: 'post' } // wait for DOM element rendering before invoking native dialog methods
)

function handleNativeClose() {
  isOpen.value = false
}
</script>

<template>
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle" @close="handleNativeClose">
    <div :class="['modal-box', boxClass]">
      <!-- Cross Button -->
      <form v-if="showCloseButton" method="dialog">
        <button
          type="submit"
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          aria-label="Close"
        >
          <CloseIcon class="size-6" />
        </button>
      </form>

      <!-- Header Slot / Title Fallback -->
      <slot name="header">
        <h3 v-if="title" class="text-lg font-bold mb-4">{{ title }}</h3>
      </slot>

      <!-- Default Body Content Slot -->
      <slot />

      <!-- Action Footer Slot -->
      <slot name="action">
        <div class="modal-action">
          <form method="dialog">
            <button type="submit" class="btn">Close</button>
          </form>
        </div>
      </slot>
    </div>

    <!-- Backdrop Click Outside Target -->
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
