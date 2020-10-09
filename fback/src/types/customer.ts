import { Workorder } from './workorder'
import { User } from './user'
// export enum ProductCategory {
//   RUGS = 'rugs',
//   CARPET = 'carpet',
//   FURNITURE = 'furniture'
// }

export interface Customer {
  id: number
  name: string
  url: string | null
  createdAt: Date
  updatedAt: Date
  workorders: Workorder[]
  users: User[]
  owner: User
}

// export const ProjectCategoryCopy = {
//   [ProjectCategory.SOFTWARE]: 'Software',
//   [ProjectCategory.MARKETING]: 'Marketing',
//   [ProjectCategory.BUSINESS]: 'Business'
// }

export default Project
