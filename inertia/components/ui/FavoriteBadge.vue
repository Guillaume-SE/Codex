<script setup lang="ts">
import FavoriteIconFilled from '~/components/icons/FavoriteIconFilled.vue'
import FavoriteIconOutline from '~/components/icons/FavoriteIconOutline.vue'

withDefaults(
  defineProps<{
    variant?: 'filled' | 'outline'
  }>(),
  {
    variant: 'filled',
  }
)
</script>

<template>
  <div
    :class="{ 'sheen-effect': variant === 'filled' }"
    class="bg-neutral flex h-8 w-8 items-center justify-center rounded-full"
  >
    <FavoriteIconFilled v-if="variant === 'filled'" class="text-error h-5 w-5" />
    <FavoriteIconOutline v-if="variant === 'outline'" class="text-neutral-content h-5 w-5" />
  </div>
</template>
