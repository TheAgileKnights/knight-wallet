import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import ProjectCollaborator from './project_collaborator.js'
import ProjectInvitation from './project_invitation.js'
import Category from './category.js'
import Currency from './currency.js'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare description: string

  @column({ columnName: 'owner_id' })
  declare ownerId: number

  @belongsTo(() => User, { foreignKey: 'ownerId' })
  declare owner: BelongsTo<typeof User>

  @hasMany(() => ProjectCollaborator, { foreignKey: 'projectId' })
  declare collaboratorRecords: HasMany<typeof ProjectCollaborator>

  @manyToMany(() => User, {
    pivotTable: 'project_collaborators',
    pivotColumns: ['role'],
    pivotForeignKey: 'project_id',
    pivotRelatedForeignKey: 'user_id',
  })
  declare collaborators: ManyToMany<typeof User>

  @hasMany(() => ProjectInvitation, { foreignKey: 'projectId' })
  declare invitations: HasMany<typeof ProjectInvitation>

  @hasMany(() => Category, { foreignKey: 'projectId' })
  declare categories: HasMany<typeof Category>

  @manyToMany(() => Currency, {
    pivotTable: 'project_currencies',
    pivotForeignKey: 'project_id',
    pivotRelatedForeignKey: 'currency_id',
  })
  declare currencies: ManyToMany<typeof Currency>
}
