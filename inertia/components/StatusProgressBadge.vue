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
  padding: 5px 10px;
  width: 80px;
  border-radius: 10px;
}

.status-progress-text {
  /* color: #fafafa; */
  color: #0f172a;
  font-weight: 700;
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
.icon-paused {
  background-color: #f1b000;
}
.icon-dropped {
  background-color: #ff1f56;
}
.icon-planned {
  background-color: #ad47ff;
}
.icon-anticipated {
  background-color: #79716b;
}

.background-in-progress {
  background-color: #daebfe;
}
.background-completed {
  background-color: #d0fae5;
}
.background-paused {
  background-color: #fef9c1;
}
.background-dropped {
  background-color: #ffe2e1;
}
.background-planned {
  background-color: #f3e8ff;
}
.background-anticipated {
  background-color: #f5f5f4;
}
</style>
