import type { HttpContext } from '@adonisjs/core/http'
import ProjectService from '#services/project_service'

export default class AppController {
  private projectService = new ProjectService()

  async index({ auth, response, session }: HttpContext) {
    const user = auth.user!

    // Try to get last project ID from session or redirect to projects index
    try {
      const projects = await this.projectService.getUserProjects(user)
      const allProjects = [...(projects.owned || []), ...(projects.collaborating || [])]

      // If user has no projects, redirect to projects index
      if (allProjects.length === 0) {
        return response.redirect().toRoute('projects.index')
      }

      // For now, redirect to the first project's expenses page
      // In the future, we'll use localStorage value passed from client
      // but for server-side initial load, we'll use the first available project
      const firstProject = allProjects[0]
      return response.redirect().toRoute('expenses.index', { projectId: firstProject.id })
    } catch (error) {
      session.flash('error', 'Unable to load projects')
      return response.redirect().toRoute('projects.index')
    }
  }
}
