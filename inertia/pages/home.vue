<template>
  <div class="mx-[12.5%]">
  <p class="font-bold text-7xl w-full text-center mt-8">Features</p>
  <p class="text-center text-2xl my-4">Discover the powerful features that make our app stand out.</p>
  <div class="grid grid-cols-3">
    <div v-for="(card, index) in featureCards" :key="index" class="card flex flex-col justify-center items-center p-10 m-4 hover:scale-105 transition-transform duration-300">
        <Icon class="mx-1 text-9xl m-16 text-accent" :icon="card.icon"/>
        <p class="font-bold text-4xl m-auto">{{ card.name }}</p>
        <p class="text-lg my-2">{{ card.description }}</p>
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
        { name: 'Multiple Groups', description: 'Split expenses among selectable group members.', icon: 'codicon:organization' },
        { name: 'Multi-Currency', description: 'Multi-currency support for international use.', icon: 'mdi:currency-usd' },
        { name: 'Real-Time Updates', description: 'Instantly see payment updates.', icon: 'mdi:refresh' },
        { name: 'Payment App Integration', description: 'Integration with Venmo and other payment platforms.', icon: 'mdi:credit-card' },
      ]
    }
  },
}
</script>