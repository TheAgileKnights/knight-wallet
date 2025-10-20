<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5" v-for="scenario in scenarios" :key="scenario.title">
    <Card class="col-span-full" :hover-effect="false">
      <p class="text-3xl font-bold">{{ scenario.title }}</p>
    </Card>
    <Card
      :hover-effect="false"
      class="m-2" 
      v-for="(story, index) in scenario.stories" 
      :key="index"
    >
      <template #icon>
        <icon
          :icon="`material-symbols:counter-${index + 1}-rounded`"
          class="text-accent w-16 h-16"
        />
      </template>
      <template #title></template>
      <template #description>{{ story }}</template>
    </Card>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import Card from '../Card.vue';
import { Scenario } from '~/pages/designArtifacts.vue';

export default {
name: "Stories",
components: { Card },
  props: {
    name: {
      type: String,
      required: true
    },
    scenarios: {
      type: Array as PropType<Scenario[]>,
      required: true
    }
  }
}
</script>