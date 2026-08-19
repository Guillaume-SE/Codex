<script setup lang="ts">
import DarkThemeIcon from '~/components/ui/icons/DarkThemeIcon.vue'
import LightThemeIcon from '~/components/ui/icons/LightThemeIcon.vue'
</script>

<template>
  <label class="btn btn-circle btn-ghost swap swap-rotate" aria-label="Toggle Theme">
    <input type="checkbox" class="theme-controller" value="dark" />

    <LightThemeIcon class="swap-off size-7" />
    <DarkThemeIcon class="swap-on size-7" />
  </label>
</template>
