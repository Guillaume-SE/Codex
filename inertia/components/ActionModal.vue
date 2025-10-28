<script setup lang="ts">
import Modal from '~/components/Modal.vue'
import ButtonComp, { type ButtonVariant } from '~/components/ui/ButtonComp.vue'

withDefaults(
  defineProps<{
    show: boolean
    title: string
    actionText: string
    isActionDisabled?: boolean
    isLoading?: boolean
    variant?: ButtonVariant
  }>(),
  {
    variant: 'primary',
  }
)

const emit = defineEmits(['submit', 'update:show'])
</script>

<template>
  <Modal :show="show" @update:show="emit('update:show', $event)">
    <template #header>
      <h3 class="text-lg font-bold">{{ title }}</h3>
    </template>

    <template #content>
      <form :id="`${title}-form`" @submit.prevent="emit('submit')">
        <div class="py-4">
          <slot name="form-content"></slot>
        </div>
      </form>
    </template>

    <template #action>
      <div class="modal-action">
        <ButtonComp @click="emit('update:show', false)">Retour</ButtonComp>

        <!-- :form binding since the button is outside of the form -->
        <ButtonComp
          type="submit"
          :form="`${title}-form`"
          :disabled="isActionDisabled"
          :loading="isLoading"
          :variant="variant"
        >
          <span>{{ actionText }}</span>
        </ButtonComp>
      </div>
    </template>
  </Modal>
</template>
