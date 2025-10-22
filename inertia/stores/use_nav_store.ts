import { defineStore } from 'pinia'
import { DockBuilder } from '~/classes/dock_builder'
import type { DockItem, DockItemTemplate } from '~/types/dock'

export const useNavStore = defineStore('nav', {
  state: () => ({
    items: [] as DockItem[],
    visibleMenu: null as string | null,
  }),
  getters: {
    getVisibleMenu: (state) => state.visibleMenu,
    getItems: (state) => state.items,
  },
  actions: {
    initializeDock(items: DockItemTemplate[]) {
      this.items = new DockBuilder().convertDockTemplate(items, this.toggleMenu).build()
    },
    toggleMenu(menuId: string) {
      this.visibleMenu = this.visibleMenu === menuId ? null : menuId
    },
    closeMenu() {
      this.visibleMenu = null
    },
  },
})

export function createDefaultDock() {
  const store = useNavStore()
  store.initializeDock(getDefaultDockItems())
  return store
}

function getDefaultDockItems(): DockItemTemplate[] {
  return [
    {
      id: 'home',
      name: 'Home',
      icon: 'majesticons:home-line',
      action: '/',
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: 'majesticons:settings-cog-line',
      menuItems: [
        {
          id: 'profile',
          name: 'Profile',
          icon: 'majesticons:user-line',
          action: '/profile',
        },
        {
          id: 'logout',
          name: 'Logout',
          icon: 'majesticons:logout-line',
          action: '/auth/logout',
        },
      ],
    },
  ]
}
