import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // user_id
      // media_id
      table.string('plateform', 20).nullable()
      table.enum('status', [
        'en cours',
        'abandonné',
        'terminé',
        'prévu'
      ]).notNullable()
      table.integer('rated', 2).unsigned().nullable()
      table.boolean('is_favorite').defaultTo(false).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
