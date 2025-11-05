<script setup lang="ts">
import type MediaTypesController from '#controllers/media_types_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import AppHead from '~/components/AppHead.vue'
import ManageMediaTaxonomy from '~/components/dashboard/ManageMediaTaxonomy.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import FormErrorComp from '~/components/ui/FormErrorComp.vue'
import InputComp from '~/components/ui/InputComp.vue'
import LabelComp from '~/components/ui/LabelComp.vue'
import SelectComp from '~/components/ui/SelectComp.vue'
import type { ActionType } from '~/composables/useActionText'

interface IForm {
  typeId: number | null
  name: string | null
  replacementTypeId: number | null
}
interface ITypeList {
  id: number | null
  name: string | null
  count: number | null
}

const props = defineProps<{
  typeList: InferPageProps<MediaTypesController, 'showManage'>['typeList']
  errors?: Record<string, string[]>
}>()

const form = useForm<IForm>({
  typeId: null,
  name: null,
  replacementTypeId: null,
})

const selectedItem = ref<ITypeList | null>(null)
const currentTask = ref<ActionType | null>(null)

function customHandleReplace(closeModal: () => void) {
  const typeIdToDelete = selectedItem.value?.id
  if (!typeIdToDelete) {
    return
  }

  form.put(`/admin/types/replace/${typeIdToDelete}`, {
    onSuccess: () => closeModal(),
  })
}

const typeConfig = {
  resourceApiUrl: '/admin/types',
  resourceNameConfig: {
    singular: 'type',
    indefinite: 'un',
    definite: 'le',
  },
  customSubmitHandlers: { replace: customHandleReplace },
}

const filteredTypeList = computed(() => {
  const idToExclude = selectedItem.value?.id
  if (!idToExclude) return props.typeList.data
  return props.typeList.data.filter((type) => type.id !== idToExclude)
})

const isUsedByMedia = computed(() => {
  return selectedItem.value?.count && selectedItem.value.count > 0
})

const isSubmitDisabled = computed(() => {
  if (currentTask.value === 'replace' && isUsedByMedia.value) {
    return form.replacementTypeId === null
  }
  return false
})
</script>

<template>
  <AppHead title="Gestion des types" />

  <ManageMediaTaxonomy
    title="Gestion des types"
    :paginatedList="typeList"
    :form="form"
    :resourceApiUrl="typeConfig.resourceApiUrl"
    :resourceNameConfig="typeConfig.resourceNameConfig"
    :customSubmitHandlers="typeConfig.customSubmitHandlers"
    :is-action-disabled="isSubmitDisabled || form.processing"
    @modal-closed="((currentTask = null), (selectedItem = null))"
  >
    <template #list-item="{ item, openModal }">
      <div>
        <div>
          <span>{{ item.name }}</span>
        </div>
        <div>
          <span>{{ item.count }}</span>
        </div>
        <div>
          <ButtonComp
            @click="(openModal('edit', item), (currentTask = 'edit'), (selectedItem = item))"
          >
            Modifier
          </ButtonComp>
        </div>
        <div v-if="item.count > 0">
          <ButtonComp
            @click="(openModal('replace', item), (currentTask = 'replace'), (selectedItem = item))"
          >
            Supprimer
          </ButtonComp>
        </div>
        <div v-else>
          <ButtonComp
            @click="(openModal('delete', item), (currentTask = 'delete'), (selectedItem = item))"
            >Supprimer</ButtonComp
          >
        </div>
      </div>
    </template>

    <template #form-content="{ currentTask, selectedItemName }">
      <div v-if="currentTask === 'create' || currentTask === 'edit'">
        <div>
          <LabelComp labelFor="name" text="Nom" />
          <InputComp v-model="form.name" type="text" id="name" @input="form.clearErrors('name')" />
        </div>
        <FormErrorComp v-if="form.errors.name" :message="form.errors.name" />
      </div>

      <div v-if="currentTask === 'delete' || currentTask === 'replace'">
        <div v-if="isUsedByMedia">
          <span
            >Le type <strong>{{ selectedItemName }}</strong> est utilisé. Veuillez choisir un type
            de remplacement avant de le supprimer.</span
          >
          <div>
            <span>Remplacer par</span>
            <SelectComp
              v-model="form.replacementTypeId"
              placeholder="Choisir un type"
              :placeholder-value="null"
            >
              <option v-for="type in filteredTypeList" :value="type.id">
                {{ type.name }}
              </option>
            </SelectComp>
          </div>
          <FormErrorComp
            v-if="form.errors.replacementTypeId"
            :message="form.errors.replacementTypeId"
          />
        </div>
        <div v-else>
          <span
            >Confirmer la suppression de <strong>{{ selectedItemName }}</strong> ?</span
          >
        </div>
      </div>
    </template>
  </ManageMediaTaxonomy>
</template>
