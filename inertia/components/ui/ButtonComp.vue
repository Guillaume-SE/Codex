<script setup lang="ts">
interface IButtonProps {
  type?: 'button' | 'submit'
  disabled?: boolean
}

withDefaults(defineProps<IButtonProps>(), {
  type: 'button',
  disabled: false,
})
</script>

<template>
  <button :type="type" :disabled="disabled">
    <slot>Valider</slot>
  </button>
</template>
