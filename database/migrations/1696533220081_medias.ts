import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'medias';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('media_parent_id')
        .unsigned()
        .references('id')
        .inTable(this.tableName)
        .nullable()
      table
        .integer('cover_id')
        .unsigned()
        .references('id')
        .inTable('covers')
        .nullable()
      table.string('category', 30).notNullable()
      table.string('type', 30).nullable()
      table.string('name', 255).notNullable()
      table.string('released', 20).notNullable().defaultTo('N/A')
      table.text('synopsis').notNullable().defaultTo('N/A')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
