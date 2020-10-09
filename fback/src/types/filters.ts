export interface Filters {
  searchTerm: string
  userIds: string[]
  myOnly: boolean
  recent: boolean
}

export default Filters
// [ workorders, customers, users, contacts, employees ] already exist in current graphql schema. HINT: Top-level nodes can't be same.
