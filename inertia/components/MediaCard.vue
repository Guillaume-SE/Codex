<script setup>
media: Object
mediaType: string
mediaInfos: Object
</script>

<template>
  <div class="card">
    <div v-if="media.cover">
      <img
        loading="lazy"
        :src="`storage/${media.cover.smallUrl}`"
        :srcset="`storage/${media.cover.smallUrl}, storage/${media.cover.mediumUrl} 2x`"
        :alt="`jaquette du ${mediaType} ${media.name}`"
      />
    </div>
    <div v-else>
      <img :src="'public/images/default-cover.jpg'" alt="Image indisponible" />
    </div>
    <h4>
      {{ media.name }}
    </h4>
    <div v-if="media.mediaInfos && media.mediaInfos.platform">
      {{ media.mediaInfos.platform }}
    </div>
    <div v-if="media.review && media.review.rating">
      {{ media.review.rating }}
    </div>
    <img
      v-if="media.review?.isFavorite"
      class="icon-favorite"
      :src="'public/images/icons/favorite-icon-relief.svg'"
      alt="coup de cœur"
      title="Coup de cœur"
    />
  </div>
</template>
