<template>
  <div>
    <div class="mt-6 mb-1 uppercase text-textMedium text-13 font-bold">
      Priority
    </div>
    <j-select
      searchable
      variant="empty"
      :dropdownWidth="300"
      :value="value"
      :options="warehouseboarditemPriorityOptions"
      customRender
      customRenderOption
      @change="updateWarehouseBoardItemPriority"
    >
      <template v-slot:default="{ label, icon, color }">
        <j-button variant="secondary">
          <div class="flex items-center">
            <j-icon :style="{ color }" :size="18" :name="icon"></j-icon>

            <div class="pr-1 pl-2">
              {{ label }}
            </div>
          </div>
        </j-button>
      </template>
      <template v-slot:option="{ label, icon, color }">
        <div class="my-px mr-4 flex items-center">
          <j-icon :style="{ color }" :size="18" :name="icon"></j-icon>

          <div class="pr-1 pl-2">
            {{ label }}
          </div>
        </div>
      </template>
    </j-select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { WarehouseBoardItemPriority, WarehouseBoardItemPriorityCopy } from '@/types/warehouseboarditem'
import { warehouseboarditemPriorityColors } from '@/utils/colors'
export default defineComponent({
  props: {
    value: {
      type: String as () => WarehouseBoardItemPriority,
      required: true
    },
    updateWarehouseBoardItem: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const warehouseboarditemPriorityOptions = Object.values(WarehouseBoardItemPriority).map(priority => ({
      value: priority,
      label: WarehouseBoardItemPriorityCopy[priority],
      icon: [WarehouseBoardItemPriority.LOW, WarehouseBoardItemPriority.LOWEST].includes(priority)
        ? 'arrow-down'
        : 'arrow-up',
      color: warehouseboarditemPriorityColors[priority]
    }))
    const updateWarehouseBoardItemPriority = async (priority: WarehouseBoardItemPriority) => {
      try {
        await props.updateWarehouseBoardItem({ priority })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      warehouseboarditemPriorityOptions,
      updateWarehouseBoardItemPriority
    }
  }
})
</script>

<style></style>
