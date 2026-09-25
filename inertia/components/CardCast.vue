<script setup lang="ts">
interface Props {
  name: string
  character?: string | null
  image?: string | null
}

const { name, character, image } = defineProps<Props>()
</script>

<template>
  <div
    class="flex w-32 flex-col items-center rounded-2xl border border-base-300/60 bg-base-200/40 p-3 text-center"
  >
    <div
      class="mb-2.5 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-base-300 text-xs font-semibold text-base-content/40"
    >
      <img
        v-if="image"
        :src="image"
        :alt="name"
        loading="lazy"
        class="h-full w-full object-cover"
      />
      <span v-else>N/A</span>
    </div>

    <!-- Text Container -->
    <div class="flex w-full flex-col items-center justify-start">
      <p class="line-clamp-2 text-xs font-bold leading-tight text-base-content" :title="name">
        {{ name }}
      </p>
      <p
        v-if="character"
        class="mt-1 line-clamp-2 text-[11px] leading-tight text-base-content/60"
        :title="character"
      >
        {{ character }}
      </p>
    </div>
  </div>
</template>
