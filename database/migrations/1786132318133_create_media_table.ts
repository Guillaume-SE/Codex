import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'media'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('format_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('formats')
        .onDelete('RESTRICT')
      table
        .integer('provider_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('providers')
        .onDelete('RESTRICT')
      table.string('api_id').notNullable()
      table.string('title').notNullable()
      table.string('poster_url').nullable()
      table.string('released').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.unique(['provider_id', 'api_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
