<template>
  <div class="list">
    <div class="px-3 pb-4 pt-3 uppercase text-textMedium text-13 truncate">
      {{ WorkorderStatusCopy[status] }}
      <span class="lowercase text-13">{{ formatedWorkordersCount }}</span>
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
        <Draggable v-for="(workorder, index) in filteredListWorkorders" :key="workorder.id">
          <Workorder :workorder="workorder" :index="index" />
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, computed } from '@vue/composition-api'
import { Container, Draggable } from 'vue-smooth-dnd'

import workorderComponent from '@/components/Project/Workorder/Workorder.vue'
import { Filters } from '@/types/filters'
import { Workorder, WorkorderStatusCopy, WorkorderStatus } from '@/types/workorder'
import { getters } from '@/store'
import { DropResult, getSortedListWorkorders } from '../../../utils/dnd'

const filterWorkorders = (
  projectWorkorders: Array<Workorder>,
  filters: Filters,
  currentUserId: string
) => {
  const { searchTerm, userIds, myOnly, recent } = filters

  let workorders = [...projectWorkorders]

  if (searchTerm) {
    workorders = workorders.filter(workorder =>
      workorder.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  if (userIds.length > 0) {
    workorders = workorders.filter(
      workorder =>
        [workorder.userIds, userIds].reduce((a, b) => a.filter(c => b.includes(c)))
          .length > 0
    )
  }
  if (myOnly && currentUserId) {
    workorders = workorders.filter(workorder => workorder.userIds.includes(currentUserId))
  }
  if (recent) {
    workorders = workorders.filter(workorder =>
      dayjs(workorder.updatedAt).isAfter(dayjs().subtract(3, 'day'))
    )
  }
  return workorders
}

export default defineComponent({
  props: {
    status: {
      type: String,
      required: true
    }
  },
  components: {
    Workorder: workorderComponent,
    Container,
    Draggable
  },
  setup(props, { emit }) {
    const project = computed(getters.project)
    const filters = computed(getters.filters)
    const currentUserId = computed(() => getters.currentUser().id)

    const filteredWorkorders = computed(() =>
      filterWorkorders(project.value.workorders, filters.value, currentUserId.value)
    )
    const filteredListWorkorders = computed(() =>
      getSortedListWorkorders(filteredWorkorders.value, props.status)
    )

    const allListWorkorders = computed(() =>
      getSortedListWorkorders(project.value.workorders, props.status)
    )

    const formatedWorkordersCount = computed(() => {
      if (allListWorkorders.value.length !== filteredListWorkorders.value.length) {
        return `${filteredListWorkorders.value.length} of ${allListWorkorders.value.length}`
      }
      return allListWorkorders.value.length
    })

    const dropPlaceholderOptions = {
      className: 'drop-preview',
      animationDuration: '150',
      showOnTop: true
    }

    // eslint-disable-next-line
    const onDrop = (dropResult: any) => {
      const arr = Object.values(WorkorderStatus)
      const to = arr.indexOf(props.status as WorkorderStatus)
      emit('drop', { ...dropResult, to } as DropResult)
    }
    const getCardPayload = (index: number) => {
      const workordersByStatus = getSortedListWorkorders(
        filteredListWorkorders.value,
        props.status
      )
      return workordersByStatus[index]
    }
    return {
      onDrop,
      getCardPayload,
      dropPlaceholderOptions,
      filteredListWorkorders,
      formatedWorkordersCount,
      WorkorderStatusCopy
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
