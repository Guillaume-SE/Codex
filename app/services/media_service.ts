import { MediaFormatterFactory } from '#classes/MediaFormatter'
import {
  IAnimeInfos,
  IBookInfos,
  IGameInfos,
  IMediaSpecificInfos,
  IMovieInfos,
  ISeriesInfos,
} from '#interfaces/media_infos_interface'
import { IMediaPayload } from '#interfaces/media_interface'
import AnimeInfo from '#models/anime_info'
import BookInfo from '#models/book_info'
import GameInfo from '#models/game_info'
import GamePlatform from '#models/game_platform'
import Genre from '#models/genre'
import Media from '#models/media'
import MediaCategory from '#models/media_category'
import MediaStatus from '#models/media_status'
import MediaType from '#models/media_type'
import MovieInfo from '#models/movie_info'
import SeriesInfo from '#models/series_info'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class MediaService {
  public async addOneMedia(
    media: IMediaPayload,
    mediaGenres: Array<number>,
    specificInfos: IMediaSpecificInfos
  ) {
    if (media.mediaParentId) {
      const validSelectedMediaParent = await Media.find(media.mediaParentId)
      if (!validSelectedMediaParent) {
        throw new Error("Le media parent selectionné n'existe pas")
      }
    }

    const validSelectedStatus: MediaStatus | null = await MediaStatus.find(media.statusId)
    if (!validSelectedStatus) {
      throw new Error('Aucun statut ne correspond')
    }

    const validSelectedType: MediaType | null = await MediaType.find(media.typeId)
    if (!validSelectedType) {
      throw new Error('Aucun type ne correspond')
    }

    const validSelectedCategory: MediaCategory | null = await MediaCategory.find(media.categoryId)
    if (!validSelectedCategory) {
      throw new Error('Aucune catégorie ne correspond')
    }
    const newMediaCategoryName = validSelectedCategory.name

    const isValidTypeForSelectedCategory = validSelectedType.categoryId === media.categoryId
    if (!isValidTypeForSelectedCategory) {
      throw new Error("La catégorie du media n'a pas de type correspondant à celui choisi")
    }

    const isSelectedGenresUnique =
      mediaGenres.filter((value, index, self) => self.indexOf(value) === index).length ===
      mediaGenres.length
    if (!isSelectedGenresUnique) {
      throw new Error('Un ou plusieurs genres selectionnés sont en double')
    }

    const validSelectedGenres = await Genre.query()
      .select('*')
      .from('genres')
      .whereIn('id', mediaGenres)
    const isSelectedGenresNotValid = mediaGenres.length !== validSelectedGenres.length
    if (isSelectedGenresNotValid) {
      throw new Error("Un ou plusieurs genres selectionnés n'existe pas")
    }

    const categoriesIdsForSelectedGenres = validSelectedGenres.map((genre) => genre.categoryId)
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
        if (specificInfos.platformId) {
          const validPlatform = await GamePlatform.find(specificInfos.platformId)
          if (!validPlatform) {
            throw new Error("La plateforme choisie n'existe pas")
          }
        }
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
        throw new Error('Les infos spécifiques du media ne correspondent pas à sa catégorie')
      }
    })

    return newMedia
  }

  public async updateOneMedia(
    mediaId: number,
    updatedMediaInfos: IMediaPayload,
    updatedMediaGenres: Array<number>,
    updatedSpecificInfos: IMediaSpecificInfos
  ) {
    const media = await Media.find(mediaId)
    if (!media) {
      throw new Error('Aucun media trouvé')
    }

    if (updatedMediaInfos.mediaParentId) {
      const validSelectedMediaParent = await Media.find(updatedMediaInfos.mediaParentId)
      if (!validSelectedMediaParent) {
        throw new Error("Le media parent selectionné n'existe pas")
      }
      const validSelectedMediaParentIsTheMediaUpdated = validSelectedMediaParent.id === media.id
      if (validSelectedMediaParentIsTheMediaUpdated) {
        throw new Error('Le media à mettre à jour ne peut être son propre parent')
      }
    }
    const validSelectedType = await MediaType.find(updatedMediaInfos.typeId)
    if (!validSelectedType) {
      throw new Error('Aucun type ne correspond')
    }

    const mediaCategory = await MediaCategory.find(media.categoryId)
    if (!mediaCategory) {
      throw new Error('Le media ne possède pas de catégorie')
    }
    const mediaCategoryName = mediaCategory.name

    const isValidTypeForSelectedCategory = validSelectedType.categoryId === media.categoryId
    if (!isValidTypeForSelectedCategory) {
      throw new Error("La catégorie du media n'a pas de type correspondant à celui choisi")
    }

    const validSelectedGenres = await Genre.query()
      .select('*')
      .from('genres')
      .whereIn('id', updatedMediaGenres)
    const isSelectedGenresNotValid = updatedMediaGenres.length !== validSelectedGenres.length
    if (isSelectedGenresNotValid) {
      throw new Error("Un ou plusieurs genres selectionnés n'existe pas")
    }

    const categoriesIdsForSelectedGenres = validSelectedGenres.map((genre) => genre.categoryId)
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

    await db.transaction(async (trx) => {
      media.useTransaction(trx)
      await media
        .merge({
          ...updatedMediaInfos,
        })
        .save()

      await media.related('genres').sync(updatedMediaGenres)

      if (isBook(updatedSpecificInfos) && mediaCategoryName === 'Livre') {
        const bookInfos = await BookInfo.findBy('media_id', mediaId)
        if (!bookInfos) {
          throw new Error("Le media n'a aucune info liées aux livres")
        }
        await bookInfos.merge(updatedSpecificInfos).save()
      }
      if (isGame(updatedSpecificInfos) && mediaCategoryName === 'Jeu vidéo') {
        const gameInfos = await GameInfo.findBy('media_id', mediaId)
        if (!gameInfos) {
          throw new Error("Le media n'a aucune info liées aux jeux vidéo")
        }
        const validPlatform = await GamePlatform.find(updatedSpecificInfos.platformId)
        if (!validPlatform) {
          throw new Error("La plateforme choisie n'existe pas")
        }
        await gameInfos.merge(updatedSpecificInfos).save()
      }
      if (isMovie(updatedSpecificInfos) && mediaCategoryName === 'Film') {
        const movieInfos = await MovieInfo.findBy('media_id', mediaId)
        if (!movieInfos) {
          throw new Error("Le media n'a aucune info liées aux films")
        }
        await movieInfos.merge(updatedSpecificInfos).save()
      }
      if (isSeries(updatedSpecificInfos) && mediaCategoryName === 'Série') {
        const seriesInfos = await SeriesInfo.findBy('media_id', mediaId)
        if (!seriesInfos) {
          throw new Error("Le media n'a aucune info liées aux séries")
        }
        await seriesInfos.merge(updatedSpecificInfos).save()
      }
      if (isAnime(updatedSpecificInfos) && mediaCategoryName === 'Animé') {
        const animeInfos = await AnimeInfo.findBy('media_id', mediaId)
        if (!animeInfos) {
          throw new Error("Le media n'a aucune info liées aux animé")
        }
        await animeInfos.merge(updatedSpecificInfos).save()
      }
      const isMediaInfosNotMatchWithSelectedCategory =
        (isBook(updatedSpecificInfos) && mediaCategoryName !== 'Livre') ||
        (isGame(updatedSpecificInfos) && mediaCategoryName !== 'Jeu vidéo') ||
        (isMovie(updatedSpecificInfos) && mediaCategoryName !== 'Film') ||
        (isSeries(updatedSpecificInfos) && mediaCategoryName !== 'Série') ||
        (isAnime(updatedSpecificInfos) && mediaCategoryName !== 'Animé')
      if (isMediaInfosNotMatchWithSelectedCategory) {
        throw new Error('Les infos spécifiques du media ne correspondent pas à sa catégorie')
      }
    })

    return { updatedMediaInfos, updatedSpecificInfos }
  }

  public async deleteOneMedia(mediaId: number) {
    const media = await Media.find(mediaId)
    if (!media) {
      throw new Error('Aucun media trouvé')
    }
    await media.delete()
  }

  async getAllMedia() {
    const mediaList = await Media.query()
      .preload('status')
      .preload('category')
      .preload('type')
      .preload('genres')
      .preload('contributors', (contributorsQuery) => {
        contributorsQuery.preload('role')
        contributorsQuery.preload('contributor')
      })
      .preload('bookInfo')
      .preload('movieInfo')
      .preload('seriesInfo')
      .preload('gameInfo', (gamesQuery) => {
        gamesQuery.preload('gamePlatform')
      })
      .preload('review')
      .preload('cover')

    const formattedMediaList = MediaFormatterFactory.formatMediaList(mediaList)

    return formattedMediaList
  }

  async getOneMediaById(mediaId: number) {
    const validMedia = await Media.find(mediaId)
    if (!validMedia) {
      throw new Error('Aucun media trouvé')
    }

    await validMedia.load((loader) => {
      loader
        .load('status')
        .load('category')
        .load('type')
        .load('genres')
        .load('contributors', (contributorsQuery) => {
          contributorsQuery.preload('role')
          contributorsQuery.preload('contributor')
        })
        .load('bookInfo')
        .load('movieInfo')
        .load('seriesInfo')
        .load('gameInfo', (gamesQuery) => {
          gamesQuery.preload('gamePlatform')
        })
        .load('review')
        .load('cover')
    })

    const formatedMedia = MediaFormatterFactory.formatMedia(validMedia)

    return formatedMedia
  }
}
