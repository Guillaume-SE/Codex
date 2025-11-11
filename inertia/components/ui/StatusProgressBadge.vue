<script setup lang="ts">
import type { MediaStatuses } from '#types/MediaStatuses'
import { type PropType, toRef } from 'vue'
import StatusDotComp from '~/components/ui/StatusDotComp.vue'
import { useStatusStyles } from '~/composables/useStatusStyle'

const props = defineProps({
  status: {
    type: String as PropType<MediaStatuses>,
    required: true,
  },
})

const { backgroundHex, iconHex } = useStatusStyles(toRef(props, 'status'))
</script>

<template>
  <div class="status-progress-container">
    <StatusDotComp class="status-icon" size="12" :color="iconHex" />
    <span class="status-progress-text">
      {{ status }}
    </span>
  </div>
</template>

<style scoped>
.status-progress-container {
  display: flex;
  align-items: center;
  padding: 5px;
  width: 90px;
  border-radius: 5px;
  background-color: v-bind(backgroundHex);
}

/* .status-progress-container-rounded {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 10px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
} */

.status-progress-text {
  /* color: #fafafa; */
  color: #0f172a;
  font-weight: 600;
  font-size: 0.8rem;
}

.status-icon {
  margin-right: 5px;
}
</style>
