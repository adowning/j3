import { Workorder, WorkorderStatus } from '@/types/workorder'

export interface DropResult {
  removedIndex: number | null
  addedIndex: number | null
  to: number
  payload: Workorder
}

export interface Target {
  index: number
  droppableId: WorkorderStatus
}

export const moveItemWithinArray = (
  arr: Workorder[],
  item: Workorder,
  newIndex: number
) => {
  const arrClone = [...arr]
  const oldIndex = arrClone.indexOf(item)
  arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0])
  return arrClone
}

export const insertItemIntoArray = (
  arr: Workorder[],
  item: Workorder,
  index: number
) => {
  const arrClone = [...arr]
  arrClone.splice(index, 0, item)
  return arrClone
}
export const updateArrayItemById = (
  arr: Workorder[],
  itemId: string,
  fields: Partial<Workorder>
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

export const getSortedListWorkorders = (
  workorders: Workorder[] | readonly Workorder[],
  status: string
) =>
  workorders
    .filter(workorder => workorder.status === status)
    .sort((a, b) => a.listPosition - b.listPosition)

const getAfterDropPrevNextWorkorder = (
  allWorkorders: Workorder[],
  destination: Target,
  source: Target,
  droppedWorkorderId: string
) => {
  const beforeDropDestinationWorkorders = getSortedListWorkorders(
    allWorkorders,
    destination.droppableId
  )
  const droppedWorkorder = allWorkorders.find(
    workorder => workorder.id === droppedWorkorderId
  )
  const isSameList = destination.droppableId === source.droppableId

  const afterDropDestinationWorkorders = isSameList
    ? moveItemWithinArray(
        beforeDropDestinationWorkorders,
        droppedWorkorder as Workorder,
        destination.index
      )
    : insertItemIntoArray(
        beforeDropDestinationWorkorders,
        droppedWorkorder as Workorder,
        destination.index
      )

  return {
    prevWorkorder: afterDropDestinationWorkorders[destination.index - 1],
    nextWorkorder: afterDropDestinationWorkorders[destination.index + 1]
  }
}

export const calculateWorkorderListPosition = (
  allWorkorders: Workorder[],
  destination: Target,
  source: Target,
  droppedWorkorderId: string
) => {
  const { prevWorkorder, nextWorkorder } = getAfterDropPrevNextWorkorder(
    allWorkorders,
    destination,
    source,
    droppedWorkorderId
  )
  let position

  if (!prevWorkorder && !nextWorkorder) {
    position = 1
  } else if (!prevWorkorder) {
    position = nextWorkorder.listPosition - 1
  } else if (!nextWorkorder) {
    position = prevWorkorder.listPosition + 1
  } else {
    position =
      prevWorkorder.listPosition +
      (nextWorkorder.listPosition - prevWorkorder.listPosition) / 2
  }
  return position
}
