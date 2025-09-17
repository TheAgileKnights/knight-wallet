<template>
  <!-- Title Area -->
  <div class="flex flex-col h-screen w-full bg-gradient-to-br from-primary to-accent text-white]">
    <div class="flex w-full h-full px-24">
      <div class="flex flex-col justify-center items-center w-full">
        <div class="">
          <div class="drop-shadow-[0_10px_60px_rgba(0,0,0,1)]">
            <h1 class="text-[6rem] font-extrabold">Knight Wallet</h1>
            <p class="text-2xl font-medium">"Track Together, Settle Smarter"</p>
          </div>
          <Typewriter
            text="Simplify shared expenses among friends and family. Add costs, split bills, and settle up seamlessly for trips, events, and everyday life."
            :speed="100"
          />
        </div>
      </div>
      <div class="flex justify-center items-center px-24">
        <img
          src="/resources/images/iphone-screenshot.png"
          alt="Knight Wallet iPhone Screenshot"
          class="w-[800px] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,1)]"
        />
      </div>
    </div>
    <Transition>
      <div
        v-if="showSticky"
        class="fixed top-4 left-4 bg-text px-4 py-2 rounded-lg shadow-lg z-50"
      >
        <h3 class="font-bold text-2xl text-text-contrast">Knight Wallet</h3>
      </div>
    </Transition>
  </div>
  <div class="lg:mx-[12.5%] mx-0">
    <p class="font-bold text-6xl w-full text-center mt-8">Features</p>
    <p class="text-center text-3xl mt-2 mb-8 text-secondary-text">
      Discover the powerful features that make our app stand out.
    </p>
    <div class="grid 2xl:grid-cols-3 sm:grid-cols-2">
      <div
        v-for="(card, index) in featureCards"
        :key="index"
        class="card flex flex-col justify-center items-center p-10 m-4 hover:scale-105 transition-transform duration-300"
      >
        <Icon class="text-9xl my-8 text-accent text-center" :icon="card.icon" />
        <p class="font-bold text-5xl text-center">{{ card.name }}</p>
        <p class="text-2xl mb-2 mt-6 text-center !text-secondary-text">{{ card.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Typewriter from './components/Typewriter.vue'

export default {
  components: {
    Typewriter,
  },
  data() {
    return {
      featureCards: [
        {
          name: 'Group Creation',
          description: 'Create friend groups and manage members on the go.',
          icon: 'mdi:people',
        },
        {
          name: 'Organization',
          description: 'Add and categorize expenses with ease.',
          icon: 'eos-icons:organization',
        },
        {
          name: 'Multiple Groups',
          description: 'Split expenses among selectable group members.',
          icon: 'material-symbols:groups',
        },
        {
          name: 'Multi-Currency',
          description: 'Multi-currency support for international use.',
          icon: 'bi:currency-exchange',
        },
        {
          name: 'Real-Time Updates',
          description: 'Instantly see payment updates.',
          icon: 'tabler:clock-filled',
        },
        {
          name: 'Payment App Integration',
          description: 'Integration with Venmo and other payment platforms.',
          icon: 'si:credit-card-detailed-fill',
        },
      ],
      showSticky: false,
    }
  },
  mounted() {
    // Sets showSticky to true when scrolled down half the viewport height
    // (continuously updates through scroll event listener)
    window.addEventListener('scroll', () => {
      this.showSticky = window.scrollY > window.innerHeight / 2
    })
  },
}
</script>

<style scoped>
/* See https://vuejs.org/guide/built-ins/transition for vue transitions */
.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
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
