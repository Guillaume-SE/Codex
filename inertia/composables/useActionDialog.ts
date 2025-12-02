import { type InertiaForm } from '@inertiajs/vue3'
import { computed, MaybeRef, nextTick, ref, watch } from 'vue'
import type { ButtonVariant } from '~/components/ui/ButtonComp.vue'
import {
  useActionText,
  type ActionType,
  type IResourceNameConfig,
} from '~/composables/useActionText'
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
  customSubmitHandlers?: Partial<Record<ActionType, (closeModal: () => void) => void>>
}

export function useActionDialog<T extends object, U extends object>(
  config: ActionDialogConfig<T, U>
) {
  const { resourceApiUrl, resourceNameConfig, form, getItemId, getItemName } = config

  // handle form url creation
  const { create, update, destroy } = useResourceForm(form, resourceApiUrl)

  const isModalOpen = ref(false)
  const currentTask = ref<ActionType | null>(null)
  const selectedItem = ref<U | null>(null)

  const getId = getItemId ?? ((item: any) => item.id)
  const getName = getItemName ?? ((item: any) => item.name)
  const selectedItemName = computed(() => (selectedItem.value ? getName(selectedItem.value) : ''))

  const { title: dialogTitle, actionText: dialogActionText } = useActionText(
    currentTask,
    resourceNameConfig
  )

  const dialogVariant = computed((): ButtonVariant => {
    if (currentTask.value === 'delete' || currentTask.value === 'replace') {
      return 'error'
    }
    return 'primary'
  })

  const originalDefaults = JSON.parse(JSON.stringify(form.data()))

  function prefillFormForEdit(item: U) {
    const formKeys = Object.keys(form.data())
    const dataToFill = Object.fromEntries(
      Object.entries(item).filter(([key]) => formKeys.includes(key))
    )
    for (const key in dataToFill) {
      ;(form as any)[key] = (dataToFill as any)[key]
    }
  }

  //MODAL PART
  const openModal = (task: ActionType, item: U | null = null) => {
    form.defaults(originalDefaults)
    form.reset()
    currentTask.value = task
    selectedItem.value = item

    if (task === 'edit' && item) {
      prefillFormForEdit(item)
    }

    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
  }

  watch(isModalOpen, (isOpen) => {
    // to clear everything each time modal close
    if (!isOpen) {
      nextTick(() => {
        form.reset()
        form.clearErrors()
        currentTask.value = null
        selectedItem.value = null
      })
    }
  })

  // SUBMIT PART
  function submitForm() {
    const task = currentTask.value

    if (!task) {
      return
    }

    // to handle specific case like type who need a replace or cover who need different url
    const customHandler = config.customSubmitHandlers?.[task]
    if (customHandler) {
      customHandler(closeModal)
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
    isModalOpen,
    currentTask,
    selectedItem,
    selectedItemName,
    dialogTitle,
    dialogActionText,
    dialogVariant,
    openModal,
    closeModal,
    submitForm,
  }
}
