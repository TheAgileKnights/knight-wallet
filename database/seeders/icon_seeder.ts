import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    await db.table('icons').multiInsert([
      { icon_string: 'majesticons:money-line', name: 'Bill' },
      { icon_string: 'majesticons:burger-line', name: 'Food' },
      { icon_string: 'majesticons:car-line', name: 'Transportation' },
      { icon_string: 'icon-park-outline:popcorn', name: 'Entertainment' },
      { icon_string: 'majesticons:shopping-cart-line', name: 'Shopping' },
      { icon_string: 'majesticons:pulse', name: 'Health' },
      { icon_string: 'majesticons:lightbulb-shine-line', name: 'Utilities' },
      { icon_string: 'majesticons:more-menu', name: 'Other' },
    ])
  }
}
