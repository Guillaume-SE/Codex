<script setup lang="ts">
import { Link } from '@adonisjs/inertia/vue'
import GithubIcon from '~/components/ui/icons/GithubIcon.vue'

const GITHUB_PROFIL_LINK = 'https://github.com/Guillaume-SE'
const GITHUB_REPO_LINK = 'https://github.com/Guillaume-SE/Codex'
</script>

<template>
  <footer class="mt-auto w-full border-t border-base-content/10">
    <div
      class="mx-auto flex w-full max-w-340 flex-col items-center justify-between gap-4 px-4 py-6 text-sm sm:flex-row sm:px-6 lg:px-8"
    >
      <div class="flex flex-col items-center gap-1 sm:flex-row sm:gap-4">
        <Link
          route="home"
          class="text-base font-bold tracking-tight text-base-content transition-colors hover:text-primary"
        >
          Codex<span class="text-primary">.</span>
        </Link>

        <span class="hidden opacity-30 sm:inline">|</span>

        <p class="text-base-content/70">
          Made with <span class="animate-pulse text-error">❤️</span> by
          <a
            :href="GITHUB_PROFIL_LINK"
            target="_blank"
            rel="noopener noreferrer"
            class="link link-hover font-bold text-base-content hover:text-primary"
          >
            me
          </a>
        </p>
      </div>

      <!-- GitHub Repo Icon -->
      <a
        :href="GITHUB_REPO_LINK"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Voir le code source sur GitHub"
        class="btn btn-circle btn-ghost btn-sm text-base-content/70 hover:text-base-content"
      >
        <GithubIcon class="size-5" />
      </a>
    </div>
  </footer>
</template>
