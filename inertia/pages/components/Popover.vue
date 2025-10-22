<template>
  <div class="absolute" :style="popoverStyle">
    <slot>
      No Data
    </slot>
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
        const { clientX, clientY } = this.lastEvent;
        return {
          top: clientY + 'px',
          left: clientX + 'px',
          display: 'block',
        }
      }
      return {
        top: '0px',
        left: '0px',
        display: 'none',
      }
    }
  },
  methods: {
    toggle(event: MouseEvent) {
      this.lastEvent = event;
      this.isOpen = !this.isOpen;
    }
  },
}
</script>