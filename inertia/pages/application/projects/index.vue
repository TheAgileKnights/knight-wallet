<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
    <div
      v-if="userProjects.length >= 1"
      v-for="project in userProjects"
      :key="project.id"
      @click="navigateToProject(project.id)"
      class="cursor-pointer"
    >
      <Card>
        <template #title>
          {{ project.name }}
        </template>
        <template #description>
          {{ project.description }}
        </template>
      </Card>
    </div>
    <Card v-else class="col-span-full" :hover-effect="false">
      <template #title> No Projects </template>
      <template #description> You don't have any projects yet. </template>
    </Card>
  </div>
  <div class="fixed bottom-12 right-4">
    <Button
      icon="majesticons:plus"
      size="large"
      rounded="full"
      class="drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
      @click="openCreateDialog"
    />
  </div>

  <Dialog v-model:visible="showCreateDialog" header="Create New Project">
    <FormBuilder :form="projectForm" v-model="formData" @submit="handleSubmit" />
  </Dialog>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { router } from '@inertiajs/vue3'
import * as z from 'zod'
import type User from '#models/user'
import AppLayout from '~/pages/layouts/AppLayout.vue'
import Card from '~/pages/components/Card.vue'
import { UserProjects } from '../../../../app/types/project'
import Button from '~/pages/components/Button.vue'
import Dialog from '~/pages/components/Dialog.vue'
import FormBuilder, { defineForm } from '~/pages/components/FormBuilder.vue'

interface ProjectFormData {
  name: string
  description: string
}

export default {
  name: 'DashboardPage',
  layout: AppLayout,
  components: {
    Card,
    Button,
    Dialog,
    FormBuilder,
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
      type: Object as PropType<UserProjects>,
    },
  },
  data() {
    return {
      showCreateDialog: false,
      formData: {
        name: '',
        description: '',
      } as ProjectFormData,
      projectForm: defineForm<ProjectFormData>({
        name: {
          type: 'text',
          label: 'Project Name',
          placeholder: 'Enter project name',
          validator: z.string().trim().min(1, 'Project name is required').max(255, 'Project name must be less than 255 characters'),
          helpText: 'Give your project a descriptive name',
        },
        description: {
          type: 'textarea',
          label: 'Description',
          placeholder: 'Enter project description (optional)',
          validator: z.string().trim().max(1000, 'Description must be less than 1000 characters'),
          helpText: 'Briefly describe what this project is about',
        },
      }),
    }
  },
  computed: {
    userProjects() {
      return Array.from(Object.values(this.projects || {})).flat()
    },
  },
  methods: {
    openCreateDialog() {
      this.showCreateDialog = true
    },
    navigateToProject(projectId: string) {
      console.log('Navigating to project:', projectId)
      router.visit(`/projects/${projectId}`)
    },
    handleSubmit(data: ProjectFormData) {
      router.post('/projects', data as Record<string, any>)
    },
  },
}
</script>
