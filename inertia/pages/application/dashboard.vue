<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard!</p>
  </div>
  <pre>
    {{ JSON.stringify(user) }}
  </pre>
  <button @click="logout">Logout</button>
</template>

<script lang="ts">
import AppLayout from '../layouts/AppLayout.vue';


export default {
  name: 'DashboardPage',
  layout: AppLayout,
  props: {
    user: {
      type: Object
    },
    test: {
      type: String
    }
  },
  methods: {
    logout() {
      window.location.href = '/auth/logout'
    }
  }
}
</script>
