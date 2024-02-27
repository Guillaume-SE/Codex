import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'books_infos'

  public async up() {
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
      table.string('illustrator').notNullable()
      table.string('editor').notNullable()
      table.integer('pages').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
