import { AnimeInfoFactory } from '#database/factories/anime_info_factory'
import { BookInfoFactory } from '#database/factories/book_info_factory'
import { CoverFactory } from '#database/factories/cover_factory'
import { GameInfoFactory } from '#database/factories/game_info_factory'
import { MovieInfoFactory } from '#database/factories/movie_info_factory'
import { ReviewFactory } from '#database/factories/review_factory'
import { SeriesInfoFactory } from '#database/factories/series_info_factory'
import MediaCategoriesEnum from '#enums/media_categories'
import MediaStatusesEnum from '#enums/media_statuses'
import Media from '#models/media'
import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'

export const MediaFactory = factory
  .define(Media, async ({ faker }) => {
    return {
      name: faker.music.songName(),
      synopsis:
        faker.helpers.maybe(() => faker.lorem.paragraph(), {
          probability: 0.8,
        }) ?? null,
    }
  })
  .state('isGame', (row, { faker }) => {
    row.categoryId = MediaCategoriesEnum.GAME
    row.typeId = faker.helpers.arrayElement([1, 2])
  })
  .state('isMovie', (row) => {
    row.categoryId = MediaCategoriesEnum.MOVIE
    row.typeId = 3
  })
  .state('isSeries', (row, { faker }) => {
    row.categoryId = MediaCategoriesEnum.SERIES
    row.typeId = faker.helpers.arrayElement([4, 5])
  })
  .state('isAnime', (row, { faker }) => {
    row.categoryId = MediaCategoriesEnum.ANIME
    row.typeId = faker.helpers.arrayElement([3, 4])
  })
  .state('isBook', (row, { faker }) => {
    row.categoryId = MediaCategoriesEnum.BOOK
    row.typeId = faker.helpers.arrayElement([6, 7])
  })
  .state('released', (row, { faker }) => {
    row.statusId = faker.helpers.arrayElement([
      MediaStatusesEnum.EN_COURS,
      MediaStatusesEnum.TERMINE,
      MediaStatusesEnum.EN_PAUSE,
      MediaStatusesEnum.ARRETE,
      MediaStatusesEnum.PREVU,
    ])
    row.released = DateTime.fromJSDate(faker.date.past())
  })
  .state('releasingSoon', (row, { faker }) => {
    row.statusId = MediaStatusesEnum.PREVU
    row.released =
      faker.helpers.maybe(() => DateTime.fromJSDate(faker.date.soon({ days: 7 })), {
        probability: 0.7,
      }) ?? null
  })
  .relation('animeInfo', () => AnimeInfoFactory)
  .relation('seriesInfo', () => SeriesInfoFactory)
  .relation('gameInfo', () => GameInfoFactory)
  .relation('bookInfo', () => BookInfoFactory)
  .relation('movieInfo', () => MovieInfoFactory)
  .relation('review', () => ReviewFactory)
  .relation('cover', () => CoverFactory)
  .build()
