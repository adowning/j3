<template>
  <j-select
    searchable
    variant="empty"
    :dropdownWidth="150"
    :withClearValue="false"
    :options="workorderTypeOptions"
    :value="value"
    @change="updateWorkorderType"
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
        {{ `${label}-${workorderId}` }}
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
import { WorkorderType, WorkorderTypeCopy } from '@/types/workorder'
export default defineComponent({
  props: {
    value: {
      type: String as () => WorkorderType,
      required: true
    },
    workorderId: {
      type: [String, Number],
      required: true
    },
    updateWorkorder: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const workorderTypeOptions = Object.values(WorkorderType).map(type => ({
      value: type,
      label: WorkorderTypeCopy[type],
      icon: WorkorderTypeCopy[type].toLowerCase()
    }))
    const updateWorkorderType = async (type: WorkorderType) => {
      try {
        await props.updateWorkorder({ type })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      workorderTypeOptions,
      updateWorkorderType
    }
  }
})
</script>

<style></style>
