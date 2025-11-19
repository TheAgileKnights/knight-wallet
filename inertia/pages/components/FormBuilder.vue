<template>
  <div>
    <h1>Form Builder Example</h1>
    <pre>{{ form }}</pre>
  </div>
</template>

<script lang="ts">
import * as z from 'zod'

// Input field configuration
type InputFieldConfig<T> = {
  type: 'text' | 'email' | 'textarea' | 'number' | 'checkbox' | 'select' | 'password' | 'date'
  label: string
  validator?: z.ZodType<any>
  disabled?: (formData: T) => boolean
  placeholder?: string
  options?: Array<{ label: string; value: any }>
  helpText?: string
}

// Non-input elements
type HeaderConfig = {
  type: 'header'
  text: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

type DividerConfig = {
  type: 'divider'
  spacing?: 'sm' | 'md' | 'lg'
}

type TextConfig = {
  type: 'text'
  content: string
}

// Union of all possible form elements
type FormElement<T> = InputFieldConfig<T> | HeaderConfig | DividerConfig | TextConfig

// FormBase - creates a typed form configuration
// Allows any keys, but constrains each value to be a FormElement<T>
type FormBase<T extends Record<string, any>> = Record<string, FormElement<T>>

// Example usage with typed form data
type MyFormData = {
  name: string
  email: string
  message: string
  agreeToTerms: boolean
}

const formConfig: FormBase<MyFormData> = {
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
    validator: z.email('Invalid email address'),
    // The disabled function now has access to typed formData!
    disabled: (formData) => formData.name.length < 2,
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
    // TypeScript knows all the properties of formData
    disabled: (formData) => !formData.email || !formData.agreeToTerms,
    helpText: 'Please provide detailed information',
  },
  divider2: {
    type: 'divider',
  },
  agreeToTerms: {
    type: 'checkbox',
    label: 'I agree to the terms',
    validator: z.boolean(),
  },
}

export default {
  name: 'FormBuilderComponent',
  data() {
    return {
      form: formConfig,
    }
  },
}
</script>
