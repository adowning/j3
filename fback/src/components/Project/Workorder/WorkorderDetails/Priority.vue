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
      :options="workorderPriorityOptions"
      customRender
      customRenderOption
      @change="updateWorkorderPriority"
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
import { WorkorderPriority, WorkorderPriorityCopy } from '@/types/workorder'
import { workorderPriorityColors } from '@/utils/colors'
export default defineComponent({
  props: {
    value: {
      type: String as () => WorkorderPriority,
      required: true
    },
    updateWorkorder: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const workorderPriorityOptions = Object.values(WorkorderPriority).map(
      priority => ({
        value: priority,
        label: WorkorderPriorityCopy[priority],
        icon: [WorkorderPriority.LOW, WorkorderPriority.LOWEST].includes(
          priority
        )
          ? 'arrow-down'
          : 'arrow-up',
        color: workorderPriorityColors[priority]
      })
    )
    const updateWorkorderPriority = async (priority: WorkorderPriority) => {
      try {
        await props.updateWorkorder({ priority })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      workorderPriorityOptions,
      updateWorkorderPriority
    }
  }
})
</script>

<style></style>
