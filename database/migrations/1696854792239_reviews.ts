import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'
  protected reviewStatus = ['en cours', 'abandonné', 'terminé', 'prévu']

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
      table.string('status', 15).notNullable()
      table.integer('rating', 2).unsigned().nullable()
      table.string('notes', 150).nullable()
      table.boolean('is_favorite').defaultTo(false).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
