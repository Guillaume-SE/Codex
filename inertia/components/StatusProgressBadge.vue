<script setup lang="ts">
import { computed } from 'vue'
import StatusProgressIcon from '~/components/icons/StatusProgressIcon.vue'
import { useStatusIconColorClass } from '~/composables/useStatusIconColorClass'

const props = defineProps<{
  status: string
}>()

const ratingColor = computed(() => useStatusIconColorClass(props.status))
</script>

<template>
  <div class="status-progress-container">
    <StatusProgressIcon :class="ratingColor" />
    <span class="status-progress-text">
      {{ status }}
    </span>
  </div>
</template>
