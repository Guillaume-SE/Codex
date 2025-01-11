<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import AppHead from '~/components/AppHead.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import SelectComp from '~/components/ui/SelectComp.vue'
import AppLayout from '~/layouts/AppLayout.vue'

const newForm = useForm({
  categoryId: null,
  statusId: null,
  typeId: null,
  name: null,
  alternativeName: null,
  released: null,
  synopsis: null,
  tagId: null,
  genreId: [],
  contributors: [{ contributorId: null, roleId: null }],
})
</script>

<template>
  <AppHead title="Ajouter un media" />
  <AppLayout>
    <div>
      <form method="POST" @submit.prevent="newForm.post('/media')"></form>
    </div>
  </AppLayout>
</template>
