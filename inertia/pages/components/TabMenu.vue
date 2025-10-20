<template>
  <div class="flex gap-1 rounded-full p-1 bg-primary shrink w-fit">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      @click="$emit('update:modelValue', tab.value)"
      class="rounded-full p-2 px-4 cursor-pointer transition-colors font-bold"
      :class="{ 
        'bg-background text-text': modelValue === tab.value,
        'text-text-contrast hover:bg-accent': modelValue !== tab.value
      }"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    tabs: {
      type: Array as () => { label: string; value: string }[],
      required: true
    },
    modelValue: {
      type: String,
      required: false
    }
  },
  emits: ['update:modelValue']
}
</script>
