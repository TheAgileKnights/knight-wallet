<template>
  <div class="p-4">
    <h1 class="text-2xl">Debug Page</h1>
    <div>
      <img src="/images/headshot.jpg" class="aspect-square h-48" />
    </div>
    <Button @click="dialogVisible = true" label="Open Dialog" />
    <Dialog header="Test Header" v-model:visible="dialogVisible" :actions="dialogActions">
      <p>This is a test dialog.</p>
    </Dialog>
    {{ myText }}
    <Input placeholder="Test..." />
    <SelectChips
      :options="[
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ]"
      v-model="selection"
      :single="true"
    />
    <FormBuilder :form="exampleForm" v-model="exampleFormData" @submit="handleFormSubmit" />
  </div>
</template>

<script lang="ts">
import * as z from 'zod'
import { Severity } from '~/types/severity'
import Button from './components/Button.vue'
import Dialog from './components/Dialog.vue'
import FormBuilder, { defineForm } from './components/FormBuilder.vue'
import Input from './components/Input.vue'
import SelectChips from './components/SelectChips.vue'

interface MyFormData {
  name: string
  email: string
  message: string
  agreeToTerms: boolean
}

export default {
  name: 'DebugPage',
  components: {
    Button,
    Dialog,
    FormBuilder,
    Input,
    SelectChips,
  },
  data() {
    return {
      dialogVisible: false,
      myText: 'This is some debug text.',
      selection: 1,
      exampleFormData: {
        name: '',
        email: '',
        message: '',
        agreeToTerms: false,
      } as MyFormData,
      exampleForm: defineForm<MyFormData>({
        headerPersonalInfo: {
          type: 'header',
          text: 'Personal Information',
          level: 2,
        },
        name: {
          type: 'text',
          label: 'Name',
          validator: z.string().min(2, 'Name must be at least 2 characters'),
        },
        email: {
          type: 'email',
          label: 'Email',
          validator: z.string().email('Invalid email address'),
          disabled: (formData: MyFormData) => formData.name.length < 2,
        },
        divider1: {
          type: 'divider',
          spacing: 'md',
        },
        headerMessage: {
          type: 'header',
          text: 'Your Message',
          level: 3,
        },
        message: {
          type: 'textarea',
          label: 'Message',
          validator: z.string().min(10, 'Message must be at least 10 characters'),
          disabled: (formData: MyFormData) => !formData.email || !formData.agreeToTerms,
          helpText: 'Please provide detailed information',
        },
        divider2: {
          type: 'divider',
        },
        agreeToTerms: {
          type: 'checkbox',
          label: 'I agree to the terms',
          validator: z.boolean().refine((val) => val === true, {
            message: 'You must agree to the terms',
          }),
        },
      }),
    }
  },
  computed: {
    dialogActions() {
      return [
        {
          label: 'Cancel',
          severity: 'secondary' as Severity,
          action: () => {
            this.myText = 'Dialog was cancelled.'
          },
        },
        {
          label: 'Confirm',
          severity: 'primary' as Severity,
          action: () => {
            this.myText = 'Dialog was confirmed.'
          },
        },
      ]
    },
  },
  methods: {
    handleFormSubmit(formData: MyFormData) {
      alert('Form submitted successfully!')
    },
  },
}
</script>
