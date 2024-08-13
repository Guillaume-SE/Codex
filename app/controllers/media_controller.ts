import { IMedia, INewMediaPayload, IUpdatedMediaPayload } from '#interfaces/media_interface'
import Media from '#models/media'
import CoverService from '#services/cover_service'
import MediaService from '#services/media_service'
import { createMediaValidator, updateMediaValidator } from '#validators/media_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediasController {
  constructor(
    readonly mediaService: MediaService,
    readonly coverService: CoverService
  ) {}

  async addOneMedia({ request, response }: HttpContext) {
    try {
      const datas = await request.validateUsing(createMediaValidator)
      const {
        mediaParentId,
        categoryId,
        typeId,
        name,
        alternativeName,
        released,
        synopsis,
        genresIds,
        ...mediaSpecificInfos
      }: INewMediaPayload = datas

      const generalMediaInfos: IMedia = {
        mediaParentId,
        categoryId,
        typeId,
        name,
        alternativeName,
        released,
        synopsis,
      }
      const newMedia = await this.mediaService.addOneMedia(
        generalMediaInfos,
        genresIds,
        mediaSpecificInfos
      )
      return response.status(201).json(newMedia)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  async updateOneMedia({ params, response, request }: HttpContext) {
    const mediaId = params.mediaId
    try {
      const datas = await request.validateUsing(updateMediaValidator)
      const {
        mediaParentId,
        typeId,
        name,
        alternativeName,
        released,
        synopsis,
        genresIds,
        ...mediaSpecificInfos
      }: IUpdatedMediaPayload = datas

      const generalMediaInfos: IMedia = {
        mediaParentId,
        typeId,
        name,
        alternativeName,
        released,
        synopsis,
      }
      const media = await this.mediaService.updateOneMedia(
        mediaId,
        generalMediaInfos,
        genresIds,
        mediaSpecificInfos
      )
      return response.status(201).json(media)
    } catch (error) {
      return response.status(400).json({ error, customError: error.message })
    }
  }

  async deleteOneMedia({ params, response }: HttpContext) {
    const mediaId = params.mediaId

    try {
      const cover = await this.coverService.getOneCoverByMediaId(mediaId)
      await this.mediaService.deleteOneMedia(mediaId)
      await this.coverService.deleteCoverByFilenames(cover.resizedVersion, cover.rawVersion)
      return response.status(200)
    } catch (error) {
      return response.status(404).json(error)
    }
  }

  public async getAllMedia({ response }: HttpContext) {
    const medias = await Media.all()
    // const formattedMedia = datas.map((media) => ({
    // id: media.id,
    // parentId: media.mediaParentId,
    // category: media.mediaCategory.name,
    // type: media.mediaType.name,
    // name: media.name,
    // released: media.released,
    // synopsis: media.synopsis ? media.synopsis : null,
    // genres: media.genres.map((genre) => genre.name),
    // contributor: media.mediaProject,
    // contributorJob: media.mediaProject,
    // review: {
    //   reviewRating: media.review ? media.review.rating : null,
    //   reviewOpinion: media.review ? media.review.opinion : null,
    //   reviewIsFavorite: media.review ? media.review.isFavorite : null,
    //   reviewLastUpdate: media.review ? media.review.updatedAt : null,
    // },
    // cover: {
    //   coverResized: media.cover ? media.cover.resizedVersion : null,
    //   coverRaw: media.cover ? media.cover.rawVersion : null,
    // },
    // }))
    return response.status(201).json(medias)
  }

  public async getOneMediaById({ params, response }: HttpContext) {
    const mediaId = params.mediaId
    try {
      const validMedia = await Media.find(mediaId)
      if (!validMedia) {
        return
      }

      await validMedia.load((loader) => {
        loader
          .load('mediaCategory')
          .load('mediaType')
          .load('genres')
          .load('mediaProject', (contributorsQuery) => {
            contributorsQuery.preload('job')
            contributorsQuery.preload('contributor')
          })
          .load('review')
          .load('cover')
      })

      const formatedMedia = {
        id: validMedia.id,
        parentId: validMedia.mediaParentId,
        category: validMedia.mediaCategory.name,
        type: validMedia.mediaType.name,
        name: validMedia.name,
        released: validMedia.released,
        synopsis: validMedia.synopsis ? validMedia.synopsis : null,
        genres: validMedia.genres.map((genre) => genre.name),
        contributors: validMedia.mediaProject.reduce<Record<string, string[]>>((acc, project) => {
          const jobName = project.job?.name
          if (jobName) {
            if (!acc[jobName]) {
              acc[jobName] = []
            }
            const contributorName = project.contributor?.name
            if (contributorName) {
              acc[jobName].push(contributorName)
            }
          }
          return acc
        }, {}),
        review: {
          reviewRating: validMedia.review ? validMedia.review.rating : null,
          reviewOpinion: validMedia.review ? validMedia.review.opinion : null,
          reviewIsFavorite: validMedia.review ? validMedia.review.isFavorite : null,
          reviewLastUpdate: validMedia.review ? validMedia.review.updatedAt : null,
        },
        cover: {
          coverResized: validMedia.cover ? validMedia.cover.resizedVersion : null,
          coverRaw: validMedia.cover ? validMedia.cover.rawVersion : null,
        },
      }

      return response.status(201).json(formatedMedia)
    } catch (error) {
      return response.status(404).json(error)
    }
  }
}
