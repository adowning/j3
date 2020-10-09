import { Issue, WarehouseBoardItem } from '@/types'
import { WarehouseBoardItemStatus } from '@/types/warehouseboarditem'

export interface DropResult {
  removedIndex: number | null
  addedIndex: number | null
  to: number
  payload: WarehouseBoardItem
}

export interface Target {
  index: number
  droppableId: WarehouseBoardItemStatus
}

export const moveItemWithinArray = (
         arr: WarehouseBoardItem[],
         item: WarehouseBoardItem,
         newIndex: number
       ) => {
         const arrClone = [...arr]
         const oldIndex = arrClone.indexOf(item)
         arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0])
         return arrClone
       }

export const insertItemIntoArray = (
         arr: WarehouseBoardItem[],
         item: WarehouseBoardItem,
         index: number
       ) => {
         const arrClone = [...arr]
         arrClone.splice(index, 0, item)
         return arrClone
       }
export const updateArrayItemById = (
                arr: WarehouseBoardItem[],
                itemId: string,
                fields: Partial<WarehouseBoardItem>
              ) => {
                const arrClone = [...arr]
                const item = arrClone.find(({ id }) => id === itemId)
                if (item) {
                  const itemIndex = arrClone.indexOf(item)
                  arrClone.splice(itemIndex, 1, { ...item, ...fields })
                }
                return arrClone
              }
export const updateArrayItemByIdIssue = (
  arr: Issue[],
  itemId: string,
  fields: Partial<Issue>
) => {
  const arrClone = [...arr]
  const item = arrClone.find(({ id }) => id === itemId)
  if (item) {
    const itemIndex = arrClone.indexOf(item)
    arrClone.splice(itemIndex, 1, { ...item, ...fields })
  }
  return arrClone
}
export const isPositionChanged = (destination: Target, source: Target) => {
  if (!destination) return false
  const isSameList = destination.droppableId === source.droppableId
  const isSamePosition = destination.index === source.index
  return !isSameList || !isSamePosition
}

export const getSortedListWarehouseBoardItems = (
         warehouseBoardItems:
           | WarehouseBoardItem[]
           | readonly WarehouseBoardItem[],
         status: string
       ) =>
         warehouseBoardItems
           .filter(warehouseboarditem => warehouseboarditem.status === status)
           .sort((a, b) => a.listPosition - b.listPosition)

const getAfterDropPrevNextWarehouseBoardItem = (
  allWarehouseBoardItems: WarehouseBoardItem[],
  destination: Target,
  source: Target,
  droppedWarehouseBoardItemId: string
) => {
  const beforeDropDestinationWarehouseBoardItems = getSortedListWarehouseBoardItems(
    allWarehouseBoardItems,
    destination.droppableId
  )
  const droppedWarehouseBoardItem = allWarehouseBoardItems.find(
    warehouseboarditem => warehouseboarditem.id === droppedWarehouseBoardItemId
  )
  const isSameList = destination.droppableId === source.droppableId

  const afterDropDestinationWarehouseBoardItems = isSameList
    ? moveItemWithinArray(
        beforeDropDestinationWarehouseBoardItems,
        droppedWarehouseBoardItem as WarehouseBoardItem,
        destination.index
      )
    : insertItemIntoArray(
        beforeDropDestinationWarehouseBoardItems,
        droppedWarehouseBoardItem as WarehouseBoardItem,
        destination.index
      )

  return {
    prevWarehouseBoardItem:


                afterDropDestinationWarehouseBoardItems[destination.index - 1],
    nextWarehouseBoardItem:
     
     
      afterDropDestinationWarehouseBoardItems[destination.index + 1]
  }
}

export const calculateWarehouseBoardItemListPosition = (
         allWarehouseBoardItems: WarehouseBoardItem[],
         destination: Target,
         source: Target,
         droppedWarehouseBoardItemId: string
       ) => {
         const {
   
          
  
     prevWarehouseBoardItem,
  
     

             nextWarehouseBoardItem

  
 
         } = getAfterDropPrevNextWarehouseBoardItem(
           allWarehouseBoardItems,
           destination,
           source,
           droppedWarehouseBoardItemId
         )
         let position

         if (!prevWarehouseBoardItem && !nextWarehouseBoardItem) {
           position = 1
         } else if (!prevWarehouseBoardItem) {
           position = nextWarehouseBoardItem.listPosition - 1
         } else if (!nextWarehouseBoardItem) {
           position = prevWarehouseBoardItem.listPosition + 1
         } else {
           position =
             prevWarehouseBoardItem.listPosition +
             (nextWarehouseBoardItem.listPosition -
  
      

                            prevWarehouseBoardItem.listPosition) /
       
      
       
                2
         }
         return position
       }
