import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'covers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('media_id')
        .unsigned()
        .references('id')
        .inTable('media')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      table.string('original_cover_filename').notNullable()
      table.string('small_cover_filename').notNullable()
      table.string('medium_cover_filename').notNullable()
      table.string('large_cover_filename').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
