<template>
  <div class="min-h-screen w-full flex justify-center items-center">
    <div class="lg:mx-[12.5%] mx-0">
      <p class="font-bold text-6xl w-full text-center mt-8">Features</p>
      <p class="text-center text-3xl mt-2 mb-8 text-secondary-text">
        Discover the powerful features that make our app stand out.
      </p>
      <transition-group 
        name="card-shuffle" 
        tag="div" 
        class="grid 2xl:grid-cols-3 sm:grid-cols-2"
      >
        <div
          v-for="card in featureCards"
          :key="card.id"
          class="card flex flex-col justify-center items-center p-10 m-4 hover:cursor-pointer hover:scale-105 transition-transform duration-300"
          @click="shuffleCards()"
        >
          <Icon class="text-9xl my-8 text-accent text-center" :icon="card.icon" />
          <p class="font-bold text-5xl text-center select-none">{{ card.name }}</p>
          <p class="text-2xl mb-2 mt-6 text-center !text-secondary-text select-none">{{ card.description }}</p>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
  data() {
    return {
      featureCards: [
        {
          id: 1,
          name: 'Group Creation',
          description: 'Create friend groups and manage members on the go.',
          icon: 'mdi:people',
        },
        {
          id: 2,
          name: 'Organization',
          description: 'Add and categorize expenses with ease.',
          icon: 'eos-icons:organization',
        },
        {
          id: 3,
          name: 'Multiple Groups',
          description: 'Split expenses among selectable group members.',
          icon: 'material-symbols:groups',
        },
        {
          id: 4,
          name: 'Multi-Currency',
          description: 'Multi-currency support for international use.',
          icon: 'bi:currency-exchange',
        },
        {
          id: 5,
          name: 'Real-Time Updates',
          description: 'Instantly see payment updates.',
          icon: 'tabler:clock-filled',
        },
        {
          id: 6,
          name: 'Payment App Integration',
          description: 'Integration with Venmo and other payment platforms.',
          icon: 'si:credit-card-detailed-fill',
        },
      ],
    }
  },
  methods: {
    shuffleCards() {
      this.featureCards = this.featureCards
        .map((card) => ({ card, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ card }) => card)
    },
  },
}
</script>

<style scoped>
.card-shuffle-move {
  transition: transform 0.6s ease;
}
</style>