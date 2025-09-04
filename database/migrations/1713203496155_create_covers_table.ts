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
      table.string('cloudinary_identifier').notNullable()
      table.string('latest_version').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
