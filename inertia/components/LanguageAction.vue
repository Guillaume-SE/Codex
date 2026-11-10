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
    <!-- Active Locale Pill Trigger -->
    <div
      tabindex="0"
      role="button"
      class="btn btn-sm btn-ghost border border-base-content/15 bg-base-200/50 hover:bg-base-200 gap-2 font-medium"
      aria-label="Changer de langue"
    >
      <img
        :src="currentLocale === LOCALES.EN ? '/images/flag-uk.svg' : '/images/flag-france.svg'"
        :alt="currentCode"
        class="size-4 object-contain shrink-0"
      />
      <span class="text-xs font-semibold">{{ currentCode }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="size-3.5 opacity-60"
      >
        <path
          fill-rule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
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
            class="flex items-center justify-between py-2 rounded-md transition-colors"
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
            <svg
              v-if="currentLocale === LOCALES.FR"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="size-4 shrink-0"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </li>
        <li>
          <button
            type="button"
            class="flex items-center justify-between py-2 rounded-md transition-colors"
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
            <svg
              v-if="currentLocale === LOCALES.EN"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="size-4 shrink-0"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
              />
            </svg>
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
