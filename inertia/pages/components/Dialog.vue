<template>
  <div
    v-if="modelValue"
    @keydown.esc="closeDialog"
    tabindex="0"
    class="bg-[rgba(0,0,0,0.4)] w-full h-full fixed top-0 left-0 z-10"
  >
    <dialog
      class="z-20 p-8 min-w-1/3 min-h-1/2 max-w-screen max-h-screen rounded-3xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
      open
    >
    <div class="flex flex-col">
      <div class="flex justify-end items-center">
        <div class="grow">
          <slot name="header">
            <h3 class="text-xl font-bold">
              {{ header }}
            </h3>
          </slot>
        </div>
        <slot name="close">
          <div>
            <Button icon="material-symbols:close-rounded" @click="closeDialog" />
          </div>
        </slot>
      </div>
      <div class="pt-4 overflow-auto text-wrap grow">
        <slot></slot>
      </div>
    </div>
    </dialog>
  </div>
</template>

<script lang="ts">
import Button from './Button.vue'

export default {
  name: 'Dialog',
  components: {
    Button,
  },
  props: {
    header: {
      type: String,
      default: 'Dialog Title',
    },
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
