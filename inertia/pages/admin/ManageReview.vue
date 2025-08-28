<script setup lang="ts">
import type ReviewController from '#controllers/reviews_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { computed, onMounted } from 'vue'
import AppHead from '~/components/AppHead.vue'
import RatingBox from '~/components/RatingBox.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import DashboardLayout from '~/layouts/DashboardLayout.vue'

interface IForm {
  rating: string | number | null
  opinion: string | null
  isFavorite: boolean
}

const props = defineProps<{
  media: InferPageProps<ReviewController, 'showManage'>['media']
  errors?: Record<string, string[]>
}>()

defineOptions({
  layout: DashboardLayout,
})

const form = useForm<IForm>({
  rating: '',
  opinion: '',
  isFavorite: false,
})

const isUpdateMode = computed(() => (props.media?.review ? true : false))
const submitButtonText = computed(() => {
  return isUpdateMode.value ? 'Mettre à jour' : 'Ajouter'
})

function submit() {
  const url = `/admin/media/${props.media.id}/review`

  if (isUpdateMode.value) {
    form.put(url)
  } else {
    form.post(url)
  }
}

onMounted(() => {
  if (props.media?.review) {
    form.rating = props.media.review.rating
    form.opinion = props.media.review.opinion
    form.isFavorite = props.media.review.isFavorite
  }
})

const ratingValues = [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>

<template>
  <AppHead title="Gestion de review" />
  <div>
    <h3>Gestion de la review de {{ props.media.name }}</h3>
  </div>
  <div>
    <form @submit.prevent="submit">
      <!-- rating -->
      <div>
        <span>Note:</span>
        <div class="manage-review-rating-container">
          <div v-for="rating in ratingValues">
            <LabelComp textPosition="down">
              <InputComp v-model="form.rating" type="radio" :value="rating" />
              <RatingBox :rating="rating" />
            </LabelComp>
          </div>
          <FormErrorComp v-if="form.errors.rating" :message="form.errors.rating" />
        </div>
      </div>
      <!-- opinion -->
      <div>
        <div>
          <LabelComp text="Avis:" text-position="up" for="opinion">
            <textarea v-model="form.opinion" id="opinion"></textarea>
          </LabelComp>
        </div>
      </div>
      <!-- favoris -->
      <div>
        <div>
          <LabelComp text="Mettre en coup de coeur" textPosition="down">
            <InputComp v-model="form.isFavorite" type="checkbox" :true-value="1" :false-value="0" />
          </LabelComp>
        </div>
      </div>
      <ButtonComp type="submit" :disabled="form.processing">
        {{ submitButtonText }}
      </ButtonComp>
    </form>
  </div>
</template>
