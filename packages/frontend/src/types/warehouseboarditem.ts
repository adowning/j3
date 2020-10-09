import { User } from './user'

export enum WarehouseBoardItemType {
  TASK = 'task',
  BUG = 'bug',
  STORY = 'story'
}

export enum WarehouseBoardItemStatus {
  BACKLOG = 'backlog',
  SELECTED = 'selected',
  INPROGRESS = 'inprogress',
  DONE = 'done'
}

export enum WarehouseBoardItemPriority {
  HIGHEST = '5',
  HIGH = '4',
  MEDIUM = '3',
  LOW = '2',
  LOWEST = '1'
}

export interface WarehouseBoardItem {
  id: string
  title: string
  type: WarehouseBoardItemType
  status: WarehouseBoardItemStatus
  priority: WarehouseBoardItemPriority
  listPosition: number
  description: string | null
  estimate: number | null
  timeSpent: number | null
  timeRemaining: number | null
  createdAt: Date
  updatedAt: Date
  reporterId: string
  userIds: string[]
  comments: Comment[]
  projectId: number | string
}

export interface WarehouseBoardItemCreateDTO {
  type: WarehouseBoardItemType
  title: string
  description: string | null
  reporterId: string
  userIds: string[]
  priority: WarehouseBoardItemPriority
  status?: WarehouseBoardItemStatus
  projectId?: number | string
  users?: Partial<User>[]
}

export const WarehouseBoardItemStatusCopy = {
  [WarehouseBoardItemStatus.BACKLOG]: 'Backlog',
  [WarehouseBoardItemStatus.SELECTED]: 'Selected for development',
  [WarehouseBoardItemStatus.INPROGRESS]: 'In progress',
  [WarehouseBoardItemStatus.DONE]: 'Done'
}
export const WarehouseBoardItemPriorityCopy = {
  [WarehouseBoardItemPriority.HIGH]: 'High',
  [WarehouseBoardItemPriority.HIGHEST]: 'Highest',
  [WarehouseBoardItemPriority.MEDIUM]: 'Medium',
  [WarehouseBoardItemPriority.LOW]: 'Low',
  [WarehouseBoardItemPriority.LOWEST]: 'Lowest'
}

export const WarehouseBoardItemTypeCopy = {
  [WarehouseBoardItemType.TASK]: 'Task',
  [WarehouseBoardItemType.BUG]: 'Bug',
  [WarehouseBoardItemType.STORY]: 'Story'
}

export default WarehouseBoardItem
