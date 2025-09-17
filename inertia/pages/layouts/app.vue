<template>
  <div class="min-h-screen">
    <slot />
  </div>
  <footer class="bg-primary text-text-contrast py-4 w-full">
    <div class="container mx-auto text-center">
      <p class="text-text-contrast">&copy; 2025 Knight Wallet. Built with love by the Agile Knights</p>
      <p class="text-text-contrast-secondary">"Track Together, Settle Smarter"</p>
    </div>
  </footer>
</template>

<script lang="ts">
  export default {
    components: {
    },
    data() {
      return {}
    }
  }
</script>