<template>
  <div class="warehouseboarditem-wrap">
    <div @click="openWarehouseBoardItemDetails" class="warehouseboarditem">
      <p class="pb-3 text-15 text-textDarkest">
        {{ warehouseboarditem.title }}
      </p>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <j-icon
            :name="warehouseboarditem.type"
            :size="20"
            class="text-textMedium mr-1"
          ></j-icon>

          <j-icon
            :style="{ color: warehouseboarditemPriorityStyles.color }"
            :name="warehouseboarditemPriorityStyles.icon"
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
import { WarehouseBoardItem, WarehouseBoardItemPriority } from '@/types/warehouseboarditem'
import { getters } from '@/store'
import { warehouseboarditemPriorityColors } from '@/utils/colors'
import eventBus from '@/utils/eventBus'

export default defineComponent({
  props: {
    warehouseboarditem: {
      type: Object as () => WarehouseBoardItem,
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
      props.warehouseboarditem.userIds.map(userId =>
        project.value.users.find(user => user.id === userId)
      )
    )

    const warehouseboarditemPriorityStyles = computed(() => ({
      icon: [WarehouseBoardItemPriority.LOW, WarehouseBoardItemPriority.LOWEST].includes(
        props.warehouseboarditem.priority
      )
        ? 'arrow-down'
        : 'arrow-up',
      color: warehouseboarditemPriorityColors[props.warehouseboarditem.priority]
    }))

    const openWarehouseBoardItemDetails = () => {
      eventBus.$emit('toggle-warehouseboarditem-details', true, props.warehouseboarditem.id)
    }

    return {
      assignees,
      warehouseboarditemPriorityStyles,
      openWarehouseBoardItemDetails
    }
  }
})
</script>

<style lang="postcss" scoped>
.warehouseboarditem-wrap {
  touch-action: manipulation;
  cursor: grab;
  margin-bottom: 5px;
}
.warehouseboarditem {
  @apply rounded-sm bg-white  transition-all duration-100 select-none;
  padding: 10px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 2px 0px;
}
.warehouseboarditem:hover {
  @apply bg-backgroundLight;
}
</style>
