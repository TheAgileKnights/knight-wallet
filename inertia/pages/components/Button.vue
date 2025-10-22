<template>
  <button
    :disabled="disabled"
    class="px-4 py-2 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    :class="buttonClasses"
  >
  <div class="flex items-center text-center justify-center">
    <slot>
      {{ label }}
    </slot>
    <icon v-if="icon" :icon="icon" class="ml-2 text-xl"/>
  </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { bgSeverityClasses, Severity } from '~/types/severity'

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
  }
})
</script>
