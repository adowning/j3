<template>
  <div class="workorder-wrap">
    <div @click="openWorkorderDetails" class="workorder">
      <p class="pb-3 text-15 text-textDarkest">
        {{ workorder.customer.name }}
      </p>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <j-icon
            :name="workorder.type"
            :size="20"
            class="text-textMedium mr-1"
          ></j-icon>

          <j-icon
            :style="{ color: workorderPriorityStyles.color }"
            :name="workorderPriorityStyles.icon"
            :size="20"
          ></j-icon>
        </div>
        <div class="flex flex-row-reverse ml-1">
          <j-avatar
            v-for="user in assignees"
            :key="user.id"
            :size="24"
            :avatarUrl="user.avatarUrl"
            :name="user.name"
            class="shadow-outline-white -ml-1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { Workorder, WorkorderPriority } from '@/types/workorder'
import { getters } from '@/store'
import { workorderPriorityColors } from '@/utils/colors'
import eventBus from '@/utils/eventBus'

export default defineComponent({
  props: {
    workorder: {
      type: Object as () => Workorder,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const project = computed(getters.project)
    const assignees = computed(() =>
      props.workorder.userIds.map((userId: any) =>
        project.value.users.find((user: { id: any }) => user.id === userId)
      )
    )

    const workorderPriorityStyles = computed(() => ({
      icon: [WorkorderPriority.LOW, WorkorderPriority.LOWEST].includes(
        props.workorder.priority
      )
        ? 'arrow-down'
        : 'arrow-up',
      color: workorderPriorityColors[props.workorder.priority]
    }))

    const openWorkorderDetails = () => {
      eventBus.$emit('toggle-workorder-details', true, props.workorder.id)
    }

    return {
      assignees,
      workorderPriorityStyles,
      openWorkorderDetails
    }
  }
})
</script>

<style lang="postcss" scoped>
.workorder-wrap {
  touch-action: manipulation;
  cursor: grab;
  margin-bottom: 5px;
}
.workorder {
  @apply rounded-sm bg-white  transition-all duration-100 select-none;
  padding: 10px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 2px 0px;
}
.workorder:hover {
  @apply bg-backgroundLight;
}
</style>
