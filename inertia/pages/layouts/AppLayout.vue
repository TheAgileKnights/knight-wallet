<template>
  <div class="flex flex-col h-screen w-screen">
    <div class="content flex grow flex-col p-4">
      <slot/>
    </div>
    <div class="flex justify-center w-full p-2">
      <Dock/>
    </div>
  </div>
</template>

<script lang="ts">
import Dock from '../components/Dock.vue';

  export default {
    components: {
      Dock
    },
    data() {
      return {}
    }
  }
</script>