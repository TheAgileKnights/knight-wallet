<template>
  <div
    class="bg-background-light shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-[1px] border-border rounded-3xl flex flex-col justify-start p-8 transition-transform duration-300 gap-2 w-full"
    :class="{
      'hover:scale-105': hoverEffect,
      'items-center text-center': alignment === 'center',
      'items-start text-left': alignment === 'left',
      'items-end text-right': alignment === 'right',
    }"
  >
    <slot>
      <div class="my-4 w-full" v-if="$slots.icon">
        <slot name="icon" />
      </div>
      <div class="font-bold text-2xl w-full">
        <slot name="title" />
      </div>
      <div class="text-lg text-secondary-text w-full">
        <slot name="description" />
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Card',
  props: {
    hoverEffect: {
      type: Boolean,
      default: true,
    },
    alignment: {
      type: String as () => 'left' | 'center' | 'right',
      default: 'center',
    },
  },
})
</script>
