<template>
  <small v-if="label" class="text-text">{{ label }}</small>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="block p-2 text-text-secondary border-border bg-background-light focus:border-accent border-2 rounded-xl outline-0 placeholder:text-shadow-text-secondary disabled:opacity-50 disabled:cursor-not-allowed w-full"
  />
</template>

<script lang="ts">
import { PropType } from 'vue'
import type { InputTypeHTMLAttribute } from 'vue'
export default {
  props: {
    type: {
      type: String as PropType<InputTypeHTMLAttribute>,
      required: false,
      default: 'text',
    },
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    modelValue: {
      type: [String, Number],
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:modelValue'],
}
</script>
