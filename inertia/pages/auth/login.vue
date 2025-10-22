<template>
  <AuthFormLayout title="Login to Knight Wallet">
    <form @submit.prevent="login">
      <Button icon="mdi:google">Login with Google</Button>
    </form>
  </AuthFormLayout>
</template>

<script lang="ts">
import Button from '../components/Button.vue';
import AuthFormLayout from '../layouts/AuthFormLayout.vue';

export default {
  name: 'LoginPage',
  components: {
    AuthFormLayout,
    Button
  },
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
