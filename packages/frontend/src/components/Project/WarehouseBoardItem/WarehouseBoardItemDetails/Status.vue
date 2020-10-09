<template>
  <div>
    <div class="mt-6 mb-1 uppercase text-textMedium text-13 font-bold">
      status
    </div>
    <j-select
      searchable
      variant="empty"
      :dropdownWidth="300"
      :withClearValue="false"
      :options="warehouseboarditemStatusOptions"
      :value="value"
      @change="updateWarehouseBoardItemStatus"
      customRender
      customRenderOption
    >
      <template v-slot:default="{ label }">
        <j-button
          class="uppercase text-textMedium text-13"
          :variant="warehouseboarditemStatusVariants[value]"
        >
          {{ label }}
        </j-button>
      </template>
      <template v-slot:option="{ label }">
        <div class="flex items-center pr-1 pl-2">
          <div class="text-15 pr-1 pl-2">
            {{ label }}
          </div>
        </div>
      </template>
    </j-select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { WarehouseBoardItemStatusCopy, WarehouseBoardItemStatus } from '@/types/warehouseboarditem'
import { warehouseboarditemStatusVariants } from '@/utils/colors'
export default defineComponent({
  props: {
    value: {
      type: String as () => WarehouseBoardItemStatus,
      required: true
    },
    updateWarehouseBoardItem: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const warehouseboarditemStatusOptions = Object.values(WarehouseBoardItemStatus).map(status => ({
      value: status,
      label: WarehouseBoardItemStatusCopy[status]
    }))
    const updateWarehouseBoardItemStatus = async (status: WarehouseBoardItemStatus) => {
      try {
        await props.updateWarehouseBoardItem({ status })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      warehouseboarditemStatusOptions,
      warehouseboarditemStatusVariants,
      updateWarehouseBoardItemStatus
    }
  }
})
</script>

<style></style>
