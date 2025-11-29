import type { HttpContext } from '@adonisjs/core/http'
import CategoryService from '#services/category_service'
import ProjectService from '#services/project_service'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category'
import ProjectPolicy from '#policies/project_policy'

export default class CategoriesController {
  private categoryService = new CategoryService()
  private projectService = new ProjectService()

  async index({ auth, params, inertia, response, session, bouncer }: HttpContext) {
    try {
      const project = await this.projectService.getProject(params.projectId)

      if (await bouncer.with(ProjectPolicy).denies('view', project)) {
        session.flash('error', 'Project not found or you do not have access')
        return response.redirect().toRoute('projects.index')
      }

      const categories = await this.categoryService.getProjectCategories(params.projectId)
      const icons = await this.categoryService.getAllIcons()
      const userRole = await this.projectService.getUserRole(params.projectId, auth.user!.id)

      return inertia.render('application/categories/index', {
        project,
        categories,
        icons,
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
        session.flash('error', 'You do not have permission to create categories in this project')
        return response.redirect().toRoute('projects.index')
      }

      const data = await request.validateUsing(createCategoryValidator)
      await this.categoryService.createCategory(params.projectId, data)

      session.flash('success', 'Category created successfully')
      return response.redirect().toRoute('categories.index', { projectId: params.projectId })
    } catch (error) {
      session.flash('error', 'Failed to create category')
      return response.redirect().back()
    }
  }

  async update({ params, request, response, session, bouncer }: HttpContext) {
    try {
      const category = await this.categoryService.getCategory(params.id)
      const project = await this.projectService.getProject(String(category.projectId))

      if (await bouncer.with(ProjectPolicy).denies('view', project)) {
        session.flash('error', 'You do not have permission to update this category')
        return response
          .redirect()
          .toRoute('categories.index', { projectId: category.projectId })
      }

      const data = await request.validateUsing(updateCategoryValidator)
      await this.categoryService.updateCategory(params.id, data)

      session.flash('success', 'Category updated successfully')
      return response.redirect().toRoute('categories.index', { projectId: category.projectId })
    } catch (error) {
      session.flash('error', 'Failed to update category')
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session, bouncer }: HttpContext) {
    try {
      const category = await this.categoryService.getCategory(params.id)
      const project = await this.projectService.getProject(String(category.projectId))

      if (await bouncer.with(ProjectPolicy).denies('view', project)) {
        session.flash('error', 'You do not have permission to delete this category')
        return response
          .redirect()
          .toRoute('categories.index', { projectId: category.projectId })
      }

      await this.categoryService.deleteCategory(params.id)

      session.flash('success', 'Category deleted successfully')
      return response.redirect().toRoute('categories.index', { projectId: category.projectId })
    } catch (error) {
      session.flash('error', 'Failed to delete category')
      return response.redirect().back()
    }
  }
}
