import { MediaService } from '#services/media_service'
import PresentedMediaDetailTransformer from '#transformers/presented_media_detail_transformer'
import UserMediaTransformer from '#transformers/user_media_transformer'
import { MediaCategory } from '#types/media'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MediaController {
  constructor(protected mediaService: MediaService) {}

  public async show({ params, inertia, auth }: HttpContext) {
    const { category, apiId } = params as {
      category: MediaCategory
      apiId: string
    }

    const { details, userProgress } = await this.mediaService.getMediaDetails(
      category,
      apiId,
      auth.user?.id
    )

    return inertia.render('media/show', {
      media: PresentedMediaDetailTransformer.transform(details),
      userProgress: userProgress ? UserMediaTransformer.transform(userProgress) : null,
    })
  }
}
