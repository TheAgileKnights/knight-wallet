<template>
  <!-- Title Area -->
  <div class="flex flex-col h-screen w-full bg-gradient-to-br from-primary to-accent text-white">
    <div class="flex flex-col w-full h-full justify-center items-center">
      <h1 class="text-[6rem] font-extrabold">Knight Wallet</h1>
      <p class="text-2xl font-medium">"Track Together, Settle Smarter"</p>
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
    window.addEventListener('scroll', () => {
      this.showSticky = window.scrollY > window.innerHeight/2
    })
  }
}
</script>

<style scoped>
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