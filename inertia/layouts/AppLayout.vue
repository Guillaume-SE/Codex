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
      class="fixed top-0 z-50 w-full border-b border-base-content/10 bg-base-200/95 shadow-sm md:bg-base-200/80 md:backdrop-blur-md"
    >
      <div class="mx-auto w-full max-w-340 px-2 sm:px-6 lg:px-8">
        <AppNavigation />
      </div>

      <div
        v-if="hasPendingCode"
        class="bg-warning text-warning-content p-2.5 text-center text-sm font-medium"
      >
        <span>You haven't confirmed your account recovery code yet!</span>
        <Link route="onboardings.show" class="ml-2 font-bold underline">
          Click here to view and save it
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
