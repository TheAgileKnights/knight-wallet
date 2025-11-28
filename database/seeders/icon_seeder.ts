import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import { ICON_DEFINITIONS } from '#constants/icons'

export default class extends BaseSeeder {
  async run() {
    await db.table('icons').multiInsert(ICON_DEFINITIONS)
  }
}
