<template>
  <div class="flex justify-center w-full p-2 fixed bottom-0 z-5">
    <Dock />
  </div>
  <div class="flex flex-col min-h-screen max-w-screen">
    <div class="content flex grow flex-col p-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Dock from '../components/Dock.vue'

export default {
  components: {
    Dock,
  },
  data() {
    return {}
  },
}
</script>
