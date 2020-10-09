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
      :options="workorderStatusOptions"
      :value="value"
      @change="updateWorkorderStatus"
      customRender
      customRenderOption
    >
      <template v-slot:default="{ label }">
        <j-button
          class="uppercase text-textMedium text-13"
          :variant="workorderStatusVariants[value]"
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
import { WorkorderStatusCopy, WorkorderStatus } from '@/types/workorder'
import { workorderStatusVariants } from '@/utils/colors'
export default defineComponent({
  props: {
    value: {
      type: String as () => WorkorderStatus,
      required: true
    },
    updateWorkorder: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const workorderStatusOptions = Object.values(WorkorderStatus).map(
      status => ({
        value: status,
        label: WorkorderStatusCopy[status]
      })
    )
    const updateWorkorderStatus = async (status: WorkorderStatus) => {
      try {
        await props.updateWorkorder({ status })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      workorderStatusOptions,
      workorderStatusVariants,
      updateWorkorderStatus
    }
  }
})
</script>

<style></style>
