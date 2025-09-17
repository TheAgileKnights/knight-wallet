<template>
  <div class="relative">
    <span>{{ displayedText }}<span v-if="isTyping" class="cursor">|</span></span>
  </div>
  <div class="invisible">
    {{ text }}
  </div>
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
    }
  },
  data() {
    return {
      displayedText: '',
      currentIndex: 0,
      isTyping: true,
      lastTime: 0,
      words: [] as string[],
      isReady: false
    }
  },
  mounted() {
    requestAnimationFrame(() => {
      this.words = this.byWord ? this.text.split(' ') : this.text.split('')
      this.isReady = true
      this.startTyping()
    })
  },
  methods: {
    startTyping() {
      if (!this.isReady) return
      const animate = (currentTime: number) => {
        if (currentTime - this.lastTime >= this.speed) {
          if (this.currentIndex < this.words.length) {
            if (this.byWord) {
              this.displayedText += (this.currentIndex > 0 ? ' ' : '') + this.words[this.currentIndex]
            } else {
              this.displayedText += this.words[this.currentIndex]
            }
            this.currentIndex++
            this.lastTime = currentTime
          } else {
            this.isTyping = false
            return
          }
        }
        if (this.currentIndex < this.words.length) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }
}
</script>

<style scoped>
.cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
