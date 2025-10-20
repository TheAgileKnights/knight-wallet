<template>
  <div class="bg-background-light box w-full flex flex-col items-center mb-8">
    <h1 class="text-3xl font-bold mt-4 text-text flex">Persona: {{ name }}</h1>
    <h1 class="text-3xl font-bold mb-4 text-text flex">Age: {{ age }}</h1>
  </div>
<!-- <div class="box border-[1px] border-border rounded-3xl flex justify-center items-start flex-col p-8 max-w-5xl mx-auto bg-background-light"> -->
  <Card>
    <p class="text-2xl whitespace-pre-line text-text-secondary">{{ persona }}</p>
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