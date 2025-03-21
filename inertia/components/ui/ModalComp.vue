<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { defineEmits, defineProps, ref } from 'vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'

defineProps({
  show: Boolean,
})

const emit = defineEmits(['close-modal'])

const target = ref(null)
onClickOutside(target, () => emit('close-modal'))
</script>

<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal" ref="target">
      <ButtonComp @click.stop="emit('close-modal')" class="close-button">&times;</ButtonComp>
      <slot name="header"></slot>
      <slot name="content"></slot>
      <slot name="action"></slot>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: white;
  padding: 20px;
  border-radius: 8px;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
