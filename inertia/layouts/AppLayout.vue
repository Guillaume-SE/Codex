<script setup lang="ts">
import { Form, Link } from '@adonisjs/inertia/vue'
import type { Data } from '@generated/data'
import { usePage } from '@inertiajs/vue3'
import { computed, watch } from 'vue'
import { toast, Toaster } from 'vue-sonner'

const EXCLUDED_PATHS = ['/login', '/register']
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
  return page.props.hasPendingRecoveryCode && !isOnOnboardingPage
})
</script>

<template>
  <header>
    <div>
      <div>
        <Link route="home">
          <svg
            width="66"
            height="24"
            viewBox="0 0 105 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0h7.5v15H0ZM7.5 15h7.5v15H7.5ZM15 30h7.5v7.5H15ZM22.5 15h7.5v15H22.5ZM30 0h7.5v15H30ZM45 0h7.5v30h15v-30h7.5v37.5h-30v-37.5ZM82.5 37.5V0H105v7.5H90V15h15v7.5H90V30h15v7.5H82.5Z"
              fill="currentColor"
            />
          </svg>
        </Link>
      </div>
      <div>
        <nav>
          <template v-if="page.props.user">
            <span>{{ page.props.user.username }}</span>
            <Form route="session.destroy">
              <button type="submit">Logout</button>
            </Form>
          </template>
          <template v-else>
            <Link route="register.create">Register</Link>
            <Link route="session.create">Login</Link>
          </template>
        </nav>
      </div>
    </div>
  </header>

  <div v-if="hasPendingCode" class="bg-amber-500 text-black p-3 text-center">
    <span>⚠️ You haven't confirmed your account recovery code yet!</span>
    <Link route="onboardings.show" class="underline font-bold ml-2">
      Click here to view and save it
    </Link>
  </div>

  <main>
    <slot />
  </main>

  <Toaster rich-colors position="bottom-right" closeButton />
</template>
