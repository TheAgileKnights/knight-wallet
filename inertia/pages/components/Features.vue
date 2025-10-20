<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card class="col-span-full" :hover-effect="false">
      <p class="text-3xl font-bold">Features</p>
    </Card>
    <Card v-for="(feature, index) in features" :key="index">
      <template #icon>
        <icon :icon="feature.icon" class="text-accent w-32 h-32"/>
      </template>
      <template #title>
        <p>{{ feature.title }}</p>
      </template>
      <template #description>
        <div class="text-left space-y-4 text-text-secondary">
          <div class="my-2">
            <strong>Description:</strong>
          </div>
          <ul class="list-disc list-outside pl-5 space-y-2">
            <li
              v-for="(desc, dIndex) in feature.description"
              :key="dIndex"
              class="text-text-secondary leading-relaxed"
            >
              {{ desc }}
            </li>
          </ul>
          <div class="space-y-2 text-text-secondary">
            <p><strong>Constraints:</strong> {{ feature.constraints }}</p>
            <p><strong>Comments:</strong> {{ feature.comments }}</p>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">

import { PropType } from 'vue'
import Card from './Card.vue'
import { Feature } from '../designArtifacts.vue';

export default {
  name: 'Features',
  components: {
    Card,
  },
  props: {
    features: {
      type: Array as PropType<Feature[]>,
      required: true,
    },
  },
}
</script>
