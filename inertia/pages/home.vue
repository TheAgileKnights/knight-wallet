<template>
  <!-- Title Area -->
  <div class="flex flex-col min-h-screen w-full bg-gradient-to-br from-primary to-accent">
    <div class="p-12 md:p-24 w-full grid xl:grid-cols-2 text-center xl:text-left grid-cols-1 grow">
      <div class="flex justify-center items-center mb-12">
        <div class="flex flex-col text-text-contrast w-min">
          <div class="drop-shadow-[0_10px_60px_rgba(0,0,0,1)] shrink">
            <h1 class="md:text-[6rem] text-[4rem] font-extrabold text-nowrap">Knight Wallet</h1>
            <p class="text-3xl font-medium">"Track Together, Settle Smarter"</p>
          </div>
          <div class="mt-4 text-xl font-mono shrink min-h-[6rem]">
            <Typewriter
              text="Simplify shared expenses among friends and family. Add costs, split bills, and settle up seamlessly for trips, events, and everyday life."
              :speed="100"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center w-full grow">
        <img
          src="/resources/images/iphone-screenshot.png"
          alt="Knight Wallet iPhone Screenshot"
          class="max-h-[75vh] w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,1)]"
        />
      </div>
    </div>
    <Transition>
      <div
        v-if="showSticky"
        class="fixed top-4 left-4 bg-primary px-4 py-2 rounded-lg shadow-lg z-50"
      >
        <h3 class="font-bold text-2xl text-text-contrast">Knight Wallet</h3>
      </div>
    </Transition>
  </div>
  <div class="flex min-h-screen w-full py-16">
    <div class="mx-8 md:mx-16 lg:mx-32 my-auto">
      <p class="font-bold text-6xl w-full text-center">Features</p>
      <p class="text-center text-3xl mt-2 mb-8 text-secondary-text">
        Discover the powerful features that make our app stand out.
      </p>
      <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
        <Card v-for="(card, index) in featureCards" :key="index">
          <template #icon>
            <Icon class="text-7xl text-accent" :icon="card.icon" />
          </template>
          <template #title>
            {{ card.name }}
          </template>
          <template #description>
            {{ card.description }}
          </template>
        </Card>
      </div>
    </div>
  </div>

  <hr class="border-t-4 border-accent w-full" />

  <div class="flex min-h-screen w-full py-16">
    <div class="mx-8 md:mx-16 lg:mx-32 my-auto">
      <p class="font-bold text-6xl w-full text-center mb-12">Meet the Development Team</p>
      <div class="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <Card v-for="(card, index) in bioCards" :key="index">
          <template #icon>
            <img :src="card.photo"
              alt="Profile Photo"
              class="w-32 h-32 object-cover rounded-full border-4 border-accent mx-auto"
            />
          </template>
          <template #title>
            {{ card.name }}
          </template>
          <template #description>
            {{ card.description }}
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Card from './components/Card.vue'
import Typewriter from './components/Typewriter.vue'

export default {
  components: {
    Typewriter,
    Card,
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
      bioCards: [
        {
          name: 'Marti Lonnemann',
          description: "Software developer and Bellarmine student with a passion for web development. Enjoys creating user-friendly applications that solve real-world problems.",
          photo: '/resources/images/MartiHeadshot.jpeg',
        },
        {
          name: 'Sam Kauffman',
          description: "Aspiring software developer and designer attending Bellarmine University pursuing a degree in computer science. Enjoys creating and designing websites using a unique and creative style.",
          photo: '/resources/images/SamHeadshot.jpg',
        },
        {
          name: 'Ronish Gautam',
          description: "Computer scince student at Bellarmine University with a passion for software development, who also enjoys traveling the world and staying active through fitness.",
          photo: '/resources/images/RonishHeadshot.jpg',
        },
        {
          name: 'Kirin Sharma',
          description: "College senior at Bellarmine University and aspiring software engineer passionate about developing impactful, innovative, and efficient software solutions to solve real-world challenges.",
          photo: '/resources/images/KirinHeadshot.jpeg',
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
