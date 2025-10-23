<template>
  <button
    :disabled="disabled"
    class="p-2 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer px-3 hover:scale-102"
    :class="buttonClasses, hoverButtonClasses"
  >
  <div class="flex items-center text-center justify-center gap-2">
    <slot>
      {{ label }}
    </slot>
    <icon v-if="icon" :icon="icon" class="text-xl"/>
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
  },
  computed: {
    buttonClasses(): string {
      return bgSeverityClasses[this.severity]
    },
    hoverButtonClasses(): string {
      return hoverSeverityClasses[this.severity]
    },
  }
})
</script>
