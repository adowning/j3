<template>
  <div
    class="pr-6 py-8 pl-10  h-full w-full flex flex-col h-full w-full flex flex-col"
  >
    <j-breadcrumbs :items="['Projects', project.name, 'Workorders', workorderId]" />
    <WorkorderDetails
      :workorderId="workorderId"
      :withFullScreenButton="false"
      :withCloseButton="false"
      class="full-workorder-details mt-5"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import WorkorderDetails from '@/components/Project/Workorder/WorkorderDetails/WorkorderDetails.vue'
import { getters } from '@/store'
export default defineComponent({
  props: {
    workorderId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    WorkorderDetails
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
.full-workorder-details {
  max-width: 987px;
}
</style>
