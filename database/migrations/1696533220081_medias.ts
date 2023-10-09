import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'medias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      // media_parent_id
      table.enum('type', [
        'jeu vidéo',
        'film',
        'série',
        'épisode',
        'dlc',
        'livre'
      ]).notNullable()
      table.string('genre', 30).nullable()
      table.string('developer', 50).nullable()
      table.string('publisher', 50).nullable()
      table.string('author', 50).nullable()
      table.string('illustrator', 50).nullable()
      table.string('released', 10).nullable()
      table.text('synopsis').nullable()
      table.integer('duration').nullable()
      table.integer('episode').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
