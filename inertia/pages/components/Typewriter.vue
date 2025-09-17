<template>
  <div>{{ displayedText }}<span v-if="isTyping" class="cursor-blink font-bold">|</span></div>
</template>

<script lang="ts">
export default {
  name: 'Typewriter',
  props: {
    text: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      default: 50,
    },
    delay: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      displayedText: '',
      currentIndex: 0,
      isTyping: false,
      timeoutId: null as NodeJS.Timeout | null
    }
  },
  mounted() {
    this.timeoutId = setTimeout(this.startTyping, this.delay)
  },
  beforeUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  },
  methods: {
    startTyping() {
      this.isTyping = true
      this.typeNext()
    },
    typeNext() {
      if (this.currentIndex < this.text.length) {
        this.displayedText += this.text[this.currentIndex]
        this.currentIndex++

        const char = this.text[this.currentIndex - 1]
        const delay = char === '.' ? 300 : char === ',' ? 150 : Math.random() * this.speed + 30

        this.timeoutId = setTimeout(this.typeNext, delay)
      } else {
        this.isTyping = false
        this.$emit('complete')
      }
    },
  },
}
</script>

<style scoped>
.cursor-blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}
</style>
