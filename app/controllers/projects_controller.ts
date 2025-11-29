import type { HttpContext } from '@adonisjs/core/http'
import ProjectService from '#services/project_service'
import { createProjectValidator, updateProjectValidator } from '#validators/project'
import ProjectPolicy from '#policies/project_policy'

export default class ProjectsController {
  private projectService = new ProjectService()

  async index({ auth, inertia }: HttpContext) {
    const user = auth.user!
    const projects = await this.projectService.getUserProjects(user)

    return inertia.render('application/projects/index', {
      user: auth.user,
      projects,
    })
  }

  async store({ auth, request, response, session }: HttpContext) {
    const user = auth.user!
    const data = await request.validateUsing(createProjectValidator)

    try {
      const project = await this.projectService.createProject(user.id, data)
      session.flash('success', 'Project created successfully')
      return response.redirect().toRoute('expenses.index', { projectId: project.id })
    } catch (error) {
      session.flash('error', 'Failed to create project')
      return response.redirect().back()
    }
  }

  async show({ params, response, session }: HttpContext) {
    try {
      const project = await this.projectService.getProject(params.id)
      return response.redirect().toRoute('expenses.index', { projectId: project.id })
    } catch (error) {
      session.flash('error', 'Project not found')
      return response.redirect().toRoute('projects.index')
    }
  }

  async edit({ params, inertia, response, session, bouncer }: HttpContext) {
    try {
      const project = await this.projectService.getProject(params.id)

      if (await bouncer.with(ProjectPolicy).denies('update', project)) {
        session.flash('error', 'You do not have permission to edit this project')
        return response.redirect().toRoute('projects.show', { id: params.id })
      }

      return inertia.render('application/projects/edit', {
        project,
      })
    } catch (error) {
      session.flash('error', 'Project not found')
      return response.redirect().toRoute('projects.index')
    }
  }

  async update({ params, request, response, session, bouncer }: HttpContext) {
    try {
      const project = await this.projectService.getProject(params.id)

      if (await bouncer.with(ProjectPolicy).denies('update', project)) {
        session.flash('error', 'You do not have permission to update this project')
        return response.redirect().toRoute('projects.show', { id: params.id })
      }

      const data = await request.validateUsing(updateProjectValidator)
      await this.projectService.updateProject(params.id, data)

      session.flash('success', 'Project updated successfully')
      return response.redirect().toRoute('projects.show', { id: params.id })
    } catch (error) {
      session.flash('error', 'Failed to update project')
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session, bouncer }: HttpContext) {
    try {
      const project = await this.projectService.getProject(params.id)

      if (await bouncer.with(ProjectPolicy).denies('delete', project)) {
        session.flash('error', 'Only the project owner can delete it')
        return response.redirect().toRoute('projects.show', { id: params.id })
      }

      await this.projectService.deleteProject(params.id)

      session.flash('success', 'Project deleted successfully')
      return response.redirect().toRoute('projects.index')
    } catch (error) {
      session.flash('error', 'Failed to delete project')
      return response.redirect().back()
    }
  }
}
