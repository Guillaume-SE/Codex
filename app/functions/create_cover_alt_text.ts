import { bookTypes, gameTypes, movieTypes, seasonTypes } from '#enums/MediaTypes'

export function createAlternativeText(mediaType: string, mediaName: string) {
  const videoGameType = gameTypes
  const movieType = movieTypes
  const seasonType = seasonTypes
  const bookType = bookTypes

  const isVideoGameType = videoGameType.includes(mediaType)
  const isMovieType = movieType.includes(mediaType)
  const isBookType = bookType.includes(mediaType)
  const isSeasonType = seasonType.includes(mediaType)

  let fileAlternativeText = ''

  if (isVideoGameType) {
    fileAlternativeText = `jaquette du jeu ${mediaName}`
  }

  if (isMovieType) {
    fileAlternativeText = `affiche du film ${mediaName}`
  }

  if (isBookType) {
    fileAlternativeText = `couverture du livre ${mediaName}`
  }

  if (isSeasonType) {
    fileAlternativeText = `affiche pour la saison de ${mediaName}`
  }

  return fileAlternativeText
}
