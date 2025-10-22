<template>
  <div class="flex flex-col justify-center items-center min-h-screen bg-primary">
    <Card :hover-effect="false">
      <template #title v-if="title">
        <h2 class="text-2xl font-semibold mb-4">{{ title }}</h2>
      </template>
      <template #description>
        <slot/>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import Card from '../components/Card.vue';

export default {
  name: 'AuthFormLayout',
  components: {
    Card
  },
  props: {
    title: {
      type: String,
      required: false,
    },
  }
}
</script>