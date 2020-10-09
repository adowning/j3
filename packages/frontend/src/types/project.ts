import { Issue } from './issue'
import { User } from './user'
import Workorder from './workorder'
export enum ProjectCategory {
  CPTCLEANING = 'cptcleaning',
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
  issues: Issue[]
  workorders: Workorder[]
  users: User[]
}

export const ProjectCategoryCopy = {
  [ProjectCategory.CPTCLEANING]: 'Carpet Cleaning',
  [ProjectCategory.MARKETING]: 'Marketing',
  [ProjectCategory.BUSINESS]: 'Business'
}

export default Project
