<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
    <Card v-if="userProjects.length >= 1" v-for="project in userProjects" :key="project.id">
      <template #title>
        {{ project.name }}
      </template>
      <template #description>
        {{ project.description }}
      </template>
    </Card>
    <Card v-else class="col-span-full">
      <template #title>
        No Projects
      </template>
      <template #description>
        You don't have any projects yet.
      </template>
    </Card>
  </div>
  <div class="fixed bottom-12 right-4">
    <Button icon="majesticons:plus" size="large" rounded="full" class="drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]"/>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import type User from '#models/user';
import AppLayout from '~/pages/layouts/AppLayout.vue';
import Card from '~/pages/components/Card.vue';
import { UserProjects } from '../../../../app/types/project';
import Button from '~/pages/components/Button.vue';


export default {
  name: 'DashboardPage',
  layout: AppLayout,
  components: {
    Card,
    Button
  },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true  
    },
    test: {
      type: String
    },
    projects: {
      type: Object as PropType<UserProjects>
    }
  },
  computed: {
    userProjects() {
      return Array.from(Object.values(this.projects || {})).flat()
    }
  },
  methods: {
  }
}
</script>
