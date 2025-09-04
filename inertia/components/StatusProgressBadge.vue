<script setup lang="ts">
import type { MediaStatuses } from '#types/MediaStatuses'
import { type PropType, toRef } from 'vue'
import { useStatusStyles } from '~/composables/useStatusStyle'

const props = defineProps({
  status: {
    type: String as PropType<MediaStatuses>,
    required: true,
  },
})

const { backgroundColor, iconColor } = useStatusStyles(toRef(props, 'status'))
</script>

<template>
  <div :class="[backgroundColor, 'status-progress-container']">
    <div :class="[iconColor, 'status-progress-icon']"></div>
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

.status-progress-icon {
  width: 12px;
  height: 12px;
  margin-right: 5px;
  border-radius: 50%;
}

.icon-in-progress {
  background-color: #2c7fff;
}
.icon-completed {
  background-color: #00bd7c;
}
.icon-on-hold {
  background-color: #f1b000;
}
.icon-dropped {
  background-color: #ff1f56;
}
.icon-planned {
  background-color: #ad47ff;
}

.background-in-progress {
  background-color: #daebfe;
  /* background-color: #0f172a; */
}
.background-completed {
  background-color: #d0fae5;
  /* background-color: #0f172a; */
}
.background-on-hold {
  background-color: #fef9c1;
  /* background-color: #0f172a; */
}
.background-dropped {
  background-color: #ffe2e1;
  /* background-color: #0f172a; */
}
.background-planned {
  background-color: #f3e8ff;
  /* background-color: #0f172a; */
}
</style>
