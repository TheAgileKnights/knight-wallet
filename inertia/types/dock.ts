// Base types for dock items
interface DockItemBase {
  id: string
  type?: string
  name: string
  icon: string
}

export interface DockItemFunction extends DockItemBase {
  action: Function
}

export interface DockItemRoute extends DockItemBase {
  action: string
}

export type DockItemMenuItem = DockItemFunction | DockItemRoute

export interface DockItemMenu extends DockItemBase {
  menuItems: DockItemMenuItem[]
}

export type MenuAction = (itemId: string) => void

export interface DockItem extends DockItemFunction {
  type: 'route' | 'function' | 'menu'
  menuItems?: DockItemFunction[]
}

export type DockItemTemplate = DockItemFunction | DockItemRoute | DockItemMenu

export interface DockState {
  items: DockItem[]
  visibleMenu: string | null
}
