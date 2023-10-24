import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'medias'

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
        .notNullable()
        table.string('category', 30).notNullable()
        table.string('type', 30).nullable()
        table.string('name', 255).notNullable()
      // table.string('author', 50).nullable()
      // table.string('illustrator', 50).nullable()
      table.string('released', 20).nullable()
      table.text('synopsis').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
