import type { IGenre } from '#interfaces/genre_interface'
import Genre from '#models/genre'
import { inject } from '@adonisjs/core'

@inject()
export default class GenreService {
  public async store(genre: IGenre) {
    const newGenre = await Genre.create(genre)

    return newGenre
  }

  public async update(updatedGenre: IGenre, genreId: number) {
    const genre = await Genre.findOrFail(genreId)

    await genre.merge(updatedGenre).save()

    return genre
  }

  public async delete(genreId: number): Promise<void> {
    const genre = await Genre.findOrFail(genreId)

    await genre.delete()
  }
}
