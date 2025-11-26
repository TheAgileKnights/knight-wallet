import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    await db.table('icons').multiInsert([
      { icon_string: 'majesticons:bill', name: 'Bill' },
      { icon_string: 'majesticons:food', name: 'Food' },
      { icon_string: 'majesticons:car', name: 'Transportation' },
      { icon_string: 'majesticons:movie', name: 'Entertainment' },
      { icon_string: 'majesticons:shopping-cart', name: 'Shopping' },
      { icon_string: 'majesticons:medical-box', name: 'Health' },
      { icon_string: 'majesticons:lightbulb', name: 'Utilities' },
      { icon_string: 'majesticons:dots-circle', name: 'Other' },
    ])
  }
}