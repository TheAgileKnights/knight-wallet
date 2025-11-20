import User from '#models/user'
import Project from '#models/project'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import ProjectCollaborator from '#models/project_collaborator'

export default class ProjectPolicy extends BasePolicy {
  /**
   * Get user's role in a project
   */
  private async getUserRole(
    project: Project,
    user: User
  ): Promise<'owner' | 'admin' | 'member' | null> {
    console.log('[ProjectPolicy.getUserRole] Querying for projectId:', project.id, 'userId:', user.id)
    const query = ProjectCollaborator.query()
      .where('project_id', project.id)
      .where('user_id', user.id)

    console.log('[ProjectPolicy.getUserRole] SQL:', query.toSQL())
    const collaborator = await query.first()

    console.log('[ProjectPolicy.getUserRole] Collaborator found:', collaborator?.id, 'role:', collaborator?.role)
    return collaborator?.role || null
  }

  /**
   * Any collaborator can view the project
   */
  async view(user: User, project: Project): Promise<AuthorizerResponse> {
    console.log('[ProjectPolicy.view] Checking view for user:', user.id, 'project:', project.id)
    const role = await this.getUserRole(project, user)
    console.log('[ProjectPolicy.view] User role:', role)
    return role !== null
  }

  /**
   * Only owner and admins can update
   */
  async update(user: User, project: Project): Promise<AuthorizerResponse> {
    const role = await this.getUserRole(project, user)
    return role === 'owner' || role === 'admin'
  }

  /**
   * Only owner can delete
   */
  async delete(user: User, project: Project): Promise<AuthorizerResponse> {
    return project.ownerId === user.id
  }

  /**
   * Only owner and admins can invite
   */
  async invite(user: User, project: Project): Promise<AuthorizerResponse> {
    const role = await this.getUserRole(project, user)
    return role === 'owner' || role === 'admin'
  }

  /**
   * Only owner and admins can remove collaborators
   */
  async removeCollaborator(user: User, project: Project): Promise<AuthorizerResponse> {
    const role = await this.getUserRole(project, user)
    return role === 'owner' || role === 'admin'
  }

  /**
   * Only owner and admins can update roles
   */
  async updateRole(user: User, project: Project): Promise<AuthorizerResponse> {
    const role = await this.getUserRole(project, user)
    return role === 'owner' || role === 'admin'
  }
}
