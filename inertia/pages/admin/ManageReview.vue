<script setup lang="ts">
import type ReviewController from '#controllers/reviews_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { onMounted } from 'vue'
import AppHead from '~/components/AppHead.vue'
import RatingBox from '~/components/RatingBox.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import AppLayout from '~/layouts/AppLayout.vue'

const props = defineProps<{
  media: InferPageProps<ReviewController, 'showManage'>['media']
}>()

interface IForm {
  rating: string | number | null
  opinion: string | null
  isFavorite: boolean
}

const newForm = useForm<IForm>({
  rating: '',
  opinion: '',
  isFavorite: false,
})

function submit() {
  newForm.post(`/media/${props.media.id}/review`)
}

onMounted(() => {
  if (props.media?.review) {
    newForm.rating = props.media.review.rating
    newForm.opinion = props.media.review.opinion
    newForm.isFavorite = props.media.review.isFavorite
  }
})

const ratingValues = [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>

<template>
  <AppHead title="Gestion de review" />
  <AppLayout>
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
                <InputComp v-model="newForm.rating" type="radio" :value="rating" />
                <RatingBox :rating="rating" />
              </LabelComp>
            </div>
          </div>
        </div>
        <!-- opinion -->
        <div>
          <div>
            <LabelComp text="Avis:" text-position="up" for="opinion">
              <textarea
                v-model="newForm.opinion"
                placeholder="Très bon film, bande son incroyable..."
                id="opinion"
              ></textarea>
            </LabelComp>
          </div>
        </div>
        <!-- favoris -->
        <div>
          <div>
            <LabelComp text="Mettre en coup de coeur" textPosition="down">
              <InputComp
                v-model="newForm.isFavorite"
                type="checkbox"
                :true-value="1"
                :false-value="0"
              />
            </LabelComp>
          </div>
        </div>
        <ButtonComp type="submit" :disabled="newForm.processing"></ButtonComp>
      </form>
    </div>
  </AppLayout>
</template>
