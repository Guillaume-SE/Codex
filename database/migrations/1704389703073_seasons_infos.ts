import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'seasons_infos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
      .integer('media_id')
      .unsigned()
      .references('id')
      .inTable('medias')
      .notNullable()
      .onDelete('CASCADE')
      table.string('creator').notNullable()
      table.integer('length').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
