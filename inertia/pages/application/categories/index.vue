<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-text">Categories</h1>
    <Button label="Back to Project" icon="majesticons:arrow-left" @click="navigateToProject" />
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
    <div
      v-if="categories.length >= 1"
      v-for="category in categories"
      :key="category.id"
      class="cursor-pointer"
    >
      <Card alignment="left">
        <template #title>
          <div class="flex w-full items-center">
            <icon :icon="category.icon.iconString" class="mr-2" />
            <span>{{ category.name }}</span>
            <div class="ml-auto flex gap-2">
              <Button
                icon="majesticons:edit-pen-4"
                size="small"
                @click.stop="openEditDialog(category)"
              />
              <Button
                icon="majesticons:delete-bin"
                size="small"
                severity="danger"
                @click.stop="handleDelete(category.id)"
              />
            </div>
          </div>
        </template>
        <template #description>
          {{ category.description || 'No description' }}
        </template>
      </Card>
    </div>
    <Card v-else class="col-span-full" :hover-effect="false">
      <template #title> No Categories </template>
      <template #description> No categories have been created yet. </template>
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

  <Dialog v-model:visible="showCreateDialog" header="Create New Category">
    <FormBuilder :form="categoryForm" v-model="formData" @submit="handleSubmit" />
  </Dialog>

  <Dialog v-model:visible="showEditDialog" header="Edit Category">
    <FormBuilder :form="categoryForm" v-model="editFormData" @submit="handleUpdate" />
  </Dialog>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { router } from '@inertiajs/vue3'
import * as z from 'zod'
import type Project from '#models/project'
import type Category from '#models/category'
import type Icon from '#models/icon'
import AppLayout from '~/pages/layouts/AppLayout.vue'
import Card from '~/pages/components/Card.vue'
import Button from '~/pages/components/Button.vue'
import Dialog from '~/pages/components/Dialog.vue'
import FormBuilder, { defineForm } from '~/pages/components/FormBuilder.vue'

interface CategoryFormData {
  name: string
  description: string
  iconId: number
}

export default {
  name: 'CategoriesIndexPage',
  layout: AppLayout,
  components: {
    Card,
    Button,
    Dialog,
    FormBuilder,
  },
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
    icons: {
      type: Array as PropType<Icon[]>,
      required: true,
    },
    userRole: {
      type: String as PropType<'owner' | 'admin' | 'member' | null>,
    },
  },
  data() {
    return {
      showCreateDialog: false,
      showEditDialog: false,
      editingCategoryId: null as number | null,
      formData: {
        name: '',
        description: '',
        iconId: 0,
      } as CategoryFormData,
      editFormData: {
        name: '',
        description: '',
        iconId: 0,
      } as CategoryFormData,
      categoryForm: defineForm<CategoryFormData>({
        name: {
          type: 'text',
          label: 'Category Name',
          placeholder: 'Enter category name',
          validator: z
            .string()
            .trim()
            .min(1, 'Category name is required')
            .max(255, 'Category name must be less than 255 characters'),
          helpText: 'Give your category a descriptive name',
        },
        description: {
          type: 'textarea',
          label: 'Description',
          placeholder: 'Enter category description (optional)',
          validator: z.string().trim().max(1000, 'Description must be less than 1000 characters'),
          helpText: 'Briefly describe what this category is for',
        },
        iconId: {
          type: 'singleselect',
          label: 'Icon',
          placeholder: 'Select an icon',
          validator: z.number().positive('Please select an icon'),
          helpText: 'Choose an icon to represent this category',
          options: [],
        },
      }),
    }
  },
  mounted() {
    // Populate icon options
    ;(this.categoryForm.iconId as any).options = this.icons.map((icon: any) => ({
      label: icon.name,
      value: icon.id,
    }))
  },
  methods: {
    openCreateDialog() {
      this.formData = {
        name: '',
        description: '',
        iconId: this.icons[0]?.id || 0,
      }
      this.showCreateDialog = true
    },
    openEditDialog(category: any) {
      this.editingCategoryId = category.id
      this.editFormData = {
        name: category.name,
        description: category.description || '',
        iconId: category.iconId,
      }
      this.showEditDialog = true
    },
    navigateToProject() {
      router.visit(`/projects/${this.project.id}`)
    },
    handleSubmit(data: CategoryFormData) {
      router.post(`/projects/${this.project.id}/categories`, data as Record<string, any>)
    },
    handleUpdate(data: CategoryFormData) {
      if (this.editingCategoryId) {
        router.put(`/categories/${this.editingCategoryId}`, data as Record<string, any>)
      }
    },
    handleDelete(categoryId: number) {
      if (confirm('Are you sure you want to delete this category?')) {
        router.delete(`/categories/${categoryId}`)
      }
    },
  },
}
</script>
