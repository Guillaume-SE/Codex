import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'media'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('media_parent_id')
        .unsigned()
        .references('id')
        .inTable(this.tableName)
        .nullable()
        .onDelete('SET NULL')
      table.string('type').notNullable()
      table.string('name').notNullable()
      table.string('released').notNullable()
      table.unique(['type', 'name', 'released'])
      table.text('synopsis').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
