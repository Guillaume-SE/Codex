<script setup lang="ts">
import type BookPublishersController from '#controllers/book_publishers_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { computed } from 'vue'
import ActionDialogComp from '~/components/ActionDialogComp.vue'
import AppHead from '~/components/AppHead.vue'
import DashboardAction from '~/components/DashboardAction.vue'
import Pagination from '~/components/Pagination.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import { useActionDialog, type ActionDialogConfig } from '~/composables/useActionDialog'
import { usePaginatedFilters } from '~/composables/usePaginatedFilters'
import DashboardLayout from '~/layouts/DashboardLayout.vue'

interface IForm {
  publisherId: number | null
  name: string | null
}

interface IPublisherList {
  id: number | null
  name: string | null
  count: number | null
}

const props = defineProps<{
  publisherList: InferPageProps<BookPublishersController, 'showManage'>['publisherList']
  errors?: Record<string, string[]>
}>()

defineOptions({ layout: DashboardLayout })

const form = useForm<IForm>({
  publisherId: null,
  name: null,
})

const { filters, submitFilters, fetchNewPageData } = usePaginatedFilters('/admin/publishers/manage')

const publisherConfig: ActionDialogConfig<IForm, IPublisherList> = {
  resourceApiUrl: '/admin/publishers',
  resourceNameConfig: {
    singular: 'plateforme',
    indefinite: 'une',
    definite: 'la',
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
} = useActionDialog<IForm, IPublisherList>(publisherConfig, 'actionDialogRef')

const publisherListIsNotEmpty = computed(() => (props.publisherList.data.length > 0 ? true : false))
</script>

<template>
  <AppHead title="Gestion des éditeurs" />
  <form action="GET" @submit.prevent="submitFilters">
    <DashboardAction
      v-model:search="filters.search"
      :type="'search'"
      :title="'Gestion des éditeurs'"
    >
      <ButtonComp @click="openModal('create')">Ajouter</ButtonComp>
    </DashboardAction>
  </form>

  <div class="dashboard-list-item-header">
    <span>Nom</span>
    <span>Utilisation</span>
  </div>

  <div class="dashboard-list">
    <div v-if="publisherListIsNotEmpty">
      <div v-for="publisher in publisherList.data" :key="publisher.id" class="publisher-list-item">
        <div>
          <span>{{ publisher.name }}</span>
        </div>
        <div>
          <span>{{ publisher.count }}</span>
        </div>
        <div>
          <ButtonComp @click="openModal('edit', publisher)">Modifier</ButtonComp>
        </div>
        <div>
          <ButtonComp @click="openModal('delete', publisher)">Supprimer</ButtonComp>
        </div>
      </div>
    </div>
    <div v-else>Aucune résultat</div>

    <Pagination
      :page="{
        currentPage: props.publisherList.meta.currentPage,
        firstPage: props.publisherList.meta.firstPage,
        lastPage: props.publisherList.meta.lastPage,
      }"
      :url="{
        firstPageUrl: props.publisherList.meta.firstPageUrl,
        lastPageUrl: props.publisherList.meta.lastPageUrl,
        nextPageUrl: props.publisherList.meta.nextPageUrl,
        previousPageUrl: props.publisherList.meta.previousPageUrl,
      }"
      @update:current-page="fetchNewPageData"
    />

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
            <LabelComp text="Nom" textPosition="up">
              <InputComp v-model="form.name" type="text" @input="form.clearErrors('name')" />
            </LabelComp>
          </div>
          <FormErrorComp v-if="form.errors.name" :message="form.errors.name" />
        </div>

        <div v-if="currentTask === 'delete'">
          <span
            >Confirmer la suppression de <strong>{{ selectedItemName }}</strong> ? Les livres
            utilisant cet éditeur pourraient s'en retrouver impactés.</span
          >
        </div>
      </template>
    </ActionDialogComp>
  </div>
</template>

<style scoped>
.dashboard-list-item-header {
  grid-template-columns: 2fr 1fr 1fr 1fr;
}
.publisher-list-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
