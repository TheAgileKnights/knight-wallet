<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-text">Expenses</h1>
    <Button label="Back to Project" icon="majesticons:arrow-left" @click="navigateToProject" />
  </div>

  <div class="grid grid-cols-1 gap-2">
    <div v-if="expenses.length >= 1" v-for="expense in expenses" :key="expense.id">
      <Card alignment="left">
        <template #title>
          <div class="flex w-full items-center">
            <icon :icon="expense.category.icon.iconString" class="mr-2" />
            <div class="flex flex-col">
              <span>{{ expense.name }}</span>
              <span class="text-xs opacity-50">{{ expense.category.name }}</span>
            </div>
            <div class="ml-auto flex items-center gap-3">
              <span class="text-lg font-bold"
                >{{ expense.currency.symbol }}{{ expense.cost.toFixed(2) }}</span
              >
              <Button
                icon="majesticons:edit-pen-4"
                size="small"
                @click.stop="openEditDialog(expense)"
              />
              <Button
                icon="majesticons:delete-bin"
                size="small"
                severity="danger"
                @click.stop="handleDelete(expense.id)"
              />
            </div>
          </div>
        </template>
        <template #description>
          <div class="flex flex-col gap-1">
            <div>
              <span class="text-xs font-semibold">Paid by:</span>
              {{ expense.payer.fullName }}
            </div>
            <div v-if="expense.collaborators.length > 0">
              <span class="text-xs font-semibold">Split with:</span>
              {{ expense.collaborators.map((c) => c.fullName).join(', ') }}
            </div>
          </div>
        </template>
      </Card>
    </div>
    <Card v-else class="col-span-full" :hover-effect="false">
      <template #title> No Expenses </template>
      <template #description> No expenses have been recorded yet. </template>
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

  <Dialog v-model:visible="showCreateDialog" header="Create New Expense">
    <FormBuilder :form="expenseForm" v-model="formData" @submit="handleSubmit" />
  </Dialog>

  <Dialog v-model:visible="showEditDialog" header="Edit Expense">
    <FormBuilder :form="expenseForm" v-model="editFormData" @submit="handleUpdate" />
  </Dialog>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { router } from '@inertiajs/vue3'
import * as z from 'zod'
import type Project from '#models/project'
import type Expense from '#models/expense'
import type Category from '#models/category'
import type Currency from '#models/currency'
import type User from '#models/user'
import AppLayout from '~/pages/layouts/AppLayout.vue'
import Card from '~/pages/components/Card.vue'
import Button from '~/pages/components/Button.vue'
import Dialog from '~/pages/components/Dialog.vue'
import FormBuilder, { defineForm } from '~/pages/components/FormBuilder.vue'

interface ExpenseFormData {
  name: string
  categoryId: number
  payerId: number
  cost: number
  currencyId: number
  collaboratorIds: number[]
}

export default {
  name: 'ExpensesIndexPage',
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
    expenses: {
      type: Array as PropType<Expense[]>,
      required: true,
    },
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
    currencies: {
      type: Array as PropType<Currency[]>,
      required: true,
    },
    collaborators: {
      type: Array as PropType<User[]>,
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
      editingExpenseId: null as number | null,
      formData: {
        name: '',
        categoryId: 0,
        payerId: 0,
        cost: 0,
        currencyId: 0,
        collaboratorIds: [],
      } as ExpenseFormData,
      editFormData: {
        name: '',
        categoryId: 0,
        payerId: 0,
        cost: 0,
        currencyId: 0,
        collaboratorIds: [],
      } as ExpenseFormData,
      expenseForm: defineForm<ExpenseFormData>({
        name: {
          type: 'text',
          label: 'Expense Name',
          placeholder: 'Enter expense name',
          validator: z
            .string()
            .trim()
            .min(1, 'Expense name is required')
            .max(255, 'Expense name must be less than 255 characters'),
          helpText: 'What was this expense for?',
        },
        categoryId: {
          type: 'singleselect',
          label: 'Category',
          placeholder: 'Select a category',
          validator: z.number().positive('Please select a category'),
          helpText: 'Choose a category for this expense',
          options: () =>
            this.categories.map((cat) => ({
              label: cat.name,
              icon: cat.icon.iconString,
              value: cat.id,
            })),
        },
        payerId: {
          type: 'singleselect',
          label: 'Paid By',
          placeholder: 'Select who paid',
          validator: z.number().positive('Please select who paid'),
          helpText: 'Who paid for this expense?',
          options: () =>
            this.collaborators.map((user) => ({
              label: user.fullName || 'Unknown',
              value: user.id,
            })),
        },
        cost: {
          type: 'number',
          label: 'Cost',
          placeholder: 'Enter amount',
          validator: z.coerce.number().positive('Cost must be greater than 0'),
          helpText: 'Total amount of the expense',
        },
        currencyId: {
          type: 'singleselect',
          label: 'Currency',
          placeholder: 'Select currency',
          validator: z.number().positive('Please select a currency'),
          helpText: 'Currency used for this expense',
          options: () =>
            this.currencies.map((curr) => ({
              label: `${curr.code} (${curr.symbol})`,
              value: curr.id,
            })),
        },
        collaboratorIds: {
          type: 'multiselect',
          label: 'Split With (Optional)',
          placeholder: 'Select collaborators',
          validator: z.array(z.number()),
          helpText: 'Who should this expense be split with?',
          options: () =>
            this.collaborators.map((user) => ({
              label: user.fullName || 'Unknown',
              value: user.id,
            })),
        },
      }),
    }
  },
  methods: {
    openCreateDialog() {
      this.formData = {
        name: '',
        categoryId: this.categories[0]?.id || 0,
        payerId: this.collaborators[0]?.id || 0,
        cost: 0,
        currencyId: this.currencies[0]?.id || 0,
        collaboratorIds: [],
      }
      this.showCreateDialog = true
    },
    openEditDialog(expense: any) {
      this.editingExpenseId = expense.id
      this.editFormData = {
        name: expense.name,
        categoryId: expense.categoryId,
        payerId: expense.payerId,
        cost: expense.cost,
        currencyId: expense.currencyId,
        collaboratorIds: expense.collaborators.map((c: any) => c.id),
      }
      this.showEditDialog = true
    },
    navigateToProject() {
      router.visit(`/projects/${this.project.id}`)
    },
    handleSubmit(data: ExpenseFormData) {
      router.post(`/projects/${this.project.id}/expenses`, data as Record<string, any>)
    },
    handleUpdate(data: ExpenseFormData) {
      if (this.editingExpenseId) {
        router.put(`/expenses/${this.editingExpenseId}`, data as Record<string, any>)
      }
    },
    handleDelete(expenseId: number) {
      if (confirm('Are you sure you want to delete this expense?')) {
        router.delete(`/expenses/${expenseId}`)
      }
    },
  },
}
</script>
