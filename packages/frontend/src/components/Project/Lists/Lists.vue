<template>
  <div class="flex container mt-7">
    <List
      @drop="onDrop"
      v-for="status in WarehouseBoardItemStatus"
      :key="status"
      :status="status"
    >
    </List>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import List from '@/components/Project/Lists/List.vue'
import { WarehouseBoardItemStatus } from '@/types/warehouseboarditem'
import { getters, mutations } from '@/store'
import {
  DropResult,
  Target,
  calculateWarehouseBoardItemListPosition,
  isPositionChanged,
  updateArrayItemById
} from '@/utils/dnd'
import { useMutation } from '@vue/apollo-composable'
import { updateWarehouseBoardItemMutation } from '@/graphql/queries/warehouseboarditem'

export default defineComponent({
  components: {
    List
  },
  setup() {
    const project = computed(getters.project)
    const destination = ref<Target>(null)
    const source = ref<Target>(null)

    const { mutate } = useMutation(updateWarehouseBoardItemMutation)

    const handleWarehouseBoardItemDrop = (warehouseboarditemId: string, d: Target, s: Target) => {
      if (!isPositionChanged(s, d)) return

      const warehouseboarditemUpdateValues = {
        status: d.droppableId,
        listPosition: calculateWarehouseBoardItemListPosition(
          project.value.warehouseBoardItems,
          d,
          s,
          warehouseboarditemId
        )
      }

      const warehouseBoardItems = updateArrayItemById(
        project.value.warehouseBoardItems,
        warehouseboarditemId,
        warehouseboarditemUpdateValues
      )

      const oldProjectValues = getters.project()
      // optimistic update
      mutations.setProject({
        ...project.value,
        warehouseBoardItems
      })

      mutate({
        warehouseboarditemId: Number(warehouseboarditemId),
        warehouseboarditem: warehouseboarditemUpdateValues
        // eslint-disable-next-line
      } as any).catch(e => {
        console.error(e)
        mutations.setProject(oldProjectValues)
      })
      destination.value = null
      source.value = null
    }

    const onDrop = (dropResult: DropResult) => {
      const { removedIndex, addedIndex, payload, to } = dropResult

      if (removedIndex == null && addedIndex == null) return

      if (removedIndex != null) {
        source.value = {
          index: removedIndex,
          droppableId: payload.status
        }
      }

      if (addedIndex != null) {
        destination.value = {
          index: addedIndex,
          droppableId: Object.values(WarehouseBoardItemStatus)[to]
        }
      }

      if (destination.value != null && source.value != null) {
        handleWarehouseBoardItemDrop(payload.id, destination.value, source.value)
      }
    }

    return {
      onDrop,
      WarehouseBoardItemStatus
    }
  }
})
</script>
