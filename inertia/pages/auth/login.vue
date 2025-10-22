<template>
  {{ error }}
  <form @submit.prevent="login">
    <button type="submit">Login with Google</button>
  </form>
</template>

<script lang="ts">
export default {
  name: 'LoginPage',
  props: {
    error: {
      type: String,
      required: false,
    },
  },
  methods: {
    login() {
      window.location.href = '/auth/google/redirect'
    },
  },
}
</script>
