import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'project_currencies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('project_id').unsigned().notNullable()
      table.integer('currency_id').unsigned().notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.foreign('project_id').references('id').inTable('projects').onDelete('CASCADE')
      table.foreign('currency_id').references('id').inTable('currencies').onDelete('CASCADE')
      table.unique(['project_id', 'currency_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}