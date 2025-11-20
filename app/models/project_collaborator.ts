import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Project from './project.js'
import User from './user.js'

export default class ProjectCollaborator extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column({ columnName: 'project_id' })
  declare projectId: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column()
  declare role: 'owner' | 'admin' | 'member'

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
