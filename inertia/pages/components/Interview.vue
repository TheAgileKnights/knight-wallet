<template>
  <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card class="col-span-full" :hover-effect="false">
      <p class="text-3xl font-bold">Interview with {{ name }}</p>
    </Card>
    <Card class="mb-4" v-for="(interview, index) in interview" :key="index">
      <template #icon>
        <icon
          :icon="`material-symbols:counter-${index + 1}-rounded`"
          class="text-accent w-16 h-16"
        ></icon>
      </template>
      <template #title class="text-text">
        {{ interview.question }}
      </template>
      <template #description class="text-text-secondary">
        {{ interview.answer }}
      </template>
    </Card>
  </ul>
</template>
<script lang="ts">
import { PropType } from 'vue'
import Card from './Card.vue'

export type Interview = {
  question: string
  answer: string
}[]

export default {
  name: 'Interviews',
  components: {
    Card,
  },
  props: {
    interview: {
      type: Array as PropType<Interview>,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
