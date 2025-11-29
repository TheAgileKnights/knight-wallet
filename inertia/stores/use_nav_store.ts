import { defineStore } from 'pinia'
import { DockBuilder } from '~/classes/dock_builder'
import type {
  DockItem,
  DockItemMenuItem,
  DockItemTemplate,
  MenuInfo,
  ProjectContext,
} from '~/types/dock'

export const useNavStore = defineStore('nav', {
  state: () => ({
    items: [] as DockItem[],
    visibleMenu: null as MenuInfo | null,
    currentProjectId: null as number | null,
  }),
  getters: {
    getVisibleMenu: (state) => state.visibleMenu,
    getItems: (state) => state.items,
    getItemById: (state) => {
      return (id: string): DockItem | undefined => state.items.find((item) => item.id === id)
    },
    getCurrentProjectId: (state) => state.currentProjectId,
  },
  actions: {
    initializeDock(items: DockItemTemplate[]) {
      this.items = new DockBuilder().convertDockTemplate(items, this.toggleMenu).build()
    },
    toggleMenu(menuId: string, pointerEvent: PointerEvent) {
      this.visibleMenu = this.visibleMenu?.id === menuId ? null : { id: menuId, pointerEvent }
    },
    closeMenu() {
      this.visibleMenu = null
    },
    updateDockContext(context?: ProjectContext) {
      if (context?.projectId) {
        // Store last project in localStorage
        this.currentProjectId = context.projectId
        localStorage.setItem('lastProjectId', String(context.projectId))

        // Build project-specific dock
        const items = buildProjectDockItems(context)
        this.initializeDock(items)
      } else {
        // Clear current project
        this.currentProjectId = null

        // Build global dock
        const items = buildGlobalDockItems()
        this.initializeDock(items)
      }
    },
    getLastProjectId(): number | null {
      const lastProjectId = localStorage.getItem('lastProjectId')
      return lastProjectId ? Number.parseInt(lastProjectId, 10) : null
    },
    clearLastProject() {
      localStorage.removeItem('lastProjectId')
      this.currentProjectId = null
    },
  },
})

function buildProjectDockItems(context: ProjectContext): DockItemTemplate[] {
  const { projectId } = context

  const settingsMenuItems: DockItemMenuItem[] = [
    {
      id: 'profile',
      name: 'Profile',
      icon: 'majesticons:user-line',
      action: '/app/profile',
    },
    {
      id: 'logout',
      name: 'Logout',
      icon: 'majesticons:logout-line',
      action: '/auth/logout',
    },
  ]

  return [
    {
      id: 'expenses',
      name: 'Expenses',
      icon: 'majesticons:money-line',
      action: `/app/projects/${projectId}/expenses`,
    },
    {
      id: 'categories',
      name: 'Categories',
      icon: 'majesticons:tag-line',
      action: `/app/projects/${projectId}/categories`,
    },
    {
      id: 'collaborators',
      name: 'Collaborators',
      icon: 'majesticons:users',
      action: `/app/projects/${projectId}/collaborators`,
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: 'majesticons:folder-line',
      action: '/app/projects',
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: 'majesticons:settings-cog-line',
      menuItems: settingsMenuItems,
    },
  ]
}

function buildGlobalDockItems(): DockItemTemplate[] {
  return [
    {
      id: 'projects',
      name: 'Projects',
      icon: 'majesticons:folder-line',
      action: '/app/projects',
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
          action: '/app/profile',
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
