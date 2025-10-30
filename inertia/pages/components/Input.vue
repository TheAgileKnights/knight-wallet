<template>
  <small v-if="label" class="text-text">{{ label }}</small>
  <input
    :type="type"
    :placeholder="placeholder"
    class="block p-2 text-text border-border border-2 rounded-xl focus:outline-2 focus:outline-accent placeholder:text-text-secondary"
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
  },
}
</script>
