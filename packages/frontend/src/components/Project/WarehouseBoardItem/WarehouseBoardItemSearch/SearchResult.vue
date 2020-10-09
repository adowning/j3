<template>
  <div
    @click="selectResult"
    class="flex items-center py-1 px-3 rounded transition duration-100 cursor-pointer select-none hover:bg-backgroundLight"
  >
    <j-icon :size="24" class="flex-shrink-0" :name="warehouseBoardItem.type"></j-icon>
    <div class="pl-4">
      <div class="text-textDark text-15">{{ warehouseBoardItem.title }}</div>
      <div class="uppercase text-xs text-textMedium">
        {{ `${warehouseBoardItem.type}-${warehouseBoardItem.id}` }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { WarehouseBoardItem } from '@/types/warehouseboarditem'
import Modal from '@/components/Modals/Modal.vue'
import WarehouseBoardItemDetails from '@/components/Project/WarehouseBoardItem/WarehouseBoardItemDetails/WarehouseBoardItemDetails.vue'
import eventBus from '@/utils/eventBus'

export default defineComponent({
  components: {
    Modal
  },
  props: {
    warehouseBoardItem: {
      type: Object as () => WarehouseBoardItem,
      default: null
    }
  },
  setup(props) {
    const selectResult = () => {
      eventBus.$emit('close-search-modal')
      eventBus.$emit('toggle-warehouseboarditem-details', true, props.warehouseBoardItem.id)
    }
    return {
      selectResult,
      WarehouseBoardItemDetails
    }
  }
})
</script>

<style></style>
