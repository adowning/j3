import gql from 'graphql-tag'

export const getWorkorderWithUsersAndComments = gql`
  query getWorkorder($id: Int!) {
    getWorkorderWithUsersAndComments(workorderId: $id) {
      id
      title
      description
      type
      status
      priority
      reporterId
      listPosition
      createdAt
      updatedAt
      userIds
      comments {
        id
        body
        updatedAt
        workorderId
        userId
        createdAt
        user {
          id
          name
          avatarUrl
        }
      }
    }
  }
`

export const getProjectWorkorders = gql`
  query getProjectWorkorders {
    getProjectWorkorders {
      id

      description
      type
      reporterId
      status
      priority
      listPosition
      createdAt
      updatedAt
      userIds
    }
  }
`

export const createWorkorder = gql`
  mutation createWorkorder($workorder: WorkorderCreateInput!) {
    createWorkorder(workorder: $workorder) {
      id
      title
      type
      reporterId
      status
      createdAt
      updatedAt
    }
  }
`

export const updateWorkorderMutation = gql`
  mutation updateWorkorder(
    $workorderId: Float!
    $workorder: WorkorderUpdateInput!
  ) {
    updateWorkorder(id: $workorderId, workorder: $workorder) {
      id
      title
      description
      type
      reporterId
      status
      priority
      listPosition
      createdAt
      updatedAt
      userIds
    }
  }
`

export const deleteWorkorder = gql`
  mutation deleteWorkorder($workorderId: Float!) {
    deleteWorkorder(id: $workorderId)
  }
`
