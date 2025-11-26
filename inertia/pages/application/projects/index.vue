<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-text">Projects</h1>
    <Button label="Join" icon="majesticons:send" @click="openJoinDialog" />
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
    <div
      v-if="userProjects.length >= 1"
      v-for="project in userProjects"
      :key="project.id"
      class="cursor-pointer"
      @click="navigateToProject(project.id)"
    >
      <Card alignment="left">
        <template #title>
          <div class="flex w-full">
            <div class="flex flex-col">
              <span>{{ project.name }}</span>
              <span class="text-xs opacity-50">{{ getProjectRole(project.id) }}</span>
            </div>
            <div class="ml-auto">
              <Button icon="majesticons:settings-cog" @click.stop=""> </Button>
            </div>
          </div>
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
  <div class="fixed bottom-20 right-4">
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
  <JoinProjectDialog v-model:visible="showJoinDialog" />
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
import JoinProjectDialog from '~/pages/components/JoinProjectDialog.vue'

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
    JoinProjectDialog,
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
      showJoinDialog: false,
      formData: {
        name: '',
        description: '',
      } as ProjectFormData,
      projectForm: defineForm<ProjectFormData>({
        name: {
          type: 'text',
          label: 'Project Name',
          placeholder: 'Enter project name',
          validator: z
            .string()
            .trim()
            .min(1, 'Project name is required')
            .max(255, 'Project name must be less than 255 characters'),
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
    openJoinDialog() {
      this.showJoinDialog = true
    },
    navigateToProject(projectId: number) {
      router.visit(`/projects/${projectId}`)
    },
    handleSubmit(data: ProjectFormData) {
      router.post('/projects', data as Record<string, any>)
    },
    getProjectRole(projectId: number) {
      if (this.projects?.owned?.some((p: any) => p.id === projectId)) {
        return 'Owner'
      }
      return 'Shared'
    },
  },
}
</script>
