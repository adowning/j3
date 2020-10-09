import { Workorder } from './workorder'
import { User } from './user'
export enum ProjectCategory {
  OPERATIONS = 'operations',
  MARKETING = 'marketing',
  BUSINESS = 'business'
}

export interface Project {
  id: number
  name: string
  url: string | null
  description: string | null
  category: ProjectCategory
  createdAt: Date
  updatedAt: Date
  workorders: Workorder[]
  users: User[]
}

export const ProjectCategoryCopy = {
  [ProjectCategory.OPERATIONS]: 'Operations',
  [ProjectCategory.MARKETING]: 'Marketing',
  [ProjectCategory.BUSINESS]: 'Business'
}

export default Project
