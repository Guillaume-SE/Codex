import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'games_infos';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('media_id').unsigned().references('id').inTable('medias').notNullable()
      table.string('developer', 60).notNullable().defaultTo('N/A')
      table.string('publisher', 60).notNullable().defaultTo('N/A')
      table.string('plateform', 20).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
