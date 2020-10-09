import { User } from './user'
import { Workorder } from './workorder'

export interface Comment {
  id: number
  body: string
  createdAt: Date
  updatedAt: Date
  userId: string
  workorderId: number
  user: User
  workorder: Workorder
}

export default Comment
