import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('created_by')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('media_id')
        .unsigned()
        .references('id')
        .inTable('medias')
        .onDelete('CASCADE')
        .notNullable()
      table.string('status').notNullable()
      table.integer('rating').unsigned().nullable()
      table.string('notes').nullable()
      table.boolean('is_favorite').defaultTo(false).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
