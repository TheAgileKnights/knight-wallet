<template>
  <span class="typewriter" :class="{ typing: isTyping }">
    {{ displayedText }}
  </span>
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
      default: 150,
    },
    byWord: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      displayedText: '',
      currentIndex: 0,
      isTyping: true,
      intervalId: null as NodeJS.Timeout | null,
    }
  },
  mounted() {
    this.startTyping()
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  },
  methods: {
    startTyping() {
      if (this.byWord) {
        const words = this.text.split(' ')
        let wordIndex = 0

        this.intervalId = setInterval(() => {
          if (wordIndex < words.length) {
            this.displayedText += (wordIndex > 0 ? ' ' : '') + words[wordIndex]
            wordIndex++
          } else {
            this.isTyping = false
            if (this.intervalId) clearInterval(this.intervalId)
          }
        }, this.speed)
      } else {
        this.intervalId = setInterval(() => {
          if (this.currentIndex < this.text.length) {
            this.displayedText = this.text.substring(0, this.currentIndex + 1)
            this.currentIndex++
          } else {
            this.isTyping = false
            if (this.intervalId) clearInterval(this.intervalId)
          }
        }, this.speed)
      }
    },
  },
}
</script>

<style scoped>
.typewriter.typing::after {
  content: '|';
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
