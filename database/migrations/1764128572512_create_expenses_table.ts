import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'expenses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('project_id').unsigned().notNullable()
      table.string('name').notNullable()
      table.integer('category_id').unsigned().notNullable()
      table.integer('payer_id').unsigned().notNullable()
      table.decimal('cost', 12, 2).notNullable()
      table.integer('currency_id').unsigned().notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.foreign('project_id').references('id').inTable('projects').onDelete('CASCADE')
      table.foreign('category_id').references('id').inTable('categories').onDelete('RESTRICT')
      table.foreign('payer_id').references('id').inTable('users').onDelete('RESTRICT')
      table.foreign('currency_id').references('id').inTable('currencies').onDelete('RESTRICT')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}