<template>
    <dialog :class="{ hidden: !modelValue }" ref="dialog" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0" open>
      <form method="dialog">
        <button type="button" @click="closeDialog()">CLOSE</button>
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
