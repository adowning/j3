import { Workorder } from './workorder'
import { Project } from './project'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string
  createdAt: Date
  updatedAt: Date
  comments: Comment[]
  workorders: Workorder[]
  project: Project
  projectId: number
}

export default User
