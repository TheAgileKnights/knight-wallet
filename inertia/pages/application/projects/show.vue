<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-text mb-6">Project Details</h1>
    <pre class="text-text-secondary bg-background-secondary p-4 rounded-lg overflow-auto">{{
      project
    }}</pre>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import type Project from '#models/project'
import AppLayout from '~/pages/layouts/AppLayout.vue'

export default {
  name: 'ProjectShowPage',
  layout: AppLayout,
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
    userRole: {
      type: String,
      required: false,
    },
  },
}
</script>
