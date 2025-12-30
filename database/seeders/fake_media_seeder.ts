import { MediaFactory } from '#database/factories/media_factory'
import Media from '#models/media'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    const gamesReleased = await MediaFactory.apply('isGame')
      .apply('released')
      .with('gameInfo')
      .with('review')
      .createMany(80)

    const moviesReleased = await MediaFactory.apply('isMovie')
      .apply('released')
      .with('movieInfo')
      .with('review')
      .createMany(80)

    const seriesReleased = await MediaFactory.apply('isSeries')
      .apply('released')
      .with('seriesInfo')
      .with('review')
      .createMany(80)

    const animeReleased = await MediaFactory.apply('isAnime')
      .apply('released')
      .with('animeInfo')
      .with('review')
      .createMany(80)

    const booksReleased = await MediaFactory.apply('isBook')
      .apply('released')
      .with('bookInfo')
      .with('review')
      .createMany(80)

    // without review and cover
    const gamesReleasingSoon = await MediaFactory.apply('isGame')
      .apply('releasingSoon')
      .with('gameInfo')
      .createMany(5)

    const moviesReleasingSoon = await MediaFactory.apply('isMovie')
      .apply('releasingSoon')
      .with('movieInfo')
      .createMany(5)

    const seriesReleasingSoon = await MediaFactory.apply('isSeries')
      .apply('releasingSoon')
      .with('seriesInfo')
      .createMany(5)

    const animeReleasingSoon = await MediaFactory.apply('isAnime')
      .apply('releasingSoon')
      .with('animeInfo')
      .createMany(5)

    const booksReleasingSoon = await MediaFactory.apply('isBook')
      .apply('releasingSoon')
      .with('bookInfo')
      .createMany(5)

    const mediaOptions = [
      { genres: [1, 7, 9, 10], contributorRoles: [4, 5], media: gamesReleased },
      { genres: [1, 7, 9, 10], contributorRoles: [4, 5], media: gamesReleasingSoon },
      { genres: [2, 4, 5, 7], contributorRoles: [1, 2], media: moviesReleased },
      { genres: [2, 4, 5, 7], contributorRoles: [1, 2], media: moviesReleasingSoon },
      { genres: [4, 5, 7, 8], contributorRoles: [3], media: seriesReleased },
      { genres: [4, 5, 7, 8], contributorRoles: [3], media: seriesReleasingSoon },
      { genres: [2, 3, 5, 7], contributorRoles: [6], media: animeReleased },
      { genres: [2, 3, 5, 7], contributorRoles: [6], media: animeReleasingSoon },
      { genres: [2, 6, 7, 8], contributorRoles: [7, 8], media: booksReleased },
      { genres: [2, 6, 7, 8], contributorRoles: [7, 8], media: booksReleasingSoon },
    ]

    for (const { genres, media } of mediaOptions) {
      await this.#attachGenres(genres, media)
    }
  }

  async #attachGenres(genreIds: number[], mediaList: Media[]) {
    for (const media of mediaList) {
      const randomGenreIds = this.#getRandomGenres(genreIds)
      await media.related('genres').sync(randomGenreIds)
    }
  }

  #getRandomElements<T>(elements: T[], numElements: number): T[] {
    const shuffled = elements.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, numElements)
  }

  #getRandomGenres(genreIds: number[]) {
    const numGenres = Math.floor(Math.random() * (genreIds.length + 1))
    return this.#getRandomElements(genreIds, numGenres)
  }
}
