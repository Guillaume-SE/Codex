import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('media_id')
        .unsigned()
        .references('id')
        .inTable('medias')
        .onDelete('CASCADE')
        .notNullable()
      table.string('status').notNullable()
      table.integer('rating').unsigned().nullable()
      table.string('opinion').nullable()
      table.boolean('is_favorite').defaultTo(false).notNullable()
      table.bigInteger('created_at').unsigned()
      table.bigInteger('updated_at').unsigned()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
