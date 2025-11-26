<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-text">Project Details</h1>
      <div class="flex gap-2">
        <Button label="Categories" icon="majesticons:tag" @click="navigateToCategories" />
        <Button
          v-if="userRole === 'owner'"
          label="Share Project"
          icon="majesticons:share"
          @click="handleShareProject"
        />
      </div>
    </div>
    <pre class="text-text-secondary bg-background-secondary p-4 rounded-lg overflow-auto">{{
      project
    }}</pre>
  </div>

  <ShareProjectDialog v-model:visible="showShareDialog" :invitation="currentInvitation" />
</template>

<script lang="ts">
import { PropType } from 'vue'
import { router } from '@inertiajs/vue3'
import type Project from '#models/project'
import AppLayout from '~/pages/layouts/AppLayout.vue'
import Button from '~/pages/components/Button.vue'
import ShareProjectDialog from '~/pages/components/ShareProjectDialog.vue'

interface Invitation {
  token: string
  projectId: number
}

export default {
  name: 'ProjectShowPage',
  layout: AppLayout,
  components: {
    Button,
    ShareProjectDialog,
  },
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
    userRole: {
      type: String,
      required: false,
    },
    invitation: {
      type: Object as PropType<Invitation | null>,
      default: null,
    },
  },
  data() {
    return {
      showShareDialog: false,
      currentInvitation: this.invitation as Invitation | null,
    }
  },
  methods: {
    navigateToCategories() {
      router.visit(`/projects/${this.project.id}/categories`)
    },
    handleShareProject() {
      if (this.currentInvitation) {
        this.showShareDialog = true
      } else {
        router.post(
          `/projects/${this.project.id}/invitations`,
          { role: 'member' },
          {
            onSuccess: () => {
              router.reload({
                onSuccess: (page: any) => {
                  this.currentInvitation = page.props.invitation
                  this.showShareDialog = true
                },
              })
            },
          }
        )
      }
    },
  },
}
</script>
