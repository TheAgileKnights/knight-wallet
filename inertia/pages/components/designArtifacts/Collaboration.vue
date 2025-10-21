<template>
  <div class="flex flex-col gap-4 items-center">
    <Card :hover-effect="false" class="w-full">
      <h2 class="text-3xl font-bold">Collaboration Images</h2>
    </Card>
    <Card v-if="images && images.length > 0" :hover-effect="false" class="w-fit">
      <div v-for="(imageUrl, index) in images" :key="index">
        <img :src="imageUrl" :alt="`Collaboration image ${index + 1}`" class="w-full h-auto max-h-screen" />
      </div>
    </Card>
    <div v-else>
      <p>No collaboration images available yet.</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Card from '../Card.vue'

export default defineComponent({
  name: 'Collaboration',
  components: {
    Card,
  },
  props: {
    images: {
      type: Array,
      default: [],
    },
  },
})
</script>
