import Drive from "@ioc:Adonis/Core/Drive"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Database from "@ioc:Adonis/Lucid/Database"
import Cover from "App/Models/Cover"
import Media from "App/Models/Media"
import SeasonInfo from "App/Models/SeasonInfo"
import { seasonTypes } from "App/Tools/Enums/MediaTypes"
import {
  createAlternativeText,
  defaultCoverAltText,
} from "App/Tools/Functions/generateCoverAltText"
import { createFileName, defaultCoverFilename } from "App/Tools/Functions/generateCoverName"
import { standardize } from "App/Tools/Functions/standardizeCover"
import CreateSeasonValidator from "App/Validators/CreateSeasonValidator"
import UpdateSeasonValidator from "App/Validators/UpdateSeasonValidator"

export default class SeasonsController {
  public async addOneSeason({ request, response }: HttpContextContract) {
    const payloadValidation = await request.validate(CreateSeasonValidator)
    const {
      mediaParentId,
      type,
      cover,
      name,
      released,
      synopsis,
      status,
      rating,
      opinion,
      isFavorite,
      ...specificSeasonInfos
    } = payloadValidation

    const searchIfSeasonAlreadyExist = await Media.query()
      .from("medias")
      .where("type", type)
      .andWhere("name", name)
      .andWhere("released", released)
    const seasonAlreadyExist = searchIfSeasonAlreadyExist.length > 0

    if (seasonAlreadyExist) {
      return response.status(400).json({
        message: "Cette saison a déjà été ajoutée !",
        media: searchIfSeasonAlreadyExist,
      })
    }
    const mediaIsSeasonType = seasonTypes.includes(type)
    if (!mediaIsSeasonType) {
      return response.status(400).json({
        message: "Le type du media ne correspond pas à la catégorie saison",
      })
    }

    // manage covers
    let coverName: string = defaultCoverFilename
    let coverAltText: string = defaultCoverAltText
    if (cover) {
      coverName = createFileName()
      coverAltText = createAlternativeText(type, name)
      const coverFormated = standardize(cover.tmpPath)
      await Drive.put(`covers/${coverName}`, await coverFormated, {
        contentType: `image/jpg`,
      })
    }

    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }
    const coverInfo = { filename: coverName, alternative: coverAltText }
    const reviewInfo = { status, rating, opinion, isFavorite }

    const trx = await Database.transaction()
    try {
      const newMedia = await Media.create(generalMediaInfos)
      await newMedia.related("seasonInfo").create(specificSeasonInfos)
      await newMedia.related("cover").create(coverInfo)
      await newMedia.related("review").create(reviewInfo)

      await trx.commit()
      return response.status(201).json({ media: newMedia, cover: coverInfo, review: reviewInfo })
    } catch (error) {
      await trx.rollback()
      if (coverName !== defaultCoverFilename) {
        await Drive.delete(`covers/${coverName}`)
      }
      return response.status(400).json(error)
    }
  }

  public async updateOneSeason({ request, params, response }: HttpContextContract) {
    const mediaId = params.id
    const mediaToUpdate = await Media.find(mediaId)
    const mediaDoesntExist = !mediaToUpdate
    if (mediaDoesntExist) {
      return response.status(404).json("Aucun media ne correspond à cet identifiant")
    }

    const actualCover = await Cover.findBy("media_id", mediaId)
    const coverDoesntExist = !actualCover
    if (coverDoesntExist) {
      return response.status(404).json("Aucune cover liée à ce media n'a été trouvée")
    }

    const seasonToUpdate = await SeasonInfo.findBy("mediaId", mediaId)
    const seasonDoesntExist = !seasonToUpdate
    if (seasonDoesntExist) {
      return response.status(404).json("Aucune saison ne correspond à ce media")
    }

    const payloadValidation = await request.validate(UpdateSeasonValidator)
    const { mediaParentId, type, name, released, synopsis, ...specificSeasonInfos } =
      payloadValidation
    const generalMediaInfos = { mediaParentId, type, name, released, synopsis }

    const mediaSeasonType = seasonTypes.includes(type)
    if (!mediaSeasonType) {
      return response.status(400).json({
        message: "Le type ne correspond pas à la catégorie saison",
      })
    }

    // update cover alt text
    const mediaNameAsChanged = mediaToUpdate.name !== payloadValidation.name
    const newCoverAltText = createAlternativeText(type, name)

    const trx = await Database.transaction()

    try {
      mediaToUpdate.merge(generalMediaInfos).save()
      seasonToUpdate.merge(specificSeasonInfos).save()
      if (mediaNameAsChanged) {
        actualCover.merge({ alternative: newCoverAltText }).save()
      }

      await trx.commit()
      return response
        .status(201)
        .json({ media: mediaToUpdate, seasonInfos: seasonToUpdate, cover: actualCover })
    } catch (error) {
      await trx.rollback()
      return response.status(400).json(error)
    }
  }

  public async getAllSeasons({ response }: HttpContextContract) {
    const datas = await Media.query()
      .from("medias")
      .join("seasons_infos", "medias.id", "=", "seasons_infos.media_id")
      .join("reviews", "medias.id", "=", "reviews.media_id")
      .join("covers", "medias.id", "=", "covers.media_id")
      .select(
        "medias.id",
        "medias.media_parent_id",
        "medias.name",
        "medias.type",
        "medias.released",
        "medias.synopsis",
        "covers.filename",
        "covers.alternative",
        "seasons_infos.creator",
        "seasons_infos.length",
        "reviews.status",
        "reviews.rating",
        "reviews.opinion",
        "reviews.is_favorite",
        "reviews.created_at",
        "reviews.updated_at"
      )

    const seasons = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        alternative,
        creator,
        length,
        status,
        rating,
        opinion,
        is_favorite: isFavorite,
        created_at: createdAt,
        updated_at: updatedAt,
      } = data.$extras
      return {
        season: {
          id,
          mediaParentId,
          name,
          type,
          released,
          synopsis,
          creator,
          length,
        },
        cover: {
          filename,
          alternative,
        },
        review: {
          status,
          rating,
          opinion,
          isFavorite,
          createdAt,
          updatedAt,
        },
      }
    })
    return response.status(201).json(seasons)
  }

  public async getOneSeasonByMediaId({ params, response }: HttpContextContract) {
    const mediaId = params.mediaId
    const datas = await Media.query()
      .from("medias")
      .join("seasons_infos", "medias.id", "=", "seasons_infos.media_id")
      .join("reviews", "medias.id", "=", "reviews.media_id")
      .join("covers", "medias.id", "=", "covers.media_id")
      .select(
        "medias.id",
        "medias.media_parent_id",
        "medias.name",
        "medias.type",
        "medias.released",
        "medias.synopsis",
        "covers.filename",
        "covers.alternative",
        "seasons_infos.creator",
        "seasons_infos.length",
        "reviews.status",
        "reviews.rating",
        "reviews.opinion",
        "reviews.is_favorite",
        "reviews.created_at",
        "reviews.updated_at"
      )
      .where("medias.id", "=", mediaId)

    const noSeasonFound = datas.length === 0
    if (noSeasonFound) {
      return response.status(404).json("Aucune saison correspondant n'a été trouvée")
    }
    const season = datas.map((data) => {
      const { id, mediaParentId, name, type, released, synopsis } = data
      const {
        filename,
        alternative,
        creator,
        length,
        status,
        rating,
        opinion,
        is_favorite: isFavorite,
        created_at: createdAt,
        updated_at: updatedAt,
      } = data.$extras

      return {
        season: {
          id,
          mediaParentId,
          name,
          type,
          released,
          synopsis,
          creator,
          length,
        },
        cover: {
          filename,
          alternative,
        },
        review: {
          status,
          rating,
          opinion,
          isFavorite,
          createdAt,
          updatedAt,
        },
      }
    })
    return response.status(200).json(season)
  }
}
