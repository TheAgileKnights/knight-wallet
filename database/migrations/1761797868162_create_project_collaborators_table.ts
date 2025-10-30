import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'project_collaborators'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.uuid('project_id').notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.enum('role', ['owner', 'admin', 'member']).defaultTo('member')

      table.foreign('project_id').references('id').inTable('projects').onDelete('CASCADE')
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')

      // Ensure a user can only be added once per project
      table.unique(['project_id', 'user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
