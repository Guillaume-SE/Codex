import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'series_infos'

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
      table.integer('series_season_length').unsigned().nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
