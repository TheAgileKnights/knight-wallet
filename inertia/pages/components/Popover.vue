<template>
  <div class="fixed" :style="popoverStyle">
    <div class="">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Popover',
  data() {
    return {
      lastEvent: null as MouseEvent | null,
      isOpen: false,
    }
  },
  computed: {
    popoverStyle() {
      if (this.lastEvent && this.isOpen) {
        const { x, y, width } = (this.lastEvent.currentTarget as HTMLElement).getBoundingClientRect()
        return {
          bottom: `calc(100vh - ${y}px)`,
          right: `calc(100vw - ${x}px - ${width}px)`,
          display: 'block',
        }
      }
      return {
        top: '0px',
        left: '0px',
        display: 'none',
      }
    },
  },
  methods: {
    open(event: PointerEvent) {
      this.lastEvent = event
      this.isOpen = true
    },
    close() {
      this.lastEvent = null
      this.isOpen = false
    },
  },
}
</script>
