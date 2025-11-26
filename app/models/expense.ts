import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Project from '#models/project'
import Category from '#models/category'
import User from '#models/user'
import Currency from '#models/currency'

export default class Expense extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare projectId: number

  @column()
  declare name: string

  @column()
  declare categoryId: number

  @column()
  declare payerId: number

  @column()
  declare cost: number

  @column()
  declare currencyId: number

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @belongsTo(() => User, { foreignKey: 'payerId' })
  declare payer: BelongsTo<typeof User>

  @belongsTo(() => Currency)
  declare currency: BelongsTo<typeof Currency>

  @manyToMany(() => User, {
    pivotTable: 'expense_collaborators',
    pivotForeignKey: 'expense_id',
    pivotRelatedForeignKey: 'user_id',
  })
  declare collaborators: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}