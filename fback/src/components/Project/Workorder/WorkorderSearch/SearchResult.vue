<template>
  <div
    @click="selectResult"
    class="flex items-center py-1 px-3 rounded transition duration-100 cursor-pointer select-none hover:bg-backgroundLight"
  >
    <j-icon :size="24" class="flex-shrink-0" :name="workorder.type"></j-icon>
    <div class="pl-4">
      <div class="text-textDark text-15">{{ workorder.customer.name }}</div>
      <div class="uppercase text-xs text-textMedium">
        {{ `${workorder.type}-${workorder.id}` }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Workorder } from '@/types/workorder'
import Modal from '@/components/Modals/Modal.vue'
import WorkorderDetails from '@/components/Project/Workorder/WorkorderDetails/WorkorderDetails.vue'
import eventBus from '@/utils/eventBus'

export default defineComponent({
  components: {
    Modal
  },
  props: {
    workorder: {
      type: Object as () => Workorder,
      default: null
    }
  },
  setup(props) {
    const selectResult = () => {
      eventBus.$emit('close-search-modal')
      eventBus.$emit('toggle-workorder-details', true, props.workorder.id)
    }
    return {
      selectResult,
      WorkorderDetails
    }
  }
})
</script>

<style></style>
