<template>
  <div
    class="bg-background-light shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-[1px] border-border rounded-3xl flex flex-col justify-start items-center p-8 transition-transform duration-300 text-center gap-2"
    :class="{ 'hover:scale-105': hoverEffect }"
  >
    <slot>
      <div class="my-4" v-if="$slots.icon">
        <slot name="icon"/>
      </div>
      <div class="font-bold text-2xl">
        <slot name="title" />
      </div>
      <div class="text-lg text-secondary-text">
        <slot name="description" />
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  name: "Card",
  props: {
    hoverEffect: {
      type: Boolean,
      default: true,
    },
  }
})

</script>