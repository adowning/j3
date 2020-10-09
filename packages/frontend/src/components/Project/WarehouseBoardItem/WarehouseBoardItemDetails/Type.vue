<template>
  <j-select
    searchable
    variant="empty"
    :dropdownWidth="150"
    :withClearValue="false"
    :options="warehouseboarditemTypeOptions"
    :value="value"
    @change="updateWarehouseBoardItemType"
    customRender
    customRenderOption
  >
    <template v-slot:default="{ label, icon }">
      <j-button
        class="uppercase text-textMedium text-13"
        :iconSize="20"
        variant="empty"
        :icon="icon"
      >
        {{ `${label}-${warehouseboarditemId}` }}
      </j-button>
    </template>
    <template v-slot:option="{ label, icon }">
      <div class=" pr-1 pl-2 flex items-center">
        <j-icon :name="icon" :size="20" class="mr-1"></j-icon>

        <div class="text-15 pr-1 pl-2">
          {{ label }}
        </div>
      </div>
    </template>
  </j-select>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { WarehouseBoardItemType, WarehouseBoardItemTypeCopy } from '@/types/warehouseboarditem'
export default defineComponent({
  props: {
    value: {
      type: String as () => WarehouseBoardItemType,
      required: true
    },
    warehouseboarditemId: {
      type: [String, Number],
      required: true
    },
    updateWarehouseBoardItem: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const warehouseboarditemTypeOptions = Object.values(WarehouseBoardItemType).map(type => ({
      value: type,
      label: WarehouseBoardItemTypeCopy[type],
      icon: WarehouseBoardItemTypeCopy[type].toLowerCase()
    }))
    const updateWarehouseBoardItemType = async (type: WarehouseBoardItemType) => {
      try {
        await props.updateWarehouseBoardItem({ type })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      warehouseboarditemTypeOptions,
      updateWarehouseBoardItemType
    }
  }
})
</script>

<style></style>
