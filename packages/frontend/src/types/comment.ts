import { User } from './user'
import { Issue } from './issue'
import { WarehouseBoardItem } from '.'

export interface Comment {
  id: number
  body: string
  createdAt: Date
  updatedAt: Date
  userId: string
  issueId: number
  warehouseboarditemId: number
  user: User
  issue: Issue
  warehouseboarditem: WarehouseBoardItem
}

export default Comment
