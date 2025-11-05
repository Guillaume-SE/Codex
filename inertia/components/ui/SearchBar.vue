<script setup lang="ts">
import { onMounted, ref } from 'vue'

const model = defineModel<string>()
const emit = defineEmits(['submit'])

defineProps<{
  placeholder?: string
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

function clearInput() {
  model.value = ''
  // After clearing, immediately focus the input again
  inputRef.value?.focus()
}
</script>

<template>
  <label class="input flex items-center gap-2">
    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="2.5"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </g>
    </svg>
    <input
      ref="inputRef"
      v-model="model"
      type="search"
      class="search-input grow"
      :placeholder="placeholder"
      @keydown.enter.prevent="emit('submit')"
    />

    <button
      type="button"
      class="btn btn-ghost btn-circle btn-xs"
      @click="clearInput"
      :class="{ invisible: !model && isMounted }"
      aria-label="Effacer la recherche"
    >
      ✕
    </button>
  </label>
</template>
