<template>
  <div class="list">
    <div class="px-3 pb-4 pt-3 uppercase text-textMedium text-13 truncate">
      {{ WarehouseBoardItemStatusCopy[status] }}
      <span class="lowercase text-13">{{ formatedWarehouseBoardItemsCount }}</span>
    </div>
    <div class="h-full px-2">
      <Container
        class="h-full"
        group-name="board"
        @drop="onDrop"
        drag-class="card-ghost"
        drop-class="card-ghost-drop"
        :get-child-payload="getCardPayload"
        :drop-placeholder="dropPlaceholderOptions"
      >
        <Draggable v-for="(warehouseboarditem, index) in filteredListWarehouseBoardItems" :key="warehouseboarditem.id">
          <WarehouseBoardItem :warehouseboarditem="warehouseboarditem" :index="index" />
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, computed } from '@vue/composition-api'
import { Container, Draggable } from 'vue-smooth-dnd'

import warehouseboarditemComponent from '@/components/Project/WarehouseBoardItem/WarehouseBoardItem.vue'
import { Filters } from '@/types/filters'
import { WarehouseBoardItem, WarehouseBoardItemStatusCopy, WarehouseBoardItemStatus } from '@/types/warehouseboarditem'
import { getters } from '@/store'
import { DropResult, getSortedListWarehouseBoardItems } from '../../../utils/dnd'

const filterWarehouseBoardItems = (
  projectWarehouseBoardItems: Array<WarehouseBoardItem>,
  filters: Filters,
  currentUserId: string
) => {
  const { searchTerm, userIds, myOnly, recent } = filters

  let warehouseBoardItems = [...projectWarehouseBoardItems]

  if (searchTerm) {
    warehouseBoardItems = warehouseBoardItems.filter(warehouseboarditem =>
      warehouseboarditem.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  if (userIds.length > 0) {
    warehouseBoardItems = warehouseBoardItems.filter(
      warehouseboarditem =>
        [warehouseboarditem.userIds, userIds].reduce((a, b) => a.filter(c => b.includes(c)))
          .length > 0
    )
  }
  if (myOnly && currentUserId) {
    warehouseBoardItems = warehouseBoardItems.filter(warehouseboarditem => warehouseboarditem.userIds.includes(currentUserId))
  }
  if (recent) {
    warehouseBoardItems = warehouseBoardItems.filter(warehouseboarditem =>
      dayjs(warehouseboarditem.updatedAt).isAfter(dayjs().subtract(3, 'day'))
    )
  }
  return warehouseBoardItems
}

export default defineComponent({
  props: {
    status: {
      type: String,
      required: true
    }
  },
  components: {
    WarehouseBoardItem: warehouseboarditemComponent,
    Container,
    Draggable
  },
  setup(props, { emit }) {
    const project = computed(getters.project)
    const filters = computed(getters.filters)
    const currentUserId = computed(() => getters.currentUser().id)

    const filteredWarehouseBoardItems = computed(() =>
      filterWarehouseBoardItems(project.value.warehouseBoardItems, filters.value, currentUserId.value)
    )
    const filteredListWarehouseBoardItems = computed(() =>
      getSortedListWarehouseBoardItems(filteredWarehouseBoardItems.value, props.status)
    )

    const allListWarehouseBoardItems = computed(() =>
      getSortedListWarehouseBoardItems(project.value.warehouseBoardItems, props.status)
    )

    const formatedWarehouseBoardItemsCount = computed(() => {
      if (allListWarehouseBoardItems.value.length !== filteredListWarehouseBoardItems.value.length) {
        return `${filteredListWarehouseBoardItems.value.length} of ${allListWarehouseBoardItems.value.length}`
      }
      return allListWarehouseBoardItems.value.length
    })

    const dropPlaceholderOptions = {
      className: 'drop-preview',
      animationDuration: '150',
      showOnTop: true
    }

    // eslint-disable-next-line
    const onDrop = (dropResult: any) => {
      const arr = Object.values(WarehouseBoardItemStatus)
      const to = arr.indexOf(props.status as WarehouseBoardItemStatus)
      emit('drop', { ...dropResult, to } as DropResult)
    }
    const getCardPayload = (index: number) => {
      const warehouseBoardItemsByStatus = getSortedListWarehouseBoardItems(
        filteredListWarehouseBoardItems.value,
        props.status
      )
      return warehouseBoardItemsByStatus[index]
    }
    return {
      onDrop,
      getCardPayload,
      dropPlaceholderOptions,
      filteredListWarehouseBoardItems,
      formatedWarehouseBoardItemsCount,
      WarehouseBoardItemStatusCopy
    }
  }
})
</script>

<style lang="postcss" scoped>
.list {
  @apply mr-2 flex flex-col  rounded-sm bg-backgroundLightest flex-shrink-0;
  width: calc(100% / 4 - 8px);
  min-height: 400px;
  min-width: 200px;
}
</style>

<style lang="scss">
.drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px;
}
.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg);
}
.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}
</style>
