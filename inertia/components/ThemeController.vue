<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import DarkThemeIcon from '~/components/ui/icons/DarkThemeIcon.vue'
import LightThemeIcon from '~/components/ui/icons/LightThemeIcon.vue'

const isDark = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme(isDark.value)
})

function applyTheme(dark: boolean) {
  const theme = dark ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

watch(isDark, (val) => applyTheme(val))
</script>

<template>
  <label class="btn btn-circle btn-ghost swap swap-rotate" aria-label="Toggle Theme">
    <input type="checkbox" class="theme-controller" v-model="isDark" />

    <LightThemeIcon class="swap-off size-7" />
    <DarkThemeIcon class="swap-on size-7" />
  </label>
</template>
