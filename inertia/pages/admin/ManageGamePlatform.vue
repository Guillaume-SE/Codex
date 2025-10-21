<script setup lang="ts">
import type GamePlatformsController from '#controllers/game_platforms_controller'
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
import { useActionDialog, type ActionDialogConfig } from '~/composables/useActionDialog'
import { usePaginatedFilters } from '~/composables/usePaginatedFilters'

interface IForm {
  platformId: number | null
  name: string | null
}

interface IPlatformList {
  id: number | null
  name: string | null
  count: number | null
}

const props = defineProps<{
  platformList: InferPageProps<GamePlatformsController, 'showManage'>['platformList']
  errors?: Record<string, string[]>
}>()

const form = useForm<IForm>({
  platformId: null,
  name: null,
})

const { filters, submitFilters, fetchNewPageData } = usePaginatedFilters('/admin/platforms/manage')

const platformConfig: ActionDialogConfig<IForm, IPlatformList> = {
  resourceApiUrl: '/admin/platforms',
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
} = useActionDialog<IForm, IPlatformList>(platformConfig, 'actionDialogRef')

const platformListIsNotEmpty = computed(() => (props.platformList.data.length > 0 ? true : false))
</script>

<template>
  <AppHead title="Gestion des plateformes" />
  <DashboardContainer>
    <form action="GET" @submit.prevent="submitFilters">
      <DashboardAction
        v-model:search="filters.search"
        :type="'search'"
        :title="'Gestion des plateformes'"
      >
        <ButtonComp @click="openModal('create')">Ajouter</ButtonComp>
      </DashboardAction>
    </form>

    <div class="dashboard-list-item-header">
      <span>Nom</span>
      <span>Utilisation</span>
    </div>

    <div class="dashboard-list">
      <div v-if="platformListIsNotEmpty">
        <div v-for="platform in platformList.data" :key="platform.id" class="platform-list-item">
          <div>
            <span>{{ platform.name }}</span>
          </div>
          <div>
            <span>{{ platform.count }}</span>
          </div>
          <div>
            <ButtonComp @click="openModal('edit', platform)">Modifier</ButtonComp>
          </div>
          <div>
            <ButtonComp @click="openModal('delete', platform)">Supprimer</ButtonComp>
          </div>
        </div>
      </div>
      <div v-else>Aucune résultat</div>

      <Pagination
        :page="{
          currentPage: props.platformList.meta.currentPage,
          firstPage: props.platformList.meta.firstPage,
          lastPage: props.platformList.meta.lastPage,
        }"
        :url="{
          firstPageUrl: props.platformList.meta.firstPageUrl,
          lastPageUrl: props.platformList.meta.lastPageUrl,
          nextPageUrl: props.platformList.meta.nextPageUrl,
          previousPageUrl: props.platformList.meta.previousPageUrl,
        }"
        @update:current-page="fetchNewPageData"
      />
    </div>
  </DashboardContainer>

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
        <LabelComp labelFor="name" text="Nom" />
        <InputComp v-model="form.name" type="text" id="name" @input="form.clearErrors('name')" />
        <FormErrorComp v-if="form.errors.name" :message="form.errors.name" />
      </div>

      <div v-if="currentTask === 'delete'">
        <span
          >Confirmer la suppression de <strong>{{ selectedItemName }}</strong> ? Les jeux utilisant
          cette plateforme pourraient s'en retrouver impactés.</span
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
.platform-list-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
