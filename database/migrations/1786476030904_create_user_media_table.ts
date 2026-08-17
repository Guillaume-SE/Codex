import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_media'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('media_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('media')
        .onDelete('CASCADE')
      table
        .integer('status_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('statuses')
        .onDelete('RESTRICT')
      table.jsonb('progression').notNullable().defaultTo('{}')
      table.integer('rating').unsigned().nullable()
      table.text('sidenote').nullable()
      table.boolean('is_favorite').notNullable().defaultTo(false)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.unique(['user_id', 'media_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
