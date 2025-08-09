import { computed, type Ref } from 'vue'

type ActionType = 'create' | 'edit' | 'delete'

export interface IResourceNameConfig {
  singular: string // "plateforme" or "jeu"
  indefinite: string // "une" or "un"
  definite: string // "la" or "le"
}

export function useActionText(task: Ref<ActionType | null>, config: IResourceNameConfig) {
  const title = computed(() => {
    switch (task.value) {
      case 'create':
        return `Ajouter ${config.indefinite} ${config.singular}`
      case 'edit':
        return `Modifier ${config.definite} ${config.singular}`
      case 'delete':
        return `Supprimer ${config.definite} ${config.singular}`
      default:
        return ''
    }
  })

  const actionText = computed(() => {
    switch (task.value) {
      case 'create':
        return 'Ajouter'
      case 'edit':
        return 'Confirmer'
      case 'delete':
        return 'Supprimer'
      default:
        return ''
    }
  })

  return { title, actionText }
}
