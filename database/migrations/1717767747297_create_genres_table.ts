import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'genres'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('media_categories')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .notNullable()
      table.string('name').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
