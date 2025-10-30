import type Project from '#models/project'

export interface UserProjects {
  owned: Project[]
  collaborating: Project[]
}
