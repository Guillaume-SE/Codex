<script setup>
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
</script>

<template>
  <AppHead title="Accueil" />
  <div
    class="hero min-h-[calc(100vh_-_theme(spacing.16))]"
    style="
      background-image: url(https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ);
    "
  >
    <div class="hero-overlay"></div>
    <div class="hero-content text-neutral-content text-center">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
        <p class="mb-5">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
          exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <ButtonComp href="/categories" variant="primary">Voir les catégories</ButtonComp>
      </div>
    </div>
  </div>
</template>
