import Genre from '#models/genre'
import { updateGenreValidator } from '#validators/genre_validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type updatedData = Infer<typeof updateGenreValidator>

@inject()
export default class GenreService {
  public async storeOrUpdate(data: updatedData, genreId?: number | undefined) {
    let genre = new Genre()
    if (genreId) {
      genre = await Genre.findOrFail(genreId)
    }
    await genre.merge(data).save()
  }

  public async delete(genreId: number): Promise<string> {
    const genre = await Genre.findOrFail(genreId)
    const genreName = genre.name

    await genre.delete()

    return genreName
  }
}
