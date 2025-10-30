import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import ProjectCollaborator from './project_collaborator.js'
import ProjectInvitation from './project_invitation.js'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare ownerId: number

  @belongsTo(() => User, { foreignKey: 'ownerId' })
  declare owner: BelongsTo<typeof User>

  @hasMany(() => ProjectCollaborator)
  declare collaboratorRecords: HasMany<typeof ProjectCollaborator>

  @manyToMany(() => User, {
    pivotTable: 'project_collaborators',
    pivotColumns: ['role'],
    pivotForeignKey: 'project_id',
    pivotRelatedForeignKey: 'user_id',
  })
  declare collaborators: ManyToMany<typeof User>

  @hasMany(() => ProjectInvitation)
  declare invitations: HasMany<typeof ProjectInvitation>
}
