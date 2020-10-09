import { User } from './user'
import { Issue } from './issue'
import { Workorder } from '.'

export interface Comment {
  id: number
  body: string
  createdAt: Date
  updatedAt: Date
  userId: string
  issueId: number
  workorderId: number
  user: User
  issue: Issue
  workorder: Workorder
}

export default Comment
