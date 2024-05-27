import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'genres'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('category').notNullable()
      table.unique(['name', 'category'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
