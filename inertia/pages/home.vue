<template>
  <!-- Title Area -->
  <div class="flex flex-col h-screen w-full bg-gradient-to-br from-primary to-accent text-white">
    <div class="flex w-full h-full">
      <div class="flex flex-col justify-center items-center w-full">
        <div class="drop-shadow-[0_10px_60px_rgba(0,0,0,1)]">
          <h1 class="text-[6rem] font-extrabold">Knight Wallet</h1>
          <p class="text-2xl font-medium">"Track Together, Settle Smarter"</p>
        </div>
      </div>
      <div class="flex justify-center items-center px-24">
        <img src="/resources/images/iphone-screenshot.png" alt="Knight Wallet iPhone Screenshot" class="w-[800px] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,1)]" />
      </div>
    </div>
    <Transition>
      <div v-if="showSticky" class="fixed top-4 left-4 bg-white text-black px-4 py-2 rounded-lg shadow-lg z-50">
        <h3 class="font-bold text-2xl text-primary">Knight Wallet</h3>
      </div>
    </Transition>
  </div>
  <!-- Features Area REMOVE THE CODE BELOW -->
  <div class="h-screen">
    <h2>Features</h2>
    <ul>
      <li>Secure transactions</li>
      <li>Real-time notifications</li>
      <li>Multi-currency support</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      showSticky: false
    }
  },
  mounted() {
    // Sets showSticky to true when scrolled down half the viewport height 
    // (continuously updates through scroll event listener)
    window.addEventListener('scroll', () => {
      this.showSticky = window.scrollY > window.innerHeight/2
    })
  }
}
</script>

<style scoped>

/* See https://vuejs.org/guide/built-ins/transition for vue transitions */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>