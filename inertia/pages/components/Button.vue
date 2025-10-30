<template>
  <button
    :disabled="disabled"
    class="p-2 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    :class="[buttonClasses, hoverButtonClasses, sizeButtonClasses, roundedButtonClasses, paddingButtonClasses]"
  >
  <div class="flex items-center text-center justify-center gap-2">
    <slot>
      {{ label }}
    </slot>
    <icon v-if="icon" :icon="icon" :class="sizeIconClasses"/>
  </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { bgSeverityClasses, Severity, hoverSeverityClasses } from '~/types/severity'

export default defineComponent({
  name: 'Button',
  props: {
    label: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: false,
    },
    severity: {
      type: String as PropType<Severity>,
      default: 'primary',
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
    },
    rounded: {
      type: String as PropType<'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'>,
      default: 'xl'
    },
  },
  computed: {
    buttonClasses(): string {
      return bgSeverityClasses[this.severity]
    },
    hoverButtonClasses(): string {
      return hoverSeverityClasses[this.severity]
    },
    sizeButtonClasses(): string {
      switch (this.size) {
        case 'small':
          return 'text-sm'
        case 'large':
          return 'text-lg'
        case 'medium':
        default:
          return 'text-md'
      }
    },
    paddingButtonClasses(): string {
      if (!this.label) {
        switch (this.size) {
          case 'small':
            return 'p-1'
          case 'large':
            return 'p-3'
          case 'medium':
          default:
            return 'p-2'
        }
      } else {
        switch (this.size) {
          case 'small':
            return 'py-1 px-2'
          case 'large':
            return 'py-3 px-6'
          case 'medium':
          default:
            return 'py-2 px-4'
        }
      }
    },
    sizeIconClasses(): string {
      switch (this.size) {
        case 'small':
          return 'text-base'
        case 'large':
          return 'text-2xl'
        case 'medium':
        default:
          return 'text-lg'
      }
    },
    roundedButtonClasses(): string {
      return `rounded-${this.rounded}`
    },
  }
})
</script>
