import Cover from '#models/cover'
import Media from '#models/media'
import MediaCategory from '#models/media_category'
import CoverService from '#services/cover_service'
import type { MediaCategories } from '#types/MediaCategories'
import { mediaValidator } from '#validators/media_validator'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'

interface IMediaSortOption {
  value: string
  text: string
  column: string
  dir: 'asc' | 'desc' | undefined
}

interface IFilters {
  params?: { categoryName: string }
  search?: string
  sortBy?: string
  status?: number[]
  types?: number[]
  genres?: number[]
  platforms?: number[]
  duration?: number | null
  publishers?: number[]
  favorite?: boolean
}

type updatedData = Infer<typeof mediaValidator>

interface ICategoryConfig {
  relation: string
  dataKeys: (keyof updatedData)[]
}

@inject()
export default class MediaService {
  constructor(protected coverService: CoverService) {}

  public async manageOne(data: updatedData, mediaId?: number) {
    const categoryInfoMap: Record<string, ICategoryConfig> = {
      game: { relation: 'gameInfo', dataKeys: ['platformId'] },
      movie: { relation: 'movieInfo', dataKeys: ['duration'] },
      series: { relation: 'seriesInfo', dataKeys: ['seriesSeasonLength'] },
      anime: { relation: 'animeInfo', dataKeys: ['animeSeasonLength'] },
      book: { relation: 'bookInfo', dataKeys: ['publisherId'] },
    }

    const {
      genreId,
      platformId,
      duration,
      seriesSeasonLength,
      animeSeasonLength,
      publisherId,
      ...generalMediaData
    } = data

    const selectedCategory = await MediaCategory.findOrFail(generalMediaData.categoryId)
    let media = mediaId ? await Media.findOrFail(mediaId) : new Media()

    await db.transaction(async (trx) => {
      media.useTransaction(trx)

      await media.merge(generalMediaData).save()
      await media.related('genres').sync(genreId)

      // Look up the config for the current category
      const categoryConfig = categoryInfoMap[selectedCategory.name]

      if (categoryConfig) {
        const { relation, dataKeys } = categoryConfig
        const relatedData: Record<string, any> = {}
        for (const key of dataKeys) {
          if (data[key as keyof typeof data] !== undefined) {
            relatedData[key] = data[key as keyof typeof data]
          }
        }

        await media.related(relation as any).updateOrCreate({ mediaId: media.id }, relatedData)
      }
    })

    return media
  }

  public async delete(mediaId: number): Promise<string> {
    const media = await Media.findOrFail(mediaId)
    const mediaName = media.name
    const cover = await Cover.findBy('mediaId', mediaId)

    await media.delete()

    if (cover) {
      await this.coverService.deleteFile({
        original: cover.originalCoverFilename,
        small: cover.smallCoverFilename,
        medium: cover.mediumCoverFilename,
        large: cover.largeCoverFilename,
      })
      await cover.delete()
    }

    return mediaName
  }

  static sortOptions: IMediaSortOption[] = [
    { value: 'created_desc', text: 'Ajouts récents', column: 'created_at', dir: 'desc' },
    { value: 'created_asc', text: 'Ajouts plus anciens', column: 'created_at', dir: 'asc' },
    { value: 'name_asc', text: 'Nom (de A à Z)', column: 'name', dir: 'asc' },
    { value: 'name_desc', text: 'Nom (de Z à A)', column: 'name', dir: 'desc' },
    { value: 'rating_desc', text: 'Meilleures notes', column: 'reviews.rating', dir: 'desc' },
    { value: 'rating_asc', text: 'Moins bonnes notes', column: 'reviews.rating', dir: 'asc' },
  ]

  static async getFiltered(
    filters: IFilters,
    page: number = 1,
    results: number = 10,
    category?: MediaCategories
  ) {
    const sort =
      this.sortOptions.find((option) => option.value === filters.sortBy) || this.sortOptions[0]

    const mediaQuery = await Media.query()
      .if(category, (q) => {
        q.whereHas('category', (subQuery) => {
          subQuery.where('name', category!)
        })
      })
      // searchbar term
      .if(filters.search, (q) => {
        q.where((subQuery) => {
          subQuery.where('name', 'like', `%${filters.search}%`)
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
      .if(filters.publishers, (q) => {
        q.whereHas('bookInfo', (subQuery) => {
          subQuery.whereIn('publisher_id', filters.publishers!)
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
      .paginate(page, results)

    return mediaQuery
  }

  async getOne(mediaId: number) {
    const media = await Media.findOrFail(mediaId)

    await media.load((loader) => {
      loader
        .load('status')
        .load('category')
        .load('type')
        .load('genres')
        .load('gameInfo', (q) => {
          q.preload('gamePlatform')
        })
        .load('movieInfo')
        .load('seriesInfo')
        .load('animeInfo')
        .load('bookInfo', (q) => {
          q.preload('bookPublisher')
        })
        .load('cover')
        .load('review')
    })

    return media
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
      .preload('genres')
      .preload('review')
      .preload('cover')

    return mediaList
  }
}
