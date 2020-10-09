import { User } from './user'

export enum WorkorderType {
  TASK = 'task',
  BUG = 'bug',
  STORY = 'story'
}

export enum WorkorderStatus {
  BACKLOG = 'backlog',
  SELECTED = 'selected',
  INPROGRESS = 'inprogress',
  DONE = 'done'
}

export enum WorkorderPriority {
  HIGHEST = '5',
  HIGH = '4',
  MEDIUM = '3',
  LOW = '2',
  LOWEST = '1'
}

export interface Workorder {
  id: string
  title: string
  type: WorkorderType
  status: WorkorderStatus
  priority: WorkorderPriority
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

export interface WorkorderCreateDTO {
  type: WorkorderType
  title: string
  description: string | null
  reporterId: string
  userIds: string[]
  priority: WorkorderPriority
  status?: WorkorderStatus
  projectId?: number | string
  users?: Partial<User>[]
}

export const WorkorderStatusCopy = {
  [WorkorderStatus.BACKLOG]: 'Backlog',
  [WorkorderStatus.SELECTED]: 'Selected for development',
  [WorkorderStatus.INPROGRESS]: 'In progress',
  [WorkorderStatus.DONE]: 'Done'
}
export const WorkorderPriorityCopy = {
  [WorkorderPriority.HIGH]: 'High',
  [WorkorderPriority.HIGHEST]: 'Highest',
  [WorkorderPriority.MEDIUM]: 'Medium',
  [WorkorderPriority.LOW]: 'Low',
  [WorkorderPriority.LOWEST]: 'Lowest'
}

export const WorkorderTypeCopy = {
  [WorkorderType.TASK]: 'Task',
  [WorkorderType.BUG]: 'Bug',
  [WorkorderType.STORY]: 'Story'
}

export default Workorder
