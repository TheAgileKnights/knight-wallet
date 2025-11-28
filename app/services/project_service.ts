import Project from '#models/project'
import ProjectCollaborator from '#models/project_collaborator'
import User from '#models/user'
import Currency from '#models/currency'
import Icon from '#models/icon'
import Category from '#models/category'
import type { UserProjects } from '../types/project.js'
import { DEFAULT_CATEGORIES } from '../constants/icons.js'

export default class ProjectService {
  async getUserProjects(user: User): Promise<UserProjects> {
    const projects = await user.related('collaboratingProjects').query().pivotColumns(['role'])

    return {
      owned: projects.filter((p) => p.$extras.pivot_role === 'owner'),
      collaborating: projects.filter((p) => p.$extras.pivot_role !== 'owner'),
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
      name: data.name,
      description: data.description,
      ownerId,
    })

    await ProjectCollaborator.create({
      projectId: project.id,
      userId: ownerId,
      role: 'owner',
    })

    // Attach all currencies to the project
    const currencies = await Currency.all()
    await project.related('currencies').attach(currencies.map((c) => c.id))

    // Create default categories
    const icons = await Icon.query().whereIn(
      'iconString',
      DEFAULT_CATEGORIES.map((cat) => cat.iconString)
    )

    const categoriesData = DEFAULT_CATEGORIES.map((categoryDef) => {
      const icon = icons.find((i) => i.iconString === categoryDef.iconString)
      if (!icon) throw new Error(`Icon not found: ${categoryDef.iconString}`)

      return {
        projectId: project.id,
        name: categoryDef.name,
        description: categoryDef.description,
        iconId: icon.id,
      }
    })

    await Category.createMany(categoriesData)

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
