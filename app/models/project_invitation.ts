import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Project from './project.js'
import User from './user.js'
import { randomBytes } from 'node:crypto'

export default class ProjectInvitation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column({ columnName: 'project_id' })
  declare projectId: number

  @column()
  declare invitedBy: number

  @column()
  declare token: string

  @column()
  declare role: 'admin' | 'member'

  @column.dateTime()
  declare expiresAt: DateTime

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @belongsTo(() => User, { foreignKey: 'invitedBy' })
  declare inviter: BelongsTo<typeof User>

  @beforeCreate()
  static async generateToken(invitation: ProjectInvitation) {
    if (!invitation.token) {
      invitation.token = randomBytes(32).toString('hex')
    }
    if (!invitation.expiresAt) {
      invitation.expiresAt = DateTime.now().plus({ hours: 24 })
    }
  }

  get isValid() {
    return this.expiresAt > DateTime.now()
  }

  get isExpired() {
    return this.expiresAt <= DateTime.now()
  }
}
