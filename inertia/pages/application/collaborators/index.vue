<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-text">Collaborators</h1>
  </div>

  <div class="grid grid-cols-1 gap-2">
    <!-- Current Collaborators -->
    <div
      v-if="collaborators.length >= 1"
      v-for="collaborator in collaborators"
      :key="collaborator.id"
    >
      <Card alignment="left" :hover-effect="false">
        <template #title>
          <div class="flex w-full items-center">
            <div class="flex flex-col">
              <span>{{ collaborator.fullName }}</span>
              <span class="text-xs opacity-50">{{ collaborator.email }}</span>
            </div>
            <div class="ml-auto flex gap-2">
              <span class="text-sm font-semibold px-3 py-1 rounded-full bg-background-secondary">
                {{ getCollaboratorRole(collaborator.id) }}
              </span>
              <Button
                v-if="userRole === 'owner' && getCollaboratorRole(collaborator.id) !== 'Owner'"
                icon="majesticons:delete-bin"
                size="small"
                @click.stop="handleRemoveCollaborator(collaborator.id)"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
    <Card v-else class="col-span-full" :hover-effect="false">
      <template #title> No Collaborators </template>
      <template #description> This project doesn't have any collaborators yet. </template>
    </Card>

    <!-- Active Invitation with QR Code -->
    <Card
      v-if="invitation && userRole === 'owner'"
      class="col-span-full mt-2"
      :hover-effect="false"
    >
      <template #title>
        <div class="flex w-full items-center">
          <span>Active Invitation Link</span>
          <div class="ml-auto flex gap-2">
            <Button
              label="Copy Link"
              icon="majesticons:clipboard"
              size="small"
              @click="copyInvitationLink"
            />
            <Button
              label="Download QR"
              icon="majesticons:qr-code"
              size="small"
              @click="downloadQRCode"
            />
            <Button icon="majesticons:delete-bin" size="small" @click="handleRevokeInvitation" />
          </div>
        </div>
      </template>
      <template #description>
        <div class="flex gap-4 items-start">
          <div class="flex-1 gap-4">
            <div class="font-mono text-sm break-all mb-2">{{ invitationUrl }}</div>
            <div class="text-xs opacity-70">
              Share this link or QR code with people you want to invite to this project
            </div>
          </div>
        </div>
        <div class="w-full mt-4">
          <QrcodeVue :value="invitationUrl" :size="200" level="H" ref="qrcode" class="mx-auto" />
        </div>
      </template>
    </Card>

    <Button
      v-if="!invitation && userRole === 'owner'"
      label="Generate Invitation Link"
      icon="majesticons:share"
      class="mt-4"
      @click="handleGenerateInvitation"
    />
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { router } from '@inertiajs/vue3'
import QrcodeVue from 'qrcode.vue'
import type Project from '#models/project'
import type User from '#models/user'
import AppLayout from '~/pages/layouts/AppLayout.vue'
import Card from '~/pages/components/Card.vue'
import Button from '~/pages/components/Button.vue'

interface Invitation {
  token: string
  projectId: number
}

export default {
  name: 'CollaboratorsIndexPage',
  layout: AppLayout,
  components: {
    Card,
    Button,
    QrcodeVue,
  },
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
    collaborators: {
      type: Array as PropType<User[]>,
      required: true,
    },
    userRole: {
      type: String as PropType<'owner' | 'admin' | 'member' | null>,
    },
    invitation: {
      type: Object as PropType<Invitation | null>,
      default: null,
    },
    projectOwner: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  computed: {
    invitationUrl(): string {
      if (!this.invitation) return ''
      return `${window.location.origin}/invite/${this.invitation.token}`
    },
  },
  methods: {
    getCollaboratorRole(userId: number): string {
      if (userId === this.projectOwner.id) {
        return 'Owner'
      }
      // In the future, you can add more role logic here
      return 'Member'
    },
    handleGenerateInvitation() {
      router.post(
        `/app/projects/${this.project.id}/invitations`,
        { role: 'member' },
        {
          onSuccess: () => {
            router.reload()
          },
        }
      )
    },
    handleRevokeInvitation() {
      if (this.invitation && confirm('Are you sure you want to revoke this invitation link?')) {
        router.delete(`/app/invitations/${this.invitation.token}`, {
          onSuccess: () => {
            router.reload()
          },
        })
      }
    },
    handleRemoveCollaborator(userId: number) {
      if (confirm('Are you sure you want to remove this collaborator?')) {
        router.delete(`/app/projects/${this.project.id}/collaborators/${userId}`, {
          onSuccess: () => {
            router.reload()
          },
        })
      }
    },
    async copyInvitationLink() {
      try {
        await navigator.clipboard.writeText(this.invitationUrl)
        alert('Invitation link copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy:', err)
        alert('Failed to copy link to clipboard')
      }
    },
    downloadQRCode() {
      // Get the QR code canvas element
      const qrCanvas = (this.$refs.qrcode as any).$el.querySelector('canvas')
      if (!qrCanvas) {
        alert('Failed to generate QR code')
        return
      }

      // Convert canvas to blob and download
      qrCanvas.toBlob((blob: Blob) => {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${this.project.name}-invitation-qr.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })
    },
  },
}
</script>
