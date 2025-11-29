<template>
  <div class="flex gap-1 flex-wrap">
    <template v-for="option in options" :key="option.value">
      <div
        class="cursor-pointer rounded-xl px-4 py-[6px] border-2 border-border"
        :class="{
          'bg-accent text-white border-accent-hover!': single
            ? modelValue === option.value
            : modelValue.includes(option.value),
          'bg-background-light text-text-secondary': single
            ? modelValue !== option.value
            : !modelValue.includes(option.value),
        }"
        @click="selectOption(option)"
      >
        <div class="flex items-center gap-2">
          <icon v-if="!!option.icon" :icon="option.icon" />
          {{ option.label }}
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'

export interface SelectChipsOption {
  label: string
  value: any
  icon?: string
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
      type: [String, Number, Array] as PropType<SelectChipsValue<any>>,
      required: true,
    },
    single: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    selection: {
      get(): SelectChipsValue<any> {
        return this.modelValue
      },
      set(value: SelectChipsValue<any>) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  methods: {
    selectOption(option: SelectChipsOption) {
      if (this.single) {
        this.selection = option.value
      } else {
        const currentSelection = this.selection as Array<any>
        if (currentSelection.includes(option.value)) {
          this.selection = currentSelection.filter((val) => val !== option.value)
        } else {
          this.selection = [...currentSelection, option.value]
        }
      }
    },
  },
}
</script>
