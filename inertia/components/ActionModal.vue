<script setup lang="ts">
import Modal from '~/components/Modal.vue'
import ButtonComp from './ui/ButtonComp.vue'

defineProps<{
  show: boolean
  title: string
  actionText: string
  isActionDisabled?: boolean
}>()

const emit = defineEmits(['submit', 'update:show'])
</script>

<template>
  <Modal :show="show" @update:show="emit('update:show', $event)">
    <template #header>
      <h3 class="text-lg font-bold">{{ title }}</h3>
    </template>

    <template #content>
      <form @submit.prevent="emit('submit')">
        <div class="py-4">
          <slot name="form-content"></slot>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <ButtonComp type="button">Retour</ButtonComp>
          </form>

          <ButtonComp type="submit" :disabled="isActionDisabled">
            {{ actionText }}
          </ButtonComp>
        </div>
      </form>
    </template>
  </Modal>
</template>
