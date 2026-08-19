<script setup lang="ts">
import NotificationIcon from '~/components/ui/icons/NotificationIcon.vue'
import StatusDot from '~/components/ui/StatusDot.vue'

defineProps<{
  showDot: boolean
}>()
</script>

<template>
  <button class="btn btn-circle btn-ghost" aria-label="Notifications">
    <div class="indicator">
      <NotificationIcon class="size-7" />

      <!-- position the dot securely on the top-right of the bell -->
      <StatusDot
        v-if="showDot"
        class="indicator-item indicator-top indicator-end"
        color-class="bg-error"
      />
    </div>
  </button>
</template>
