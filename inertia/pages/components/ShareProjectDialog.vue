<template>
  <Dialog v-model:visible="internalVisible" header="Share Project">
    <div class="flex flex-col gap-4">
      <p class="text-sm opacity-70">
        Share this link or code with others to invite them to collaborate on this project.
      </p>

      <div v-if="invitation" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Invite Link</label>
          <div class="flex gap-2">
            <Input :model-value="inviteUrl" disabled class="flex-1 font-mono" />
            <Button icon="majesticons:copy" @click="copyToClipboard(inviteUrl)" label="Copy" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Invite Code</label>
          <div class="flex gap-2">
            <Input :model-value="invitation.token" disabled class="flex-1 font-mono" />
            <Button icon="majesticons:copy" @click="copyToClipboard(invitation.token)" label="Copy" />
          </div>
          <p class="text-xs opacity-60">Users can enter this code in the Join Project dialog</p>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { PropType } from 'vue'
import Dialog from './Dialog.vue'
import Button from './Button.vue'
import Input from './Input.vue'

interface Invitation {
  token: string
  projectId: number
}

export default {
  name: 'ShareProjectDialog',
  components: {
    Dialog,
    Button,
    Input,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    invitation: {
      type: Object as PropType<Invitation | null>,
      default: null,
    },
  },
  emits: ['update:visible'],
  computed: {
    internalVisible: {
      get() {
        return this.visible
      },
      set(value: boolean) {
        this.$emit('update:visible', value)
      },
    },
    inviteUrl() {
      if (!this.invitation) return ''
      return `${window.location.origin}/invite/${this.invitation.token}`
    },
  },
  methods: {
    async copyToClipboard(text: string) {
      await navigator.clipboard.writeText(text)
    },
  },
}
</script>
