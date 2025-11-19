<template>
  <div>
    <h1>Form Builder Example</h1>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <template v-for="(element, key) in form" :key="key">
        <!-- Header -->
        <component
          v-if="element.type === 'header'"
          :is="`h${element.level || 2}`"
          class="text-text font-bold"
          :class="{
            'text-3xl': element.level === 1,
            'text-2xl': element.level === 2,
            'text-xl': element.level === 3,
            'text-lg': element.level === 4,
            'text-base': element.level === 5 || element.level === 6,
          }"
        >
          {{ element.text }}
        </component>

        <!-- Divider -->
        <hr
          v-else-if="element.type === 'divider'"
          class="border-border"
          :class="{
            'my-2': element.spacing === 'sm',
            'my-4': element.spacing === 'md' || !element.spacing,
            'my-8': element.spacing === 'lg',
          }"
        />

        <!-- Text Content -->
        <p v-else-if="element.type === 'textContent'" class="text-text-secondary">
          {{ element.content }}
        </p>

        <!-- Text Input -->
        <div v-else-if="element.type === 'text'" class="flex flex-col gap-1">
          <Input
            :label="element.label"
            :placeholder="element.placeholder"
            type="text"
            v-model="(formData as any)[key]"
            :disabled="isFieldDisabled(element)"
          />
          <small v-if="element.helpText" class="text-text-secondary">{{ element.helpText }}</small>
          <small v-if="errors[key]" class="text-red-500">{{ errors[key] }}</small>
        </div>

        <!-- Email Input -->
        <div v-else-if="element.type === 'email'" class="flex flex-col gap-1">
          <Input
            :label="element.label"
            :placeholder="element.placeholder"
            type="email"
            v-model="(formData as any)[key]"
            :disabled="isFieldDisabled(element)"
          />
          <small v-if="element.helpText" class="text-text-secondary">{{ element.helpText }}</small>
          <small v-if="errors[key]" class="text-red-500">{{ errors[key] }}</small>
        </div>

        <!-- Number Input -->
        <div v-else-if="element.type === 'number'" class="flex flex-col gap-1">
          <Input
            :label="element.label"
            :placeholder="element.placeholder"
            type="number"
            v-model="(formData as any)[key]"
            :disabled="isFieldDisabled(element)"
          />
          <small v-if="element.helpText" class="text-text-secondary">{{ element.helpText }}</small>
          <small v-if="errors[key]" class="text-red-500">{{ errors[key] }}</small>
        </div>

        <!-- Textarea -->
        <div v-else-if="element.type === 'textarea'" class="flex flex-col gap-1">
          <TextArea
            :label="element.label"
            :placeholder="element.placeholder"
            v-model="(formData as any)[key]"
            :disabled="isFieldDisabled(element)"
          />
          <small v-if="element.helpText" class="text-text-secondary">{{ element.helpText }}</small>
          <small v-if="errors[key]" class="text-red-500">{{ errors[key] }}</small>
        </div>

        <!-- Select (using SelectChips) -->
        <div v-else-if="element.type === 'select'" class="flex flex-col gap-1">
          <small class="text-text">{{ element.label }}</small>
          <SelectChips
            :options="element.options"
            v-model="(formData as any)[key]"
            :single="true"
            :disabled="isFieldDisabled(element)"
          />
          <small v-if="element.helpText" class="text-text-secondary">{{ element.helpText }}</small>
          <small v-if="errors[key]" class="text-red-500">{{ errors[key] }}</small>
        </div>

        <!-- Checkbox (using SelectChips with Yes/No) -->
        <div v-else-if="element.type === 'checkbox'" class="flex flex-col gap-1">
          <small class="text-text">{{ element.label }}</small>
          <SelectChips
            :options="checkboxOptions"
            v-model="(formData as any)[key]"
            :single="true"
            :disabled="isFieldDisabled(element)"
          />
          <small v-if="element.helpText" class="text-text-secondary">{{ element.helpText }}</small>
          <small v-if="errors[key]" class="text-red-500">{{ errors[key] }}</small>
        </div>
      </template>

      <button type="submit" class="px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent-hover">
        Submit
      </button>
    </form>

    <div class="mt-8">
      <h3 class="text-text text-lg font-bold">Form Data:</h3>
      <pre class="text-text-secondary">{{ formData }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import * as z from 'zod'
import Input from './Input.vue'
import TextArea from './TextArea.vue'
import SelectChips from './SelectChips.vue'

interface FormBuilderInputBase<T> {
  type: string
  label: string
  validator?: z.ZodType<any>
  disabled?: (formData: T) => boolean
  helpText?: string
}

interface FormBuilderTextInput<T> extends FormBuilderInputBase<T> {
  type: 'text'
  validator?: z.ZodType<string>
  placeholder?: string
}

interface FormBuilderEmailInput<T> extends FormBuilderInputBase<T> {
  type: 'email'
  validator?: z.ZodType<string>
  placeholder?: string
}

interface FormBuilderNumberInput<T> extends FormBuilderInputBase<T> {
  type: 'number'
  validator?: z.ZodType<number>
  placeholder?: string
}

interface FormBuilderSelectInput<T> extends FormBuilderInputBase<T> {
  type: 'select'
  options: Array<{ label: string; value: any }>
  validator?: z.ZodType<any>
}

interface FormBuilderCheckboxInput<T> extends FormBuilderInputBase<T> {
  type: 'checkbox'
  validator?: z.ZodType<boolean>
}

interface FormBuilderTextareaInput<T> extends FormBuilderInputBase<T> {
  type: 'textarea'
  validator?: z.ZodType<string>
  placeholder?: string
}

type InputFieldConfig<T> =
  | FormBuilderTextInput<T>
  | FormBuilderEmailInput<T>
  | FormBuilderNumberInput<T>
  | FormBuilderTextareaInput<T>
  | FormBuilderSelectInput<T>
  | FormBuilderCheckboxInput<T>

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
  type: 'textContent'
  content: string
}

// Union of all possible form elements
type FormElement<T> = InputFieldConfig<T> | HeaderConfig | DividerConfig | TextConfig

// FormBase - creates a typed form configuration
// Allows any keys, but constrains each value to be a FormElement<T>
type FormBase<T extends Record<string, any>> = Record<string, FormElement<T>>

interface MyFormData {
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
    validator: z.string().email('Invalid email address'),
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
    validator: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms',
    }),
  },
}

export default {
  name: 'FormBuilderComponent',
  components: {
    Input,
    TextArea,
    SelectChips,
  },
  data() {
    return {
      form: formConfig,
      formData: {
        name: '',
        email: '',
        message: '',
        agreeToTerms: false,
      } as MyFormData,
      errors: {} as Record<string, string>,
    }
  },
  computed: {
    checkboxOptions() {
      return [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ]
    },
  },
  methods: {
    isFieldDisabled(element: any) {
      if ('disabled' in element && element.disabled) {
        return element.disabled(this.formData)
      }
      return false
    },
    handleSubmit() {
      this.errors = {}

      // Validate each field
      for (const [key, element] of Object.entries(this.form)) {
        if ('validator' in element && element.validator) {
          try {
            element.validator.parse((this.formData as any)[key])
          } catch (error) {
            if (error instanceof z.ZodError) {
              this.errors[key] = error.issues[0].message
            }
          }
        }
      }

      // If no errors, submit the form
      if (Object.keys(this.errors).length === 0) {
        console.log('Form submitted successfully:', this.formData)
        alert('Form submitted successfully!')
      } else {
        console.log('Form has errors:', this.errors)
      }
    },
  },
}
</script>
