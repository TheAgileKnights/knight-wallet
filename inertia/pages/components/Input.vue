<template>
  <small v-if="label" class="text-text">{{ label }}</small>
  <input
    :type="type"
    :placeholder="placeholder"
    class="block p-2 text-text-secondary border-border focus:border-accent border-2 rounded-xl outline-0 placeholder:text-shadow-text-secondary"
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
