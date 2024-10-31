export function useRatingLabel(rating: number | null | undefined): string {
  if (rating === null || rating === undefined) {
    return ''
  }

  switch (rating) {
    case 10:
      return "Chef-d'œuvre"
    case 9:
      return 'Excellent'
    case 8:
      return 'Génial'
    case 7:
      return 'Très bon'
    case 6:
      return 'Bien'
    case 5:
      return 'Moyen'
    case 4:
      return 'Oubliable'
    case 3:
      return 'Mauvais'
    case 2:
      return 'Très mauvais'
    case 1:
      return 'Sans intêret'
    case 0:
      return 'A fuir'
    default:
      return ''
  }
}
