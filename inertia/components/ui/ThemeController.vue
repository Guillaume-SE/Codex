<script setup lang="ts">
import DarkThemeIcon from '~/components/icons/DarkThemeIcon.vue'
import LightThemeIcon from '~/components/icons/LightThemeIcon.vue'
</script>

<template>
  <label class="swap swap-rotate">
    <!-- this hidden checkbox controls the state -->
    <input type="checkbox" class="theme-controller" value="night" />

    <LightThemeIcon />

    <DarkThemeIcon />
  </label>
</template>
