<template>
  <Card :hover-effect="false">
    <template #icon>
      <icon icon="material-symbols:account-circle" class="text-accent w-32 h-32"></icon>
    </template>
    <template #title>
      <p>{{ `${name}, ${age} years old` }}</p>
    </template>
    <template #description>
      <p class="text-2xl whitespace-pre-line text-text-secondary">{{ persona }}</p>
    </template>
  </Card>
<!-- </div> -->
</template>
<script lang="ts">
import Card from './Card.vue';


export default{
  name: 'Personas',
  components: { Card },
  props: {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    persona: {
      type: String,
      required: true
    },
  }
}
</script>

<style>
.box{
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>