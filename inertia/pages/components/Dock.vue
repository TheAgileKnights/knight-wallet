<template>
<div class="flex gap-2 w-full justify-between">
  <div
    v-for="(item, index) in items"
    :key="index"
    class="flex flex-col items-center group cursor-pointer"
    @click="item.action()"
  >
    <icon
      :icon="item.icon"
      :alt="item.name"
      class="w-8 h-8 mb-1 group-hover:scale-110 transition-transform duration-200"
    />
  </div>
</div>
</template>

<script lang="ts">
import { useNavStore, createDefaultDock } from '~/stores/use_nav_store';
export default {
  name: 'DockComponent',
  data() {
    const navStore = useNavStore();
    if (navStore.getItems.length === 0) {
      createDefaultDock();
    }
    return {
      navStore,
    }
  },
  computed: {
    items() {
      return this.navStore.getItems;
    }
    visibleMenu() {
      return this.navStore.getVisibleMenu;
    }
  }

}
</script>