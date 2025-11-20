import ProjectInvitation from '#models/project_invitation'
import ProjectCollaborator from '#models/project_collaborator'
import User from '#models/user'

export default class InvitationService {
  async createInvitation(
    projectId: number,
    invitedBy: number,
    role: 'admin' | 'member' = 'member'
  ) {
    const invitation = await ProjectInvitation.create({
      projectId,
      invitedBy,
      role,
    })

    return invitation
  }

  async getInvitationByToken(token: string) {
    const invitation = await ProjectInvitation.query()
      .where('token', token)
      .preload('project')
      .preload('inviter')
      .firstOrFail()

    // Clean up if expired
    if (invitation.isExpired) {
      await invitation.delete()
      throw new Error('Invitation has expired and has been removed')
    }

    return invitation
  }

  async acceptInvitation(token: string, user: User) {
    const invitation = await this.getInvitationByToken(token)

    if (!invitation.isValid) {
      throw new Error('Invitation has expired')
    }

    const existingCollaborator = await ProjectCollaborator.query()
      .where('projectId', invitation.projectId)
      .where('userId', user.id)
      .first()

    if (existingCollaborator) {
      throw new Error('You are already a member of this project')
    }

    const collaborator = await ProjectCollaborator.create({
      projectId: invitation.projectId,
      userId: user.id,
      role: invitation.role,
    })

    return { invitation, collaborator }
  }

  async getProjectInvitations(projectId: number) {
    return await ProjectInvitation.query()
      .where('projectId', projectId)
      .preload('inviter')
      .orderBy('createdAt', 'desc')
  }

  async deleteInvitation(invitationId: number) {
    const invitation = await ProjectInvitation.findOrFail(invitationId)
    await invitation.delete()
  }

  async cleanupExpiredInvitations(projectId: number) {
    const now = new Date()
    await ProjectInvitation.query()
      .where('projectId', projectId)
      .where('expiresAt', '<', now)
      .delete()
  }
}
