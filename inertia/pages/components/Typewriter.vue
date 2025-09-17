<template>
  <div>{{ displayedText }}<span v-if="isTyping" class="cursor-blink font-bold">|</span></div>
</template>

<script>
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
    }
  },
  mounted() {
    setTimeout(this.startTyping, this.delay)
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
        const delay = char === '.' ? 200 : char === ',' ? 100 : Math.random() * this.speed + 25

        setTimeout(this.typeNext, delay)
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
