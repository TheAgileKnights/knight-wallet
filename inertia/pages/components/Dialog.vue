<template>
  <Transition name="overlay">
    <div
      v-if="visible"
      @keydown.esc="closeDialog"
      @click="closeDialog"
      tabindex="0"
      class="bg-[rgba(0,0,0,0.4)] w-full h-full fixed top-0 left-0 z-10"
    ></div>
  </Transition>
  <Transition name="dialog">
    <dialog
      v-if="visible"
      autofocus
      ref="dialog"
      popover="auto"
      @keydown.esc="closeDialog"
      class="dialog-class z-20 w-full lg:w-fit h-full lg:h-fit bg-background-light lg:border-border! lg:border-[1px]! p-6 max-w-screen max-h-screen lg:rounded-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
      open
    >
      <div class="flex flex-col">
        <div class="flex justify-end items-center gap-4">
          <div class="grow">
            <slot name="header">
              <h3 class="text-xl font-bold text-text">
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
        <div class="flex justify-end mt-4 gap-2" v-if="actions && actions.length > 0">
          <Button
            v-for="action in actions"
            :key="action.label"
            :label="action.label"
            :severity="action.severity"
            @click="action.action"
          />
        </div>
      </div>
    </dialog>
  </Transition>
</template>

<script lang="ts">
import { Severity } from '~/types/severity'
import Button from './Button.vue'
import { PropType } from 'vue'

export interface DialogAction {
  label: string
  severity: Severity
  action: () => void
}

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
    visible: {
      type: Boolean,
      required: true,
    },
    actions: {
      type: Array as PropType<DialogAction[]>,
      required: false,
    },
  },
  emits: ['update:visible'],
  methods: {
    closeDialog() {
      this.$emit('update:visible', false)
    },
  },
  watch: {
    visible(newValue: boolean) {
      if (newValue) {
        this.$nextTick(() => {
          document.body.style.overflow = 'hidden'
          const dialogElement = this.$refs.dialog as HTMLDialogElement
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
