<script setup lang="ts">
import type GenresController from '#controllers/genres_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { computed } from 'vue'
import ActionDialogComp from '~/components/ActionDialogComp.vue'
import AppHead from '~/components/AppHead.vue'
import DashboardAction from '~/components/dashboard/DashboardAction.vue'
import DashboardContainer from '~/components/dashboard/DashboardContainer.vue'
import Pagination from '~/components/Pagination.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { type ActionDialogConfig, useActionDialog } from '~/composables/useActionDialog'
import { usePaginatedFilters } from '~/composables/usePaginatedFilters'

interface IForm {
  genreId: number | null
  name: string | null
}

interface IGenreList {
  id: number | null
  name: string | null
  count: number | null
}

const props = defineProps<{
  genreList: InferPageProps<GenresController, 'showManage'>['genreList']
  errors?: Record<string, string[]>
}>()

const form = useForm<IForm>({
  genreId: null,
  name: null,
})

const { filters, submitFilters, fetchNewPageData } = usePaginatedFilters('/admin/genres/manage')

const genreConfig: ActionDialogConfig<IForm, IGenreList> = {
  resourceApiUrl: '/admin/genres',
  resourceNameConfig: {
    singular: 'genre',
    indefinite: 'un',
    definite: 'le',
  },
  form: form,
}

const {
  actionDialogRef,
  currentTask,
  selectedItem,
  selectedItemName,
  dialogTitle,
  dialogActionText,
  openModal,
  closeModal,
  submitForm,
} = useActionDialog<IForm, IGenreList>(genreConfig, 'actionDialogRef')

const genreListIsNotEmpty = computed(() => (props.genreList.data.length > 0 ? true : false))
</script>

<template>
  <AppHead title="Gestion des genres" />
  <DashboardContainer>
    <form action="GET" @submit.prevent="submitFilters">
      <DashboardAction
        v-model:search="filters.search"
        :type="'search'"
        :title="'Gestion des genres'"
      >
        <ButtonComp @click="openModal('create')">Ajouter</ButtonComp>
      </DashboardAction>
    </form>

    <div class="dashboard-list-item-header">
      <span>Nom</span>
      <span>Utilisation</span>
    </div>

    <div class="dashboard-list">
      <div v-if="genreListIsNotEmpty">
        <div v-for="genre in genreList.data" :key="genre.id" class="genre-list-item">
          <div>
            <span>{{ genre.name }}</span>
          </div>
          <div>
            <span>{{ genre.count }}</span>
          </div>
          <div>
            <ButtonComp @click="openModal('edit', genre)">Modifier</ButtonComp>
          </div>
          <div>
            <ButtonComp @click="openModal('delete', genre)">Supprimer</ButtonComp>
          </div>
        </div>
      </div>
      <div v-else>Aucun résultat</div>
    </div>

    <Pagination
      :page="{
        currentPage: props.genreList.meta.currentPage,
        firstPage: props.genreList.meta.firstPage,
        lastPage: props.genreList.meta.lastPage,
      }"
      :url="{
        firstPageUrl: props.genreList.meta.firstPageUrl,
        lastPageUrl: props.genreList.meta.lastPageUrl,
        nextPageUrl: props.genreList.meta.nextPageUrl,
        previousPageUrl: props.genreList.meta.previousPageUrl,
      }"
      @update:current-page="fetchNewPageData"
    />
  </DashboardContainer>

  <!-- create modal -->
  <ActionDialogComp
    v-if="currentTask"
    ref="actionDialogRef"
    :title="dialogTitle"
    :form="form"
    :action-text="dialogActionText"
    @submit="submitForm"
    @close="closeModal"
  >
    <template #form-content>
      <div v-if="currentTask === 'create' || currentTask === 'edit'">
        <div>
          <LabelComp labelFor="name" text="Nom" />
          <InputComp v-model="form.name" type="text" id="name" @input="form.clearErrors('name')" />
        </div>
        <FormErrorComp v-if="form.errors.name" :message="form.errors.name" />
      </div>

      <div v-if="currentTask === 'delete'">
        <span
          >Confirmer la suppression de <strong>{{ selectedItemName }}</strong> ? Les media utilisant
          ce genre pourraient s'en retrouver impactés.</span
        >
      </div>
    </template>
  </ActionDialogComp>
</template>

<style scoped>
.dashboard-list-item-header {
  display: grid;
  gap: 15px;
  padding: 10px;
  border-bottom: 2px solid #333;
  font-weight: bold;
  grid-template-columns: 2fr 1fr 1fr 1fr;
}
.genre-list-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
