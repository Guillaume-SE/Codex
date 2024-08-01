import {
  IAnimeInfos,
  IBookInfos,
  IGameInfos,
  IMediaSpecificInfos,
  IMovieInfos,
  ISeriesInfos,
} from '#interfaces/media_infos_interface'
import { IMedia } from '#interfaces/media_interface'
import BookInfo from '#models/book_info'
import GameInfo from '#models/game_info'
import Genre from '#models/genre'
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
      throw new Error("La catégorie du media n'a pas de type correspondant au type choisi")
    }

    const isAllGenresSelectedExist = await Genre.query()
      .select('*')
      .from('genres')
      .whereIn('id', mediaGenres)
    const isSelectedGenresNotValid = mediaGenres.length !== isAllGenresSelectedExist.length
    if (isSelectedGenresNotValid) {
      throw new Error("Un ou plusieurs genres selectionnés n'existe pas")
    }

    const categoriesIdsForSelectedGenres = isAllGenresSelectedExist.map((genre) => genre.categoryId)
    const isAllGenresMatchWithCategory = categoriesIdsForSelectedGenres.every(
      (id) => id === media.categoryId
    )
    if (!isAllGenresMatchWithCategory) {
      throw new Error(
        "Un ou plusieurs genres selectionnés n'appartiennent pas à la catégorie du media"
      )
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

  public async updateOneMedia(
    mediaId: number,
    mediaInfos: IMedia,
    mediaGenres: Array<number>,
    specificInfos: IMediaSpecificInfos
  ) {
    const media = await Media.find(mediaId)
    if (!media) {
      throw new Error('Aucun media trouvé')
    }

    const isValidType = await MediaType.find(mediaInfos.typeId)
    if (!isValidType) {
      throw new Error("Le type n'est pas valide")
    }

    const isValidTypeForCategory = await MediaType.findBy({
      id: mediaInfos.typeId,
      categoryId: media.categoryId,
    })
    if (!isValidTypeForCategory) {
      throw new Error("La catégorie du media n'a pas de type correspondant au type choisi")
    }

    const mediaCategory = await MediaCategory.find(media.categoryId)
    if (!mediaCategory) {
      throw new Error('Le media ne possède pas de catégorie')
    }
    const mediaCategoryName = mediaCategory.name

    const isBook = (specificInfos: any): specificInfos is IBookInfos => 'pages' in specificInfos
    const isGame = (specificInfos: any): specificInfos is IGameInfos =>
      'platformId' in specificInfos
    const isMovie = (specificInfos: any): specificInfos is IMovieInfos =>
      'duration' in specificInfos
    const isSeries = (specificInfos: any): specificInfos is ISeriesInfos =>
      'seriesSeasonLength' in specificInfos
    const isAnime = (specificInfos: any): specificInfos is IAnimeInfos =>
      'animeSeasonLength' in specificInfos

    await db.transaction(async (trx) => {
      media.useTransaction(trx)
      await media
        .merge({
          ...media,
        })
        .save()

      await media.related('genres').sync(mediaGenres)

      if (isBook(specificInfos) && mediaCategoryName === 'Livre') {
        const bookInfos = await BookInfo.findBy('media_id', mediaId)
        if (!bookInfos) {
          throw new Error("Le media n'a aucune info liées aux livres")
        }
        await bookInfos.merge(specificInfos).save()
      }
      if (isGame(specificInfos) && mediaCategoryName === 'Jeu vidéo') {
        const gameInfos = await GameInfo.findBy('media_id', mediaId)
        if (!gameInfos) {
          throw new Error("Le media n'a aucune info liées aux jeux vidéo")
        }
        await gameInfos.merge(specificInfos).save()
      }
      if (isMovie(specificInfos) && mediaCategoryName === 'Film') {
        await media.related('movieInfo').create(specificInfos)
      }
      if (isSeries(specificInfos) && mediaCategoryName === 'Série') {
        await media.related('seriesInfo').create(specificInfos)
      }
      if (isAnime(specificInfos) && mediaCategoryName === 'Animé') {
        await media.related('animeInfo').create(specificInfos)
      }
      const isMediaInfosNotMatchWithSelectedCategory =
        (isBook(specificInfos) && mediaCategoryName !== 'Livre') ||
        (isGame(specificInfos) && mediaCategoryName !== 'Jeu vidéo') ||
        (isMovie(specificInfos) && mediaCategoryName !== 'Film') ||
        (isSeries(specificInfos) && mediaCategoryName !== 'Série') ||
        (isAnime(specificInfos) && mediaCategoryName !== 'Animé')
      if (isMediaInfosNotMatchWithSelectedCategory) {
        throw new Error('Les infos spécifiques du media ne correspondent pas à ça catégorie')
      }
    })

    return { mediaInfos, specificInfos }
  }

  public async deleteOneMedia(mediaId: number) {
    const media = await Media.find(mediaId)
    if (!media) {
      throw new Error('pas de media')
    }
    await media.delete()
  }
}
