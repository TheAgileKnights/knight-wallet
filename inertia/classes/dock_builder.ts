import {
  DockItem,
  DockItemFunction,
  DockItemMenu,
  DockItemMenuItem,
  DockItemRoute,
  DockItemTemplate,
  MenuAction,
} from '~/types/dock'

export class DockBuilder {
  items: DockItem[] = []

  addRoute(id: string, name: string, icon: string, action: string): DockBuilder {
    this.items.push(this.routeToActionable({ id, name, icon, action }))
    return this
  }
  addFunction(id: string, name: string, icon: string, action: () => void): DockBuilder {
    this.items.push(this.functionToActionable({ id, name, icon, action }))
    return this
  }
  addMenu(
    id: string,
    name: string,
    icon: string,
    action: () => void,
    menuItems: DockItem[]
  ): DockBuilder {
    this.items.push(this.menuToActionable({ id, name, icon, menuItems }, action))
    return this
  }
  convertDockTemplate(items: DockItemTemplate[], menuAction?: MenuAction): DockBuilder {
    this.items = items.map((item) => this.convertToActionable(item, menuAction))
    return this
  }

  private routeToActionable(item: DockItemRoute): DockItem {
    return {
      id: item.id,
      type: 'route',
      name: item.name,
      icon: item.icon,
      action: () => {
        window.location.href = item.action as string
      },
    } as DockItem
  }

  private functionToActionable(item: DockItemFunction): DockItem {
    return {
      ...item,
      type: 'function',
    } as DockItem
  }

  private menuToActionable(item: DockItemMenu, action: MenuAction): DockItem {
    return {
      id: item.id,
      type: 'menu',
      name: item.name,
      icon: item.icon,
      menuItems: item.menuItems.map((menuItem) => this.menuItemToActionable(menuItem)),
      action: () => {
        action(item.id)
      },
    }
  }

  private menuItemToActionable(item: DockItemMenuItem): DockItem {
    if (typeof item.action === 'string') {
      return this.routeToActionable(item as DockItemRoute)
    }
    return this.functionToActionable(item as DockItemFunction)
  }

  private convertToActionable(item: DockItemTemplate, menuAction?: MenuAction): DockItem {
    if ('menuItems' in item) {
      if (!menuAction) {
        throw new Error(`Menu action function must be provided for menu item with id: ${item.id}`)
      }
      return this.menuToActionable(item as DockItemMenu, menuAction)
    }
    return this.menuItemToActionable(item as DockItemMenuItem)
  }

  build(): DockItem[] {
    return this.items
  }
}
