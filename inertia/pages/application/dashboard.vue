<template>
  <div>
    <Card :hover-effect="false">
      <template #title> Dashboard </template>

      <template #description> You're logged in as {{ user.fullName }}! </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import AppLayout from '../layouts/AppLayout.vue'
import type Project from '#models/project'
import Card from '../components/Card.vue'
import type User from '#models/user'

export default {
  name: 'DashboardPage',
  layout: AppLayout,
  components: {
    Card,
  },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
    test: {
      type: String,
    },
    projects: {
      type: Array as PropType<Project[]>,
    },
  },
  methods: {
    logout() {
      window.location.href = '/auth/logout'
    },
  },
}
</script>
