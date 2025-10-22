<template>
<div class="flex gap-2">
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
    <span class="text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {{ item.name }}
    </span>
  </div>
</div>
{{ navStore.getVisibleMenu || 'No menu visible' }}
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
  }

}
</script>