import type { HttpContext } from '@adonisjs/core/http'
import ExpenseService from '#services/expense_service'
import ProjectService from '#services/project_service'
import CategoryService from '#services/category_service'
import { createExpenseValidator, updateExpenseValidator } from '#validators/expense'
import ProjectPolicy from '#policies/project_policy'

export default class ExpensesController {
  private expenseService = new ExpenseService()
  private projectService = new ProjectService()
  private categoryService = new CategoryService()

  async index({ auth, params, inertia, response, session, bouncer }: HttpContext) {
    try {
      const project = await this.projectService.getProject(params.projectId)

      if (await bouncer.with(ProjectPolicy).denies('view', project)) {
        session.flash('error', 'Project not found or you do not have access')
        return response.redirect().toRoute('projects.index')
      }

      const expenses = await this.expenseService.getProjectExpenses(params.projectId)
      const categories = await this.categoryService.getProjectCategories(params.projectId)

      // Load project currencies and collaborators
      await project.load('currencies')
      await project.load('collaborators')

      const userRole = await this.projectService.getUserRole(params.projectId, auth.user!.id)

      return inertia.render('application/expenses/index', {
        project,
        expenses,
        categories,
        currencies: project.currencies,
        collaborators: project.collaborators,
        userRole,
      })
    } catch (error) {
      session.flash('error', 'Project not found')
      return response.redirect().toRoute('projects.index')
    }
  }

  async store({ params, request, response, session, bouncer }: HttpContext) {
    try {
      const project = await this.projectService.getProject(params.projectId)

      if (await bouncer.with(ProjectPolicy).denies('view', project)) {
        session.flash('error', 'You do not have permission to create expenses in this project')
        return response.redirect().toRoute('projects.index')
      }

      const data = await request.validateUsing(createExpenseValidator)
      await this.expenseService.createExpense(params.projectId, data)

      session.flash('success', 'Expense created successfully')
      return response.redirect().toRoute('expenses.index', { projectId: params.projectId })
    } catch (error) {
      session.flash('error', 'Failed to create expense')
      return response.redirect().back()
    }
  }

  async update({ params, request, response, session, bouncer }: HttpContext) {
    try {
      const expense = await this.expenseService.getExpense(params.id)
      const project = await this.projectService.getProject(String(expense.projectId))

      if (await bouncer.with(ProjectPolicy).denies('view', project)) {
        session.flash('error', 'You do not have permission to update this expense')
        return response.redirect().toRoute('expenses.index', { projectId: expense.projectId })
      }

      const data = await request.validateUsing(updateExpenseValidator)
      await this.expenseService.updateExpense(params.id, data)

      session.flash('success', 'Expense updated successfully')
      return response.redirect().toRoute('expenses.index', { projectId: expense.projectId })
    } catch (error) {
      session.flash('error', 'Failed to update expense')
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session, bouncer }: HttpContext) {
    try {
      const expense = await this.expenseService.getExpense(params.id)
      const project = await this.projectService.getProject(String(expense.projectId))

      if (await bouncer.with(ProjectPolicy).denies('view', project)) {
        session.flash('error', 'You do not have permission to delete this expense')
        return response.redirect().toRoute('expenses.index', { projectId: expense.projectId })
      }

      await this.expenseService.deleteExpense(params.id)

      session.flash('success', 'Expense deleted successfully')
      return response.redirect().toRoute('expenses.index', { projectId: expense.projectId })
    } catch (error) {
      session.flash('error', 'Failed to delete expense')
      return response.redirect().back()
    }
  }
}
