import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'medias'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('media_parent_id')
        .unsigned()
        .references('id')
        .inTable(this.tableName)
        .nullable()
        .onDelete('SET NULL')
      table.string('type').notNullable()
      table.string('name').notNullable()
      table.string('released').notNullable()
      table.unique(['type', 'name', 'released'])
      table.text('synopsis').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
