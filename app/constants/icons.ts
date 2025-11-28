export const ICONS = {
  BILL: 'majesticons:money-line',
  FOOD: 'majesticons:burger-line',
  TRANSPORTATION: 'majesticons:car-line',
  ENTERTAINMENT: 'icon-park-outline:popcorn',
  SHOPPING: 'majesticons:shopping-cart-line',
  HEALTH: 'majesticons:pulse',
  UTILITIES: 'majesticons:lightbulb-shine-line',
  OTHER: 'majesticons:more-menu',
} as const

export const ICON_DEFINITIONS = [
  { icon_string: ICONS.BILL, name: 'Bill' },
  { icon_string: ICONS.FOOD, name: 'Food' },
  { icon_string: ICONS.TRANSPORTATION, name: 'Transportation' },
  { icon_string: ICONS.ENTERTAINMENT, name: 'Entertainment' },
  { icon_string: ICONS.SHOPPING, name: 'Shopping' },
  { icon_string: ICONS.HEALTH, name: 'Health' },
  { icon_string: ICONS.UTILITIES, name: 'Utilities' },
  { icon_string: ICONS.OTHER, name: 'Other' },
]

export const DEFAULT_CATEGORIES = [
  {
    name: 'Food & Dining',
    description: 'Meals, groceries, and dining expenses',
    iconString: ICONS.FOOD,
  },
  {
    name: 'Transportation',
    description: 'Travel, gas, and commute expenses',
    iconString: ICONS.TRANSPORTATION,
  },
  {
    name: 'Entertainment',
    description: 'Movies, events, and leisure activities',
    iconString: ICONS.ENTERTAINMENT,
  },
]
