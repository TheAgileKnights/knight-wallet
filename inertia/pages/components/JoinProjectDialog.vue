<template>
  <Dialog v-model:visible="internalVisible" header="Join Project">
    <FormBuilder :form="joinForm" v-model="formData" @submit="handleSubmit" />
  </Dialog>
</template>

<script lang="ts">
import * as z from 'zod'
import Dialog from './Dialog.vue'
import FormBuilder, { defineForm } from './FormBuilder.vue'
import { router } from '@inertiajs/vue3'

interface JoinFormData {
  inviteCode: string
}

export default {
  name: 'JoinProjectDialog',
  components: {
    Dialog,
    FormBuilder,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:visible'],
  data() {
    return {
      formData: {
        inviteCode: '',
      } as JoinFormData,
      joinForm: defineForm<JoinFormData>({
        inviteCode: {
          type: 'text',
          label: 'Invite Link or Code',
          placeholder: 'Enter invite link or code',
          validator: z.string().trim().min(1, 'Invite code is required'),
          helpText: 'Paste the full invite link or just the code',
        },
      }),
    }
  },
  computed: {
    internalVisible: {
      get() {
        return this.visible
      },
      set(value: boolean) {
        this.$emit('update:visible', value)
      },
    },
  },
  methods: {
    handleSubmit(data: JoinFormData) {
      const token = this.extractToken(data.inviteCode)
      router.post(`/invite/${token}/accept`)
    },
    extractToken(input: string): string {
      const trimmed = input.trim()

      // Check if it's a full URL
      if (trimmed.includes('/invite/')) {
        const match = trimmed.match(/\/invite\/([^/?]+)/)
        return match ? match[1] : trimmed
      }

      // Otherwise, treat it as just the token
      return trimmed
    },
  },
}
</script>
