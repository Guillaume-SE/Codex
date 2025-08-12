import { computed, type Ref } from 'vue'

export type ActionType = 'create' | 'edit' | 'delete' | 'replace'

export interface IResourceNameConfig {
  singular: string // "plateforme" or "jeu"...
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
      case 'replace':
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
      case 'replace':
        return 'Supprimer'
      default:
        return ''
    }
  })

  return { title, actionText }
}
