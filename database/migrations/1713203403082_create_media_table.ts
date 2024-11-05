import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'media'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('status_id')
        .unsigned()
        .references('id')
        .inTable('media_statuses')
        .onUpdate('CASCADE')
        .notNullable()
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('media_categories')
        .onUpdate('CASCADE')
        .notNullable()
      table
        .integer('type_id')
        .unsigned()
        .references('id')
        .inTable('media_types')
        .onUpdate('CASCADE')
        .notNullable()
      table.string('name').notNullable()
      table.string('alternative_name').nullable()
      table.string('released').nullable()
      table.text('synopsis').nullable()
      table
        .integer('tag_id')
        .unsigned()
        .references('id')
        .inTable('tags')
        .onUpdate('CASCADE')
        .notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
