import { ExtractModelRelations } from '@ioc:Adonis/Lucid/Orm'
import Media from 'App/Models/Media'
import { gameTypes, movieTypes, seasonTypes, bookTypes, validMediaTypes, MediaTypes } from 'App/Tools/Enums/MediaTypes'

export function getTableName(type: MediaTypes): any {
  const videoGameType = gameTypes
  const movieType = movieTypes
  const seasonType = seasonTypes
  const bookType = bookTypes
  const allTypes = validMediaTypes

  const isVideoGameType = videoGameType.includes(type)
  const isMovieType = movieType.includes(type)
  const isBookType = bookType.includes(type)
  const isSeasonType = seasonType.includes(type)
  const asNoValidType = !allTypes.includes(type)

  let tableName = ''

  if (isVideoGameType) {
    tableName = `'gameInfo'`
  }
  if (isMovieType) {
    tableName = `'movieInfo'`
  }
  if (isBookType) {
    tableName = `'bookInfo'`
  }
  if (isSeasonType) {
    tableName = `'seasonInfo'`
  }
  if(asNoValidType) {
    tableName = `'no valid type'`
  }

  return tableName
}
