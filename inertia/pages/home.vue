<template>
  <div class="flex min-h-screen w-full">
    <div class="mx-8 md:mx-16 lg:mx-32 my-auto">
      <p class="font-bold text-6xl w-full text-center">Features</p>
      <p class="text-center text-3xl mt-2 mb-8 text-secondary-text">
        Discover the powerful features that make our app stand out.
      </p>
        <transition-group 
          name="card-shuffle" 
          tag="div" 
          class="grid lg:grid-cols-3 sm:grid-cols-2 gap-4"
        >
          <Card v-for="(card, index) in featureCards" :key="index" id="card">
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
        </transition-group>
      </div>
  </div>
</template>

<script lang="ts">
import Card from './components/Card.vue'

export default {
  components: {
    Card,
  },
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
      for (let i = this.featureCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.featureCards[i], this.featureCards[j]] = [this.featureCards[j], this.featureCards[i]];
      }
    },
  },
}
</script>

<style scoped>
.card-shuffle-move {
  transition: transform 0.6s ease;
}
</style>