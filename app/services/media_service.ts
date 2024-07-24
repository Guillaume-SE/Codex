import {
  IAnimeInfos,
  IBookInfos,
  IGameInfos,
  IMediaSpecificInfos,
  IMovieInfos,
  ISeriesInfos,
} from '#interfaces/media_infos_interface'
import { IMedia } from '#interfaces/media_interface'
import Media from '#models/media'
import MediaCategory from '#models/media_category'
import MediaType from '#models/media_type'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class MediaService {
  public async addOneMedia(
    media: IMedia,
    mediaGenres: Array<number>,
    specificInfos: IMediaSpecificInfos
  ) {
    const isValidType = await MediaType.find(media.typeId)
    if (!isValidType) {
      throw new Error('Aucun type ne correspond')
    }

    const isValidCategory = await MediaCategory.find(media.categoryId)
    if (!isValidCategory) {
      throw new Error('Aucune catégorie ne correspond')
    }
    const newMediaCategoryName = isValidCategory.name

    const isValidTypeForCategory = await MediaType.findBy({
      id: media.typeId,
      categoryId: media.categoryId,
    })
    if (!isValidTypeForCategory) {
      throw new Error('Le type choisi ne fait pas partie de la catégorie selectionnée')
    }

    const isBook = (specificInfos: any): specificInfos is IBookInfos => 'pages' in specificInfos
    const isGame = (specificInfos: any): specificInfos is IGameInfos =>
      'platformId' in specificInfos
    const isMovie = (specificInfos: any): specificInfos is IMovieInfos =>
      'duration' in specificInfos
    const isSeries = (specificInfos: any): specificInfos is ISeriesInfos =>
      'seriesSeasonLength' in specificInfos
    const isAnime = (specificInfos: any): specificInfos is IAnimeInfos =>
      'animeSeasonLength' in specificInfos

    const newMedia = new Media()
    await db.transaction(async (trx) => {
      newMedia.useTransaction(trx)
      await newMedia
        .merge({
          ...media,
        })
        .save()

      await newMedia.related('genres').sync(mediaGenres)

      if (isBook(specificInfos) && newMediaCategoryName === 'Livre') {
        await newMedia.related('bookInfo').create(specificInfos)
      }
      if (isGame(specificInfos) && newMediaCategoryName === 'Jeu vidéo') {
        await newMedia.related('gameInfo').create(specificInfos)
      }
      if (isMovie(specificInfos) && newMediaCategoryName === 'Film') {
        await newMedia.related('movieInfo').create(specificInfos)
      }
      if (isSeries(specificInfos) && newMediaCategoryName === 'Série') {
        await newMedia.related('seriesInfo').create(specificInfos)
      }
      if (isAnime(specificInfos) && newMediaCategoryName === 'Animé') {
        await newMedia.related('animeInfo').create(specificInfos)
      }
      const isMediaInfosNotMatchWithSelectedCategory =
        (isBook(specificInfos) && newMediaCategoryName !== 'Livre') ||
        (isGame(specificInfos) && newMediaCategoryName !== 'Jeu vidéo') ||
        (isMovie(specificInfos) && newMediaCategoryName !== 'Film') ||
        (isSeries(specificInfos) && newMediaCategoryName !== 'Série') ||
        (isAnime(specificInfos) && newMediaCategoryName !== 'Animé')
      if (isMediaInfosNotMatchWithSelectedCategory) {
        throw new Error('Aucune concordance entre les infos fournies et la catégorie choisie')
      }
    })

    return newMedia
  }

  public async updateOneMedia() {}

  public async deleteOneMedia(mediaId: number) {
    const media = await Media.find(mediaId)
    if (!media) {
      throw new Error('pas de media')
    }
    await media.delete()
  }
}
