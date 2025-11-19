<template>
  <div class="flex gap-2 w-full justify-between">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'flex flex-col items-center group cursor-pointer',
        { 'dock-menu-item': item.type === 'menu' },
      ]"
      @click.stop="(event: PointerEvent) => item.action(event)"
    >
      <icon
        :icon="item.icon"
        :alt="item.name"
        class="w-8 h-8 mb-1 group-hover:scale-110 transition-transform duration-200"
      />
    </div>
  </div>
  <Popover ref="popover">
    <OnClickOutside @trigger="handleClickOutside">
      <div
        v-for="(item, index) in visibleMenu?.menuItems"
        :key="index"
        class="flex gap-2 items-center mb-1 hover:scale-110 transition-transform duration-200 cursor-pointer bg-background-light pl-4 p-2 rounded-2xl"
        @click="item.action"
      >
        <div class="font-semibold">{{ item.name }}</div>
        <icon v-if="item.icon" :icon="item.icon" :alt="item.name" class="w-8 h-8" />
      </div>
    </OnClickOutside>
  </Popover>
</template>

<script lang="ts">
import { useNavStore, createDefaultDock } from '~/stores/use_nav_store'
import Popover from './Popover.vue'
import { DockItem, MenuInfo } from '~/types/dock'
import { OnClickOutside } from '@vueuse/components'

export default {
  name: 'DockComponent',
  components: {
    Popover,
    OnClickOutside,
  },
  data() {
    const navStore = useNavStore()
    if (navStore.getItems.length === 0) {
      createDefaultDock()
    }
    return {
      navStore,
    }
  },
  computed: {
    items() {
      return this.navStore.getItems
    },
    visibleMenuId(): MenuInfo | null {
      return this.navStore.getVisibleMenu
    },
    isMenuVisible(): boolean {
      return this.visibleMenuId !== null
    },
    visibleMenu(): DockItem | null {
      if (this.visibleMenuId) {
        return this.navStore.getItemById(this.visibleMenuId.id) ?? null
      }
      return null
    },
    popover() {
      return this.$refs.popover as InstanceType<typeof Popover>
    },
  },
  watch: {
    isMenuVisible(visible: boolean) {
      if (visible) {
        if (this.visibleMenuId?.pointerEvent) {
          this.popover.open(this.visibleMenuId.pointerEvent)
        }
      } else {
        this.popover.close()
      }
    },
  },
  methods: {
    handleClickOutside(event: Event) {
      // Check if the click is on a menu dock item
      const target = event.target as HTMLElement
      const isMenuIcon = target.closest('.dock-menu-item')

      // Only close if we didn't click on a menu icon
      if (!isMenuIcon) {
        this.navStore.closeMenu()
      }
    },
  },
}
</script>
