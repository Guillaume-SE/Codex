import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books_infos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('media_id')
        .unsigned()
        .references('id')
        .inTable('medias')
        .notNullable()
        .onDelete('CASCADE')
      table.string('author').notNullable()
      table.string('illustrator').nullable()
      table.string('editor').notNullable()
      table.integer('pages').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
