import type { IPaginated } from '#interfaces/paginated_interface'
import type { BaseModel } from '@adonisjs/lucid/orm'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class ListPresenter {
  public present<T extends InstanceType<typeof BaseModel>, U extends object>(
    paginatedData: ModelPaginatorContract<T>,
    mapperFunction: (item: T) => U
  ): IPaginated<U> {
    const meta = paginatedData.getMeta()
    const data = paginatedData.all().map(mapperFunction)

    return { meta, data }
  }
}
