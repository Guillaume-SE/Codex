export function useStatusIconColorClass(status: string): string {
  switch (status) {
    case 'en cours':
      return 'in-progress'
    case 'terminé':
      return 'completed'
    case 'en pause':
      return 'paused'
    case 'abandonné':
      return 'dropped'
    case 'prévu':
      return 'planned'
    case 'attendu':
      return 'anticipated'
    default:
      return ''
  }
}
