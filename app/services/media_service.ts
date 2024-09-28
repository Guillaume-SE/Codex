import { MediaFormatterFactory } from '#classes/MediaFormatter'
import type { IMediaPayload } from '#interfaces/media_interface'
import Cover from '#models/cover'
import Media from '#models/media'
import MediaCategory from '#models/media_category'
import CoverService from '#services/cover_service'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class MediaService {
  constructor(readonly coverService: CoverService) {}
  public async addOneMedia(data: IMediaPayload) {
    const {
      mediaParentId,
      statusId,
      categoryId,
      typeId,
      name,
      alternativeName,
      released,
      synopsis,
      genreId,
      ...categoryRelatedMediaData
    }: IMediaPayload = data

    const generalMediaData = {
      mediaParentId,
      statusId,
      categoryId,
      typeId,
      name,
      alternativeName,
      released,
      synopsis,
    }

    const selectedCategory = await MediaCategory.findOrFail(categoryId)
    const selectedCategoryName = selectedCategory.name

    // const isBook = (categoryRelatedMediaData: any): categoryRelatedMediaData is IBookInfos =>
    //   'pages' in categoryRelatedMediaData
    // const isGame = (categoryRelatedMediaData: any): categoryRelatedMediaData is IGameInfos =>
    //   'platformId' in categoryRelatedMediaData
    // const isMovie = (categoryRelatedMediaData: any): categoryRelatedMediaData is IMovieInfos =>
    //   'duration' in categoryRelatedMediaData
    // const isSeries = (categoryRelatedMediaData: any): categoryRelatedMediaData is ISeriesInfos =>
    //   'seriesSeasonLength' in categoryRelatedMediaData
    // const isAnime = (categoryRelatedMediaData: any): categoryRelatedMediaData is IAnimeInfos =>
    //   'animeSeasonLength' in categoryRelatedMediaData

    const media = new Media()
    await db.transaction(async (trx) => {
      media.useTransaction(trx)
      await media
        .merge({
          ...generalMediaData,
        })
        .save()

      await media.related('genres').sync(genreId)

      if (selectedCategoryName === 'Jeu vidéo') {
        await media.related('gameInfo').create(categoryRelatedMediaData)
      }
      if (selectedCategoryName === 'Livre') {
        await media.related('bookInfo').create(categoryRelatedMediaData)
      }
      if (selectedCategoryName === 'Film') {
        await media.related('movieInfo').create(categoryRelatedMediaData)
      }
      if (selectedCategoryName === 'Série') {
        await media.related('seriesInfo').create(categoryRelatedMediaData)
      }
      if (selectedCategoryName === 'Anime') {
        await media.related('animeInfo').create(categoryRelatedMediaData)
      }
    })
    return media
  }

  public async updateOneMedia(data: IMediaPayload, mediaId: number) {
    const {
      mediaParentId,
      statusId,
      categoryId,
      typeId,
      name,
      alternativeName,
      released,
      synopsis,
      genreId,
      ...categoryRelatedMediaData
    }: IMediaPayload = data

    const generalMediaData = {
      mediaParentId,
      statusId,
      categoryId,
      typeId,
      name,
      alternativeName,
      released,
      synopsis,
    }

    const media = await Media.findOrFail(mediaId)
    const category = await MediaCategory.findOrFail(categoryId)
    const categoryName = category.name
    const searchPayload = { mediaId: mediaId }

    await db.transaction(async (trx) => {
      media.useTransaction(trx)
      await media
        .merge({
          ...generalMediaData,
        })
        .save()

      await media.related('genres').sync(genreId)

      if (categoryName === 'Jeu vidéo') {
        await media.related('gameInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
      }
      if (categoryName === 'Film') {
        await media.related('movieInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
      }
      if (categoryName === 'Livre') {
        await media.related('bookInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
      }
      if (categoryName === 'Série') {
        await media.related('seriesInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
      }
      if (categoryName === 'Anime') {
        await media.related('animeInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
      }
    })

    return media
  }

  public async deleteOneMedia(mediaId: number) {
    const media = await Media.findOrFail(mediaId)
    const cover = await Cover.findBy('mediaId', mediaId)

    await media.delete()

    if (cover) {
      await this.coverService.deleteCoverFile({
        original: cover.originalCoverFilename,
        small: cover.smallCoverFilename,
        medium: cover.mediumCoverFilename,
        large: cover.largeCoverFilename,
      })
      await cover.delete()
    }
  }

  async getMediaList() {
    const mediaList = await Media.query()
      .preload('status')
      .preload('category')
      .preload('type')
      .preload('genres')
      .preload('contributors', (contributorsQuery) => {
        contributorsQuery.preload('role')
        contributorsQuery.preload('contributor')
      })
      .preload('gameInfo', (gamesQuery) => {
        gamesQuery.preload('gamePlatform')
      })
      .preload('movieInfo')
      .preload('bookInfo')
      .preload('seriesInfo')
      .preload('review')
      .preload('cover')

    const formattedMediaList = MediaFormatterFactory.formatMediaList(mediaList)

    return formattedMediaList
  }

  async getMedia(mediaId: number) {
    const media = await Media.findOrFail(mediaId)

    await media.load((loader) => {
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

    const formatedMedia = MediaFormatterFactory.formatMedia(media)

    return formatedMedia
  }
}
