import Cover from '#models/cover'
import Media from '#models/media'
import MediaCategory from '#models/media_category'
import CoverService from '#services/cover_service'
import type { MediaCategories } from '#types/MediaCategories'
import {
  createMediaValidator,
  showByCategoryMediaValidator,
  updateMediaValidator,
} from '#validators/media_validator'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'

interface IMediaSortOption {
  value: string
  text: string
  column: string
  dir: 'asc' | 'desc' | undefined
}

type updatedData = Omit<Infer<typeof updateMediaValidator>, 'params'>

@inject()
export default class MediaService {
  constructor(protected coverService: CoverService) {}
  public async store(data: Infer<typeof createMediaValidator>) {
    const {
      statusId,
      categoryId,
      typeId,
      name,
      alternativeName,
      released,
      synopsis,
      tagId,
      genreId,
      ...categoryRelatedMediaData
    } = data

    const generalMediaData = {
      statusId,
      categoryId,
      typeId,
      name,
      alternativeName,
      released,
      synopsis,
      tagId,
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
        await media.related('gameInfo').create({ platformId: categoryRelatedMediaData.platformId })
      } else if (selectedCategoryName === 'movie') {
        await media.related('movieInfo').create({ duration: categoryRelatedMediaData.duration })
      } else if (selectedCategoryName === 'series') {
        await media
          .related('seriesInfo')
          .create({ seriesSeasonLength: categoryRelatedMediaData.seriesSeasonLength })
      } else if (selectedCategoryName === 'anime') {
        await media
          .related('animeInfo')
          .create({ animeSeasonLength: categoryRelatedMediaData.animeSeasonLength })
      } else if (selectedCategoryName === 'book') {
        await media.related('bookInfo').create({ pages: categoryRelatedMediaData.pages })
      }
    })
    return media
  }

  public async update(data: updatedData, mediaId: number) {
    const {
      statusId,
      categoryId,
      typeId,
      name,
      alternativeName,
      released,
      synopsis,
      tagId,
      genreId,
      ...categoryRelatedMediaData
    } = data

    const generalMediaData = {
      statusId,
      categoryId,
      typeId,
      name,
      alternativeName,
      released,
      synopsis,
      tagId,
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
      } else if (categoryName === 'movie') {
        await media.related('movieInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
      } else if (categoryName === 'series') {
        await media.related('seriesInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
      } else if (categoryName === 'anime') {
        await media.related('animeInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
      } else if (categoryName === 'book') {
        await media.related('bookInfo').updateOrCreate(searchPayload, categoryRelatedMediaData)
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

  static sortOptions: IMediaSortOption[] = [
    { value: 'created_desc', text: 'Ajouts récents', column: 'id', dir: 'desc' },
    { value: 'created_asc', text: 'Ajouts plus anciens', column: 'id', dir: 'asc' },
    { value: 'name_asc', text: 'Nom (de A à Z)', column: 'name', dir: 'asc' },
    { value: 'name_desc', text: 'Nom (de Z à A)', column: 'name', dir: 'desc' },
    { value: 'rating_desc', text: 'Meilleures notes', column: 'reviews.rating', dir: 'desc' },
    { value: 'rating_asc', text: 'Moins bonnes notes', column: 'reviews.rating', dir: 'asc' },
  ]

  static async getFiltered(
    category: MediaCategories,
    filters: Infer<typeof showByCategoryMediaValidator>,
    page: number = 1
  ) {
    const sort =
      this.sortOptions.find((option) => option.value === filters.sortBy) || this.sortOptions[0]

    const mediaQuery = await Media.query()
      .whereHas('category', (subQuery) => {
        subQuery.where('name', category)
      })
      // searchbar term
      .if(filters.search, (q) => {
        q.where((subQuery) => {
          subQuery
            .where('name', 'like', `%${filters.search}%`)
            .orWhere('alternative_name', 'like', `%${filters.search}%`)
        })
      })
      .if(filters.status, (q) => {
        q.where((subQuery) => {
          subQuery.whereIn('status_id', filters.status!)
        })
      })
      .if(filters.types, (q) => {
        q.where((subQuery) => {
          subQuery.whereIn('type_id', filters.types!)
        })
      })
      .if(filters.genres, (q) => {
        q.whereHas('genres', (subQuery) => {
          subQuery.whereIn('genre_id', filters.genres!)
        })
      })
      .if(filters.platforms, (q) => {
        q.whereHas('gameInfo', (subQuery) => {
          subQuery.whereIn('platform_id', filters.platforms!)
        })
      })
      .if(filters.duration, (q) => {
        q.whereHas('movieInfo', (subQuery) => {
          subQuery.where('duration', '<=', filters.duration!)
        })
      })
      .if(filters.favorite, (q) => {
        q.whereHas('review', (subQuery) => {
          subQuery.where('is_favorite', '=', filters.favorite!)
        })
      })
      .if(['rating_asc', 'rating_desc'].includes(sort.value), (query) => {
        query.join('reviews', 'reviews.id', 'media.id').select('media.*')
      })
      .preload('status')
      .preload('category')
      .preload('type')
      .preload('tag')
      .preload('genres')
      .preload('gameInfo', (gamesQuery) => {
        gamesQuery.preload('gamePlatform')
      })
      .preload('movieInfo')
      .preload('seriesInfo')
      .preload('animeInfo')
      .preload('bookInfo')
      .preload('review')
      .preload('cover')
      .orderBy(sort.column, sort.dir)
      .paginate(page, 10)

    return mediaQuery
  }

  async getOne(mediaId: number) {
    const media = await Media.findOrFail(mediaId)

    await media.load((loader) => {
      loader
        .load('status')
        .load('category')
        .load('type')
        .load('tag')
        .load('genres')
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

    return media
  }

  async getTagRelated(category: string, mediaId: number, tag: string) {
    const mediaList = await Media.query()
      .whereNot('id', mediaId)
      .whereHas('category', (query) => {
        query.where('name', category)
      })
      .andWhereHas('tag', (query) => {
        query.where('name', tag)
      })
      .orderByRaw('RAND()')
      .limit(10)
      .preload('status')
      .preload('category')
      .preload('type')
      .preload('tag')
      .preload('genres')
      .preload('review')
      .preload('cover')

    return mediaList
  }

  async getLastAdded(category: string, limit: number) {
    const mediaList = await Media.query()
      .whereHas('category', (query) => {
        query.where('name', category)
      })
      .orderBy('id', 'desc')
      .limit(limit)
      .preload('status')
      .preload('category')
      .preload('type')
      .preload('tag')
      .preload('genres')
      .preload('review')
      .preload('cover')

    return mediaList
  }
}
