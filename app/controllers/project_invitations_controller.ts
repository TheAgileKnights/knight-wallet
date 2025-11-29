import type { HttpContext } from '@adonisjs/core/http'
import InvitationService from '#services/invitation_service'
import ProjectService from '#services/project_service'
import ProjectPolicy from '#policies/project_policy'

export default class ProjectInvitationsController {
  private invitationService = new InvitationService()
  private projectService = new ProjectService()

  async store({ params, response, session, bouncer, auth }: HttpContext) {
    try {
      const project = await this.projectService.getProject(params.projectId)

      if (await bouncer.with(ProjectPolicy).denies('invite', project)) {
        session.flash('error', 'You do not have permission to invite users to this project')
        return response.redirect().back()
      }

      const invitation = await this.invitationService.createInvitation(
        params.projectId,
        auth.user!.id,
        'member'
      )

      session.flash('success', 'Invitation link created successfully')
      session.flash('inviteToken', invitation.token)

      return response.redirect().back()
    } catch (error) {
      session.flash('error', 'Failed to create invitation')
      return response.redirect().back()
    }
  }

  async show({ params, inertia, response, session }: HttpContext) {
    try {
      const invitation = await this.invitationService.getInvitationByToken(params.token)

      if (!invitation.isValid) {
        session.flash('error', 'This invitation has expired')
        return response.redirect().toRoute('home')
      }

      return inertia.render('invitations/show', {
        invitation,
        project: invitation.project,
      })
    } catch (error) {
      session.flash('error', 'Invalid invitation link')
      return response.redirect().toRoute('home')
    }
  }

  async accept({ auth, params, response, session }: HttpContext) {
    const user = auth.user!

    try {
      const { invitation } = await this.invitationService.acceptInvitation(params.token, user)
      session.flash('success', 'You have successfully joined the project!')
      return response.redirect().toRoute('projects.show', { id: invitation.projectId })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to accept invitation'
      session.flash('error', message)
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session, bouncer }: HttpContext) {
    try {
      const invitation = await this.invitationService.getInvitationByToken(params.token)
      const project = await this.projectService.getProject(String(invitation.projectId))

      if (await bouncer.with(ProjectPolicy).denies('invite', project)) {
        session.flash('error', 'You do not have permission to delete this invitation')
        return response.redirect().back()
      }

      await this.invitationService.deleteInvitation(invitation.id)

      session.flash('success', 'Invitation deleted successfully')
      return response.redirect().back()
    } catch (error) {
      session.flash('error', 'Failed to delete invitation')
      return response.redirect().back()
    }
  }
}
