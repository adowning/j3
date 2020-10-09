<template>
  <div
    class="pr-6 py-8 pl-10  h-full w-full flex flex-col h-full w-full flex flex-col"
  >
    <j-breadcrumbs :items="['Projects', project.name, 'WarehouseBoardItems', warehouseboarditemId]" />
    <WarehouseBoardItemDetails
      :warehouseboarditemId="warehouseboarditemId"
      :withFullScreenButton="false"
      :withCloseButton="false"
      class="full-warehouseboarditem-details mt-5"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import WarehouseBoardItemDetails from '@/components/Project/WarehouseBoardItem/WarehouseBoardItemDetails/WarehouseBoardItemDetails.vue'
import { getters } from '@/store'
export default defineComponent({
  props: {
    warehouseboarditemId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    WarehouseBoardItemDetails
  },
  setup() {
    const project = computed(getters.project)
    return {
      project
    }
  }
})
</script>

<style lang="scss">
.full-warehouseboarditem-details {
  max-width: 987px;
}
</style>
