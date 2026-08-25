<script setup lang="ts">
import { Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { usePage } from '@inertiajs/vue3'
import { computed, watch } from 'vue'
import { toast, Toaster } from 'vue-sonner'
import AppDrawer from '~/components/AppDrawer.vue'
import AppFooter from '~/components/AppFooter.vue'
import AppNavigation from '~/components/AppNavigation.vue'

const EXCLUDED_PATHS = ['/login', '/register', '/recover-account']
const page = usePage<Data.SharedProps>()

watch(
  () => page.url,
  () => toast.dismiss()
)

watch(
  () => page.props.flash,
  (flashMessages) => {
    const isExcludedFromErrorToast = EXCLUDED_PATHS.some((path) => page.url.startsWith(path))

    if (flashMessages.error && !isExcludedFromErrorToast) {
      toast.error(flashMessages.error)
    }
    if (flashMessages.success) {
      toast.success(flashMessages.success)
    }
  },
  { immediate: true }
)

const hasPendingCode = computed(() => {
  const isOnOnboardingPage = page.url.startsWith('/onboarding')
  // return page.props.hasPendingRecoveryCode && !isOnOnboardingPage
  return Boolean(page.props.user && page.props.hasPendingRecoveryCode && !isOnOnboardingPage)
})
</script>

<template>
  <AppDrawer>
    <header
      class="fixed top-0 z-50 w-full border-b border-base-content/10 bg-base-200/80 backdrop-blur-md"
    >
      <div class="app-container">
        <AppNavigation />
      </div>

      <div
        v-if="hasPendingCode"
        class="border-t border-warning/20 bg-warning/30 px-4 py-2 text-center text-xs font-medium sm:text-sm"
      >
        <span>Vous n'avez pas encore confirmé votre code de récupération !</span>
        <Link route="onboardings.show" class="ml-1.5 font-bold underline hover:opacity-80">
          Cliquez ici pour le consulter
        </Link>
      </div>
    </header>

    <main class="relative flex w-full flex-1 flex-col pt-16">
      <slot />
    </main>

    <AppFooter />

    <Toaster rich-colors position="bottom-right" closeButton />
  </AppDrawer>
</template>
