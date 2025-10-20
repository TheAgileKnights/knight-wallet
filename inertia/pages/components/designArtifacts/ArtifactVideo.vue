<template>
  <div class="flex grow items-center justify-center">
    <VideoContainer :url/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VideoContainer from '../VideoContainer.vue'

export default defineComponent({
  name: 'ArtifactVideo',
  components: {
    VideoContainer,
  },
  props: {
    url: {
      type: String,
      required: false,
    },
  }
})
</script>
