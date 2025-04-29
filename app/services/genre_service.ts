import Genre from '#models/genre'
import { updateGenreValidator } from '#validators/genre_validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type updatedData = Omit<Infer<typeof updateGenreValidator>, 'params'>

@inject()
export default class GenreService {
  public async storeOrUpdate(data: updatedData, tagId?: number | undefined) {
    let tag = new Genre()
    if (tagId) {
      tag = await Genre.findOrFail(tagId)
    }
    await tag.merge(data).save()
  }

  public async delete(genreId: number): Promise<void> {
    const genre = await Genre.findOrFail(genreId)

    await genre.delete()
  }
}
