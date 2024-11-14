import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'category_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('media_categories')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      table
        .integer('type_id')
        .unsigned()
        .references('id')
        .inTable('media_types')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
