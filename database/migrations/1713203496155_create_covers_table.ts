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
        .notNullable()
        .onDelete('CASCADE')
      table.string('filename').notNullable()
      table.string('filename_raw').nullable()
      table.string('alternative').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
