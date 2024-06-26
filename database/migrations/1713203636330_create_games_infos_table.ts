import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'games_infos'

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
      table.string('developer').notNullable()
      table.string('publisher').notNullable()
      table.string('platform').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
