import type { IGenre } from '#interfaces/genre_interface'
import Genre from '#models/genre'
import MediaCategory from '#models/media_category'
import { inject } from '@adonisjs/core'

@inject()
export default class GenreService {
  public async addOneGenre(genre: IGenre) {
    const validSelectedCategory: MediaCategory | null = await MediaCategory.find(genre.categoryId)
    if (!validSelectedCategory) {
      throw new Error('Aucune catégorie ne correspond')
    }

    const matchingGenres = await Genre.query()
      .select('*')
      .from('genres')
      .whereIn(['name', 'categoryId'], [[genre.name, validSelectedCategory.id]])
    const isSelectedGenreAlreadyAdded = matchingGenres.length > 0
    if (isSelectedGenreAlreadyAdded) {
      throw new Error(`Ce genre a déjà été ajouté pour la catégorie ${validSelectedCategory.name}`)
    }

    const newGenre = await Genre.create(genre)

    return newGenre
  }

  public async updateOneGenre(genre: IGenre, genreId: number) {
    const existingGenre: Genre | null = await Genre.find(genreId)
    if (!existingGenre) {
      throw new Error('Aucun genre trouvé')
    }

    const matchingGenres = await Genre.query()
      .select('*')
      .from('genres')
      .whereIn(['name', 'categoryId'], [[genre.name, existingGenre.categoryId]])
    const isSelectedGenreAlreadyAdded = matchingGenres.length > 0
    if (isSelectedGenreAlreadyAdded) {
      throw new Error('Ce genre a déjà été ajouté pour cette catégorie')
    }

    const updatedGenre = await existingGenre.merge(genre).save()

    return updatedGenre
  }
}
