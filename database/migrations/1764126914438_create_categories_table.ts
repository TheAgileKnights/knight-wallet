import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('project_id').unsigned().notNullable()
      table.string('name').notNullable()
      table.text('description').nullable()
      table.integer('icon_id').unsigned().notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.foreign('project_id').references('id').inTable('projects').onDelete('CASCADE')
      table.foreign('icon_id').references('id').inTable('icons').onDelete('RESTRICT')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
