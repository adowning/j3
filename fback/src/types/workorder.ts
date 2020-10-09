import { User } from './user'
import { Customer } from './customer'

export enum WorkorderType {
  INHOUSE = 'inhouse',
  FIELD = 'field',
  INTERNAL = 'internal'
}

export enum WorkorderStatus {
  WAITING = 'waiting',
  NOTIFIED = 'notified',
  COMPLETED = 'completed',
  APPROVED = 'approved'
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
  customer: string
  type: WorkorderType
  status: WorkorderStatus
  smId: string
  priority: WorkorderPriority
  listPosition: number
  description: string | null
  estimate: number | null
  timeSpent: number | null
  timeRemaining: number | null
  createdAt: Date
  updatedAt: Date
  due: Date
  reporterId: string
  userIds: string[]
  comments: Comment[]
  projectId: number | string
}

export interface WorkorderCreateDTO {
  type: WorkorderType
  customer: string
  description: string | null
  reporterId: string
  userIds: string[]
  priority: WorkorderPriority
  status?: WorkorderStatus
  projectId?: number | string
}

export const WorkorderStatusCopy = {
  [WorkorderStatus.WAITING]: 'Waiting',
  [WorkorderStatus.NOTIFIED]: 'Notified',
  [WorkorderStatus.COMPLETED]: 'Completed',
  [WorkorderStatus.APPROVED]: 'Approved'
}
export const WorkorderPriorityCopy = {
  [WorkorderPriority.HIGH]: 'High',
  [WorkorderPriority.HIGHEST]: 'Highest',
  [WorkorderPriority.MEDIUM]: 'Medium',
  [WorkorderPriority.LOW]: 'Low',
  [WorkorderPriority.LOWEST]: 'Lowest'
}

export const WorkorderTypeCopy = {
  [WorkorderType.INHOUSE]: 'Inhouse',
  [WorkorderType.FIELD]: 'Field',
  [WorkorderType.INTERNAL]: 'Internal'
}

export default Workorder
