import type { IGenre } from '#interfaces/genre_interface'
import Genre from '#models/genre'
import MediaCategory from '#models/media_category'
import { inject } from '@adonisjs/core'

@inject()
export default class GenreService {
  public async addOne(genre: IGenre) {
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

  public async updateOne(updatedGenre: IGenre, genreId: number) {
    const validSelectedGenre: Genre | null = await Genre.find(genreId)
    if (!validSelectedGenre) {
      throw new Error('Aucun genre trouvé')
    }

    const matchingGenres = await Genre.query()
      .select('*')
      .from('genres')
      .whereIn(['name', 'categoryId'], [[updatedGenre.name, validSelectedGenre.categoryId]])
    const isSelectedGenreAlreadyAdded = matchingGenres.length > 0
    if (isSelectedGenreAlreadyAdded) {
      throw new Error('Ce genre a déjà été ajouté pour cette catégorie')
    }

    await validSelectedGenre.merge(updatedGenre).save()

    return updatedGenre
  }

  public async deleteOne(genreId: number) {
    const validSelectedGenre: Genre | null = await Genre.find(genreId)
    if (!validSelectedGenre) {
      throw new Error("Le genre selectionné n'existe pas")
    }

    await validSelectedGenre.delete()
  }
}
