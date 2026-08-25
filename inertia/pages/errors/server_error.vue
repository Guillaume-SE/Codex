<script setup lang="ts">
import AppHead from '~/components/AppHead.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
</script>

<template>
  <AppHead title="Erreur serveur" />

  <section class="flex min-h-[75vh] items-center py-12 sm:py-20">
    <div class="app-container">
      <div
        class="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-10 sm:flex-row sm:gap-16"
      >
        <div class="max-w-xl flex-1 text-center sm:text-left">
          <h1 class="font-heading mb-4 text-3xl font-black sm:text-4xl">
            Oups, erreur serveur<span class="text-primary">.</span>
          </h1>

          <p class="text-base-content/70 text-lg sm:text-xl">
            Le serveur rencontre un problème technique. Nous faisons au plus vite pour le résoudre !
            Merci de réessayer d'ici quelques instants.
          </p>

          <div class="mt-8">
            <BaseButton route="home" color="primary" class="sm:btn-lg">
              Retour à l'accueil
            </BaseButton>
          </div>
        </div>

        <div class="w-full max-w-xs flex-1 opacity-95">
          <img
            src="/public/images/server-error.png"
            alt="Illustration erreur serveur"
            class="mx-auto h-auto w-full rounded-2xl object-contain"
          />
          <p class="text-base-content/40 mt-1 text-right text-xs tracking-wide italic">
            credit @comickergirl
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
