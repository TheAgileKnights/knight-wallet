<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <Card class="col-span-full" :hover-effect="false">
      <p class="text-3xl font-bold">Scenarios</p>
    </Card>
    <Card v-for="(scenario, index) in scenarios" :key="index" class="">
      <template #icon>
        <icon
          :icon="`material-symbols:counter-${index + 1}-rounded`"
          class="text-accent w-16 h-16"
        ></icon>
      </template>
      <template #title>
        <p>{{ scenario.title }}</p>
      </template>
      <template #description>
        <div class="text-left space-y-4 text-text-secondary">
          <p>{{ scenario.description }}</p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from './Card.vue'
import { Scenario } from '../designArtifacts.vue'

export default defineComponent({
  name: 'Scenarios',
  components: {
    Card,
  },
  props: {
    scenarios: {
      type: Array as PropType<Scenario[]>,
      required: true,
    },
  },
})
</script>
