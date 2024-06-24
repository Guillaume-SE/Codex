import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'media_contributors'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('media_id')
        .unsigned()
        .references('id')
        .inTable('media')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      table
        .integer('contributor_id')
        .unsigned()
        .references('id')
        .inTable('contributors')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      table
        .integer('job_id')
        .unsigned()
        .references('id')
        .inTable('jobs')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
