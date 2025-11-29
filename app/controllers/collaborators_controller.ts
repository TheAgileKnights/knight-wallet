import type { HttpContext } from '@adonisjs/core/http'
import ProjectService from '#services/project_service'
import InvitationService from '#services/invitation_service'
import ProjectPolicy from '#policies/project_policy'
import User from '#models/user'

export default class CollaboratorsController {
  private projectService = new ProjectService()
  private invitationService = new InvitationService()

  async index({ auth, params, inertia, response, session, bouncer }: HttpContext) {
    try {
      const project = await this.projectService.getProject(params.projectId)

      if (await bouncer.with(ProjectPolicy).denies('view', project)) {
        session.flash('error', 'Project not found or you do not have access')
        return response.redirect().toRoute('projects.index')
      }

      const userRole = await this.projectService.getUserRole(params.projectId, auth.user!.id)

      // Get project owner
      const projectOwner = await User.findOrFail(project.ownerId)

      // Get all collaborators (including owner)
      const collaborators = await this.projectService.getProjectCollaborators(params.projectId)

      // Get active invitation for owners
      let invitation = null
      if (userRole === 'owner') {
        const invitations = await this.invitationService.getProjectInvitations(params.projectId)
        invitation = invitations.find((inv) => inv.isValid) || null
      }

      return inertia.render('application/collaborators/index', {
        project,
        collaborators,
        userRole,
        invitation,
        projectOwner,
      })
    } catch (error) {
      session.flash('error', 'Project not found')
      return response.redirect().toRoute('projects.index')
    }
  }

  async destroy({ auth, params, response, session, bouncer }: HttpContext) {
    try {
      const project = await this.projectService.getProject(params.projectId)

      if (await bouncer.with(ProjectPolicy).denies('update', project)) {
        session.flash('error', 'Only the project owner can remove collaborators')
        return response
          .redirect()
          .toRoute('collaborators.index', { projectId: params.projectId })
      }

      // Remove the collaborator
      await this.projectService.removeCollaborator(params.projectId, params.userId)

      session.flash('success', 'Collaborator removed successfully')
      return response.redirect().toRoute('collaborators.index', { projectId: params.projectId })
    } catch (error) {
      session.flash('error', 'Failed to remove collaborator')
      return response.redirect().back()
    }
  }
}
