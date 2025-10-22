<template>
<slot/>
<Dock/>
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