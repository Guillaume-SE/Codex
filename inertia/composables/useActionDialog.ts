import { type InertiaForm } from '@inertiajs/vue3'
import { computed, nextTick, ref, useTemplateRef, type MaybeRef } from 'vue'
import type ActionDialogComp from '~/components/ActionDialogComp.vue'
import { useActionText, type ActionType, type IResourceNameConfig } from './useActionText'
import { useResourceForm } from './useResourceForm'

/**
 * @param config The configuration object for the resource.
 * @typeParam T The interface for the form data (e.g., IForm).
 * @typeParam U The interface for the resource item itself (e.g., IPlatformList).
 * @returns All the reactive state and methods needed to power a CRUD modal interface.
 */

export interface ActionDialogConfig<T extends object, U> {
  resourceApiUrl: MaybeRef<string>
  resourceNameConfig: IResourceNameConfig
  form: InertiaForm<T>
  getItemId?: (item: U) => number | string | null
  getItemName?: (item: U) => string
  customSubmitHandlers?: Partial<Record<ActionType, () => void>>
}

export function useActionDialog<T extends object, U extends object>(
  config: ActionDialogConfig<T, U>,
  templateRefKey: string
) {
  const { resourceApiUrl, resourceNameConfig, form, getItemId, getItemName } = config

  // handle form url creation
  const { create, update, destroy } = useResourceForm(form, resourceApiUrl)

  const actionDialogRef = useTemplateRef<InstanceType<typeof ActionDialogComp>>(templateRefKey)
  const currentTask = ref<ActionType | null>(null)
  const selectedItem = ref<U | null>(null)

  const getId = getItemId ?? ((item: any) => item.id)
  const getName = getItemName ?? ((item: any) => item.name)
  const selectedItemName = computed(() => (selectedItem.value ? getName(selectedItem.value) : ''))

  const { title: dialogTitle, actionText: dialogActionText } = useActionText(
    currentTask,
    resourceNameConfig
  )

  function prefillFormForEdit(item: U) {
    const formKeys = Object.keys(form.data())
    const dataToFill = Object.fromEntries(
      Object.entries(item).filter(([key]) => formKeys.includes(key))
    )
    Object.assign(form, dataToFill)
  }

  //MODAL PART
  const openModal = (task: ActionType, item: U | null = null) => {
    currentTask.value = task
    selectedItem.value = item

    form.reset()
    if (task === 'edit' && item) {
      prefillFormForEdit(item)
    }

    nextTick(() => {
      actionDialogRef.value?.showModal()
    })
  }

  const closeModal = () => {
    if (actionDialogRef.value) {
      actionDialogRef.value.close()
    }
    form.reset()
    form.clearErrors()
    currentTask.value = null
    selectedItem.value = null
  }

  // SUBMIT PART
  function submitForm() {
    const task = currentTask.value

    if (!task) {
      return
    }

    // to handle specific case like type who need a replace or cover who need different url
    const customHandler = config.customSubmitHandlers?.[task]
    if (customHandler) {
      customHandler()
      return
    }

    const options = {
      onSuccess: () => closeModal(),
      preserveState: true,
      preserveScroll: true,
    }
    const itemId = selectedItem.value ? getId(selectedItem.value) : null

    switch (currentTask.value) {
      case 'create':
        create(options)
        break
      case 'edit':
        if (itemId) update(itemId, options)
        break
      case 'delete':
        if (itemId) destroy(itemId, options)
        break
    }
  }

  return {
    actionDialogRef,
    currentTask,
    selectedItem,
    selectedItemName,
    dialogTitle,
    dialogActionText,
    openModal,
    closeModal,
    submitForm,
  }
}
