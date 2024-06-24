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
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
        .nullable()
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('media_categories')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .notNullable()
      table
        .integer('type_id')
        .unsigned()
        .references('id')
        .inTable('media_types')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .notNullable()
      table.string('name').notNullable()
      table.string('released').notNullable()
      table.text('synopsis').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
