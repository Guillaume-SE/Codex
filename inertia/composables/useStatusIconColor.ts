export function useStatusIconColor(status: string): string {
  switch (status) {
    case 'en cours':
      return 'icon-in-progress'
    case 'terminé':
      return 'icon-completed'
    case 'en pause':
      return 'icon-paused'
    case 'abandonné':
      return 'icon-dropped'
    case 'prévu':
      return 'icon-planned'
    case 'attendu':
      return 'icon-anticipated'
    default:
      return ''
  }
}
