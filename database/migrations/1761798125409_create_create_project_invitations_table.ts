import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'project_invitations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.integer('project_id').unsigned().notNullable()
      table.integer('invited_by').unsigned().notNullable()
      table.string('token').notNullable().unique()
      table.enum('role', ['admin', 'member']).defaultTo('member')
      table.timestamp('expires_at').notNullable()

      table.foreign('project_id').references('id').inTable('projects').onDelete('CASCADE')
      table.foreign('invited_by').references('id').inTable('users').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
