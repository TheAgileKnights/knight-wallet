<template>
  <Transition name="overlay">
    <div
      v-if="modelValue"
      tabindex="0"
      class="bg-[rgba(0,0,0,0.4)] w-full h-full fixed top-0 left-0 z-10"
    ></div>
  </Transition>
  <Transition name="dialog">
    <dialog
      v-if="modelValue"
      autofocus
      ref="dialog"
      popover="auto"
      @keydown.esc="closeDialog"
      class="dialog-class z-20 p-8 max-w-screen max-h-screen rounded-3xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
      open
    >
      <div class="flex flex-col">
        <div class="flex justify-end items-center gap-4">
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
  </Transition>
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
  watch: {
    modelValue(newValue: boolean) {
      if (newValue) {
        this.$nextTick(() => {
          const dialogElement = this.$refs.dialog as HTMLDialogElement
          document.body.style.overflow = 'hidden'
          dialogElement?.focus()
        })
      } else {
        document.body.style.overflow = 'auto'
      }
    },
  },
}
</script>

<style>
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.overlay-leave-from,
.overlay-enter-to {
  opacity: 1;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.dialog-leave-from,
.dialog-enter-to {
  opacity: 1;
  transform: scale(1);
}

.dialog-enter-active,
.dialog-leave-active,
.overlay-enter-active,
.overlay-leave-active {
  transition: all 0.2s ease-in-out;
}
</style>
