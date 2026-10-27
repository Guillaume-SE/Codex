<script setup lang="ts">
import { LOCALES } from '#constants/locales'
import type { Data } from '@generated/data'
import { router, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import { urlFor } from '~/client'

const page = usePage<Data.SharedProps & { currentLocale?: string }>()

const currentLocale = computed(() => page.props.currentLocale || LOCALES.FR)
const currentCode = computed(() => (currentLocale.value === LOCALES.EN ? 'EN' : 'FR'))

function switchLanguage(locale: string) {
  if (locale === currentLocale.value) return

  router.post(
    urlFor('languages.update'),
    { locale },
    {
      preserveScroll: true,
      onSuccess: () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      },
    }
  )
}
</script>

<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle" aria-label="Changer de langue">
      <!-- {{ currentCode }} -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    </div>

    <!-- Dropdown Content Container -->
    <div
      tabindex="0"
      class="dropdown-content border-base-content/10 bg-base-100 border rounded-box z-50 mt-2 w-64 p-3 shadow-xl space-y-3"
    >
      <div class="px-1">
        <h3 class="text-xs font-bold text-base-content/80">Préférences de langue</h3>
      </div>

      <!-- Language Selectors -->
      <ul class="menu menu-sm p-0 gap-1">
        <li>
          <button
            type="button"
            class="flex items-center justify-between py-2 rounded-md"
            :class="
              currentLocale === LOCALES.FR
                ? 'bg-primary/10 text-primary font-semibold'
                : 'hover:bg-base-200'
            "
            @click="switchLanguage(LOCALES.FR)"
          >
            <span class="flex items-center gap-2">
              <img
                src="/public/images/flag-france.svg"
                alt="Drapeau France"
                class="size-4 object-contain shrink-0"
              />
              Français (fr-FR)
            </span>
          </button>
        </li>
        <li>
          <button
            type="button"
            class="flex items-center justify-between py-2 rounded-md"
            :class="
              currentLocale === LOCALES.EN
                ? 'bg-primary/10 text-primary font-semibold'
                : 'hover:bg-base-200'
            "
            @click="switchLanguage(LOCALES.EN)"
          >
            <span class="flex items-center gap-2">
              <img
                src="/public/images/flag-uk.svg"
                alt="Drapeau Royaume-Uni"
                class="size-4 object-contain shrink-0"
              />
              Anglais (en-US)
            </span>
          </button>
        </li>
      </ul>

      <div class="p-2 space-y-2 text-[11px] text-base-content/70">
        <p>
          Prise en compte sur certaines catégories uniquement. S'applique aux titres, affiches et
          résumés des fiches détaillées.
        </p>

        <div
          class="border-t border-base-content/10 pt-2 flex items-center justify-between font-medium text-base-content/80"
        >
          <span>Langue par défaut (secours)</span>
          <span class="badge badge-xs badge-ghost">en-US</span>
        </div>
      </div>
    </div>
  </div>
</template>
