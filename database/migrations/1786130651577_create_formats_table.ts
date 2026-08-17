import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'formats'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table
        .integer('category_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('RESTRICT')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.unique(['name', 'category_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
