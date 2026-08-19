<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    colorClass?: string
    animation?: 'bounce' | 'ping' | 'pulse'
  }>(),
  {
    colorClass: 'bg-primary',
  }
)
</script>

<template>
  <!-- fallthrough classes (like indicator-item) will automatically apply to these root nodes -->
  <div v-if="animation === 'ping'" class="inline-grid place-items-center *:[grid-area:1/1]">
    <div class="status animate-ping opacity-75" :class="colorClass"></div>
    <div class="status" :class="colorClass"></div>
  </div>

  <div v-else class="status" :class="[colorClass, animation && `animate-${animation}`]"></div>
</template>
