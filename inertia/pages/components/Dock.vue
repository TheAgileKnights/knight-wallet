<template>
  <div class="flex gap-2 w-full justify-between">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex flex-col items-center group cursor-pointer"
      @click="(event: PointerEvent) => item.action(event)"
    >
      <icon
        :icon="item.icon"
        :alt="item.name"
        class="w-8 h-8 mb-1 group-hover:scale-110 transition-transform duration-200"
      />
    </div>
  </div>
  <Popover ref="popover">
    {{ visibleMenu }}
  </Popover>
</template>

<script lang="ts">
import { useNavStore, createDefaultDock } from '~/stores/use_nav_store'
import Popover from './Popover.vue'
import { MenuInfo } from '~/types/dock';
export default {
  name: 'DockComponent',
  components: {
    Popover,
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
    visibleMenu() {
    },
    isMenuVisible(): boolean {
      return this.visibleMenuId !== null
    }
  },
  watch: {
    isMenuVisible(visible: boolean) {
      const popover = this.$refs.popover as InstanceType<typeof Popover>
      if (visible) {
        if (this.visibleMenuId?.pointerEvent) {
          // console.log((this.visibleMenuId.pointerEvent.currentTarget as HTMLElement).getBoundingClientRect().x)
          popover.open(this.visibleMenuId.pointerEvent)
        }
      } else {
        popover.close()
      }
    },
  },
}
</script>
