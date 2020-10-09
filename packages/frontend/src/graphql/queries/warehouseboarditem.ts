import gql from 'graphql-tag'

export const getWarehouseBoardItemWithUsersAndComments = gql`
  query getWarehouseBoardItem($id: Int!) {
    getWarehouseBoardItemWithUsersAndComments(warehouseboarditemId: $id) {
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
        warehouseboarditemId
        userId
        createdAt
        user {
          idgetProjectWithUsersAndWarehouseBoardItems
          name
          avatarUrl
        }
      }
    }
  }
`

export const getProjectWarehouseBoardItems = gql`
  query getProjectWarehouseBoardItems($searchTerm: String) {
    getProjectWarehouseBoardItems(searchTerm: $searchTerm) {
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

export const createWarehouseBoardItem = gql`
  mutation createWarehouseBoardItem(
    $warehouseboarditem: WarehouseBoardItemCreateInput!
  ) {
    createWarehouseBoardItem(warehouseboarditem: $warehouseboarditem) {
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

export const updateWarehouseBoardItemMutation = gql`
  mutation updateWarehouseBoardItem(
    $warehouseboarditemId: Float!
    $warehouseboarditem: WarehouseBoardItemUpdateInput!
  ) {
    updateWarehouseBoardItem(
      id: $warehouseboarditemId
      warehouseboarditem: $warehouseboarditem
    ) {
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

export const deleteWarehouseBoardItem = gql`
  mutation deleteWarehouseBoardItem($warehouseboarditemId: Float!) {
    deleteWarehouseBoardItem(id: $warehouseboarditemId)
  }
`
