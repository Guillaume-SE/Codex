<script setup lang="ts">
import type CoverController from '#controllers/covers_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import AppLayout from '~/layouts/AppLayout.vue'

const props = defineProps<{
  media: InferPageProps<CoverController, 'showManage'>['media']
}>()

const showDeleteCover = ref(false)
const uploadInput = ref<HTMLInputElement>()
const form = useForm({
  cover: null as File | null,
})

function onUpload() {
  form.cover = uploadInput.value?.files?.[0] ?? null
}

function submitPostCover() {
  form.post(`/media/${props.media.id}/cover`)
}
function submitDeleteCover() {
  form.delete(`/media/${props.media.id}/cover`)
}
</script>

<template>
  <AppHead title="Gestion de cover" />
  <AppLayout>
    <div>
      <h3>Gestion de cover</h3>
      <div v-if="media.cover">
        <div>
          <p>Cover actuelle pour {{ media.name }}</p>
        </div>
        <div>
          <img
            class="img-medium"
            loading="lazy"
            :src="`/storage/${media.cover.smallUrl}`"
            :srcset="`/storage/${media.cover.smallUrl}, /storage/${media.cover.mediumUrl} 2x`"
            :alt="`cover de ${media.name}`"
          />
        </div>
        <!-- delete cover form -->
        <form @submit.prevent="submitDeleteCover">
          <div>
            <div v-if="!showDeleteCover">
              <ButtonComp @click="showDeleteCover = true">Supprimer</ButtonComp>
            </div>
            <div v-else>
              <p>Supprimer cette cover ?</p>
              <ButtonComp @click="showDeleteCover = false">Annuler</ButtonComp>
              <ButtonComp type="submit">Confirmer</ButtonComp>
            </div>
          </div>
        </form>
      </div>
      <div v-else>
        <p>Ajouter une cover pour {{ media.name }}</p>
      </div>

      <div>
        <p>Dimensions minimales: 300x450</p>
        <p>Poids max: 2mb</p>
        <form @submit.prevent="submitPostCover">
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .webp"
            ref="uploadInput"
            @change="onUpload"
          />
          <progress v-if="form.progress" :value="form.progress.percentage" max="100">
            {{ form.progress.percentage }}%
          </progress>
          <div>
            <ButtonComp type="submit" :disabled="form.processing"></ButtonComp>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>
