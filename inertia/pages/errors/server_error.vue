<script setup lang="ts">
import { Link } from '@adonisjs/inertia/vue'
import AppHead from '~/components/AppHead.vue'
</script>

<template>
  <AppHead title="Erreur serveur" />

  <section class="flex min-h-[75vh] items-center pt-12 pb-12 sm:pt-20 sm:pb-20">
    <div class="app-container">
      <div
        class="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-10 sm:flex-row sm:gap-16"
      >
        <div class="max-w-xl flex-1 text-center sm:text-left">
          <span class="text-primary mb-2 block text-xs font-bold">Erreur 500</span>

          <h1 class="mb-4 text-4xl font-black sm:text-3xl">
            Oups, erreur serveur<span class="text-primary">.</span>
          </h1>

          <p class="text-base-content/70 text-lg leading-relaxed sm:text-xl">
            Le serveur rencontre un problème technique. Nous faisons au plus vite pour le résoudre !
            Merci de réessayer d'ici quelques instants.
          </p>

          <div class="mt-8">
            <Link
              route="home"
              class="btn btn-primary btn-md sm:btn-lg shadow-md transition-transform md:hover:scale-[1.02]"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>

        <div class="w-full max-w-xs flex-1 opacity-95">
          <img
            src="/public/images/server-error.png"
            alt="Illustration erreur serveur"
            class="mx-auto h-auto w-full rounded-2xl object-contain"
          />
          <p class="text-base-content/40 mt-1 text-right text-[11px] tracking-wide italic">
            credit @comickergirl
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
