import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Project from './project.js'
import ProjectCollaborator from './project_collaborator.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare username: string | null

  @column()
  declare avatarUrl: string | null

  @column()
  declare googleId: string | null

  @column()
  declare email: string

  @hasMany(() => Project, { foreignKey: 'ownerId' })
  declare ownedProjects: HasMany<typeof Project>

  @hasMany(() => ProjectCollaborator, { foreignKey: 'userId' })
  declare collaboratorRecords: HasMany<typeof ProjectCollaborator>

  @manyToMany(() => Project, {
    pivotTable: 'project_collaborators',
    pivotColumns: ['role'],
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'project_id',
  })
  declare collaboratingProjects: ManyToMany<typeof Project>

  // @column({ serializeAs: null })
  // declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
