<template>
  <div></div>
</template>

<script lang="ts">
import { PropType } from 'vue'

export interface SelectChipsOption {
  label: string
  value: any
}

export type SelectChipsValue<T> = Array<T> | T

export default {
  name: 'SelectChips',
  props: {
    options: {
      type: Object as PropType<SelectChipsOption[]>,
      required: true,
    },
    modelValue: {
      type: Object as PropType<SelectChipsValue<any>>,
      required: true,
    },
    single: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
