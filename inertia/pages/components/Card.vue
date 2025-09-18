<template>
  <div
    class="bg-background-light shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-[1px] border-border rounded-3xl flex flex-col justify-center items-center p-8 hover:scale-105 transition-transform duration-300 text-center gap-2"
  >
    <div class="my-4">
      <slot name="icon"/>
    </div>
    <div class="font-bold text-2xl">
      <slot name="title"/>
    </div>
    <div class="text-lg text-secondary-text">
      <slot name="description"/>
    </div>
  </div>
</template>

<script lang="ts">
export default {
}
</script>
