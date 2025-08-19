<script setup lang="ts">
import { computed } from 'vue'
import { useStatusBackgroundColor } from '~/composables/useStatusBackgroundColor'
import { useStatusIconColor } from '~/composables/useStatusIconColor'

const props = defineProps<{
  status: string
}>()

const ratingColor = computed(() => useStatusIconColor(props.status))
const ratingBackground = computed(() => useStatusBackgroundColor(props.status))
</script>

<template>
  <div :class="[ratingBackground, 'status-progress-container']">
    <div :class="[ratingColor, 'status-progress-icon']"></div>
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
  width: 75px;
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
  background-color: #79716b;
}
.icon-anticipated {
  background-color: #ad47ff;
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
  background-color: #f5f5f4;
}
.background-anticipated {
  background-color: #f3e8ff;
}
</style>
