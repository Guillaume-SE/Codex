import { ListPresenter } from '#classes/ListPresenter'
import type BookPublisher from '#models/book_publisher'
import BookPublisherService from '#services/book_publisher_service'
import {
  createBookPublisherValidator,
  updateBookPublisherValidator,
} from '#validators/book_publisher_validator'
import { searchValidator } from '#validators/dashboard_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BookPublishersController {
  constructor(private bookPublisherService: BookPublisherService) {}

  async showManage({ inertia, request }: HttpContext) {
    const page = request.input('page')
    const filters = await request.validateUsing(searchValidator)
    const publisherList = await BookPublisherService.getFiltered(filters, page, 10)

    publisherList.baseUrl('/admin/publishers/manage')

    const publisherMapper = (publisher: BookPublisher) => {
      return {
        id: publisher.id,
        name: publisher.name,
        count: publisher.$extras.bookInfo_count,
      }
    }

    const listPresenter = new ListPresenter()
    const presentedPublisherList = listPresenter.present(publisherList, publisherMapper)

    return inertia.render('admin/ManageBookPublisher', {
      publisherList: presentedPublisherList,
    })
  }

  async store({ request, session, response }: HttpContext) {
    const data = await request.validateUsing(createBookPublisherValidator)
    await this.bookPublisherService.storeOrUpdate(data)

    session.flash('success', `${data.name} ajouté avec succès`)
    return response.redirect().toRoute('publishers.index')
  }

  async update({ params, request, session, response }: HttpContext) {
    const data = await request.validateUsing(updateBookPublisherValidator, {
      meta: { params: params },
    })
    await this.bookPublisherService.storeOrUpdate(data, params.publisherId)

    session.flash('success', `${data.name} modifié avec succès`)
    return response.redirect().toRoute('publishers.index')
  }

  public async destroy({ params, session, response }: HttpContext) {
    const publisherDeleted = await this.bookPublisherService.delete(params.publisherId)

    session.flash('success', `${publisherDeleted} supprimé avec succès`)
    return response.redirect().toRoute('publishers.index')
  }
}
