export function useStatusBackgroundColor(status: string): string {
  switch (status) {
    case 'en cours':
      return 'background-in-progress'
    case 'terminé':
      return 'background-completed'
    case 'en pause':
      return 'background-paused'
    case 'abandonné':
      return 'background-dropped'
    case 'prévu':
      return 'background-planned'
    case 'attendu':
      return 'background-anticipated'
    default:
      return ''
  }
}
