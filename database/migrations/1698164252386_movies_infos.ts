import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'movies_infos'

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
      table.string('director').notNullable()
      table.string('screenwriter').notNullable()
      table.integer('duration').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
