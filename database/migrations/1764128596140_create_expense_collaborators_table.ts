import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'expense_collaborators'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('expense_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.foreign('expense_id').references('id').inTable('expenses').onDelete('CASCADE')
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.unique(['expense_id', 'user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}