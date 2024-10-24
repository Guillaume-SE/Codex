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
  public async store(data: IMediaPayload) {
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
    } = data

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

    const media = new Media()
    await db.transaction(async (trx) => {
      media.useTransaction(trx)
      await media
        .merge({
          ...generalMediaData,
        })
        .save()

      await media.related('genres').sync(genreId)

      if (selectedCategoryName === 'game') {
        await media.related('gameInfo').create(categoryRelatedMediaData)
      }
      if (selectedCategoryName === 'book') {
        await media.related('bookInfo').create(categoryRelatedMediaData)
      }
      if (selectedCategoryName === 'movie') {
        await media.related('movieInfo').create(categoryRelatedMediaData)
      }
      if (selectedCategoryName === 'series') {
        await media.related('seriesInfo').create(categoryRelatedMediaData)
      }
      if (selectedCategoryName === 'anime') {
        await media.related('animeInfo').create(categoryRelatedMediaData)
      }
    })
    return media
  }

  public async update(data: IMediaPayload, mediaId: number) {
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
    } = data

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

      if (categoryName === 'game') {
        await media.related('gameInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
      }
      if (categoryName === 'movie') {
        await media.related('movieInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
      }
      if (categoryName === 'book') {
        await media.related('bookInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
      }
      if (categoryName === 'series') {
        await media.related('seriesInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
      }
      if (categoryName === 'anime') {
        await media.related('animeInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
      }
    })

    return media
  }

  public async delete(mediaId: number) {
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

  async getAll() {
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
      .preload('seriesInfo')
      .preload('animeInfo')
      .preload('bookInfo')
      .preload('review')
      .preload('cover')

    const formattedMediaList = MediaFormatterFactory.formatMediaList(mediaList)

    return formattedMediaList
  }

  async getOne(mediaId: number) {
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
        .load('gameInfo', (gamesQuery) => {
          gamesQuery.preload('gamePlatform')
        })
        .load('movieInfo')
        .load('seriesInfo')
        .load('animeInfo')
        .load('bookInfo')
        .load('cover')
        .load('review')
    })

    const formatedMedia = MediaFormatterFactory.formatMedia(media)

    return formatedMedia
  }

  async getByCategory(category: string) {
    const mediaList = await Media.query()
      .whereHas('category', (categoryQuery) => {
        categoryQuery.where('name', category)
      })
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
      .preload('seriesInfo')
      .preload('animeInfo')
      .preload('bookInfo')
      .preload('review')
      .preload('cover')

    const formattedMediaList = MediaFormatterFactory.formatMediaList(mediaList)

    return formattedMediaList
  }
}
