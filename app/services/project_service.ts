import Project from '#models/project'
import ProjectCollaborator from '#models/project_collaborator'
import User from '#models/user'
import { randomUUID } from 'node:crypto'

export default class ProjectService {
  async getUserProjects(user: User) {
    const ownedProjects = await user.related('ownedProjects').query()
    const collaboratingProjects = await user
      .related('collaboratingProjects')
      .query()
      .pivotColumns(['role'])

    return {
      owned: ownedProjects,
      collaborating: collaboratingProjects,
    }
  }

  async getProject(projectId: string) {
    const project = await Project.findOrFail(projectId)
    await project.load('owner')
    await project.load('collaborators', (query) => {
      query.pivotColumns(['role'])
    })

    return project
  }

  async createProject(ownerId: number, data: { name: string; description?: string }) {
    const project = await Project.create({
      id: randomUUID(),
      name: data.name,
      description: data.description,
      ownerId,
    })

    await ProjectCollaborator.create({
      projectId: project.id,
      userId: ownerId,
      role: 'owner',
    })

    return project
  }

  async updateProject(projectId: string, data: { name?: string; description?: string }) {
    const project = await Project.findOrFail(projectId)
    project.merge(data)
    await project.save()

    return project
  }

  async deleteProject(projectId: string) {
    const project = await Project.findOrFail(projectId)
    await project.delete()
  }

  async getUserRole(
    projectId: string,
    userId: number
  ): Promise<'owner' | 'admin' | 'member' | null> {
    const collaborator = await ProjectCollaborator.query()
      .where('projectId', projectId)
      .where('userId', userId)
      .first()

    return collaborator?.role || null
  }

  async removeCollaborator(projectId: string, userId: number) {
    await ProjectCollaborator.query().where('projectId', projectId).where('userId', userId).delete()
  }

  async updateCollaboratorRole(projectId: string, userId: number, role: 'admin' | 'member') {
    const collaborator = await ProjectCollaborator.query()
      .where('projectId', projectId)
      .where('userId', userId)
      .firstOrFail()

    collaborator.role = role
    await collaborator.save()

    return collaborator
  }
}
