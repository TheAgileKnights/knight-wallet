<template>
    <dialog :class="{ hidden: !modelValue }" ref="dialog" class="bg-background-light border border-border rounded-3xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 drop-shadow-[0_10px_30px_rgba(0,0,0,1)]" open>
      <form method="dialog">
        <input class="block"></input>
        <input class="block"></input>
        <input class="block"></input>
        <button class="block" type="button" @click="closeDialog()">CLOSE</button>
      </form>
    </dialog>
</template>

<script lang="ts">
export default {
  name: 'Dialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    closeDialog() {
      this.$emit('update:modelValue', false)
    },
  },
}
</script>
