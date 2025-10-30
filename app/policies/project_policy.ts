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
    const collaborator = await ProjectCollaborator.query()
      .where('projectId', project.id)
      .where('userId', user.id)
      .first()

    return collaborator?.role || null
  }

  /**
   * Any collaborator can view the project
   */
  async view(user: User, project: Project): Promise<AuthorizerResponse> {
    const role = await this.getUserRole(project, user)
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
