import Genre from '#models/genre'
import { updateGenreValidator } from '#validators/genre_validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type updatedData = Infer<typeof updateGenreValidator>

@inject()
export default class GenreService {
  public async storeOrUpdate(data: updatedData, genreId?: number | undefined) {
    const genre = genreId ? await Genre.findOrFail(genreId) : new Genre()
    await genre.merge(data).save()
  }

  public async delete(genreId: number): Promise<string> {
    const genre = await Genre.findOrFail(genreId)
    const genreName = genre.name

    await genre.delete()

    return genreName
  }

  static async getFiltered(filters: { search?: string }, page: number = 1, results: number = 10) {
    const mediaQuery = await Genre.query()
      .if(filters.search, (q) => {
        q.where((subQuery) => {
          subQuery.where('name', 'like', `%${filters.search}%`)
        })
      })
      .withCount('media')
      .orderBy('name', 'asc')
      .paginate(page, results)

    return mediaQuery
  }
}
