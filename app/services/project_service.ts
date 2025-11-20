import Project from '#models/project'
import ProjectCollaborator from '#models/project_collaborator'
import User from '#models/user'
import type { UserProjects } from '../types/project.js'

export default class ProjectService {
  async getUserProjects(user: User): Promise<UserProjects> {
    const projects = await user
      .related('collaboratingProjects')
      .query()
      .pivotColumns(['role'])

    return {
      owned: projects.filter(p => p.$extras.pivot_role === 'owner'),
      collaborating: projects.filter(p => p.$extras.pivot_role !== 'owner'),
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
    console.log('[ProjectService.createProject] Creating project for owner:', ownerId)
    const project = await Project.create({
      name: data.name,
      description: data.description,
      ownerId,
    })
    console.log('[ProjectService.createProject] Project created:', project.id)

    console.log('[ProjectService.createProject] Creating collaborator record')
    const collaborator = await ProjectCollaborator.create({
      projectId: project.id,
      userId: ownerId,
      role: 'owner',
    })
    console.log('[ProjectService.createProject] Collaborator created:', collaborator.id)

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
