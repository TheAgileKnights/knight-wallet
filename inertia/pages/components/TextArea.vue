<template>
  <small v-if="label" class="text-text">{{ label }}</small>
  <textarea
    :placeholder="placeholder"
    :rows="rows"
    :value="modelValue"
    :disabled="disabled"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    class="block p-2 text-text-secondary border-border bg-background-light focus:border-accent border-2 rounded-xl outline-0 placeholder:text-shadow-text-secondary resize-y w-full disabled:opacity-50 disabled:cursor-not-allowed"
  ></textarea>
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    rows: {
      type: Number,
      required: false,
      default: 4,
    },
    modelValue: {
      type: String,
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
