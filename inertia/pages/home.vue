<template>
  <div class="lg:mx-[12.5%] mx-0">
  <p class="font-bold text-6xl w-full text-center mt-8">Features</p>
  <p class="text-center text-3xl mt-2 mb-8 text-secondary-text">Discover the powerful features that make our app stand out.</p>
  <div class="grid 2xl:grid-cols-3 sm:grid-cols-2">
    <div v-for="(card, index) in featureCards" :key="index" class="card flex flex-col justify-center items-center p-10 m-4 hover:scale-105 transition-transform duration-300">
        <Icon class="text-9xl my-8 text-accent text-center" :icon="card.icon"/>
        <p class="font-bold text-5xl text-center">{{ card.name }}</p>
        <p class="text-2xl mb-2 mt-6 text-center !text-secondary-text">{{ card.description }}</p>
    </div>
  </div>
  </div>
</template>

<script lang="ts">

export default {
  components: {},
  data() {
    return {
      featureCards: [
        { name: 'Group Creation', description: 'Create friend groups and manage members on the go.', icon: 'mdi:people' },
        { name: 'Organization', description: 'Add and categorize expenses with ease.', icon: 'eos-icons:organization' },
        { name: 'Multiple Groups', description: 'Split expenses among selectable group members.', icon: 'material-symbols:groups' },
        { name: 'Multi-Currency', description: 'Multi-currency support for international use.', icon: 'bi:currency-exchange' },
        { name: 'Real-Time Updates', description: 'Instantly see payment updates.', icon: 'tabler:clock-filled' },
        { name: 'Payment App Integration', description: 'Integration with Venmo and other payment platforms.', icon: 'si:credit-card-detailed-fill' },
      ]
    }
  },
}
</script>