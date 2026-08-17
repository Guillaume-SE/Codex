import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'collection_media'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('collection_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('collections')
        .onDelete('CASCADE')
      table
        .integer('user_media_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('user_media')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.unique(['collection_id', 'user_media_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
